"use strict";
ace.define("ace/ext/beautify", ["require", "exports", "module", "ace/token_iterator"], function (e, t, n) {
    "use strict";
    function i(e, t) { return e.type.lastIndexOf(t + ".xml") > -1; }
    var r = e("../token_iterator").TokenIterator;
    t.singletonTags = ["area", "base", "br", "col", "command", "embed", "hr", "html", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], t.blockTags = ["article", "aside", "blockquote", "body", "div", "dl", "fieldset", "footer", "form", "head", "header", "html", "nav", "ol", "p", "script", "section", "style", "table", "tbody", "tfoot", "thead", "ul"], t.formatOptions = { lineBreaksAfterCommasInCurlyBlock: !0 }, t.beautify = function (e) { var n = new r(e, 0, 0), s = n.getCurrentToken(), o = e.getTabString(), u = t.singletonTags, a = t.blockTags, f = t.formatOptions || {}, l, c = !1, h = !1, p = !1, d = "", v = "", m = "", g = 0, y = 0, b = 0, w = 0, E = 0, S = 0, x = 0, T, N = 0, C = 0, k = [], L = !1, A, O = !1, M = !1, _ = !1, D = !1, P = { 0: 0 }, H = [], B = !1, j = function () { l && l.value && l.type !== "string.regexp" && (l.value = l.value.replace(/^\s*/, "")); }, F = function () { var e = d.length - 1; for (;;) {
        if (e == 0)
            break;
        if (d[e] !== " ")
            break;
        e -= 1;
    } d = d.slice(0, e + 1); }, I = function () { d = d.trimRight(), c = !1; }; while (s !== null) {
        N = n.getCurrentTokenRow(), k = n.$rowTokens, l = n.stepForward();
        if (typeof s != "undefined") {
            v = s.value, E = 0, _ = m === "style" || e.$modeId === "ace/mode/css", i(s, "tag-open") ? (M = !0, l && (D = a.indexOf(l.value) !== -1), v === "</" && (D && !c && C < 1 && C++, _ && (C = 1), E = 1, D = !1)) : i(s, "tag-close") ? M = !1 : i(s, "comment.start") ? D = !0 : i(s, "comment.end") && (D = !1), !M && !C && s.type === "paren.rparen" && s.value.substr(0, 1) === "}" && C++, N !== T && (C = N, T && (C -= T));
            if (C) {
                I();
                for (; C > 0; C--)
                    d += "\n";
                c = !0, !i(s, "comment") && !s.type.match(/^(comment|string)$/) && (v = v.trimLeft());
            }
            if (v) {
                s.type === "keyword" && v.match(/^(if|else|elseif|for|foreach|while|switch)$/) ? (H[g] = v, j(), p = !0, v.match(/^(else|elseif)$/) && d.match(/\}[\s]*$/) && (I(), h = !0)) : s.type === "paren.lparen" ? (j(), v.substr(-1) === "{" && (p = !0, O = !1, M || (C = 1)), v.substr(0, 1) === "{" && (h = !0, d.substr(-1) !== "[" && d.trimRight().substr(-1) === "[" ? (I(), h = !1) : d.trimRight().substr(-1) === ")" ? I() : F())) : s.type === "paren.rparen" ? (E = 1, v.substr(0, 1) === "}" && (H[g - 1] === "case" && E++, d.trimRight().substr(-1) === "{" ? I() : (h = !0, _ && (C += 2))), v.substr(0, 1) === "]" && d.substr(-1) !== "}" && d.trimRight().substr(-1) === "}" && (h = !1, w++, I()), v.substr(0, 1) === ")" && d.substr(-1) !== "(" && d.trimRight().substr(-1) === "(" && (h = !1, w++, I()), F()) : s.type !== "keyword.operator" && s.type !== "keyword" || !v.match(/^(=|==|===|!=|!==|&&|\|\||and|or|xor|\+=|.=|>|>=|<|<=|=>)$/) ? s.type === "punctuation.operator" && v === ";" ? (I(), j(), p = !0, _ && C++) : s.type === "punctuation.operator" && v.match(/^(:|,)$/) ? (I(), j(), v.match(/^(,)$/) && x > 0 && S === 0 && f.lineBreaksAfterCommasInCurlyBlock ? C++ : (p = !0, c = !1)) : s.type === "support.php_tag" && v === "?>" && !c ? (I(), h = !0) : i(s, "attribute-name") && d.substr(-1).match(/^\s$/) ? h = !0 : i(s, "attribute-equals") ? (F(), j()) : i(s, "tag-close") ? (F(), v === "/>" && (h = !0)) : s.type === "keyword" && v.match(/^(case|default)$/) && B && (E = 1) : (I(), j(), h = !0, p = !0);
                if (c && (!s.type.match(/^(comment)$/) || !!v.substr(0, 1).match(/^[/#]$/)) && (!s.type.match(/^(string)$/) || !!v.substr(0, 1).match(/^['"@]$/))) {
                    w = b;
                    if (g > y) {
                        w++;
                        for (A = g; A > y; A--)
                            P[A] = w;
                    }
                    else
                        g < y && (w = P[g]);
                    y = g, b = w, E && (w -= E), O && !S && (w++, O = !1);
                    for (A = 0; A < w; A++)
                        d += o;
                }
                s.type === "keyword" && v.match(/^(case|default)$/) ? B === !1 && (H[g] = v, g++, B = !0) : s.type === "keyword" && v.match(/^(break)$/) && H[g - 1] && H[g - 1].match(/^(case|default)$/) && (g--, B = !1), s.type === "paren.lparen" && (S += (v.match(/\(/g) || []).length, x += (v.match(/\{/g) || []).length, g += v.length), s.type === "keyword" && v.match(/^(if|else|elseif|for|while)$/) ? (O = !0, S = 0) : !S && v.trim() && s.type !== "comment" && (O = !1);
                if (s.type === "paren.rparen") {
                    S -= (v.match(/\)/g) || []).length, x -= (v.match(/\}/g) || []).length;
                    for (A = 0; A < v.length; A++)
                        g--, v.substr(A, 1) === "}" && H[g] === "case" && g--;
                }
                s.type == "text" && (v = v.replace(/\s+$/, " ")), h && !c && (F(), d.substr(-1) !== "\n" && (d += " ")), d += v, p && (d += " "), c = !1, h = !1, p = !1;
                if (i(s, "tag-close") && (D || a.indexOf(m) !== -1) || i(s, "doctype") && v === ">")
                    D && l && l.value === "</" ? C = -1 : C = 1;
                l && u.indexOf(l.value) === -1 && (i(s, "tag-open") && v === "</" ? g-- : i(s, "tag-open") && v === "<" ? g++ : i(s, "tag-close") && v === "/>" && g--), i(s, "tag-name") && (m = v), T = N;
            }
        }
        s = l;
    } d = d.trim(), e.doc.setValue(d); }, t.commands = [{ name: "beautify", description: "Format selection (Beautify)", exec: function (e) { t.beautify(e.session); }, bindKey: "Ctrl-Shift-B" }];
});
(function () {
    ace.require(["ace/ext/beautify"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
