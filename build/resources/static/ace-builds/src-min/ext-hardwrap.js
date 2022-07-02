"use strict";
define("ace/ext/hardwrap", ["require", "exports", "module", "ace/range", "ace/editor", "ace/config"], function (e, t, n) {
    "use strict";
    function i(e, t) { function m(e, t, n) { if (e.length < t)
        return; var r = e.slice(0, t), i = e.slice(t), s = /^(?:(\s+)|(\S+)(\s+))/.exec(i), o = /(?:(\s+)|(\s+)(\S+))$/.exec(r), u = 0, a = 0; o && !o[2] && (u = t - o[1].length, a = t), s && !s[2] && (u || (u = t), a = t + s[1].length); if (u)
        return { start: u, end: a }; if (o && o[2] && o.index > n)
        return { start: o.index, end: o.index + o[2].length }; if (s && s[2])
        return u = t + s[2].length, { start: u, end: u + s[3].length }; } var n = t.column || e.getOption("printMarginColumn"), i = t.allowMerge != 0, s = Math.min(t.startRow, t.endRow), o = Math.max(t.startRow, t.endRow), u = e.session; while (s <= o) {
        var a = u.getLine(s);
        if (a.length > n) {
            var f = m(a, n, 5);
            if (f) {
                var l = /^\s*/.exec(a)[0];
                u.replace(new r(s, f.start, s, f.end), "\n" + l);
            }
            o++;
        }
        else if (i && /\S/.test(a) && s != o) {
            var c = u.getLine(s + 1);
            if (c && /\S/.test(c)) {
                var h = a.replace(/\s+$/, ""), p = c.replace(/^\s+/, ""), d = h + " " + p, f = m(d, n, 5);
                if (f && f.start > h.length || d.length < n) {
                    var v = new r(s, h.length, s + 1, c.length - p.length);
                    u.replace(v, " "), s--, o--;
                }
                else
                    h.length < a.length && u.remove(new r(s, h.length, s, a.length));
            }
        }
        s++;
    } }
    function s(e) { if (e.command.name == "insertstring" && /\S/.test(e.args)) {
        var t = e.editor, n = t.selection.cursor;
        if (n.column <= t.renderer.$printMarginColumn)
            return;
        var r = t.session.$undoManager.$lastDelta;
        i(t, { startRow: n.row, endRow: n.row, allowMerge: !1 }), r != t.session.$undoManager.$lastDelta && t.session.markUndoGroup();
    } }
    var r = e("../range").Range, o = e("../editor").Editor;
    e("../config").defineOptions(o.prototype, "editor", { hardWrap: { set: function (e) { e ? this.commands.on("afterExec", s) : this.commands.off("afterExec", s); }, value: !1 } }), t.hardWrap = i;
});
(function () {
    window.require(["ace/ext/hardwrap"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
