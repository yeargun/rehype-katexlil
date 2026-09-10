/*! @itslil/rehype-katex 7.0.3 | LilScript reimplementation of rehype-katex | MIT */


// rehype-katex.raw.js
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toText } from "hast-util-to-text";
import { default as katex } from "katex";
import { SKIP, visitParents } from "unist-util-visit-parents";
var a = (c) => {
  var b = c;
  return b == null && (b = {}), (l, m) => {
    visitParents(l, "element", (u, v) => {
      var y, x = [], w = u.properties;
      w != null && Array.isArray(w.className) && (x = w.className), w = !!x.includes("language-math"), y = !!x.includes("math-display");
      var z = !!x.includes("math-inline");
      if (!(!w && !y && !z) && (z = +v.length | 0, x = void 0, z > 0 && (x = v[z - 1]), u.tagName == "code" && w && x != null && x.type == "element" && x.tagName == "pre" ? (w = void 0, z > 1 && (w = v[z - 2]), y = !0) : (w = x, x = u), !(w == null || !w))) {
        z = toText(x, { whitespace: "pre" }) + "";
        var zb;
        try {
          var Ab = Object.assign({}, b);
          Ab.displayMode = y, Ab.throwOnError = !0;
          var Bb = katex.renderToString(z, Ab);
          zb = fromHtmlIsomorphic(Bb, { fragment: !0 }).children;
        } catch (A) {
          var _ = void 0, Cb = v.slice();
          Array.prototype.push.call(Cb, u);
          var Db = A.name.toLowerCase();
          v = Cb;
          var B = u.position;
          m.message("Could not render math with KaTeX", { ancestors: v, cause: A, place: B, ruleId: Db, source: "rehype-katex" });
          try {
            var Eb = Object.assign({}, b);
            Eb.displayMode = y, Eb.strict = "ignore", Eb.throwOnError = !1;
            var Fb = katex.renderToString(z, Eb);
            zb = fromHtmlIsomorphic(Fb, { fragment: !0 }).children;
          } catch {
            var Gb = b.errorColor;
            Gb = Gb || "#cc0000";
            var Mb = "color:" + Gb;
            zb = [{ type: "element", tagName: "span", properties: { className: ["katex-error"], style: Mb, title: A + "" }, children: [{ type: "text", value: z }] }];
          }
        }
        Mb = w.children, u = [+Mb.indexOf(x) | 0, 1], v = +zb.length | 0;
        for (var Nb = 0; Nb < v; )
          Array.prototype.push.call(u, zb[Nb]), Nb += 1;
        return Mb.splice.apply(Mb, u), SKIP;
      }
    });
  };
};
export {
  a as default
};
