# @itslil/rehype-katex

rehype-katex reimplemented in LilScript. This is **not** the official [`rehype-katex`](https://github.com/remarkjs/remark-math) package.

**Site:** [yeargun.github.io/rehype-katexlil/](https://yeargun.github.io/rehype-katexlil/)

```sh
npm install @itslil/rehype-katex
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | closed LilScript world. `extern class` keys may mangle. ESM export names stay so the lane is testable. |

You publish the library lane. The closed artifact is `dist/rehype-katex.closed.js`.

The LilScript compiler lives next door at `../lilscript`.
