import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic"
import katex from "katex"
import { VFile } from "vfile"
import rehypeKatex from "../dist/rehype-katex.esm.js"
import rehypeKatexClosed from "../dist/rehype-katex.closed.js"

function mathTree(value, className = ["math-inline"]) {
  return {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className },
        children: [{ type: "text", value }],
      },
    ],
  }
}

const cases = [
  ["empty expression", ""],
  ["plain symbols", String.raw`x + \alpha - \beta`],
  ["HTML line-ending preprocessing", "\\text{a\rb}"],
  ["superscripts and subscripts", String.raw`x_i^2 + y_{n+1}`],
  ["fractions", String.raw`\frac{a+b}{c-d}`],
  ["roots and generated SVG paths", String.raw`\sqrt[3]{x^2 + 1}`],
  ["stretchy delimiters", String.raw`\left\langle \frac{x}{y} \right\rangle`],
  ["matrix environments", String.raw`\begin{pmatrix}a&b\\c&d\end{pmatrix}`],
  ["array rules and SVG lines", String.raw`\begin{array}{c|c}a&b\\\hline c&d\end{array}`],
  ["stretchy accents", String.raw`\widehat{abcdef} + \widetilde{xyz}`],
  ["horizontal braces", String.raw`\overbrace{x+y}^{n}`],
  ["enclosures", String.raw`\cancel{x} + \boxed{y}`],
  ["fonts and colors", String.raw`\color{rebeccapurple}{\mathbf{A}} + \mathbb{R}`],
  ["text and consecutive MathML text", String.raw`\text{hello world}`],
  ["unicode fallback classes", String.raw`Ж + 한 + α`, { strict: "ignore" }],
  ["mathematical alphanumeric fonts", "𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜 𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶"],
  ["spacing nodes", String.raw`a\,b\!c\quad d`],
  ["commutative diagrams", String.raw`\begin{CD} A @>f>> B \\ @VgVV @AAhA \\ C @= D \end{CD}`, { displayMode: true }],
  ["trusted anchors", String.raw`\href{https://example.com/a?b=c}{x}`, { trust: true }],
  ["trusted image nodes", String.raw`\includegraphics[width=1em,height=2em]{https://example.com/x.png}`, { trust: true }],
  ["trusted HTML classes", String.raw`\htmlClass{alpha beta}{x}`, { trust: true, strict: "ignore" }],
  ["trusted HTML identifiers", String.raw`\htmlId{formula-id}{x}`, { trust: true, strict: "ignore" }],
  ["trusted HTML styles", String.raw`\htmlStyle{color:red;}{x}`, { trust: true, strict: "ignore" }],
  ["trusted data attributes", String.raw`\htmlData{foo=bar,baz=qux}{x}`, { trust: true, strict: "ignore" }],
  ["HTML-only output", String.raw`\frac{x}{y}`, { output: "html" }],
  ["MathML-only output", String.raw`\frac{x}{y}`, { output: "mathml" }],
  ["left equation numbers", String.raw`\tag{1}x=y`, { displayMode: true, leqno: true }],
  ["flush-left display", String.raw`x=y`, { displayMode: true, fleqn: true }],
  ["minimum rule thickness", String.raw`\frac{x}{y}`, { minRuleThickness: 0.08 }],
  ["custom macros", String.raw`\RR^2`, { macros: { "\\RR": "\\mathbb{R}" } }],
]

describe("KaTeX 0.16.22 structural parity", () => {
  for (const [name, value, options = {}] of cases) {
    it(name, () => {
      const pluginOptions = { ...options }
      const displayMode = pluginOptions.displayMode === true
      delete pluginOptions.displayMode
      const expected = fromHtmlIsomorphic(
        katex.renderToString(value, {
          ...pluginOptions,
          displayMode,
          throwOnError: true,
        }),
        { fragment: true },
      ).children

      for (const plugin of [rehypeKatex, rehypeKatexClosed]) {
        const tree = mathTree(value)
        const file = new VFile()
        if (displayMode) tree.children[0].properties.className = ["math-display"]
        plugin(pluginOptions)(tree, file)
        assert.deepEqual(tree.children, expected)
        assert.equal(file.messages.length, 0)
      }
    })
  }

  it("preserves a non-math tree and ignores scalar className", () => {
    const tree = mathTree("x", "math-inline")
    const original = structuredClone(tree)
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(tree, original)
  })

  it("does not transform a matching root element without a parent", () => {
    const tree = mathTree("x").children[0]
    const original = structuredClone(tree)
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(tree, original)
  })

  it("uses display mode when both math classes are present", () => {
    const tree = mathTree("x", ["math-inline", "math-display"])
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(
      tree.children,
      fromHtmlIsomorphic(katex.renderToString("x", { displayMode: true }), {
        fragment: true,
      }).children,
    )
  })

  it("uses preformatted text and replaces the pre for language-math", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "pre",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "code",
              properties: { className: ["language-math"] },
              children: [{ type: "text", value: "x + y\n" }],
            },
          ],
        },
      ],
    }
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(
      tree.children,
      fromHtmlIsomorphic(katex.renderToString("x + y\n", { displayMode: true }), {
        fragment: true,
      }).children,
    )
  })

  it("matches preformatted text extraction for nested HAST", () => {
    const tree = mathTree("unused")
    tree.children[0].children = [
      { type: "text", value: "x" },
      { type: "element", tagName: "br", properties: {}, children: [] },
      {
        type: "element",
        tagName: "span",
        properties: { hidden: true },
        children: [{ type: "text", value: "ignored" }],
      },
      {
        type: "element",
        tagName: "span",
        properties: {},
        children: [{ type: "text", value: "+y" }],
      },
    ]
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(
      tree.children,
      fromHtmlIsomorphic(katex.renderToString("x\n+y"), { fragment: true }).children,
    )
  })

  it("transforms each math sibling without revisiting replacements", () => {
    const tree = {
      type: "root",
      children: [mathTree("x").children[0], { type: "text", value: "+" }, mathTree("y").children[0]],
    }
    rehypeKatex()(tree, new VFile())
    assert.deepEqual(tree.children[0], fromHtmlIsomorphic(katex.renderToString("x"), { fragment: true }).children[0])
    assert.deepEqual(tree.children[2], fromHtmlIsomorphic(katex.renderToString("y"), { fragment: true }).children[0])
  })

  it("matches official ParseError recovery and diagnostics", () => {
    const value = String.raw`\notacommand`
    const tree = mathTree(value)
    const file = new VFile()
    rehypeKatex({ errorColor: "orange" })(tree, file)
    assert.deepEqual(
      tree.children,
      fromHtmlIsomorphic(
        katex.renderToString(value, {
          errorColor: "orange",
          strict: "ignore",
          throwOnError: false,
        }),
        { fragment: true },
      ).children,
    )
    assert.equal(file.messages.length, 1)
    assert.equal(file.messages[0].ruleId, "parseerror")
    assert.equal(file.messages[0].source, "rehype-katex")
  })

  it("matches HTML null preprocessing in ParseError output", () => {
    const value = "\\text{a\0b}"
    const tree = mathTree(value)
    const file = new VFile()
    rehypeKatex()(tree, file)
    assert.deepEqual(
      tree.children,
      fromHtmlIsomorphic(
        katex.renderToString(value, { strict: "ignore", throwOnError: false }),
        { fragment: true },
      ).children,
    )
    assert.equal(file.messages.length, 1)
  })

  it("rejects invalid trusted HTML attribute names like KaTeX toMarkup", () => {
    const value = String.raw`\htmlData{a b=x}{y}`
    const tree = mathTree(value)
    const file = new VFile()
    rehypeKatex({ trust: true, strict: "ignore" })(tree, file)
    assert.deepEqual(tree.children, [
      {
        type: "element",
        tagName: "span",
        properties: {
          className: ["katex-error"],
          style: "color:#cc0000",
          title: "ParseError: KaTeX parse error: Invalid attribute name 'data-a b'",
        },
        children: [{ type: "text", value }],
      },
    ])
    assert.equal(file.messages.length, 1)
    assert.equal(file.messages[0].ruleId, "parseerror")
  })

  it("preserves upstream truthy errorColor coercion on non-parse errors", () => {
    const value = "\\begin{split}\n\\end{{split}}\n"
    const tree = mathTree(value, ["math-display"])
    rehypeKatex({ errorColor: 123 })(tree, new VFile())
    assert.deepEqual(tree.children, [
      {
        type: "element",
        tagName: "span",
        properties: {
          className: ["katex-error"],
          style: "color:123",
          title: "Error: Expected node of type textord, but got node of type ordgroup",
        },
        children: [{ type: "text", value }],
      },
    ])
  })

  it("shares the runtime mhchem registry", async () => {
    await import("katex/contrib/mhchem")
    const value = String.raw`\ce{CO2 + C -> 2 CO}`
    const expected = fromHtmlIsomorphic(katex.renderToString(value), { fragment: true }).children

    for (const plugin of [rehypeKatex, rehypeKatexClosed]) {
      const tree = mathTree(value)
      plugin()(tree, new VFile())
      assert.deepEqual(tree.children, expected)
    }
  })

  it("shares macros registered through __defineMacro", () => {
    katex.__defineMacro("\\runtimeMacroForRehype", "\\mathbb{Q}")
    const value = String.raw`\runtimeMacroForRehype`
    const expected = fromHtmlIsomorphic(katex.renderToString(value), { fragment: true }).children

    for (const plugin of [rehypeKatex, rehypeKatexClosed]) {
      const tree = mathTree(value)
      plugin()(tree, new VFile())
      assert.deepEqual(tree.children, expected)
    }
  })

  it("shares functions registered through __defineFunction", () => {
    katex.__defineFunction({
      type: "textord",
      names: ["\\runtimeFunctionForRehype"],
      props: { numArgs: 0, allowedInText: true },
      handler({ parser }) {
        return { type: "textord", mode: parser.mode, text: "R" }
      },
    })
    const value = String.raw`\runtimeFunctionForRehype`
    const expected = fromHtmlIsomorphic(katex.renderToString(value), { fragment: true }).children

    for (const plugin of [rehypeKatex, rehypeKatexClosed]) {
      const tree = mathTree(value)
      plugin()(tree, new VFile())
      assert.deepEqual(tree.children, expected)
    }
  })
})
