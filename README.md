# @itslil/rehype-katex

Official [`rehype-katex@7.0.1`](https://github.com/remarkjs/remark-math) algorithms rewritten in LilScript with KaTeX 0.16.22. The official suite and structural differential coverage pass in both library and closed-world builds. Not affiliated with upstream.

**Site:** [yeargun.github.io/rehype-katexlil/](https://yeargun.github.io/rehype-katexlil/)

```sh
npm install @itslil/rehype-katex
```

Two compiles ship from the same `.lil` source:

| Lane | Config | Meaning |
| --- | --- | --- |
| **library** (npm) | `lilscript.toml` · `--target js-module` | reusable ESM. Export names and `extern class` keys stay. |
| **closed** | `lilscript.closed.toml` · `--target js-module` | diagnostic local-field optimization using the same shared runtime dependencies. |

You publish the library lane. `dist/rehype-katex.closed.js` is diagnostic only.

The LilScript compiler lives next door at `../lilscript`.

The plugin imports the caller-visible `katex` runtime and therefore observes
mhchem and all macros/functions registered through KaTeX's extension APIs.
Like upstream, rendered markup is parsed with `hast-util-from-html-isomorphic`.
