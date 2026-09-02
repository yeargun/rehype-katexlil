import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"

const json = execFileSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8" })
const result = JSON.parse(json)[0]
const file = "rehype-katex"
const required = new Set([
  `dist/${file}.esm.js`,
  `dist/${file}.cjs`,
  `dist/${file}.umd.js`,
  `dist/${file}.closed.js`,
  `dist/${file}.d.ts`,
  "src/index.lil",
  "src/lib/index.lil",
  "src/katex/katex.lil",
  "src/katex/types.lil",
  "LICENSE",
  "NOTICE.md",
  "README.md",
])
const files = new Set(result.files.map(({ path }) => path))
for (const path of required) {
  if (!files.has(path)) throw new Error(`npm tarball is missing ${path}`)
}
const manifest = JSON.parse(readFileSync("package.json", "utf8"))
if (manifest.name !== "@itslil/rehype-katex") throw new Error("unexpected package name")
const dependencies = Object.keys(manifest.dependencies ?? {}).sort()
if (JSON.stringify(dependencies) !== JSON.stringify([
  "@types/hast",
  "hast-util-from-html-isomorphic",
  "hast-util-to-text",
  "katex",
  "unist-util-visit-parents",
  "vfile",
])) {
  throw new Error("unexpected runtime dependencies")
}
if (manifest.dependencies.katex !== "0.16.22") throw new Error("runtime KaTeX must stay pinned")
for (const path of files) {
  if (
    path.endsWith("html-host.js") ||
    path.endsWith("data-host.js") ||
    path === "src/entry.lil" ||
    path === "src/plugin.lil" ||
    path === "src/from-html.lil" ||
    path.includes(".raw.") ||
    path.includes(".bundled.")
  ) {
    throw new Error(`npm tarball contains build-only file ${path}`)
  }
}
console.log(`npm pack: ${result.entryCount} files, ${result.size} bytes packed, ${result.unpackedSize} bytes unpacked`)
