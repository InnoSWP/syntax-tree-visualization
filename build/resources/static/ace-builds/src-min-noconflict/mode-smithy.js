"use strict";
ace.define("ace/mode/smithy_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { this.$rules = { start: [{ include: "#comment" }, { token: ["meta.keyword.statement.smithy", "variable.other.smithy", "text", "keyword.operator.smithy"], regex: /^(\$)(\s+.+)(\s*)(=)/ }, { token: ["keyword.statement.smithy", "text", "entity.name.type.namespace.smithy"], regex: /^(namespace)(\s+)([A-Z-a-z0-9_\.#$-]+)/ }, { token: ["keyword.statement.smithy", "text", "keyword.statement.smithy", "text", "entity.name.type.smithy"], regex: /^(use)(\s+)(shape|trait)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/ }, { token: ["keyword.statement.smithy", "variable.other.smithy", "text", "keyword.operator.smithy"], regex: /^(metadata)(\s+.+)(\s*)(=)/ }, { token: ["keyword.statement.smithy", "text", "entity.name.type.smithy"], regex: /^(apply|byte|short|integer|long|float|double|bigInteger|bigDecimal|boolean|blob|string|timestamp|service|resource|trait|list|map|set|structure|union|document)(\s+)([A-Z-a-z0-9_\.#$-]+)\b/ }, { token: ["keyword.operator.smithy", "text", "entity.name.type.smithy", "text", "text", "support.function.smithy", "text", "text", "support.function.smithy"], regex: /^(operation)(\s+)([A-Z-a-z0-9_\.#$-]+)(\(.*\))(?:(\s*)(->)(\s*[A-Z-a-z0-9_\.#$-]+))?(?:(\s+)(errors))?/ }, { include: "#trait" }, { token: ["support.type.property-name.smithy", "punctuation.separator.dictionary.pair.smithy"], regex: /([A-Z-a-z0-9_\.#$-]+)(:)/ }, { include: "#value" }, { token: "keyword.other.smithy", regex: /\->/ }], "#comment": [{ include: "#doc_comment" }, { include: "#line_comment" }], "#doc_comment": [{ token: "comment.block.documentation.smithy", regex: /\/\/\/.*/ }], "#line_comment": [{ token: "comment.line.double-slash.smithy", regex: /\/\/.*/ }], "#trait": [{ token: ["punctuation.definition.annotation.smithy", "storage.type.annotation.smithy"], regex: /(@)([0-9a-zA-Z\.#-]+)/ }, { token: ["punctuation.definition.annotation.smithy", "punctuation.definition.object.end.smithy", "meta.structure.smithy"], regex: /(@)([0-9a-zA-Z\.#-]+)(\()/, push: [{ token: "punctuation.definition.object.end.smithy", regex: /\)/, next: "pop" }, { include: "#value" }, { include: "#object_inner" }, { defaultToken: "meta.structure.smithy" }] }], "#value": [{ include: "#constant" }, { include: "#number" }, { include: "#string" }, { include: "#array" }, { include: "#object" }], "#array": [{ token: "punctuation.definition.array.begin.smithy", regex: /\[/, push: [{ token: "punctuation.definition.array.end.smithy", regex: /\]/, next: "pop" }, { include: "#comment" }, { include: "#value" }, { token: "punctuation.separator.array.smithy", regex: /,/ }, { token: "invalid.illegal.expected-array-separator.smithy", regex: /[^\s\]]/ }, { defaultToken: "meta.structure.array.smithy" }] }], "#constant": [{ token: "constant.language.smithy", regex: /\b(?:true|false|null)\b/ }], "#number": [{ token: "constant.numeric.smithy", regex: /-?(?:0|[1-9]\d*)(?:(?:\.\d+)?(?:[eE][+-]?\d+)?)?/ }], "#object": [{ token: "punctuation.definition.dictionary.begin.smithy", regex: /\{/, push: [{ token: "punctuation.definition.dictionary.end.smithy", regex: /\}/, next: "pop" }, { include: "#trait" }, { include: "#object_inner" }, { defaultToken: "meta.structure.dictionary.smithy" }] }], "#object_inner": [{ include: "#comment" }, { include: "#string_key" }, { token: "punctuation.separator.dictionary.key-value.smithy", regex: /:/, push: [{ token: "punctuation.separator.dictionary.pair.smithy", regex: /,|(?=\})/, next: "pop" }, { include: "#value" }, { token: "invalid.illegal.expected-dictionary-separator.smithy", regex: /[^\s,]/ }, { defaultToken: "meta.structure.dictionary.value.smithy" }] }, { token: "invalid.illegal.expected-dictionary-separator.smithy", regex: /[^\s\}]/ }], "#string_key": [{ include: "#identifier_key" }, { include: "#dquote_key" }, { include: "#squote_key" }], "#identifier_key": [{ token: "support.type.property-name.smithy", regex: /[A-Z-a-z0-9_\.#$-]+/ }], "#dquote_key": [{ include: "#dquote" }], "#squote_key": [{ include: "#squote" }], "#string": [{ include: "#textblock" }, { include: "#dquote" }, { include: "#squote" }, { include: "#identifier" }], "#textblock": [{ token: "punctuation.definition.string.begin.smithy", regex: /"""/, push: [{ token: "punctuation.definition.string.end.smithy", regex: /"""/, next: "pop" }, { token: "constant.character.escape.smithy", regex: /\\./ }, { defaultToken: "string.quoted.double.smithy" }] }], "#dquote": [{ token: "punctuation.definition.string.begin.smithy", regex: /"/, push: [{ token: "punctuation.definition.string.end.smithy", regex: /"/, next: "pop" }, { token: "constant.character.escape.smithy", regex: /\\./ }, { defaultToken: "string.quoted.double.smithy" }] }], "#squote": [{ token: "punctuation.definition.string.begin.smithy", regex: /'/, push: [{ token: "punctuation.definition.string.end.smithy", regex: /'/, next: "pop" }, { token: "constant.character.escape.smithy", regex: /\\./ }, { defaultToken: "string.quoted.single.smithy" }] }], "#identifier": [{ token: "storage.type.smithy", regex: /[A-Z-a-z_][A-Z-a-z0-9_\.#$-]*/ }] }, this.normalizeRules(); };
    s.metaData = { name: "Smithy", fileTypes: ["smithy"], scopeName: "source.smithy", foldingStartMarker: "(\\{|\\[)\\s*", foldingStopMarker: "\\s*(\\}|\\])" }, r.inherits(s, i), t.SmithyHighlightRules = s;
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";
    var r = e("../range").Range, i = function () { };
    (function () { this.checkOutdent = function (e, t) { return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1; }, this.autoOutdent = function (e, t) { var n = e.getLine(t), i = n.match(/^(\s*\})/); if (!i)
        return 0; var s = i[1].length, o = e.findMatchingBracket({ row: t, column: s }); if (!o || o.row == t)
        return 0; var u = this.$getIndent(e.getLine(o.row)); e.replace(new r(t, 0, t, s - 1), u); }, this.$getIndent = function (e) { return e.match(/^\s*/)[0]; }; }).call(i.prototype), t.MatchingBraceOutdent = i;
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
}), ace.define("ace/mode/smithy", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/smithy_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./smithy_highlight_rules").SmithyHighlightRules, o = e("./matching_brace_outdent").MatchingBraceOutdent, u = e("./behaviour/cstyle").CstyleBehaviour, a = e("./folding/cstyle").FoldMode, f = function () { this.HighlightRules = s, this.$outdent = new o, this.$behaviour = new u, this.foldingRules = new a; };
    r.inherits(f, i), function () { this.lineCommentStart = "//", this.$quotes = { '"': '"' }, this.checkOutdent = function (e, t, n) { return this.$outdent.checkOutdent(t, n); }, this.autoOutdent = function (e, t, n) { this.$outdent.autoOutdent(t, n); }, this.$id = "ace/mode/smithy"; }.call(f.prototype), t.Mode = f;
});
(function () {
    ace.require(["ace/mode/smithy"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
