import assert from "node:assert/strict"
import { createRequire } from "node:module"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const require = createRequire(import.meta.url)

const katexModules = [
  "Lexer",
  "MacroExpander",
  "Namespace",
  "Options",
  "ParseError",
  "Parser",
  "Settings",
  "SourceLocation",
  "Style",
  "Token",
  "buildCommon",
  "buildHTML",
  "buildMathML",
  "buildTree",
  "defineEnvironment",
  "defineFunction",
  "defineMacro",
  "delimiter",
  "domTree",
  "environments",
  "environments/array",
  "environments/cd",
  "fontMetrics",
  "fontMetricsData",
  "functions",
  "functions/accent",
  "functions/accentunder",
  "functions/arrow",
  "functions/char",
  "functions/color",
  "functions/cr",
  "functions/def",
  "functions/delimsizing",
  "functions/enclose",
  "functions/environment",
  "functions/font",
  "functions/genfrac",
  "functions/hbox",
  "functions/horizBrace",
  "functions/href",
  "functions/html",
  "functions/htmlmathml",
  "functions/includegraphics",
  "functions/kern",
  "functions/lap",
  "functions/math",
  "functions/mathchoice",
  "functions/mclass",
  "functions/op",
  "functions/operatorname",
  "functions/ordgroup",
  "functions/overline",
  "functions/phantom",
  "functions/pmb",
  "functions/raisebox",
  "functions/relax",
  "functions/rule",
  "functions/sizing",
  "functions/smash",
  "functions/sqrt",
  "functions/styling",
  "functions/supsub",
  "functions/symbolsOp",
  "functions/symbolsOrd",
  "functions/symbolsSpacing",
  "functions/tag",
  "functions/text",
  "functions/underline",
  "functions/utils/assembleSupSub",
  "functions/vcenter",
  "functions/verb",
  "katex",
  "macros",
  "mathMLTree",
  "parseNode",
  "parseTree",
  "spacingData",
  "stretchy",
  "svgGeometry",
  "symbols",
  "tree",
  "types",
  "unicodeAccents",
  "unicodeScripts",
  "unicodeSupOrSub",
  "unicodeSymbols",
  "units",
  "utils",
  "wide-character",
]

describe("source, data, and artifact audit", () => {
  it("preserves the upstream rehype-katex module paths", () => {
    assert.equal(existsSync(resolve(root, "src/index.lil")), true)
    assert.equal(existsSync(resolve(root, "src/lib/index.lil")), true)
  })

  it("covers every KaTeX 0.16.22 source module by upstream filename", () => {
    assert.equal(katexModules.length, 89)
    for (const name of katexModules) {
      assert.equal(
        existsSync(resolve(root, "src/katex", `${name}.lil`)) ||
          existsSync(resolve(root, "src/katex", `${name}.js`)),
        true,
        name,
      )
    }
  })

  it("vendors the exact KaTeX 0.16.22 metric and Unicode mappings", async () => {
    assert.equal(existsSync(resolve(root, "src/katex/data-host.js")), false)
    const localMetrics = readFileSync(resolve(root, "src/katex/fontMetricsData.js"), "utf8")
    const officialMetrics = readFileSync(
      resolve(root, "node_modules/katex/src/fontMetricsData.js"),
      "utf8",
    )
    assert.equal(localMetrics.trimEnd(), officialMetrics.trimEnd())

    const localUnicode = await import("../src/katex/unicodeSymbols.js")
    const officialUnicode = require(resolve(root, "node_modules/katex/src/unicodeSymbols.js"))
    assert.deepEqual(localUnicode.default, officialUnicode)
    assert.equal(Object.keys(localUnicode.default).length, 344)
  })

  it("pins package, lockfile, declarations, and artifact exports", async () => {
    const manifest = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"))
    const lock = JSON.parse(readFileSync(resolve(root, "package-lock.json"), "utf8"))
    assert.equal(manifest.version, "7.0.3")
    assert.equal(lock.version, manifest.version)
    assert.equal(lock.packages[""].version, manifest.version)
    assert.equal(lock.packages["node_modules/katex"].version, "0.16.22")
    assert.equal(manifest.dependencies.katex, "0.16.22")
    assert.equal(manifest.dependencies["hast-util-from-html-isomorphic"], "^2.0.0")
    assert.deepEqual(Object.keys(await import("../dist/rehype-katex.esm.js")), ["default"])
    assert.deepEqual(Object.keys(await import("../dist/rehype-katex.closed.js")), ["default"])
    assert.deepEqual(Object.keys(require("../dist/rehype-katex.cjs")), ["default"])
    delete globalThis.rehypeKatex
    await import("../dist/rehype-katex.umd.js")
    assert.equal(typeof globalThis.rehypeKatex, "function")
    delete globalThis.rehypeKatex
  })
})
