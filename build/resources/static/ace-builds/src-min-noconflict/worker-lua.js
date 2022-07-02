"use strict";
"no use strict";
!function (e) { function t(e, t) { var n = e, r = ""; while (n) {
    var i = t[n];
    if (typeof i == "string")
        return i + r;
    if (i)
        return i.location.replace(/\/*$/, "/") + (r || i.main || i.name);
    if (i === !1)
        return "";
    var s = n.lastIndexOf("/");
    if (s === -1)
        break;
    r = n.substr(s) + r, n = n.slice(0, s);
} return e; } if (typeof e.window != "undefined" && e.document)
    return; if (e.require && e.define)
    return; e.console || (e.console = function () { var e = Array.prototype.slice.call(arguments, 0); postMessage({ type: "log", data: e }); }, e.console.error = e.console.warn = e.console.log = e.console.trace = e.console), e.window = e, e.ace = e, e.onerror = function (e, t, n, r, i) { postMessage({ type: "error", data: { message: e, data: i.data, file: t, line: n, col: r, stack: i.stack } }); }, e.normalizeModule = function (t, n) { if (n.indexOf("!") !== -1) {
    var r = n.split("!");
    return e.normalizeModule(t, r[0]) + "!" + e.normalizeModule(t, r[1]);
} if (n.charAt(0) == ".") {
    var i = t.split("/").slice(0, -1).join("/");
    n = (i ? i + "/" : "") + n;
    while (n.indexOf(".") !== -1 && s != n) {
        var s = n;
        n = n.replace(/^\.\//, "").replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
    }
} return n; }, e.require = function (r, i) { i || (i = r, r = null); if (!i.charAt)
    throw new Error("worker.js require() accepts only (parentId, id) as arguments"); i = e.normalizeModule(r, i); var s = e.require.modules[i]; if (s)
    return s.initialized || (s.initialized = !0, s.exports = s.factory().exports), s.exports; if (!e.require.tlns)
    return console.log("unable to load " + i); var o = t(i, e.require.tlns); return o.slice(-3) != ".js" && (o += ".js"), e.require.id = i, e.require.modules[i] = {}, importScripts(o), e.require(r, i); }, e.require.modules = {}, e.require.tlns = {}, e.define = function (t, n, r) { arguments.length == 2 ? (r = n, typeof t != "string" && (n = t, t = e.require.id)) : arguments.length == 1 && (r = t, n = [], t = e.require.id); if (typeof r != "function") {
    e.require.modules[t] = { exports: r, initialized: !0 };
    return;
} n.length || (n = ["require", "exports", "module"]); var i = function (n) { return e.require(t, n); }; e.require.modules[t] = { exports: {}, factory: function () { var e = this, t = r.apply(this, n.slice(0, r.length).map(function (t) { switch (t) {
        case "require": return i;
        case "exports": return e.exports;
        case "module": return e;
        default: return i(t);
    } })); return t && (e.exports = t), e; } }; }, e.define.amd = {}, require.tlns = {}, e.initBaseUrls = function (t) { for (var n in t)
    require.tlns[n] = t[n]; }, e.initSender = function () { var n = e.require("ace/lib/event_emitter").EventEmitter, r = e.require("ace/lib/oop"), i = function () { }; return function () { r.implement(this, n), this.callback = function (e, t) { postMessage({ type: "call", id: t, data: e }); }, this.emit = function (e, t) { postMessage({ type: "event", name: e, data: t }); }; }.call(i.prototype), new i; }; var n = e.main = null, r = e.sender = null; e.onmessage = function (t) { var i = t.data; if (i.event && r)
    r._signal(i.event, i.data);
else if (i.command)
    if (n[i.command])
        n[i.command].apply(n, i.args);
    else {
        if (!e[i.command])
            throw new Error("Unknown command:" + i.command);
        e[i.command].apply(e, i.args);
    }
else if (i.init) {
    e.initBaseUrls(i.tlns), r = e.sender = e.initSender();
    var s = require(i.module)[i.classname];
    n = e.main = new s(r);
} }; }(this), ace.define("ace/lib/oop", [], function (e, t, n) {
    "use strict";
    t.inherits = function (e, t) { e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }); }, t.mixin = function (e, t) { for (var n in t)
        e[n] = t[n]; return e; }, t.implement = function (e, n) { t.mixin(e, n); };
}), ace.define("ace/apply_delta", [], function (e, t, n) {
    "use strict";
    function r(e, t) { throw console.log("Invalid Delta:", e), "Invalid Delta: " + t; }
    function i(e, t) { return t.row >= 0 && t.row < e.length && t.column >= 0 && t.column <= e[t.row].length; }
    function s(e, t) { t.action != "insert" && t.action != "remove" && r(t, "delta.action must be 'insert' or 'remove'"), t.lines instanceof Array || r(t, "delta.lines must be an Array"), (!t.start || !t.end) && r(t, "delta.start/end must be an present"); var n = t.start; i(e, t.start) || r(t, "delta.start must be contained in document"); var s = t.end; t.action == "remove" && !i(e, s) && r(t, "delta.end must contained in document for 'remove' actions"); var o = s.row - n.row, u = s.column - (o == 0 ? n.column : 0); (o != t.lines.length - 1 || t.lines[o].length != u) && r(t, "delta.range must match delta lines"); }
    t.applyDelta = function (e, t, n) { var r = t.start.row, i = t.start.column, s = e[r] || ""; switch (t.action) {
        case "insert":
            var o = t.lines;
            if (o.length === 1)
                e[r] = s.substring(0, i) + t.lines[0] + s.substring(i);
            else {
                var u = [r, 1].concat(t.lines);
                e.splice.apply(e, u), e[r] = s.substring(0, i) + e[r], e[r + t.lines.length - 1] += s.substring(i);
            }
            break;
        case "remove":
            var a = t.end.column, f = t.end.row;
            r === f ? e[r] = s.substring(0, i) + s.substring(a) : e.splice(r, f - r + 1, s.substring(0, i) + e[f].substring(a));
    } };
}), ace.define("ace/lib/event_emitter", [], function (e, t, n) {
    "use strict";
    var r = {}, i = function () { this.propagationStopped = !0; }, s = function () { this.defaultPrevented = !0; };
    r._emit = r._dispatchEvent = function (e, t) { this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {}); var n = this._eventRegistry[e] || [], r = this._defaultHandlers[e]; if (!n.length && !r)
        return; if (typeof t != "object" || !t)
        t = {}; t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = i), t.preventDefault || (t.preventDefault = s), n = n.slice(); for (var o = 0; o < n.length; o++) {
        n[o](t, this);
        if (t.propagationStopped)
            break;
    } if (r && !t.defaultPrevented)
        return r(t, this); }, r._signal = function (e, t) { var n = (this._eventRegistry || {})[e]; if (!n)
        return; n = n.slice(); for (var r = 0; r < n.length; r++)
        n[r](t, this); }, r.once = function (e, t) { var n = this; this.on(e, function r() { n.off(e, r), t.apply(null, arguments); }); if (!t)
        return new Promise(function (e) { t = e; }); }, r.setDefaultHandler = function (e, t) { var n = this._defaultHandlers; n || (n = this._defaultHandlers = { _disabled_: {} }); if (n[e]) {
        var r = n[e], i = n._disabled_[e];
        i || (n._disabled_[e] = i = []), i.push(r);
        var s = i.indexOf(t);
        s != -1 && i.splice(s, 1);
    } n[e] = t; }, r.removeDefaultHandler = function (e, t) { var n = this._defaultHandlers; if (!n)
        return; var r = n._disabled_[e]; if (n[e] == t)
        r && this.setDefaultHandler(e, r.pop());
    else if (r) {
        var i = r.indexOf(t);
        i != -1 && r.splice(i, 1);
    } }, r.on = r.addEventListener = function (e, t, n) { this._eventRegistry = this._eventRegistry || {}; var r = this._eventRegistry[e]; return r || (r = this._eventRegistry[e] = []), r.indexOf(t) == -1 && r[n ? "unshift" : "push"](t), t; }, r.off = r.removeListener = r.removeEventListener = function (e, t) { this._eventRegistry = this._eventRegistry || {}; var n = this._eventRegistry[e]; if (!n)
        return; var r = n.indexOf(t); r !== -1 && n.splice(r, 1); }, r.removeAllListeners = function (e) { e || (this._eventRegistry = this._defaultHandlers = undefined), this._eventRegistry && (this._eventRegistry[e] = undefined), this._defaultHandlers && (this._defaultHandlers[e] = undefined); }, t.EventEmitter = r;
}), ace.define("ace/range", [], function (e, t, n) {
    "use strict";
    var r = function (e, t) { return e.row - t.row || e.column - t.column; }, i = function (e, t, n, r) { this.start = { row: e, column: t }, this.end = { row: n, column: r }; };
    (function () { this.isEqual = function (e) { return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column; }, this.toString = function () { return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"; }, this.contains = function (e, t) { return this.compare(e, t) == 0; }, this.compareRange = function (e) { var t, n = e.end, r = e.start; return t = this.compare(n.row, n.column), t == 1 ? (t = this.compare(r.row, r.column), t == 1 ? 2 : t == 0 ? 1 : 0) : t == -1 ? -2 : (t = this.compare(r.row, r.column), t == -1 ? -1 : t == 1 ? 42 : 0); }, this.comparePoint = function (e) { return this.compare(e.row, e.column); }, this.containsRange = function (e) { return this.comparePoint(e.start) == 0 && this.comparePoint(e.end) == 0; }, this.intersects = function (e) { var t = this.compareRange(e); return t == -1 || t == 0 || t == 1; }, this.isEnd = function (e, t) { return this.end.row == e && this.end.column == t; }, this.isStart = function (e, t) { return this.start.row == e && this.start.column == t; }, this.setStart = function (e, t) { typeof e == "object" ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t); }, this.setEnd = function (e, t) { typeof e == "object" ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t); }, this.inside = function (e, t) { return this.compare(e, t) == 0 ? this.isEnd(e, t) || this.isStart(e, t) ? !1 : !0 : !1; }, this.insideStart = function (e, t) { return this.compare(e, t) == 0 ? this.isEnd(e, t) ? !1 : !0 : !1; }, this.insideEnd = function (e, t) { return this.compare(e, t) == 0 ? this.isStart(e, t) ? !1 : !0 : !1; }, this.compare = function (e, t) { return !this.isMultiLine() && e === this.start.row ? t < this.start.column ? -1 : t > this.end.column ? 1 : 0 : e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0; }, this.compareStart = function (e, t) { return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t); }, this.compareEnd = function (e, t) { return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t); }, this.compareInside = function (e, t) { return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t); }, this.clipRows = function (e, t) { if (this.end.row > t)
        var n = { row: t + 1, column: 0 };
    else if (this.end.row < e)
        var n = { row: e, column: 0 }; if (this.start.row > t)
        var r = { row: t + 1, column: 0 };
    else if (this.start.row < e)
        var r = { row: e, column: 0 }; return i.fromPoints(r || this.start, n || this.end); }, this.extend = function (e, t) { var n = this.compare(e, t); if (n == 0)
        return this; if (n == -1)
        var r = { row: e, column: t };
    else
        var s = { row: e, column: t }; return i.fromPoints(r || this.start, s || this.end); }, this.isEmpty = function () { return this.start.row === this.end.row && this.start.column === this.end.column; }, this.isMultiLine = function () { return this.start.row !== this.end.row; }, this.clone = function () { return i.fromPoints(this.start, this.end); }, this.collapseRows = function () { return this.end.column == 0 ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0); }, this.toScreenRange = function (e) { var t = e.documentToScreenPosition(this.start), n = e.documentToScreenPosition(this.end); return new i(t.row, t.column, n.row, n.column); }, this.moveBy = function (e, t) { this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t; }; }).call(i.prototype), i.fromPoints = function (e, t) { return new i(e.row, e.column, t.row, t.column); }, i.comparePoints = r, i.comparePoints = function (e, t) { return e.row - t.row || e.column - t.column; }, t.Range = i;
}), ace.define("ace/anchor", [], function (e, t, n) {
    "use strict";
    var r = e("./lib/oop"), i = e("./lib/event_emitter").EventEmitter, s = t.Anchor = function (e, t, n) { this.$onChange = this.onChange.bind(this), this.attach(e), typeof n == "undefined" ? this.setPosition(t.row, t.column) : this.setPosition(t, n); };
    (function () { function e(e, t, n) { var r = n ? e.column <= t.column : e.column < t.column; return e.row < t.row || e.row == t.row && r; } function t(t, n, r) { var i = t.action == "insert", s = (i ? 1 : -1) * (t.end.row - t.start.row), o = (i ? 1 : -1) * (t.end.column - t.start.column), u = t.start, a = i ? u : t.end; return e(n, u, r) ? { row: n.row, column: n.column } : e(a, n, !r) ? { row: n.row + s, column: n.column + (n.row == a.row ? o : 0) } : { row: u.row, column: u.column }; } r.implement(this, i), this.getPosition = function () { return this.$clipPositionToDocument(this.row, this.column); }, this.getDocument = function () { return this.document; }, this.$insertRight = !1, this.onChange = function (e) { if (e.start.row == e.end.row && e.start.row != this.row)
        return; if (e.start.row > this.row)
        return; var n = t(e, { row: this.row, column: this.column }, this.$insertRight); this.setPosition(n.row, n.column, !0); }, this.setPosition = function (e, t, n) { var r; n ? r = { row: e, column: t } : r = this.$clipPositionToDocument(e, t); if (this.row == r.row && this.column == r.column)
        return; var i = { row: this.row, column: this.column }; this.row = r.row, this.column = r.column, this._signal("change", { old: i, value: r }); }, this.detach = function () { this.document.off("change", this.$onChange); }, this.attach = function (e) { this.document = e || this.document, this.document.on("change", this.$onChange); }, this.$clipPositionToDocument = function (e, t) { var n = {}; return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n; }; }).call(s.prototype);
}), ace.define("ace/document", [], function (e, t, n) {
    "use strict";
    var r = e("./lib/oop"), i = e("./apply_delta").applyDelta, s = e("./lib/event_emitter").EventEmitter, o = e("./range").Range, u = e("./anchor").Anchor, a = function (e) { this.$lines = [""], e.length === 0 ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({ row: 0, column: 0 }, e) : this.insert({ row: 0, column: 0 }, e); };
    (function () { r.implement(this, s), this.setValue = function (e) { var t = this.getLength() - 1; this.remove(new o(0, 0, t, this.getLine(t).length)), this.insert({ row: 0, column: 0 }, e); }, this.getValue = function () { return this.getAllLines().join(this.getNewLineCharacter()); }, this.createAnchor = function (e, t) { return new u(this, e, t); }, "aaa".split(/a/).length === 0 ? this.$split = function (e) { return e.replace(/\r\n|\r/g, "\n").split("\n"); } : this.$split = function (e) { return e.split(/\r\n|\r|\n/); }, this.$detectNewLine = function (e) { var t = e.match(/^.*?(\r\n|\r|\n)/m); this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode"); }, this.getNewLineCharacter = function () { switch (this.$newLineMode) {
        case "windows": return "\r\n";
        case "unix": return "\n";
        default: return this.$autoNewLine || "\n";
    } }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function (e) { if (this.$newLineMode === e)
        return; this.$newLineMode = e, this._signal("changeNewLineMode"); }, this.getNewLineMode = function () { return this.$newLineMode; }, this.isNewLine = function (e) { return e == "\r\n" || e == "\r" || e == "\n"; }, this.getLine = function (e) { return this.$lines[e] || ""; }, this.getLines = function (e, t) { return this.$lines.slice(e, t + 1); }, this.getAllLines = function () { return this.getLines(0, this.getLength()); }, this.getLength = function () { return this.$lines.length; }, this.getTextRange = function (e) { return this.getLinesForRange(e).join(this.getNewLineCharacter()); }, this.getLinesForRange = function (e) { var t; if (e.start.row === e.end.row)
        t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];
    else {
        t = this.getLines(e.start.row, e.end.row), t[0] = (t[0] || "").substring(e.start.column);
        var n = t.length - 1;
        e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column));
    } return t; }, this.insertLines = function (e, t) { return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t); }, this.removeLines = function (e, t) { return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t); }, this.insertNewLine = function (e) { return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""]); }, this.insert = function (e, t) { return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t)); }, this.insertInLine = function (e, t) { var n = this.clippedPos(e.row, e.column), r = this.pos(e.row, e.column + t.length); return this.applyDelta({ start: n, end: r, action: "insert", lines: [t] }, !0), this.clonePos(r); }, this.clippedPos = function (e, t) { var n = this.getLength(); e === undefined ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = undefined); var r = this.getLine(e); return t == undefined && (t = r.length), t = Math.min(Math.max(t, 0), r.length), { row: e, column: t }; }, this.clonePos = function (e) { return { row: e.row, column: e.column }; }, this.pos = function (e, t) { return { row: e, column: t }; }, this.$clipPosition = function (e) { var t = this.getLength(); return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e; }, this.insertFullLines = function (e, t) { e = Math.min(Math.max(e, 0), this.getLength()); var n = 0; e < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({ row: e, column: n }, t); }, this.insertMergedLines = function (e, t) { var n = this.clippedPos(e.row, e.column), r = { row: n.row + t.length - 1, column: (t.length == 1 ? n.column : 0) + t[t.length - 1].length }; return this.applyDelta({ start: n, end: r, action: "insert", lines: t }), this.clonePos(r); }, this.remove = function (e) { var t = this.clippedPos(e.start.row, e.start.column), n = this.clippedPos(e.end.row, e.end.column); return this.applyDelta({ start: t, end: n, action: "remove", lines: this.getLinesForRange({ start: t, end: n }) }), this.clonePos(t); }, this.removeInLine = function (e, t, n) { var r = this.clippedPos(e, t), i = this.clippedPos(e, n); return this.applyDelta({ start: r, end: i, action: "remove", lines: this.getLinesForRange({ start: r, end: i }) }, !0), this.clonePos(r); }, this.removeFullLines = function (e, t) { e = Math.min(Math.max(0, e), this.getLength() - 1), t = Math.min(Math.max(0, t), this.getLength() - 1); var n = t == this.getLength() - 1 && e > 0, r = t < this.getLength() - 1, i = n ? e - 1 : e, s = n ? this.getLine(i).length : 0, u = r ? t + 1 : t, a = r ? 0 : this.getLine(u).length, f = new o(i, s, u, a), l = this.$lines.slice(e, t + 1); return this.applyDelta({ start: f.start, end: f.end, action: "remove", lines: this.getLinesForRange(f) }), l; }, this.removeNewLine = function (e) { e < this.getLength() - 1 && e >= 0 && this.applyDelta({ start: this.pos(e, this.getLine(e).length), end: this.pos(e + 1, 0), action: "remove", lines: ["", ""] }); }, this.replace = function (e, t) { e instanceof o || (e = o.fromPoints(e.start, e.end)); if (t.length === 0 && e.isEmpty())
        return e.start; if (t == this.getTextRange(e))
        return e.end; this.remove(e); var n; return t ? n = this.insert(e.start, t) : n = e.start, n; }, this.applyDeltas = function (e) { for (var t = 0; t < e.length; t++)
        this.applyDelta(e[t]); }, this.revertDeltas = function (e) { for (var t = e.length - 1; t >= 0; t--)
        this.revertDelta(e[t]); }, this.applyDelta = function (e, t) { var n = e.action == "insert"; if (n ? e.lines.length <= 1 && !e.lines[0] : !o.comparePoints(e.start, e.end))
        return; n && e.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e, 2e4) : (i(this.$lines, e, t), this._signal("change", e)); }, this.$safeApplyDelta = function (e) { var t = this.$lines.length; (e.action == "remove" && e.start.row < t && e.end.row < t || e.action == "insert" && e.start.row <= t) && this.applyDelta(e); }, this.$splitAndapplyLargeDelta = function (e, t) { var n = e.lines, r = n.length - t + 1, i = e.start.row, s = e.start.column; for (var o = 0, u = 0; o < r; o = u) {
        u += t - 1;
        var a = n.slice(o, u);
        a.push(""), this.applyDelta({ start: this.pos(i + o, s), end: this.pos(i + u, s = 0), action: e.action, lines: a }, !0);
    } e.lines = n.slice(o), e.start.row = i + o, e.start.column = s, this.applyDelta(e, !0); }, this.revertDelta = function (e) { this.$safeApplyDelta({ start: this.clonePos(e.start), end: this.clonePos(e.end), action: e.action == "insert" ? "remove" : "insert", lines: e.lines.slice() }); }, this.indexToPosition = function (e, t) { var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length; for (var i = t || 0, s = n.length; i < s; i++) {
        e -= n[i].length + r;
        if (e < 0)
            return { row: i, column: e + n[i].length + r };
    } return { row: s - 1, column: e + n[s - 1].length + r }; }, this.positionToIndex = function (e, t) { var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = 0, s = Math.min(e.row, n.length); for (var o = t || 0; o < s; ++o)
        i += n[o].length + r; return i + e.column; }; }).call(a.prototype), t.Document = a;
}), ace.define("ace/lib/lang", [], function (e, t, n) {
    "use strict";
    t.last = function (e) { return e[e.length - 1]; }, t.stringReverse = function (e) { return e.split("").reverse().join(""); }, t.stringRepeat = function (e, t) { var n = ""; while (t > 0) {
        t & 1 && (n += e);
        if (t >>= 1)
            e += e;
    } return n; };
    var r = /^\s\s*/, i = /\s\s*$/;
    t.stringTrimLeft = function (e) { return e.replace(r, ""); }, t.stringTrimRight = function (e) { return e.replace(i, ""); }, t.copyObject = function (e) { var t = {}; for (var n in e)
        t[n] = e[n]; return t; }, t.copyArray = function (e) { var t = []; for (var n = 0, r = e.length; n < r; n++)
        e[n] && typeof e[n] == "object" ? t[n] = this.copyObject(e[n]) : t[n] = e[n]; return t; }, t.deepCopy = function s(e) { if (typeof e != "object" || !e)
        return e; var t; if (Array.isArray(e)) {
        t = [];
        for (var n = 0; n < e.length; n++)
            t[n] = s(e[n]);
        return t;
    } if (Object.prototype.toString.call(e) !== "[object Object]")
        return e; t = {}; for (var n in e)
        t[n] = s(e[n]); return t; }, t.arrayToMap = function (e) { var t = {}; for (var n = 0; n < e.length; n++)
        t[e[n]] = 1; return t; }, t.createMap = function (e) { var t = Object.create(null); for (var n in e)
        t[n] = e[n]; return t; }, t.arrayRemove = function (e, t) { for (var n = 0; n <= e.length; n++)
        t === e[n] && e.splice(n, 1); }, t.escapeRegExp = function (e) { return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1"); }, t.escapeHTML = function (e) { return ("" + e).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;"); }, t.getMatchOffsets = function (e, t) { var n = []; return e.replace(t, function (e) { n.push({ offset: arguments[arguments.length - 2], length: e.length }); }), n; }, t.deferredCall = function (e) { var t = null, n = function () { t = null, e(); }, r = function (e) { return r.cancel(), t = setTimeout(n, e || 0), r; }; return r.schedule = r, r.call = function () { return this.cancel(), e(), r; }, r.cancel = function () { return clearTimeout(t), t = null, r; }, r.isPending = function () { return t; }, r; }, t.delayedCall = function (e, t) { var n = null, r = function () { n = null, e(); }, i = function (e) { n == null && (n = setTimeout(r, e || t)); }; return i.delay = function (e) { n && clearTimeout(n), n = setTimeout(r, e || t); }, i.schedule = i, i.call = function () { this.cancel(), e(); }, i.cancel = function () { n && clearTimeout(n), n = null; }, i.isPending = function () { return n; }, i; };
}), ace.define("ace/worker/mirror", [], function (e, t, n) {
    "use strict";
    var r = e("../document").Document, i = e("../lib/lang"), s = t.Mirror = function (e) { this.sender = e; var t = this.doc = new r(""), n = this.deferredUpdate = i.delayedCall(this.onUpdate.bind(this)), s = this; e.on("change", function (e) { var r = e.data; if (r[0].start)
        t.applyDeltas(r);
    else
        for (var i = 0; i < r.length; i += 2) {
            var o, u;
            Array.isArray(r[i + 1]) ? o = { action: "insert", start: r[i], lines: r[i + 1] } : o = { action: "remove", start: r[i], end: r[i + 1] };
            if ((o.action == "insert" ? o.start : o.end).row >= t.$lines.length)
                throw u = new Error("Invalid delta"), u.data = { path: s.$path, linesLength: t.$lines.length, start: o.start, end: o.end }, u;
            t.applyDelta(o, !0);
        } if (s.$timeout)
        return n.schedule(s.$timeout); s.onUpdate(); }); };
    (function () { this.$timeout = 500, this.setTimeout = function (e) { this.$timeout = e; }, this.setValue = function (e) { this.doc.setValue(e), this.deferredUpdate.schedule(this.$timeout); }, this.getValue = function (e) { this.sender.callback(this.doc.getValue(), e); }, this.onUpdate = function () { }, this.isPending = function () { return this.deferredUpdate.isPending(); }; }).call(s.prototype);
}), ace.define("ace/mode/lua/luaparse", [], function (e, t, n) { (function (e, n, r) { r(t); })(this, "luaparse", function (e) {
    "use strict";
    function u(e, t) { return t = t || 0, e < 128 ? String.fromCharCode(e) : e < 2048 ? String.fromCharCode(t | 192 | e >> 6, t | 128 | e & 63) : e < 65536 ? String.fromCharCode(t | 224 | e >> 12, t | 128 | e >> 6 & 63, t | 128 | e & 63) : e < 1114112 ? String.fromCharCode(t | 240 | e >> 18, t | 128 | e >> 12 & 63, t | 128 | e >> 6 & 63, t | 128 | e & 63) : null; }
    function a(e, t) { var n = e.toString(16); while (n.length < t)
        n = "0" + n; return n; }
    function f(e) { return function (t) { var n = e.exec(t); if (!n)
        return t; O(null, w.invalidCodeUnit, a(n[0].charCodeAt(0), 4).toUpperCase()); }; }
    function S(e) { if (kt) {
        var t = Ct.pop();
        t.complete(), t.bless(e);
    } return n.onCreateNode && n.onCreateNode(e), e; }
    function C(e, t, n) { for (var r = 0, i = e.length; r < i; ++r)
        if (e[r][t] === n)
            return r; return -1; }
    function k(e) { var t = x.call(arguments, 1); return e = e.replace(/%(\d)/g, function (e, n) { return "" + t[n - 1] || ""; }), e; }
    function A(e) { return Object.create ? Object.create(e, { line: { writable: !0, value: e.line }, index: { writable: !0, value: e.index }, column: { writable: !0, value: e.column } }) : e; }
    function O(e) { var t = k.apply(null, x.call(arguments, 1)), n, r; throw e === null || typeof e.line == "undefined" ? (r = P - R + 1, n = A(new SyntaxError(k("[%1:%2] %3", q, r, t))), n.index = P, n.line = q, n.column = r) : (r = e.range[0] - e.lineStart, n = A(new SyntaxError(k("[%1:%2] %3", e.line, r, t))), n.line = e.line, n.index = e.range[0], n.column = r), n; }
    function M(e) { var n = t.slice(e.range[0], e.range[1]); return n ? n : e.value; }
    function _(e, t) { O(t, w.expectedToken, e, M(t)); }
    function D(e) { var t = M(j); if ("undefined" != typeof e.type) {
        var n;
        switch (e.type) {
            case h:
                n = "string";
                break;
            case p:
                n = "keyword";
                break;
            case d:
                n = "identifier";
                break;
            case v:
                n = "number";
                break;
            case m:
                n = "symbol";
                break;
            case g:
                n = "boolean";
                break;
            case y: return O(e, w.unexpected, "symbol", "nil", t);
            case c: return O(e, w.unexpectedEOF);
        }
        return O(e, w.unexpected, n, M(e), t);
    } return O(e, w.unexpected, "symbol", e, t); }
    function U() { W(); while (45 === t.charCodeAt(P) && 45 === t.charCodeAt(P + 1))
        rt(), W(); if (P >= r)
        return { type: c, value: "<eof>", line: q, lineStart: R, range: [P, P] }; var e = t.charCodeAt(P), n = t.charCodeAt(P + 1); I = P; if (ht(e))
        return X(); switch (e) {
        case 39:
        case 34: return J();
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57: return Q();
        case 46:
            if (lt(n))
                return Q();
            if (46 === n)
                return 46 === t.charCodeAt(P + 2) ? $() : V("..");
            return V(".");
        case 61:
            if (61 === n)
                return V("==");
            return V("=");
        case 62:
            if (i.bitwiseOperators && 62 === n)
                return V(">>");
            if (61 === n)
                return V(">=");
            return V(">");
        case 60:
            if (i.bitwiseOperators && 60 === n)
                return V("<<");
            if (61 === n)
                return V("<=");
            return V("<");
        case 126:
            if (61 === n)
                return V("~=");
            if (!i.bitwiseOperators)
                break;
            return V("~");
        case 58:
            if (i.labels && 58 === n)
                return V("::");
            return V(":");
        case 91:
            if (91 === n || 61 === n)
                return K();
            return V("[");
        case 47:
            if (i.integerDivision && 47 === n)
                return V("//");
            return V("/");
        case 38:
        case 124: if (!i.bitwiseOperators)
            break;
        case 42:
        case 94:
        case 37:
        case 44:
        case 123:
        case 125:
        case 93:
        case 40:
        case 41:
        case 59:
        case 35:
        case 45:
        case 43: return V(t.charAt(P));
    } return D(t.charAt(P)); }
    function z() { var e = t.charCodeAt(P), n = t.charCodeAt(P + 1); return ft(e) ? (10 === e && 13 === n && ++P, 13 === e && 10 === n && ++P, ++q, R = ++P, !0) : !1; }
    function W() { while (P < r) {
        var e = t.charCodeAt(P);
        if (at(e))
            ++P;
        else if (!z())
            break;
    } }
    function X() { var e, n; while (pt(t.charCodeAt(++P)))
        ; return e = s.fixup(t.slice(I, P)), dt(e) ? n = p : "true" === e || "false" === e ? (n = g, e = "true" === e) : "nil" === e ? (n = y, e = null) : n = d, { type: n, value: e, line: q, lineStart: R, range: [I, P] }; }
    function V(e) { return P += e.length, { type: m, value: e, line: q, lineStart: R, range: [I, P] }; }
    function $() { return P += 3, { type: b, value: "...", line: q, lineStart: R, range: [I, P] }; }
    function J() { var e = t.charCodeAt(P++), n = q, i = R, o = P, u = s.discardStrings ? null : "", a; for (;;) {
        a = t.charCodeAt(P++);
        if (e === a)
            break;
        if (P > r || ft(a))
            u += t.slice(o, P - 1), O(null, w.unfinishedString, t.slice(I, P - 1));
        if (92 === a) {
            if (!s.discardStrings) {
                var f = t.slice(o, P - 1);
                u += s.fixup(f);
            }
            var l = nt();
            s.discardStrings || (u += l), o = P;
        }
    } return s.discardStrings || (u += s.encodeByte(null), u += s.fixup(t.slice(o, P - 1))), { type: h, value: u, line: n, lineStart: i, lastLine: q, lastLineStart: R, range: [I, P] }; }
    function K() { var e = q, t = R, n = it(!1); return !1 === n && O(H, w.expected, "[", M(H)), { type: h, value: s.discardStrings ? null : s.fixup(n), line: e, lineStart: t, lastLine: q, lastLineStart: R, range: [I, P] }; }
    function Q() { var e = t.charAt(P), n = t.charAt(P + 1), r = "0" === e && "xX".indexOf(n || null) >= 0 ? Z() : et(), i = G(), s = Y(); return s && (i || r.hasFractionPart) && O(null, w.malformedNumber, t.slice(I, P)), { type: v, value: r.value, line: q, lineStart: R, range: [I, P] }; }
    function G() { if (!i.imaginaryNumbers)
        return; return "iI".indexOf(t.charAt(P) || null) >= 0 ? (++P, !0) : !1; }
    function Y() { if (!i.integerSuffixes)
        return; if ("uU".indexOf(t.charAt(P) || null) >= 0) {
        ++P;
        if ("lL".indexOf(t.charAt(P) || null) >= 0) {
            ++P;
            if ("lL".indexOf(t.charAt(P) || null) >= 0)
                return ++P, "ULL";
            O(null, w.malformedNumber, t.slice(I, P));
        }
        else
            O(null, w.malformedNumber, t.slice(I, P));
    }
    else if ("lL".indexOf(t.charAt(P) || null) >= 0) {
        ++P;
        if ("lL".indexOf(t.charAt(P) || null) >= 0)
            return ++P, "LL";
        O(null, w.malformedNumber, t.slice(I, P));
    } }
    function Z() { var e = 0, n = 1, r = 1, i, s, o, u; u = P += 2, ct(t.charCodeAt(P)) || O(null, w.malformedNumber, t.slice(I, P)); while (ct(t.charCodeAt(P)))
        ++P; i = parseInt(t.slice(u, P), 16); var a = !1; if ("." === t.charAt(P)) {
        a = !0, s = ++P;
        while (ct(t.charCodeAt(P)))
            ++P;
        e = t.slice(s, P), e = s === P ? 0 : parseInt(e, 16) / Math.pow(16, P - s);
    } var f = !1; if ("pP".indexOf(t.charAt(P) || null) >= 0) {
        f = !0, ++P, "+-".indexOf(t.charAt(P) || null) >= 0 && (r = "+" === t.charAt(P++) ? 1 : -1), o = P, lt(t.charCodeAt(P)) || O(null, w.malformedNumber, t.slice(I, P));
        while (lt(t.charCodeAt(P)))
            ++P;
        n = t.slice(o, P), n = Math.pow(2, n * r);
    } return { value: (i + e) * n, hasFractionPart: a || f }; }
    function et() { while (lt(t.charCodeAt(P)))
        ++P; var e = !1; if ("." === t.charAt(P)) {
        e = !0, ++P;
        while (lt(t.charCodeAt(P)))
            ++P;
    } var n = !1; if ("eE".indexOf(t.charAt(P) || null) >= 0) {
        n = !0, ++P, "+-".indexOf(t.charAt(P) || null) >= 0 && ++P, lt(t.charCodeAt(P)) || O(null, w.malformedNumber, t.slice(I, P));
        while (lt(t.charCodeAt(P)))
            ++P;
    } return { value: parseFloat(t.slice(I, P)), hasFractionPart: e || n }; }
    function tt() { var e = P++; t.charAt(P++) !== "{" && O(null, w.braceExpected, "{", "\\" + t.slice(e, P)), ct(t.charCodeAt(P)) || O(null, w.hexadecimalDigitExpected, "\\" + t.slice(e, P)); while (t.charCodeAt(P) === 48)
        ++P; var n = P; while (ct(t.charCodeAt(P)))
        ++P, P - n > 6 && O(null, w.tooLargeCodepoint, "\\" + t.slice(e, P)); var r = t.charAt(P++); r !== "}" && (r === '"' || r === "'" ? O(null, w.braceExpected, "}", "\\" + t.slice(e, P--)) : O(null, w.hexadecimalDigitExpected, "\\" + t.slice(e, P))); var i = parseInt(t.slice(n, P - 1) || "0", 16), o = "\\" + t.slice(e, P); return i > 1114111 && O(null, w.tooLargeCodepoint, o), s.encodeUTF8(i, o); }
    function nt() { var e = P; switch (t.charAt(P)) {
        case "a": return ++P, "\x07";
        case "n": return ++P, "\n";
        case "r": return ++P, "\r";
        case "t": return ++P, "	";
        case "v": return ++P, "\x0b";
        case "b": return ++P, "\b";
        case "f": return ++P, "\f";
        case "\r":
        case "\n": return z(), "\n";
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            while (lt(t.charCodeAt(P)) && P - e < 3)
                ++P;
            var n = t.slice(e, P), r = parseInt(n, 10);
            return r > 255 && O(null, w.decimalEscapeTooLarge, "\\" + r), s.encodeByte(r, "\\" + n);
        case "z":
            if (i.skipWhitespaceEscape)
                return ++P, W(), "";
            break;
        case "x":
            if (i.hexEscapes) {
                if (ct(t.charCodeAt(P + 1)) && ct(t.charCodeAt(P + 2)))
                    return P += 3, s.encodeByte(parseInt(t.slice(e + 1, P), 16), "\\" + t.slice(e, P));
                O(null, w.hexadecimalDigitExpected, "\\" + t.slice(e, P + 2));
            }
            break;
        case "u":
            if (i.unicodeEscapes)
                return tt();
            break;
        case "\\":
        case '"':
        case "'": return t.charAt(P++);
    } return i.strictEscapes && O(null, w.invalidEscape, "\\" + t.slice(e, P + 1)), t.charAt(P++); }
    function rt() { I = P, P += 2; var e = t.charAt(P), i = "", s = !1, o = P, u = R, a = q; "[" === e && (i = it(!0), !1 === i ? i = e : s = !0); if (!s) {
        while (P < r) {
            if (ft(t.charCodeAt(P)))
                break;
            ++P;
        }
        n.comments && (i = t.slice(o, P));
    } if (n.comments) {
        var f = E.comment(i, t.slice(I, P));
        n.locations && (f.loc = { start: { line: a, column: I - u }, end: { line: q, column: P - R } }), n.ranges && (f.range = [I, P]), n.onCreateNode && n.onCreateNode(f), F.push(f);
    } }
    function it(e) { var n = 0, i = "", s = !1, o, u, a = q; ++P; while ("=" === t.charAt(P + n))
        ++n; if ("[" !== t.charAt(P + n))
        return !1; P += n + 1, ft(t.charCodeAt(P)) && z(), u = P; while (P < r) {
        while (ft(t.charCodeAt(P)))
            z();
        o = t.charAt(P++);
        if ("]" === o) {
            s = !0;
            for (var f = 0; f < n; ++f)
                "=" !== t.charAt(P + f) && (s = !1);
            "]" !== t.charAt(P + n) && (s = !1);
        }
        if (s)
            return i += t.slice(u, P - 1), P += n + 1, i;
    } O(null, e ? w.unfinishedLongComment : w.unfinishedLongString, a, "<eof>"); }
    function st() { B = H, H = j, j = U(); }
    function ot(e) { return e === H.value ? (st(), !0) : !1; }
    function ut(e) { e === H.value ? st() : O(H, w.expected, e, M(H)); }
    function at(e) { return 9 === e || 32 === e || 11 === e || 12 === e; }
    function ft(e) { return 10 === e || 13 === e; }
    function lt(e) { return e >= 48 && e <= 57; }
    function ct(e) { return e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70; }
    function ht(e) { return e >= 65 && e <= 90 || e >= 97 && e <= 122 || 95 === e ? !0 : i.extendedIdentifiers && e >= 128 ? !0 : !1; }
    function pt(e) { return e >= 65 && e <= 90 || e >= 97 && e <= 122 || 95 === e || e >= 48 && e <= 57 ? !0 : i.extendedIdentifiers && e >= 128 ? !0 : !1; }
    function dt(e) { switch (e.length) {
        case 2: return "do" === e || "if" === e || "in" === e || "or" === e;
        case 3: return "and" === e || "end" === e || "for" === e || "not" === e;
        case 4:
            if ("else" === e || "then" === e)
                return !0;
            if (i.labels && !i.contextualGoto)
                return "goto" === e;
            return !1;
        case 5: return "break" === e || "local" === e || "until" === e || "while" === e;
        case 6: return "elseif" === e || "repeat" === e || "return" === e;
        case 8: return "function" === e;
    } return !1; }
    function vt(e) { return m === e.type ? "#-~".indexOf(e.value) >= 0 : p === e.type ? "not" === e.value : !1; }
    function mt(e) { if (c === e.type)
        return !0; if (p !== e.type)
        return !1; switch (e.value) {
        case "else":
        case "elseif":
        case "end":
        case "until": return !0;
        default: return !1;
    } }
    function wt() { var e = gt[yt++].slice(); gt.push(e), n.onCreateScope && n.onCreateScope(); }
    function Et() { var e = gt.pop(); --yt, n.onDestroyScope && n.onDestroyScope(); }
    function St(e) { n.onLocalDeclaration && n.onLocalDeclaration(e); if (-1 !== N(gt[yt], e))
        return; gt[yt].push(e); }
    function xt(e) { St(e.name), Tt(e, !0); }
    function Tt(e, t) { !t && -1 === C(bt, "name", e.name) && bt.push(e), e.isLocal = t; }
    function Nt(e) { return -1 !== N(gt[yt], e); }
    function Lt() { return new At(H); }
    function At(e) { n.locations && (this.loc = { start: { line: e.line, column: e.range[0] - e.lineStart }, end: { line: 0, column: 0 } }), n.ranges && (this.range = [e.range[0], 0]); }
    function Ot() { kt && Ct.push(Lt()); }
    function Mt(e) { kt && Ct.push(e); }
    function _t() { this.scopes = [], this.pendingGotos = []; }
    function Dt() { this.level = 0, this.loopLevels = []; }
    function Pt() { return i.labels ? new _t : new Dt; }
    function Ht() { st(), Ot(), n.scope && wt(); var e = Pt(); e.allowVararg = !0, e.pushScope(); var t = Bt(e); return e.popScope(), n.scope && Et(), c !== H.type && D(H), kt && !t.length && (B = H), S(E.chunk(t)); }
    function Bt(e) { var t = [], n; while (!mt(H)) {
        if ("return" === H.value || !i.relaxedBreak && "break" === H.value) {
            t.push(jt(e));
            break;
        }
        n = jt(e), ot(";"), n && t.push(n);
    } return t; }
    function jt(e) { Ot(); if (m === H.type && ot("::"))
        return Ft(e); if (i.emptyStatement && ot(";")) {
        kt && Ct.pop();
        return;
    } e.raiseDeferredErrors(); if (p === H.type)
        switch (H.value) {
            case "local": return st(), $t(e);
            case "if": return st(), Xt(e);
            case "return": return st(), Wt(e);
            case "function":
                st();
                var t = Gt();
                return Qt(t);
            case "while": return st(), Ut(e);
            case "for": return st(), Vt(e);
            case "repeat": return st(), zt(e);
            case "break": return st(), e.isInLoop() || O(H, w.noLoopToBreak, H.value), It();
            case "do": return st(), Rt(e);
            case "goto": return st(), qt(e);
        } return i.contextualGoto && H.type === d && H.value === "goto" && j.type === d && j.value !== "goto" ? (st(), qt(e)) : (kt && Ct.pop(), Jt(e)); }
    function Ft(e) { var t = H, r = Kt(); return n.scope && (St("::" + t.value + "::"), Tt(r, !0)), ut("::"), e.addLabel(t.value, t), S(E.labelStatement(r)); }
    function It() { return S(E.breakStatement()); }
    function qt(e) { var t = H.value, n = B, r = Kt(); return e.addGoto(t, n), S(E.gotoStatement(r)); }
    function Rt(e) { n.scope && wt(), e.pushScope(); var t = Bt(e); return e.popScope(), n.scope && Et(), ut("end"), S(E.doStatement(t)); }
    function Ut(e) { var t = en(e); ut("do"), n.scope && wt(), e.pushScope(!0); var r = Bt(e); return e.popScope(), n.scope && Et(), ut("end"), S(E.whileStatement(t, r)); }
    function zt(e) { n.scope && wt(), e.pushScope(!0); var t = Bt(e); ut("until"), e.raiseDeferredErrors(); var r = en(e); return e.popScope(), n.scope && Et(), S(E.repeatStatement(r, t)); }
    function Wt(e) { var t = []; if ("end" !== H.value) {
        var n = Zt(e);
        null != n && t.push(n);
        while (ot(","))
            n = en(e), t.push(n);
        ot(";");
    } return S(E.returnStatement(t)); }
    function Xt(e) { var t = [], r, i, s; kt && (s = Ct[Ct.length - 1], Ct.push(s)), r = en(e), ut("then"), n.scope && wt(), e.pushScope(), i = Bt(e), e.popScope(), n.scope && Et(), t.push(S(E.ifClause(r, i))), kt && (s = Lt()); while (ot("elseif"))
        Mt(s), r = en(e), ut("then"), n.scope && wt(), e.pushScope(), i = Bt(e), e.popScope(), n.scope && Et(), t.push(S(E.elseifClause(r, i))), kt && (s = Lt()); return ot("else") && (kt && (s = new At(B), Ct.push(s)), n.scope && wt(), e.pushScope(), i = Bt(e), e.popScope(), n.scope && Et(), t.push(S(E.elseClause(i)))), ut("end"), S(E.ifStatement(t)); }
    function Vt(e) { var t = Kt(), r; n.scope && (wt(), xt(t)); if (ot("=")) {
        var i = en(e);
        ut(",");
        var s = en(e), o = ot(",") ? en(e) : null;
        return ut("do"), e.pushScope(!0), r = Bt(e), e.popScope(), ut("end"), n.scope && Et(), S(E.forNumericStatement(t, i, s, o, r));
    } var u = [t]; while (ot(","))
        t = Kt(), n.scope && xt(t), u.push(t); ut("in"); var a = []; do {
        var f = en(e);
        a.push(f);
    } while (ot(",")); return ut("do"), e.pushScope(!0), r = Bt(e), e.popScope(), ut("end"), n.scope && Et(), S(E.forGenericStatement(u, a, r)); }
    function $t(e) { var t, r = B; if (d === H.type) {
        var i = [], s = [];
        do
            t = Kt(), i.push(t), e.addLocal(t.name, r);
        while (ot(","));
        if (ot("="))
            do {
                var o = en(e);
                s.push(o);
            } while (ot(","));
        if (n.scope)
            for (var u = 0, a = i.length; u < a; ++u)
                xt(i[u]);
        return S(E.localStatement(i, s));
    } if (ot("function"))
        return t = Kt(), e.addLocal(t.name, r), n.scope && (xt(t), wt()), Qt(t, !0); _("<name>", H); }
    function Jt(e) { var t = H, r, i, s, o, u, a = []; kt && (i = Lt()); do {
        kt && (r = Lt());
        if (d === H.type)
            u = H.value, o = Kt(), n.scope && Tt(o, Nt(u)), s = !0;
        else {
            if ("(" !== H.value)
                return D(H);
            st(), o = en(e), ut(")"), s = !1;
        }
        e: for (;;) {
            var f;
            switch (h === H.type ? '"' : H.value) {
                case ".":
                case "[":
                    s = !0;
                    break;
                case ":":
                case "(":
                case "{":
                case '"':
                    s = null;
                    break;
                default: break e;
            }
            o = rn(o, r, e);
        }
        a.push(o);
        if ("," !== H.value)
            break;
        if (!s)
            return D(H);
        st();
    } while (!0); if (a.length === 1 && s === null)
        return Mt(r), S(E.callStatement(a[0])); if (!s)
        return D(H); ut("="); var l = []; do
        l.push(en(e));
    while (ot(",")); return Mt(i), S(E.assignmentStatement(a, l)); }
    function Kt() { Ot(); var e = H.value; return d !== H.type && _("<name>", H), st(), S(E.identifier(e)); }
    function Qt(e, t) { var r = Pt(); r.pushScope(); var i = []; ut("("); if (!ot(")"))
        for (;;) {
            if (d === H.type) {
                var s = Kt();
                n.scope && xt(s), i.push(s);
                if (ot(","))
                    continue;
            }
            else
                b === H.type ? (r.allowVararg = !0, i.push(un(r))) : _("<name> or '...'", H);
            ut(")");
            break;
        } var o = Bt(r); return r.popScope(), ut("end"), n.scope && Et(), t = t || !1, S(E.functionStatement(e, i, t, o)); }
    function Gt() { var e, t, r; kt && (r = Lt()), e = Kt(), n.scope && (Tt(e, Nt(e.name)), wt()); while (ot("."))
        Mt(r), t = Kt(), e = S(E.memberExpression(e, ".", t)); return ot(":") && (Mt(r), t = Kt(), e = S(E.memberExpression(e, ":", t)), n.scope && St("self")), e; }
    function Yt(e) { var t = [], n, r; for (;;) {
        Ot();
        if (m === H.type && ot("["))
            n = en(e), ut("]"), ut("="), r = en(e), t.push(S(E.tableKey(n, r)));
        else if (d === H.type)
            "=" === j.value ? (n = Kt(), st(), r = en(e), t.push(S(E.tableKeyString(n, r)))) : (r = en(e), t.push(S(E.tableValue(r))));
        else {
            if (null == (r = Zt(e))) {
                Ct.pop();
                break;
            }
            t.push(S(E.tableValue(r)));
        }
        if (",;".indexOf(H.value) >= 0) {
            st();
            continue;
        }
        break;
    } return ut("}"), S(E.tableConstructorExpression(t)); }
    function Zt(e) { var t = nn(0, e); return t; }
    function en(e) { var t = Zt(e); if (null != t)
        return t; _("<expression>", H); }
    function tn(e) { var t = e.charCodeAt(0), n = e.length; if (1 === n)
        switch (t) {
            case 94: return 12;
            case 42:
            case 47:
            case 37: return 10;
            case 43:
            case 45: return 9;
            case 38: return 6;
            case 126: return 5;
            case 124: return 4;
            case 60:
            case 62: return 3;
        }
    else if (2 === n)
        switch (t) {
            case 47: return 10;
            case 46: return 8;
            case 60:
            case 62:
                if ("<<" === e || ">>" === e)
                    return 7;
                return 3;
            case 61:
            case 126: return 3;
            case 111: return 1;
        }
    else if (97 === t && "and" === e)
        return 2; return 0; }
    function nn(e, t) { var n = H.value, r, i; kt && (i = Lt()); if (vt(H)) {
        Ot(), st();
        var s = nn(10, t);
        s == null && _("<expression>", H), r = S(E.unaryExpression(n, s));
    } null == r && (r = un(t), null == r && (r = sn(t))); if (null == r)
        return null; var o; for (;;) {
        n = H.value, o = m === H.type || p === H.type ? tn(n) : 0;
        if (o === 0 || o <= e)
            break;
        ("^" === n || ".." === n) && --o, st();
        var u = nn(o, t);
        null == u && _("<expression>", H), kt && Ct.push(i), r = S(E.binaryExpression(n, r, u));
    } return r; }
    function rn(e, t, n) { var r, i; if (m === H.type)
        switch (H.value) {
            case "[": return Mt(t), st(), r = en(n), ut("]"), S(E.indexExpression(e, r));
            case ".": return Mt(t), st(), i = Kt(), S(E.memberExpression(e, ".", i));
            case ":": return Mt(t), st(), i = Kt(), e = S(E.memberExpression(e, ":", i)), Mt(t), on(e, n);
            case "(":
            case "{": return Mt(t), on(e, n);
        }
    else if (h === H.type)
        return Mt(t), on(e, n); return null; }
    function sn(e) { var t, r, i; kt && (i = Lt()); if (d === H.type)
        r = H.value, t = Kt(), n.scope && Tt(t, Nt(r));
    else {
        if (!ot("("))
            return null;
        t = en(e), ut(")");
    } for (;;) {
        var s = rn(t, i, e);
        if (s === null)
            break;
        t = s;
    } return t; }
    function on(e, t) { if (m === H.type)
        switch (H.value) {
            case "(":
                i.emptyStatement || H.line !== B.line && O(null, w.ambiguousSyntax, H.value), st();
                var n = [], r = Zt(t);
                null != r && n.push(r);
                while (ot(","))
                    r = en(t), n.push(r);
                return ut(")"), S(E.callExpression(e, n));
            case "{":
                Ot(), st();
                var s = Yt(t);
                return S(E.tableCallExpression(e, s));
        }
    else if (h === H.type)
        return S(E.stringCallExpression(e, un(t))); _("function arguments", H); }
    function un(e) { var r = h | v | g | y | b, i = H.value, s = H.type, o; kt && (o = Lt()), s === b && !e.allowVararg && O(H, w.cannotUseVararg, H.value); if (s & r) {
        Mt(o);
        var u = t.slice(H.range[0], H.range[1]);
        return st(), S(E.literal(s, i, u));
    } if (p === s && "function" === i)
        return Mt(o), st(), n.scope && wt(), Qt(null); if (ot("{"))
        return Mt(o), Yt(e); }
    function fn(u, a) { "undefined" == typeof a && "object" == typeof u && (a = u, u = undefined), a || (a = {}), t = u || "", n = L({}, o, a), P = 0, q = 1, R = 0, r = t.length, gt = [[]], yt = 0, bt = [], Ct = []; if (!Object.prototype.hasOwnProperty.call(an, n.luaVersion))
        throw new Error(k("Lua version '%1' not supported", n.luaVersion)); i = L({}, an[n.luaVersion]), n.extendedIdentifiers !== void 0 && (i.extendedIdentifiers = !!n.extendedIdentifiers); if (!Object.prototype.hasOwnProperty.call(l, n.encodingMode))
        throw new Error(k("Encoding mode '%1' not supported", n.encodingMode)); return s = l[n.encodingMode], n.comments && (F = []), n.wait ? e : cn(); }
    function ln(n) { return t += String(n), r = t.length, e; }
    function cn(e) { "undefined" != typeof e && ln(e), t && t.substr(0, 2) === "#!" && (t = t.replace(/^.*/, function (e) { return e.replace(/./g, " "); })), r = t.length, kt = n.locations || n.ranges, j = U(); var i = Ht(); n.comments && (i.comments = F), n.scope && (i.globals = bt); if (Ct.length > 0)
        throw new Error("Location tracking failed. This is most likely a bug in luaparse"); return i; }
    e.version = "0.3.1";
    var t, n, r, i, s, o = e.defaultOptions = { wait: !1, comments: !0, scope: !1, locations: !1, ranges: !1, onCreateNode: null, onCreateScope: null, onDestroyScope: null, onLocalDeclaration: null, luaVersion: "5.1", encodingMode: "none" }, l = { "pseudo-latin1": { fixup: f(/[^\x00-\xff]/), encodeByte: function (e) { return e === null ? "" : String.fromCharCode(e); }, encodeUTF8: function (e) { return u(e); } }, "x-user-defined": { fixup: f(/[^\x00-\x7f\uf780-\uf7ff]/), encodeByte: function (e) { return e === null ? "" : e >= 128 ? String.fromCharCode(e | 63232) : String.fromCharCode(e); }, encodeUTF8: function (e) { return u(e, 63232); } }, none: { discardStrings: !0, fixup: function (e) { return e; }, encodeByte: function (e) { return ""; }, encodeUTF8: function (e) { return ""; } } }, c = 1, h = 2, p = 4, d = 8, v = 16, m = 32, g = 64, y = 128, b = 256;
    e.tokenTypes = { EOF: c, StringLiteral: h, Keyword: p, Identifier: d, NumericLiteral: v, Punctuator: m, BooleanLiteral: g, NilLiteral: y, VarargLiteral: b };
    var w = e.errors = { unexpected: "unexpected %1 '%2' near '%3'", unexpectedEOF: "unexpected symbol near '<eof>'", expected: "'%1' expected near '%2'", expectedToken: "%1 expected near '%2'", unfinishedString: "unfinished string near '%1'", malformedNumber: "malformed number near '%1'", decimalEscapeTooLarge: "decimal escape too large near '%1'", invalidEscape: "invalid escape sequence near '%1'", hexadecimalDigitExpected: "hexadecimal digit expected near '%1'", braceExpected: "missing '%1' near '%2'", tooLargeCodepoint: "UTF-8 value too large near '%1'", unfinishedLongString: "unfinished long string (starting at line %1) near '%2'", unfinishedLongComment: "unfinished long comment (starting at line %1) near '%2'", ambiguousSyntax: "ambiguous syntax (function call x new statement) near '%1'", noLoopToBreak: "no loop to break near '%1'", labelAlreadyDefined: "label '%1' already defined on line %2", labelNotVisible: "no visible label '%1' for <goto>", gotoJumpInLocalScope: "<goto %1> jumps into the scope of local '%2'", cannotUseVararg: "cannot use '...' outside a vararg function near '%1'", invalidCodeUnit: "code unit U+%1 is not allowed in the current encoding mode" }, E = e.ast = { labelStatement: function (e) { return { type: "LabelStatement", label: e }; }, breakStatement: function () { return { type: "BreakStatement" }; }, gotoStatement: function (e) { return { type: "GotoStatement", label: e }; }, returnStatement: function (e) { return { type: "ReturnStatement", arguments: e }; }, ifStatement: function (e) { return { type: "IfStatement", clauses: e }; }, ifClause: function (e, t) { return { type: "IfClause", condition: e, body: t }; }, elseifClause: function (e, t) { return { type: "ElseifClause", condition: e, body: t }; }, elseClause: function (e) { return { type: "ElseClause", body: e }; }, whileStatement: function (e, t) { return { type: "WhileStatement", condition: e, body: t }; }, doStatement: function (e) { return { type: "DoStatement", body: e }; }, repeatStatement: function (e, t) { return { type: "RepeatStatement", condition: e, body: t }; }, localStatement: function (e, t) { return { type: "LocalStatement", variables: e, init: t }; }, assignmentStatement: function (e, t) { return { type: "AssignmentStatement", variables: e, init: t }; }, callStatement: function (e) { return { type: "CallStatement", expression: e }; }, functionStatement: function (e, t, n, r) { return { type: "FunctionDeclaration", identifier: e, isLocal: n, parameters: t, body: r }; }, forNumericStatement: function (e, t, n, r, i) { return { type: "ForNumericStatement", variable: e, start: t, end: n, step: r, body: i }; }, forGenericStatement: function (e, t, n) { return { type: "ForGenericStatement", variables: e, iterators: t, body: n }; }, chunk: function (e) { return { type: "Chunk", body: e }; }, identifier: function (e) { return { type: "Identifier", name: e }; }, literal: function (e, t, n) { return e = e === h ? "StringLiteral" : e === v ? "NumericLiteral" : e === g ? "BooleanLiteral" : e === y ? "NilLiteral" : "VarargLiteral", { type: e, value: t, raw: n }; }, tableKey: function (e, t) { return { type: "TableKey", key: e, value: t }; }, tableKeyString: function (e, t) { return { type: "TableKeyString", key: e, value: t }; }, tableValue: function (e) { return { type: "TableValue", value: e }; }, tableConstructorExpression: function (e) { return { type: "TableConstructorExpression", fields: e }; }, binaryExpression: function (e, t, n) { var r = "and" === e || "or" === e ? "LogicalExpression" : "BinaryExpression"; return { type: r, operator: e, left: t, right: n }; }, unaryExpression: function (e, t) { return { type: "UnaryExpression", operator: e, argument: t }; }, memberExpression: function (e, t, n) { return { type: "MemberExpression", indexer: t, identifier: n, base: e }; }, indexExpression: function (e, t) { return { type: "IndexExpression", base: e, index: t }; }, callExpression: function (e, t) { return { type: "CallExpression", base: e, arguments: t }; }, tableCallExpression: function (e, t) { return { type: "TableCallExpression", base: e, arguments: t }; }, stringCallExpression: function (e, t) { return { type: "StringCallExpression", base: e, argument: t }; }, comment: function (e, t) { return { type: "Comment", value: e, raw: t }; } }, x = Array.prototype.slice, T = Object.prototype.toString, N = function (e, t) { for (var n = 0, r = e.length; n < r; ++n)
        if (e[n] === t)
            return n; return -1; };
    Array.prototype.indexOf && (N = function (e, t) { return e.indexOf(t); });
    var L = function (e) { var t = x.call(arguments, 1), n, r; for (var i = 0, s = t.length; i < s; ++i) {
        n = t[i];
        for (r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    } return e; };
    Object.assign && (L = Object.assign), e.SyntaxError = SyntaxError;
    var P, H, B, j, F, I, q, R;
    e.lex = U;
    var gt, yt, bt, Ct = [], kt;
    At.prototype.complete = function () { n.locations && (this.loc.end.line = B.lastLine || B.line, this.loc.end.column = B.range[1] - (B.lastLineStart || B.lineStart)), n.ranges && (this.range[1] = B.range[1]); }, At.prototype.bless = function (e) { if (this.loc) {
        var t = this.loc;
        e.loc = { start: { line: t.start.line, column: t.start.column }, end: { line: t.end.line, column: t.end.column } };
    } this.range && (e.range = [this.range[0], this.range[1]]); }, _t.prototype.isInLoop = function () { var e = this.scopes.length; while (e-- > 0)
        if (this.scopes[e].isLoop)
            return !0; return !1; }, _t.prototype.pushScope = function (e) { var t = { labels: {}, locals: [], deferredGotos: [], isLoop: !!e }; this.scopes.push(t); }, _t.prototype.popScope = function () { for (var e = 0; e < this.pendingGotos.length; ++e) {
        var t = this.pendingGotos[e];
        t.maxDepth >= this.scopes.length && --t.maxDepth <= 0 && O(t.token, w.labelNotVisible, t.target);
    } this.scopes.pop(); }, _t.prototype.addGoto = function (e, t) { var n = []; for (var r = 0; r < this.scopes.length; ++r) {
        var i = this.scopes[r];
        n.push(i.locals.length);
        if (Object.prototype.hasOwnProperty.call(i.labels, e))
            return;
    } this.pendingGotos.push({ maxDepth: this.scopes.length, target: e, token: t, localCounts: n }); }, _t.prototype.addLabel = function (e, t) { var n = this.currentScope(); if (Object.prototype.hasOwnProperty.call(n.labels, e))
        O(t, w.labelAlreadyDefined, e, n.labels[e].line);
    else {
        var r = [];
        for (var i = 0; i < this.pendingGotos.length; ++i) {
            var s = this.pendingGotos[i];
            if (s.maxDepth >= this.scopes.length && s.target === e) {
                s.localCounts[this.scopes.length - 1] < n.locals.length && n.deferredGotos.push(s);
                continue;
            }
            r.push(s);
        }
        this.pendingGotos = r;
    } n.labels[e] = { localCount: n.locals.length, line: t.line }; }, _t.prototype.addLocal = function (e, t) { this.currentScope().locals.push({ name: e, token: t }); }, _t.prototype.currentScope = function () { return this.scopes[this.scopes.length - 1]; }, _t.prototype.raiseDeferredErrors = function () { var e = this.currentScope(), t = e.deferredGotos; for (var n = 0; n < t.length; ++n) {
        var r = t[n];
        O(r.token, w.gotoJumpInLocalScope, r.target, e.locals[r.localCounts[this.scopes.length - 1]].name);
    } }, Dt.prototype.isInLoop = function () { return !!this.loopLevels.length; }, Dt.prototype.pushScope = function (e) { ++this.level, e && this.loopLevels.push(this.level); }, Dt.prototype.popScope = function () { var e = this.loopLevels, t = e.length; t && e[t - 1] === this.level && e.pop(), --this.level; }, Dt.prototype.addGoto = Dt.prototype.addLabel = function () { throw new Error("This should never happen"); }, Dt.prototype.addLocal = Dt.prototype.raiseDeferredErrors = function () { }, e.parse = fn;
    var an = { 5.1: {}, 5.2: { labels: !0, emptyStatement: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, relaxedBreak: !0 }, 5.3: { labels: !0, emptyStatement: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, unicodeEscapes: !0, bitwiseOperators: !0, integerDivision: !0, relaxedBreak: !0 }, LuaJIT: { labels: !0, contextualGoto: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, unicodeEscapes: !0, imaginaryNumbers: !0, integerSuffixes: !0 } };
    e.write = ln, e.end = cn;
}); }), ace.define("ace/mode/lua_worker", [], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("../worker/mirror").Mirror, s = e("../mode/lua/luaparse"), o = t.Worker = function (e) { i.call(this, e), this.setTimeout(500); };
    r.inherits(o, i), function () { this.onUpdate = function () { var e = this.doc.getValue(), t = []; try {
        s.parse(e);
    }
    catch (n) {
        n instanceof s.SyntaxError && t.push({ row: n.line - 1, column: n.column, text: n.message, type: "error" });
    } this.sender.emit("annotate", t); }; }.call(o.prototype);
});
