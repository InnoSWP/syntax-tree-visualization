"use strict";
ace.define("ace/mode/cobol_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { var e = "ACCEPT|MERGE|SUM|ADD||MESSAGE|TABLE|ADVANCING|MODE|TAPE|AFTER|MULTIPLY|TEST|ALL|NEGATIVE|TEXT|ALPHABET|NEXT|THAN|ALSO|NO|THEN|ALTERNATE|NOT|THROUGH|AND|NUMBER|THRU|ANY|OCCURS|TIME|ARE|OF|TO|AREA|OFF|TOP||ASCENDING|OMITTED|TRUE|ASSIGN|ON|TYPE|AT|OPEN|UNIT|AUTHOR|OR|UNTIL|BEFORE|OTHER|UP|BLANK|OUTPUT|USE|BLOCK|PAGE|USING|BOTTOM|PERFORM|VALUE|BY|PIC|VALUES|CALL|PICTURE|WHEN|CANCEL|PLUS|WITH|CD|POINTER|WRITE|CHARACTER|POSITION||ZERO|CLOSE|POSITIVE|ZEROS|COLUMN|PROCEDURE|ZEROES|COMMA|PROGRAM|COMMON|PROGRAM-ID|COMMUNICATION|QUOTE|COMP|RANDOM|COMPUTE|READ|CONTAINS|RECEIVE|CONFIGURATION|RECORD|CONTINUE|REDEFINES|CONTROL|REFERENCE|COPY|REMAINDER|COUNT|REPLACE|DATA|REPORT|DATE|RESERVE|DAY|RESET|DELETE|RETURN|DESTINATION|REWIND|DISABLE|REWRITE|DISPLAY|RIGHT|DIVIDE|RUN|DOWN|SAME|ELSE|SEARCH|ENABLE|SECTION|END|SELECT|ENVIRONMENT|SENTENCE|EQUAL|SET|ERROR|SIGN|EXIT|SEQUENTIAL|EXTERNAL|SIZE|FLASE|SORT|FILE|SOURCE|LENGTH|SPACE|LESS|STANDARD|LIMIT|START|LINE|STOP|LOCK|STRING|LOW-VALUE|SUBTRACT", t = "true|false|null", n = "count|min|max|avg|sum|rank|now|coalesce|main", r = this.createKeywordMapper({ "support.function": n, keyword: e, "constant.language": t }, "identifier", !0); this.$rules = { start: [{ token: "comment", regex: "\\*.*$" }, { token: "string", regex: '".*?"' }, { token: "string", regex: "'.*?'" }, { token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b" }, { token: r, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }, { token: "keyword.operator", regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=" }, { token: "paren.lparen", regex: "[\\(]" }, { token: "paren.rparen", regex: "[\\)]" }, { token: "text", regex: "\\s+" }] }; };
    r.inherits(s, i), t.CobolHighlightRules = s;
}), ace.define("ace/mode/cobol", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/cobol_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./cobol_highlight_rules").CobolHighlightRules, o = function () { this.HighlightRules = s, this.$behaviour = this.$defaultBehaviour; };
    r.inherits(o, i), function () { this.lineCommentStart = "*", this.$id = "ace/mode/cobol"; }.call(o.prototype), t.Mode = o;
});
(function () {
    ace.require(["ace/mode/cobol"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
