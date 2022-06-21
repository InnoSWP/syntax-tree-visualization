"use strict";
ace.define("ace/mode/abc_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { this.$rules = { start: [{ token: ["zupfnoter.information.comment.line.percentage", "information.keyword", "in formation.keyword.embedded"], regex: "(%%%%)(hn\\.[a-z]*)(.*)", comment: "Instruction Comment" }, { token: ["information.comment.line.percentage", "information.keyword.embedded"], regex: "(%%)(.*)", comment: "Instruction Comment" }, { token: "comment.line.percentage", regex: "%.*", comment: "Comments" }, { token: "barline.keyword.operator", regex: "[\\[:]*[|:][|\\]:]*(?:\\[?[0-9]+)?|\\[[0-9]+", comment: "Bar lines" }, { token: ["information.keyword.embedded", "information.argument.string.unquoted"], regex: "(\\[[A-Za-z]:)([^\\]]*\\])", comment: "embedded Header lines" }, { token: ["information.keyword", "information.argument.string.unquoted"], regex: "^([A-Za-z]:)([^%\\\\]*)", comment: "Header lines" }, { token: ["text", "entity.name.function", "string.unquoted", "text"], regex: "(\\[)([A-Z]:)(.*?)(\\])", comment: "Inline fields" }, { token: ["accent.constant.language", "pitch.constant.numeric", "duration.constant.numeric"], regex: "([\\^=_]*)([A-Ga-gz][,']*)([0-9]*/*[><0-9]*)", comment: "Notes" }, { token: "zupfnoter.jumptarget.string.quoted", regex: '[\\"!]\\^\\:.*?[\\"!]', comment: "Zupfnoter jumptarget" }, { token: "zupfnoter.goto.string.quoted", regex: '[\\"!]\\^\\@.*?[\\"!]', comment: "Zupfnoter goto" }, { token: "zupfnoter.annotation.string.quoted", regex: '[\\"!]\\^\\!.*?[\\"!]', comment: "Zupfnoter annoation" }, { token: "zupfnoter.annotationref.string.quoted", regex: '[\\"!]\\^\\#.*?[\\"!]', comment: "Zupfnoter annotation reference" }, { token: "chordname.string.quoted", regex: '[\\"!]\\^.*?[\\"!]', comment: "abc chord" }, { token: "string.quoted", regex: '[\\"!].*?[\\"!]', comment: "abc annotation" }] }, this.normalizeRules(); };
    s.metaData = { fileTypes: ["abc"], name: "ABC", scopeName: "text.abcnotation" }, r.inherits(s, i), t.ABCHighlightRules = s;
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
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
}), ace.define("ace/mode/abc", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/abc_highlight_rules", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./abc_highlight_rules").ABCHighlightRules, o = e("./folding/cstyle").FoldMode, u = function () { this.HighlightRules = s, this.foldingRules = new o, this.$behaviour = this.$defaultBehaviour; };
    r.inherits(u, i), function () { this.lineCommentStart = "%", this.$id = "ace/mode/abc", this.snippetFileId = "ace/snippets/abc"; }.call(u.prototype), t.Mode = u;
});
(function () {
    ace.require(["ace/mode/abc"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
