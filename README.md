# @itslil/rehype-katex

Official [`rehype-katex@7.0.1`](https://github.com/remarkjs/remark-math) algorithms rewritten in LilScript. Official test suite 16/16. Not affiliated with upstream.

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
