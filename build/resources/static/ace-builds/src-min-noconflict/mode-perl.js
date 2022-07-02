"use strict";
ace.define("ace/mode/perl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function () { var e = "base|constant|continue|else|elsif|for|foreach|format|goto|if|last|local|my|next|no|package|parent|redo|require|scalar|sub|unless|until|while|use|vars", t = "ARGV|ENV|INC|SIG", n = "getprotobynumber|getprotobyname|getservbyname|gethostbyaddr|gethostbyname|getservbyport|getnetbyaddr|getnetbyname|getsockname|getpeername|setpriority|getprotoent|setprotoent|getpriority|endprotoent|getservent|setservent|endservent|sethostent|socketpair|getsockopt|gethostent|endhostent|setsockopt|setnetent|quotemeta|localtime|prototype|getnetent|endnetent|rewinddir|wantarray|getpwuid|closedir|getlogin|readlink|endgrent|getgrgid|getgrnam|shmwrite|shutdown|readline|endpwent|setgrent|readpipe|formline|truncate|dbmclose|syswrite|setpwent|getpwnam|getgrent|getpwent|ucfirst|sysread|setpgrp|shmread|sysseek|sysopen|telldir|defined|opendir|connect|lcfirst|getppid|binmode|syscall|sprintf|getpgrp|readdir|seekdir|waitpid|reverse|unshift|symlink|dbmopen|semget|msgrcv|rename|listen|chroot|msgsnd|shmctl|accept|unpack|exists|fileno|shmget|system|unlink|printf|gmtime|msgctl|semctl|values|rindex|substr|splice|length|msgget|select|socket|return|caller|delete|alarm|ioctl|index|undef|lstat|times|srand|chown|fcntl|close|write|umask|rmdir|study|sleep|chomp|untie|print|utime|mkdir|atan2|split|crypt|flock|chmod|BEGIN|bless|chdir|semop|shift|reset|link|stat|chop|grep|fork|dump|join|open|tell|pipe|exit|glob|warn|each|bind|sort|pack|eval|push|keys|getc|kill|seek|sqrt|send|wait|rand|tied|read|time|exec|recv|eof|chr|int|ord|exp|pos|pop|sin|log|abs|oct|hex|tie|cos|vec|END|ref|map|die|uc|lc|do", r = this.createKeywordMapper({ keyword: e, "constant.language": t, "support.function": n }, "identifier"); this.$rules = { start: [{ token: "comment.doc", regex: "^=(?:begin|item)\\b", next: "block_comment" }, { token: "string.regexp", regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)" }, { token: "string", regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' }, { token: "string", regex: '["].*\\\\$', next: "qqstring" }, { token: "string", regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']" }, { token: "string", regex: "['].*\\\\$", next: "qstring" }, { token: "constant.numeric", regex: "0x[0-9a-fA-F]+\\b" }, { token: "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b" }, { token: r, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }, { token: "keyword.operator", regex: "%#|\\$#|\\.\\.\\.|\\|\\|=|>>=|<<=|<=>|&&=|=>|!~|\\^=|&=|\\|=|\\.=|x=|%=|\\/=|\\*=|\\-=|\\+=|=~|\\*\\*|\\-\\-|\\.\\.|\\|\\||&&|\\+\\+|\\->|!=|==|>=|<=|>>|<<|,|=|\\?\\:|\\^|\\||x|%|\\/|\\*|<|&|\\\\|~|!|>|\\.|\\-|\\+|\\-C|\\-b|\\-S|\\-u|\\-t|\\-p|\\-l|\\-d|\\-f|\\-g|\\-s|\\-z|\\-k|\\-e|\\-O|\\-T|\\-B|\\-M|\\-A|\\-X|\\-W|\\-c|\\-R|\\-o|\\-x|\\-w|\\-r|\\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)" }, { token: "comment", regex: "#.*$" }, { token: "lparen", regex: "[[({]" }, { token: "rparen", regex: "[\\])}]" }, { token: "text", regex: "\\s+" }], qqstring: [{ token: "string", regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"', next: "start" }, { token: "string", regex: ".+" }], qstring: [{ token: "string", regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'", next: "start" }, { token: "string", regex: ".+" }], block_comment: [{ token: "comment.doc", regex: "^=cut\\b", next: "start" }, { defaultToken: "comment.doc" }] }; };
    r.inherits(s, i), t.PerlHighlightRules = s;
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
}), ace.define("ace/mode/perl", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/perl_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/folding/cstyle"], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./perl_highlight_rules").PerlHighlightRules, o = e("./matching_brace_outdent").MatchingBraceOutdent, u = e("./folding/cstyle").FoldMode, a = function () { this.HighlightRules = s, this.$outdent = new o, this.foldingRules = new u({ start: "^=(begin|item)\\b", end: "^=(cut)\\b" }), this.$behaviour = this.$defaultBehaviour; };
    r.inherits(a, i), function () { this.lineCommentStart = "#", this.blockComment = [{ start: "=begin", end: "=cut", lineStartOnly: !0 }, { start: "=item", end: "=cut", lineStartOnly: !0 }], this.getNextLineIndent = function (e, t, n) { var r = this.$getIndent(t), i = this.getTokenizer().getLineTokens(t, e), s = i.tokens; if (s.length && s[s.length - 1].type == "comment")
        return r; if (e == "start") {
        var o = t.match(/^.*[\{\(\[:]\s*$/);
        o && (r += n);
    } return r; }, this.checkOutdent = function (e, t, n) { return this.$outdent.checkOutdent(t, n); }, this.autoOutdent = function (e, t, n) { this.$outdent.autoOutdent(t, n); }, this.$id = "ace/mode/perl", this.snippetFileId = "ace/snippets/perl"; }.call(a.prototype), t.Mode = a;
});
(function () {
    ace.require(["ace/mode/perl"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
