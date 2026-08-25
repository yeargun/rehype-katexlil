import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, it } from "node:test"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")

describe("@itslil/rehype-katex", () => {
  it("transforms span.math-inline x^2 into katex", async () => {
    const { rehypeKatex } = await import("../dist/rehype-katex.esm.js")
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["math-inline"] },
          children: [{ type: "text", value: "x^2" }],
        },
      ],
    }
    const transform = rehypeKatex()
    const out = transform(tree)
    const html = JSON.stringify(out)
    assert.match(html, /katex/)
    assert.match(html, /2/)
  })

  it("reads className as a string and mdast math nodes", async () => {
    const { rehypeKatex } = await import("../dist/rehype-katex.esm.js")
    const transform = rehypeKatex()
    const inline = transform({
      type: "root",
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: "math-inline" },
          children: [{ type: "text", value: "y" }],
        },
      ],
    })
    assert.match(JSON.stringify(inline), /katex/)
    const block = transform({
      type: "root",
      children: [{ type: "math", value: "\\frac{a}{b}" }],
    })
    const blockHtml = JSON.stringify(block)
    assert.match(blockHtml, /katex-display/)
    assert.match(blockHtml, /mfrac/)
  })

  it("exports default as the plugin", async () => {
    const mod = await import("../dist/rehype-katex.esm.js")
    assert.equal(typeof mod.rehypeKatex, "function")
    assert.equal(mod.default, mod.rehypeKatex)
  })

  it("pins tree and option keys on the library artifact", () => {
    const src = readFileSync(resolve(root, "dist/rehype-katex.esm.js"), "utf8")
    assert.match(src, /math-inline/)
    assert.match(src, /math-display/)
    assert.match(src, /throwOnError/)
    assert.match(src, /errorColor/)
    assert.match(src, /className/)
  })

  it("closed artifact performs the core call", async () => {
    const closedPath = resolve(root, "dist/rehype-katex.closed.js")
    assert.equal(existsSync(closedPath), true)
    const { rehypeKatex } = await import("../dist/rehype-katex.closed.js")
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["math-inline"] },
          children: [{ type: "text", value: "x^2" }],
        },
      ],
    }
    const html = JSON.stringify(rehypeKatex()(tree))
    assert.match(html, /katex/)
  })
})
