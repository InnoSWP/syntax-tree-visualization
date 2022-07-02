"use strict";
define("ace/mode/pig_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { this.$rules = { start: [{ token: "comment.block.pig", regex: /\/\*/, push: [{ token: "comment.block.pig", regex: /\*\//, next: "pop" }, { defaultToken: "comment.block.pig" }] }, { token: "comment.line.double-dash.asciidoc", regex: /--.*$/ }, { token: "keyword.control.pig", regex: /\b(?:ASSERT|LOAD|STORE|DUMP|FILTER|DISTINCT|FOREACH|GENERATE|STREAM|JOIN|COGROUP|GROUP|CROSS|ORDER|LIMIT|UNION|SPLIT|DESCRIBE|EXPLAIN|ILLUSTRATE|AS|BY|INTO|USING|LIMIT|PARALLEL|OUTER|INNER|DEFAULT|LEFT|SAMPLE|RANK|CUBE|ALL|KILL|QUIT|MAPREDUCE|ASC|DESC|THROUGH|SHIP|CACHE|DECLARE|CASE|WHEN|THEN|END|IN|PARTITION|FULL|IMPORT|IF|ONSCHEMA|INPUT|OUTPUT)\b/, caseInsensitive: !0 }, { token: "storage.datatypes.pig", regex: /\b(?:int|long|float|double|chararray|bytearray|boolean|datetime|biginteger|bigdecimal|tuple|bag|map)\b/, caseInsensitive: !0 }, { token: "support.function.storage.pig", regex: /\b(?:PigStorage|BinStorage|BinaryStorage|PigDump|HBaseStorage|JsonLoader|JsonStorage|AvroStorage|TextLoader|PigStreaming|TrevniStorage|AccumuloStorage)\b/ }, { token: "support.function.udf.pig", regex: /\b(?:DIFF|TOBAG|TOMAP|TOP|TOTUPLE|RANDOM|FLATTEN|flatten|CUBE|ROLLUP|IsEmpty|ARITY|PluckTuple|SUBTRACT|BagToString)\b/ }, { token: "support.function.udf.math.pig", regex: /\b(?:ABS|ACOS|ASIN|ATAN|CBRT|CEIL|COS|COSH|EXP|FLOOR|LOG|LOG10|ROUND|ROUND_TO|SIN|SINH|SQRT|TAN|TANH|AVG|COUNT|COUNT_STAR|MAX|MIN|SUM|COR|COV)\b/ }, { token: "support.function.udf.string.pig", regex: /\b(?:CONCAT|INDEXOF|LAST_INDEX_OF|LCFIRST|LOWER|REGEX_EXTRACT|REGEX_EXTRACT_ALL|REPLACE|SIZE|STRSPLIT|SUBSTRING|TOKENIZE|TRIM|UCFIRST|UPPER|LTRIM|RTRIM|ENDSWITH|STARTSWITH|TRIM)\b/ }, { token: "support.function.udf.datetime.pig", regex: /\b(?:AddDuration|CurrentTime|DaysBetween|GetDay|GetHour|GetMilliSecond|GetMinute|GetMonth|GetSecond|GetWeek|GetWeekYear|GetYear|HoursBetween|MilliSecondsBetween|MinutesBetween|MonthsBetween|SecondsBetween|SubtractDuration|ToDate|WeeksBetween|YearsBetween|ToMilliSeconds|ToString|ToUnixTime)\b/ }, { token: "support.function.command.pig", regex: /\b(?:cat|cd|copyFromLocal|copyToLocal|cp|ls|mkdir|mv|pwd|rm)\b/ }, { token: "variable.pig", regex: /\$[a_zA-Z0-9_]+/ }, { token: "constant.language.pig", regex: /\b(?:NULL|true|false|stdin|stdout|stderr)\b/, caseInsensitive: !0 }, { token: "constant.numeric.pig", regex: /\b\d+(?:\.\d+)?\b/ }, { token: "keyword.operator.comparison.pig", regex: /!=|==|<|>|<=|>=|\b(?:MATCHES|IS|OR|AND|NOT)\b/, caseInsensitive: !0 }, { token: "keyword.operator.arithmetic.pig", regex: /\+|\-|\*|\/|\%|\?|:|::|\.\.|#/ }, { token: "string.quoted.double.pig", regex: /"/, push: [{ token: "string.quoted.double.pig", regex: /"/, next: "pop" }, { token: "constant.character.escape.pig", regex: /\\./ }, { defaultToken: "string.quoted.double.pig" }] }, { token: "string.quoted.single.pig", regex: /'/, push: [{ token: "string.quoted.single.pig", regex: /'/, next: "pop" }, { token: "constant.character.escape.pig", regex: /\\./ }, { defaultToken: "string.quoted.single.pig" }] }, { todo: { token: ["text", "keyword.parameter.pig", "text", "storage.type.parameter.pig"], regex: /^(\s*)(set)(\s+)(\S+)/, caseInsensitive: !0, push: [{ token: "text", regex: /$/, next: "pop" }, { include: "$self" }] } }, { token: ["text", "keyword.alias.pig", "text", "storage.type.alias.pig"], regex: /(\s*)(DEFINE|DECLARE|REGISTER)(\s+)(\S+)/, caseInsensitive: !0, push: [{ token: "text", regex: /;?$/, next: "pop" }] }] }, this.normalizeRules(); };
    s.metaData = { fileTypes: ["pig"], name: "Pig", scopeName: "source.pig" }, r.inherits(s, i), t.PigHighlightRules = s;
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
}), define("ace/mode/pig", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/pig_highlight_rules", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./pig_highlight_rules").PigHighlightRules, o = e("./folding/cstyle").FoldMode, u = function () { this.HighlightRules = s, this.foldingRules = new o; };
    r.inherits(u, i), function () { this.lineCommentStart = "--", this.blockComment = { start: "/*", end: "*/" }, this.$id = "ace/mode/pig"; }.call(u.prototype), t.Mode = u;
});
(function () {
    window.require(["ace/mode/pig"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
