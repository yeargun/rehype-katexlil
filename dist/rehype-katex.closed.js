/*! @itslil/rehype-katex 7.0.3 | LilScript reimplementation of rehype-katex | MIT */
// rehype-katex.closed.js
import { visitParents } from "unist-util-visit-parents";
import { toText } from "hast-util-to-text";
import { default as katex } from "katex";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { SKIP } from "unist-util-visit-parents";
var rehypeKatex = function(a) {
  let b = a ?? {};
  return (c, d) => {
    visitParents(c, "element", (e, f) => {
      let g = [], h = e.properties;
      h != null && Array.isArray(h.className) && (g = h.className);
      let i = !!g.includes("language-math"), j = !!g.includes("math-display"), k = !!g.includes("math-inline");
      if (!i && !j && !k) return;
      let l = f.length, m;
      l > 0 && (m = f[l - 1 | 0]);
      let n = e, o = j;
      if (e.tagName == "code" && i && m != null && m.type == "element" && m.tagName == "pre" && (n = m, m = void 0, l > 1 && (m = f[l - 2 | 0]), o = !0), m == null || !m) return;
      let p = toText(n, { whitespace: "pre" }) + "", q;
      try {
        let r = Object.assign({}, b);
        r.displayMode = o, r.throwOnError = !0;
        let s = katex.renderToString(p, r);
        q = fromHtmlIsomorphic(s, { fragment: !0 }).children;
      } catch (t) {
        let u = f.slice();
        Array.prototype.push.call(u, e);
        let v = (t.name + "").toLowerCase();
        d.message("Could not render math with KaTeX", { ancestors: u, cause: t, place: e.position, ruleId: v, source: "rehype-katex" });
        try {
          let w = Object.assign({}, b);
          w.displayMode = o, w.strict = "ignore", w.throwOnError = !1;
          let x = katex.renderToString(p, w);
          q = fromHtmlIsomorphic(x, { fragment: !0 }).children;
        } catch {
          q = [{ type: "element", tagName: "span", properties: { className: ["katex-error"], style: "color:" + (b.errorColor || "#cc0000"), title: t + "" }, children: [{ type: "text", value: p }] }];
        }
      }
      let A = m.children, C = [A.indexOf(n) | 0, 1], D = 0, E = q.length;
      for (; D < E; )
        C.push(q[D]), D = D + 1 | 0;
      return A.splice.apply(A, C), SKIP;
    });
  };
};
export {
  rehypeKatex as default
};
