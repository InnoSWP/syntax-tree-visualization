"use strict";
ace.define("ace/ext/code_lens", ["require", "exports", "module", "ace/line_widgets", "ace/lib/event", "ace/lib/lang", "ace/lib/dom", "ace/editor", "ace/config"], function (e, t, n) {
    "use strict";
    function u(e) { var t = e.$textLayer, n = t.$lenses; n && n.forEach(function (e) { e.remove(); }), t.$lenses = null; }
    function a(e, t) { var n = e & t.CHANGE_LINES || e & t.CHANGE_FULL || e & t.CHANGE_SCROLL || e & t.CHANGE_TEXT; if (!n)
        return; var r = t.session, i = t.session.lineWidgets, s = t.$textLayer, a = s.$lenses; if (!i) {
        a && u(t);
        return;
    } var f = t.$textLayer.$lines.cells, l = t.layerConfig, c = t.$padding; a || (a = s.$lenses = []); var h = 0; for (var p = 0; p < f.length; p++) {
        var d = f[p].row, v = i[d], m = v && v.lenses;
        if (!m || !m.length)
            continue;
        var g = a[h];
        g || (g = a[h] = o.buildDom(["div", { "class": "ace_codeLens" }], t.container)), g.style.height = l.lineHeight + "px", h++;
        for (var y = 0; y < m.length; y++) {
            var b = g.childNodes[2 * y];
            b || (y != 0 && g.appendChild(o.createTextNode("\u00a0|\u00a0")), b = o.buildDom(["a"], g)), b.textContent = m[y].title, b.lensCommand = m[y];
        }
        while (g.childNodes.length > 2 * y - 1)
            g.lastChild.remove();
        var w = t.$cursorLayer.getPixelPosition({ row: d, column: 0 }, !0).top - l.lineHeight * v.rowsAbove - l.offset;
        g.style.top = w + "px";
        var E = t.gutterWidth, S = r.getLine(d).search(/\S|$/);
        S == -1 && (S = 0), E += S * l.characterWidth, g.style.paddingLeft = c + E + "px";
    } while (h < a.length)
        a.pop().remove(); }
    function f(e) { if (!e.lineWidgets)
        return; var t = e.widgetManager; e.lineWidgets.forEach(function (e) { e && e.lenses && t.removeLineWidget(e); }); }
    function l(e) { e.codeLensProviders = [], e.renderer.on("afterRender", a), e.$codeLensClickHandler || (e.$codeLensClickHandler = function (t) { var n = t.target.lensCommand; if (!n)
        return; e.execCommand(n.id, n.arguments), e._emit("codeLensClick", t); }, i.addListener(e.container, "click", e.$codeLensClickHandler, e)), e.$updateLenses = function () { function o() { var r = n.selection.cursor, i = n.documentToScreenRow(r), o = n.getScrollTop(), u = t.setLenses(n, s), a = n.$undoManager && n.$undoManager.$lastDelta; if (a && a.action == "remove" && a.lines.length > 1)
        return; var f = n.documentToScreenRow(r), l = e.renderer.layerConfig.lineHeight, c = n.getScrollTop() + (f - i) * l; u == 0 && o < l / 4 && o > -l / 4 && (c = -l), n.setScrollTop(c); } var n = e.session; if (!n)
        return; n.widgetManager || (n.widgetManager = new r(n), n.widgetManager.attach(e)); var i = e.codeLensProviders.length, s = []; e.codeLensProviders.forEach(function (e) { e.provideCodeLenses(n, function (e, t) { if (e)
        return; t.forEach(function (e) { s.push(e); }), i--, i == 0 && o(); }); }); }; var n = s.delayedCall(e.$updateLenses); e.$updateLensesOnInput = function () { n.delay(250); }, e.on("input", e.$updateLensesOnInput); }
    function c(e) { e.off("input", e.$updateLensesOnInput), e.renderer.off("afterRender", a), e.$codeLensClickHandler && e.container.removeEventListener("click", e.$codeLensClickHandler); }
    var r = e("../line_widgets").LineWidgets, i = e("../lib/event"), s = e("../lib/lang"), o = e("../lib/dom");
    t.setLenses = function (e, t) { var n = Number.MAX_VALUE; return f(e), t && t.forEach(function (t) { var r = t.start.row, i = t.start.column, s = e.lineWidgets && e.lineWidgets[r]; if (!s || !s.lenses)
        s = e.widgetManager.$registerLineWidget({ rowCount: 1, rowsAbove: 1, row: r, column: i, lenses: [] }); s.lenses.push(t.command), r < n && (n = r); }), e._emit("changeFold", { data: { start: { row: n } } }), n; }, t.registerCodeLensProvider = function (e, t) { e.setOption("enableCodeLens", !0), e.codeLensProviders.push(t), e.$updateLensesOnInput(); }, t.clear = function (e) { t.setLenses(e, null); };
    var h = e("../editor").Editor;
    e("../config").defineOptions(h.prototype, "editor", { enableCodeLens: { set: function (e) { e ? l(this) : c(this); } } }), o.importCssString(".ace_codeLens {    position: absolute;    color: #aaa;    font-size: 88%;    background: inherit;    width: 100%;    display: flex;    align-items: flex-end;    pointer-events: none;}.ace_codeLens > a {    cursor: pointer;    pointer-events: auto;}.ace_codeLens > a:hover {    color: #0000ff;    text-decoration: underline;}.ace_dark > .ace_codeLens > a:hover {    color: #4e94ce;}", "codelense.css", !1);
});
(function () {
    ace.require(["ace/ext/code_lens"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
