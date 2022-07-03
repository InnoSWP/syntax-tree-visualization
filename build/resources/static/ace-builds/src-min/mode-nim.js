"use strict";
define("ace/mode/nim_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { var e = this.createKeywordMapper({ variable: "var|let|const", keyword: "assert|parallel|spawn|export|include|from|template|mixin|bind|import|concept|raise|defer|try|finally|except|converter|proc|func|macro|method|and|or|not|xor|shl|shr|div|mod|in|notin|is|isnot|of|static|if|elif|else|case|of|discard|when|return|yield|block|break|while|echo|continue|asm|using|cast|addr|unsafeAddr|type|ref|ptr|do|declared|defined|definedInScope|compiles|sizeOf|is|shallowCopy|getAst|astToStr|spawn|procCall|for|iterator|as", "storage.type": "newSeq|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|char|bool|string|set|pointer|float32|float64|enum|object|cstring|array|seq|openArray|varargs|UncheckedArray|tuple|set|distinct|void|auto|openarray|range", "support.function": "lock|ze|toU8|toU16|toU32|ord|low|len|high|add|pop|contains|card|incl|excl|dealloc|inc", "constant.language": "nil|true|false" }, "identifier"), t = "(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)", n = "(?:[0-9][\\d_]*)", r = "(?:0o[0-7][0-7_]*)", i = "(?:0[bB][01][01_]*)", s = "(?:" + t + "|" + n + "|" + r + "|" + i + ")(?:'?[iIuU](?:8|16|32|64)|u)?\\b", o = "(?:[eE][+-]?[\\d][\\d_]*)", u = "(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)" + o + "?)|" + o + ")", a = "(?:" + t + "(?:'(?:(?:[fF](?:32|64)?)|[dD])))|(?:" + u + "|" + n + "|" + r + "|" + i + ")(?:'(?:(?:[fF](?:32|64)?)|[dD]))", f = "\\\\([abeprcnlftv\\\"']|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})", l = "[a-zA-Z][a-zA-Z0-9_]*"; this.$rules = { start: [{ token: ["identifier", "keyword.operator", "support.function"], regex: "(" + l + ")([.]{1})(" + l + ")(?=\\()" }, { token: "paren.lparen", regex: "(\\{\\.)", next: [{ token: "paren.rparen", regex: "(\\.\\}|\\})", next: "start" }, { include: "methods" }, { token: "identifier", regex: l }, { token: "punctuation", regex: /[,]/ }, { token: "keyword.operator", regex: /[=:.]/ }, { token: "paren.lparen", regex: /[[(]/ }, { token: "paren.rparen", regex: /[\])]/ }, { include: "math" }, { include: "strings" }, { defaultToken: "text" }] }, { token: "comment.doc.start", regex: /##\[(?!])/, push: "docBlockComment" }, { token: "comment.start", regex: /#\[(?!])/, push: "blockComment" }, { token: "comment.doc", regex: "##.*$" }, { token: "comment", regex: "#.*$" }, { include: "strings" }, { token: "string", regex: "'(?:\\\\(?:[abercnlftv]|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})|.{1})?'" }, { include: "methods" }, { token: e, regex: "[a-zA-Z][a-zA-Z0-9_]*\\b" }, { token: ["keyword.operator", "text", "storage.type"], regex: "([:])(\\s+)(" + l + ")(?=$|\\)|\\[|,|\\s+=|;|\\s+\\{)" }, { token: "paren.lparen", regex: /\[\.|{\||\(\.|\[:|[[({`]/ }, { token: "paren.rparen", regex: /\.\)|\|}|\.]|[\])}]/ }, { token: "keyword.operator", regex: /[=+\-*\/<>@$~&%|!?^.:\\]/ }, { token: "punctuation", regex: /[,;]/ }, { include: "math" }], blockComment: [{ regex: /#\[]/, token: "comment" }, { regex: /#\[(?!])/, token: "comment.start", push: "blockComment" }, { regex: /]#/, token: "comment.end", next: "pop" }, { defaultToken: "comment" }], docBlockComment: [{ regex: /##\[]/, token: "comment.doc" }, { regex: /##\[(?!])/, token: "comment.doc.start", push: "docBlockComment" }, { regex: /]##/, token: "comment.doc.end", next: "pop" }, { defaultToken: "comment.doc" }], math: [{ token: "constant.float", regex: a }, { token: "constant.float", regex: u }, { token: "constant.integer", regex: s }], methods: [{ token: "support.function", regex: "(\\w+)(?=\\()" }], strings: [{ token: "string", regex: "(\\b" + l + ')?"""', push: [{ token: "string", regex: '"""', next: "pop" }, { defaultToken: "string" }] }, { token: "string", regex: "\\b" + l + '"(?=.)', push: [{ token: "string", regex: '"|$', next: "pop" }, { defaultToken: "string" }] }, { token: "string", regex: '"', push: [{ token: "string", regex: '"|$', next: "pop" }, { token: "constant.language.escape", regex: f }, { defaultToken: "string" }] }] }, this.normalizeRules(); };
    r.inherits(s, i), t.NimHighlightRules = s;
}), define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
    "use strict";
    var r = e("../../lib/oop"), i = e("../../range").Range, s = e("./fold_mode").FoldMode, o = t.FoldMode = function (e) { e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end))); };
    r.inherits(o, s), function () { this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) { var r = e.getLine(n); if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r))
        return ""; var i = this._getFoldWidgetBase(e, t, n); return !i && this.startRegionRe.test(r) ? "start" : i; }, this.getFoldWidgetRange = function (e, t, n, r) { var i = e.getLine(n); if (this.startRegionRe.test(i))
        return this.getCommentRegionBlock(e, i, n); var s = i.match(this.foldingStartMarker); if (s) {
        var o = s.index;
        if (s[1])
            return this.openingBracketBlock(e, s[1], n, o);
        var u = e.getCommentFoldRange(n, o + s[0].length, 1);
        return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u;
    } if (t === "markbegin")
        return; var s = i.match(this.foldingStopMarker); if (s) {
        var o = s.index + s[0].length;
        return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1);
    } }, this.getSectionRange = function (e, t) { var n = e.getLine(t), r = n.search(/\S/), s = t, o = n.length; t += 1; var u = t, a = e.getLength(); while (++t < a) {
        n = e.getLine(t);
        var f = n.search(/\S/);
        if (f === -1)
            continue;
        if (r > f)
            break;
        var l = this.getFoldWidgetRange(e, "all", t);
        if (l) {
            if (l.start.row <= s)
                break;
            if (l.isMultiLine())
                t = l.end.row;
            else if (r == f)
                break;
        }
        u = t;
    } return new i(s, o, u, e.getLine(u).length); }, this.getCommentRegionBlock = function (e, t, n) { var r = t.search(/\s*$/), s = e.getLength(), o = n, u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, a = 1; while (++n < s) {
        t = e.getLine(n);
        var f = u.exec(t);
        if (!f)
            continue;
        f[1] ? a-- : a++;
        if (!a)
            break;
    } var l = n; if (l > o)
        return new i(o, r, l, t.length); }; }.call(o.prototype);
}), define("ace/mode/nim", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/nim_highlight_rules", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./nim_highlight_rules").NimHighlightRules, o = e("./folding/cstyle").FoldMode, u = function () { i.call(this), this.HighlightRules = s, this.foldingRules = new o, this.$behaviour = this.$defaultBehaviour; };
    r.inherits(u, i), function () { this.lineCommentStart = "#", this.blockComment = { start: "#[", end: "]#", nestable: !0 }, this.$id = "ace/mode/nim"; }.call(u.prototype), t.Mode = u;
});
(function () {
    window.require(["ace/mode/nim"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
