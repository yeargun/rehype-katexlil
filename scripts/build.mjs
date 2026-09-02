import {
  accessSync,
  constants,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { build as esbuild } from "esbuild"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const lilscriptRoot = process.env.LILSCRIPT_ROOT ?? resolve(root, "..", "lilscript")
const dist = resolve(root, "dist")
const file = "rehype-katex"
const banner = "/*! @itslil/rehype-katex 7.0.2 | LilScript reimplementation of rehype-katex | MIT */\n"

function compilerPath() {
  const candidates = [
    process.env.LILSCRIPT_COMPILER,
    resolve(lilscriptRoot, "target", "release", "lilscript"),
    resolve(lilscriptRoot, "target", "debug", "lilscript"),
  ].filter(Boolean)
  for (const candidate of candidates) {
    try {
      accessSync(candidate, constants.X_OK)
      return candidate
    } catch {}
  }
  return null
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit" })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function compileLil(compiler, configName, outputName) {
  run(compiler, [
    resolve(root, "src", "index.lil"),
    "--target",
    "js-module",
    "--config",
    resolve(root, configName),
    "-o",
    resolve(dist, outputName),
  ])
}

function sanitizeCompiled(source) {
  return source
    .replace(/\b(\d+)\s*\*\*\s*(\d+)/g, (_, a, b) => String(Number(a) ** Number(b)))
    .replace(/:==(\w+)&&\((\w+)=(\w+)\)/g, ":$2===$1?$3:$2")
    .replace(/(\w+)\s*\+\s*(\d+)\s*\+\s*(\w+)/g, "$1+($2+$3)")
}

async function compileIfRequested() {
  if (!process.argv.includes("--compile") && existsSync(resolve(dist, `${file}.raw.js`))) {
    return
  }
  const compiler = compilerPath()
  if (!compiler) {
    throw new Error("LilScript compiler not found. Set LILSCRIPT_COMPILER or build lilscript.")
  }
  mkdirSync(dist, { recursive: true })
  compileLil(compiler, "lilscript.toml", `${file}.raw.js`)
  compileLil(compiler, "lilscript.closed.toml", `${file}.closed.js`)
}

await compileIfRequested()
mkdirSync(dist, { recursive: true })

const rawPath = resolve(dist, `${file}.raw.js`)
if (!existsSync(rawPath)) {
  throw new Error(`dist/${file}.raw.js is missing. Run with --compile after building LilScript.`)
}

writeFileSync(rawPath, sanitizeCompiled(readFileSync(rawPath, "utf8")))
const closedRaw = resolve(dist, `${file}.closed.js`)
if (existsSync(closedRaw)) {
  writeFileSync(closedRaw, sanitizeCompiled(readFileSync(closedRaw, "utf8")))
}

await esbuild({
  absWorkingDir: dist,
  entryPoints: [rawPath],
  outfile: resolve(dist, `${file}.esm.js`),
  bundle: true,
  format: "esm",
  platform: "neutral",
  external: ["hast-util-from-html-isomorphic", "hast-util-to-text", "katex", "unist-util-visit-parents"],
  legalComments: "none",
  minifyWhitespace: false,
  minifyIdentifiers: false,
  // esbuild re-prints the compiler's output, and without minifySyntax it spells
  // every compact boolean back out: `!0` came out as `true` in the bundle, the
  // 030 class that cost micromarklil all 87 of its compact booleans. Syntax
  // minification restores the compiler's spelling; identifiers stay untouched.
  minifySyntax: true,
  banner: { js: banner },
  logLevel: "error",
})

if (existsSync(closedRaw)) {
  await esbuild({
    absWorkingDir: dist,
    entryPoints: [closedRaw],
    outfile: closedRaw + ".bundled",
    bundle: true,
    format: "esm",
    platform: "neutral",
    external: ["hast-util-from-html-isomorphic", "hast-util-to-text", "katex", "unist-util-visit-parents"],
    legalComments: "none",
    minifyWhitespace: false,
    minifyIdentifiers: false,
    // esbuild re-prints the compiler's output, and without minifySyntax it spells
  // every compact boolean back out: `!0` came out as `true` in the bundle, the
  // 030 class that cost micromarklil all 87 of its compact booleans. Syntax
  // minification restores the compiler's spelling; identifiers stay untouched.
  minifySyntax: true,
    logLevel: "error",
  })
  writeFileSync(closedRaw, `${banner}${readFileSync(closedRaw + ".bundled", "utf8").trimEnd()}\n`)
  rmSync(closedRaw + ".bundled")
}

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.esm.js`)],
  outfile: resolve(dist, `${file}.cjs`),
  bundle: true,
  format: "cjs",
  platform: "neutral",
  external: ["katex"],
  legalComments: "none",
  minifyWhitespace: true,
  minifyIdentifiers: false,
  // esbuild re-prints the compiler's output, and without minifySyntax it spells
  // every compact boolean back out: `!0` came out as `true` in the bundle, the
  // 030 class that cost micromarklil all 87 of its compact booleans. Syntax
  // minification restores the compiler's spelling; identifiers stay untouched.
  minifySyntax: true,
  banner: { js: banner },
  logLevel: "error",
})

const browserKatex = {
  name: "browser-katex",
  setup(build) {
    build.onResolve({ filter: /^katex$/ }, () => ({ path: "katex-global", namespace: "katex" }))
    build.onLoad({ filter: /.*/, namespace: "katex" }, () => ({ contents: "export default globalThis.katex" }))
  },
}

await esbuild({
  absWorkingDir: dist,
  entryPoints: [resolve(dist, `${file}.esm.js`)],
  outfile: resolve(dist, `${file}.umd.js`),
  bundle: true,
  format: "iife",
  platform: "neutral",
  conditions: [],
  globalName: "rehypeKatex",
  plugins: [browserKatex],
  footer: {
    js: `globalThis.rehypeKatex=rehypeKatex.default||rehypeKatex.rehypeKatex||rehypeKatex;`,
  },
  legalComments: "none",
  minifyWhitespace: true,
  minifyIdentifiers: false,
  // esbuild re-prints the compiler's output, and without minifySyntax it spells
  // every compact boolean back out: `!0` came out as `true` in the bundle, the
  // 030 class that cost micromarklil all 87 of its compact booleans. Syntax
  // minification restores the compiler's spelling; identifiers stay untouched.
  minifySyntax: true,
  banner: { js: banner },
  logLevel: "error",
})

copyFileSync(resolve(root, "types", `${file}.d.ts`), resolve(dist, `${file}.d.ts`))
console.log(`wrote dist/${file}.esm.js, dist/${file}.cjs, dist/${file}.umd.js, dist/${file}.closed.js`)
