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
}), ace.define("ace/mode/css/csslint", [], function (e, t, n) { var r = function () { function s(e, t, n, r) {
    "use strict";
    this.messages = [], this.stats = [], this.lines = e, this.ruleset = t, this.allow = n, this.allow || (this.allow = {}), this.ignore = r, this.ignore || (this.ignore = []);
} var e = e || {}, t = t || {}, n = function () { var e; return e = function () { function t(n, r, i) { function s(u, a) { if (!r[u]) {
    if (!n[u]) {
        var f = "function" == typeof e && e;
        if (!a && f)
            return f(u, !0);
        if (o)
            return o(u, !0);
        var l = new Error("Cannot find module '" + u + "'");
        throw l.code = "MODULE_NOT_FOUND", l;
    }
    var c = r[u] = { exports: {} };
    n[u][0].call(c.exports, function (e) { var t = n[u][1][e]; return s(t || e); }, c, c.exports, t, n, r, i);
} return r[u].exports; } for (var o = "function" == typeof e && e, u = 0; u < i.length; u++)
    s(i[u]); return s; } return t; }()({ 1: [function (e, t, n) {
            "use strict";
            var r = t.exports = { __proto__: null, aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aqua: "#00ffff", aquamarine: "#7fffd4", azure: "#f0ffff", beige: "#f5f5dc", bisque: "#ffe4c4", black: "#000000", blanchedalmond: "#ffebcd", blue: "#0000ff", blueviolet: "#8a2be2", brown: "#a52a2a", burlywood: "#deb887", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", cornflowerblue: "#6495ed", cornsilk: "#fff8dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b", darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000", darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3", deeppink: "#ff1493", deepskyblue: "#00bfff", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1e90ff", firebrick: "#b22222", floralwhite: "#fffaf0", forestgreen: "#228b22", fuchsia: "#ff00ff", gainsboro: "#dcdcdc", ghostwhite: "#f8f8ff", gold: "#ffd700", goldenrod: "#daa520", gray: "#808080", green: "#008000", greenyellow: "#adff2f", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c", indigo: "#4b0082", ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2", lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0", lime: "#00ff00", limegreen: "#32cd32", linen: "#faf0e6", magenta: "#ff00ff", maroon: "#800000", mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db", mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a", mediumturquoise: "#48d1cc", mediumvioletred: "#c71585", midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", navajowhite: "#ffdead", navy: "#000080", oldlace: "#fdf5e6", olive: "#808000", olivedrab: "#6b8e23", orange: "#ffa500", orangered: "#ff4500", orchid: "#da70d6", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee", palevioletred: "#db7093", papayawhip: "#ffefd5", peachpuff: "#ffdab9", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", powderblue: "#b0e0e6", purple: "#800080", rebeccapurple: "#663399", red: "#ff0000", rosybrown: "#bc8f8f", royalblue: "#4169e1", saddlebrown: "#8b4513", salmon: "#fa8072", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee", sienna: "#a0522d", silver: "#c0c0c0", skyblue: "#87ceeb", slateblue: "#6a5acd", slategray: "#708090", slategrey: "#708090", snow: "#fffafa", springgreen: "#00ff7f", steelblue: "#4682b4", tan: "#d2b48c", teal: "#008080", thistle: "#d8bfd8", tomato: "#ff6347", turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3", white: "#ffffff", whitesmoke: "#f5f5f5", yellow: "#ffff00", yellowgreen: "#9acd32", currentColor: "The value of the 'color' property.", activeborder: "Active window border.", activecaption: "Active window caption.", appworkspace: "Background color of multiple document interface.", background: "Desktop background.", buttonface: "The face background color for 3-D elements that appear 3-D due to one layer of surrounding border.", buttonhighlight: "The color of the border facing the light source for 3-D elements that appear 3-D due to one layer of surrounding border.", buttonshadow: "The color of the border away from the light source for 3-D elements that appear 3-D due to one layer of surrounding border.", buttontext: "Text on push buttons.", captiontext: "Text in caption, size box, and scrollbar arrow box.", graytext: "Grayed (disabled) text. This color is set to #000 if the current display driver does not support a solid gray color.", greytext: "Greyed (disabled) text. This color is set to #000 if the current display driver does not support a solid grey color.", highlight: "Item(s) selected in a control.", highlighttext: "Text of item(s) selected in a control.", inactiveborder: "Inactive window border.", inactivecaption: "Inactive window caption.", inactivecaptiontext: "Color of text in an inactive caption.", infobackground: "Background color for tooltip controls.", infotext: "Text color for tooltip controls.", menu: "Menu background.", menutext: "Text in menus.", scrollbar: "Scroll bar gray area.", threeddarkshadow: "The color of the darker (generally outer) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.", threedface: "The face background color for 3-D elements that appear 3-D due to two concentric layers of surrounding border.", threedhighlight: "The color of the lighter (generally outer) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.", threedlightshadow: "The color of the darker (generally inner) of the two borders facing the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.", threedshadow: "The color of the lighter (generally inner) of the two borders away from the light source for 3-D elements that appear 3-D due to two concentric layers of surrounding border.", window: "Window background.", windowframe: "Window frame.", windowtext: "Text in windows." };
        }, {}], 2: [function (e, t, n) {
            "use strict";
            function s(e, t, n) { r.call(this, e, t, n, i.COMBINATOR_TYPE), this.type = "unknown", /^\s+$/.test(e) ? this.type = "descendant" : e === ">" ? this.type = "child" : e === "+" ? this.type = "adjacent-sibling" : e === "~" && (this.type = "sibling"); }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 3: [function (e, t, n) {
            "use strict";
            function s(e, t) { this.match = function (t) { var n; return t.mark(), n = e(t), n ? t.drop() : t.restore(), n; }, this.toString = typeof t == "function" ? t : function () { return t; }; }
            t.exports = s;
            var r = e("../util/StringReader"), i = e("../util/SyntaxError");
            s.prec = { MOD: 5, SEQ: 4, ANDAND: 3, OROR: 2, ALT: 1 }, s.parse = function (e) { var t, n, o, u, a, f, l, c, h; t = new r(e), n = function (e) { var n = t.readMatch(e); if (n === null)
                throw new i("Expected " + e, t.getLine(), t.getCol()); return n; }, o = function () { var e = [u()]; while (t.readMatch(" | ") !== null)
                e.push(u()); return e.length === 1 ? e[0] : s.alt.apply(s, e); }, u = function () { var e = [a()]; while (t.readMatch(" || ") !== null)
                e.push(a()); return e.length === 1 ? e[0] : s.oror.apply(s, e); }, a = function () { var e = [f()]; while (t.readMatch(" && ") !== null)
                e.push(f()); return e.length === 1 ? e[0] : s.andand.apply(s, e); }, f = function () { var e = [l()]; while (t.readMatch(/^ (?![&|\]])/) !== null)
                e.push(l()); return e.length === 1 ? e[0] : s.seq.apply(s, e); }, l = function () { var e = c(); if (t.readMatch("?") !== null)
                return e.question(); if (t.readMatch("*") !== null)
                return e.star(); if (t.readMatch("+") !== null)
                return e.plus(); if (t.readMatch("#") !== null)
                return e.hash(); if (t.readMatch(/^\{\s*/) !== null) {
                var r = n(/^\d+/);
                n(/^\s*,\s*/);
                var i = n(/^\d+/);
                return n(/^\s*\}/), e.braces(Number(r), Number(i));
            } return e; }, c = function () { if (t.readMatch("[ ") !== null) {
                var e = o();
                return n(" ]"), e;
            } return s.fromType(n(/^[^ ?*+#{]+/)); }, h = o(); if (!t.eof())
                throw new i("Expected end of string", t.getLine(), t.getCol()); return h; }, s.cast = function (e) { return e instanceof s ? e : s.parse(e); }, s.fromType = function (t) { var n = e("./ValidationTypes"); return new s(function (e) { return e.hasNext() && n.isType(e, t); }, t); }, s.seq = function () { var e = Array.prototype.slice.call(arguments).map(s.cast); return e.length === 1 ? e[0] : new s(function (t) { var n, r = !0; for (n = 0; r && n < e.length; n++)
                r = e[n].match(t); return r; }, function (t) { var n = s.prec.SEQ, r = e.map(function (e) { return e.toString(n); }).join(" "); return t > n && (r = "[ " + r + " ]"), r; }); }, s.alt = function () { var e = Array.prototype.slice.call(arguments).map(s.cast); return e.length === 1 ? e[0] : new s(function (t) { var n, r = !1; for (n = 0; !r && n < e.length; n++)
                r = e[n].match(t); return r; }, function (t) { var n = s.prec.ALT, r = e.map(function (e) { return e.toString(n); }).join(" | "); return t > n && (r = "[ " + r + " ]"), r; }); }, s.many = function (t) { var n = Array.prototype.slice.call(arguments, 1).reduce(function (t, n) { if (n.expand) {
                var r = e("./ValidationTypes");
                t.push.apply(t, r.complex[n.expand].options);
            }
            else
                t.push(s.cast(n)); return t; }, []); t === !0 && (t = n.map(function () { return !0; })); var r = new s(function (e) { var r = [], i = 0, s = 0, o = function (e) { return s === 0 ? (i = Math.max(e, i), e === n.length) : e === i; }, u = function (i) { for (var s = 0; s < n.length; s++) {
                if (r[s])
                    continue;
                e.mark();
                if (n[s].match(e)) {
                    r[s] = !0;
                    if (u(i + (t === !1 || t[s] ? 1 : 0)))
                        return e.drop(), !0;
                    e.restore(), r[s] = !1;
                }
                else
                    e.drop();
            } return o(i); }; u(0) || (s++, u(0)); if (t === !1)
                return i > 0; for (var a = 0; a < n.length; a++)
                if (t[a] && !r[a])
                    return !1; return !0; }, function (e) { var r = t === !1 ? s.prec.OROR : s.prec.ANDAND, i = n.map(function (e, n) { return t !== !1 && !t[n] ? e.toString(s.prec.MOD) + "?" : e.toString(r); }).join(t === !1 ? " || " : " && "); return e > r && (i = "[ " + i + " ]"), i; }); return r.options = n, r; }, s.andand = function () { var e = Array.prototype.slice.call(arguments); return e.unshift(!0), s.many.apply(s, e); }, s.oror = function () { var e = Array.prototype.slice.call(arguments); return e.unshift(!1), s.many.apply(s, e); }, s.prototype = { constructor: s, match: function () { throw new Error("unimplemented"); }, toString: function () { throw new Error("unimplemented"); }, func: function () { return this.match.bind(this); }, then: function (e) { return s.seq(this, e); }, or: function (e) { return s.alt(this, e); }, andand: function (e) { return s.many(!0, this, e); }, oror: function (e) { return s.many(!1, this, e); }, star: function () { return this.braces(0, Infinity, "*"); }, plus: function () { return this.braces(1, Infinity, "+"); }, question: function () { return this.braces(0, 1, "?"); }, hash: function () { return this.braces(1, Infinity, "#", s.cast(",")); }, braces: function (e, t, n, r) { var i = this, o = r ? r.then(this) : this; return n || (n = "{" + e + "," + t + "}"), new s(function (n) { var s = !0, u; for (u = 0; u < t; u++) {
                    u > 0 && r ? s = o.match(n) : s = i.match(n);
                    if (!s)
                        break;
                } return u >= e; }, function () { return i.toString(s.prec.MOD) + n; }); } };
        }, { "../util/StringReader": 24, "../util/SyntaxError": 25, "./ValidationTypes": 21 }], 4: [function (e, t, n) {
            "use strict";
            function s(e, t) { r.call(this, "(" + e + (t !== null ? ":" + t : "") + ")", e.startLine, e.startCol, i.MEDIA_FEATURE_TYPE), this.name = e, this.value = t; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 5: [function (e, t, n) {
            "use strict";
            function s(e, t, n, s, o) { r.call(this, (e ? e + " " : "") + (t ? t : "") + (t && n.length > 0 ? " and " : "") + n.join(" and "), s, o, i.MEDIA_QUERY_TYPE), this.modifier = e, this.mediaType = t, this.features = n; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 6: [function (e, t, n) {
            "use strict";
            function y(e) { r.call(this), this.options = e || {}, this._tokenStream = null; }
            t.exports = y;
            var r = e("../util/EventTarget"), i = e("../util/SyntaxError"), s = e("../util/SyntaxUnit"), o = e("./Combinator"), u = e("./MediaFeature"), a = e("./MediaQuery"), f = e("./PropertyName"), l = e("./PropertyValue"), c = e("./PropertyValuePart"), h = e("./Selector"), p = e("./SelectorPart"), d = e("./SelectorSubPart"), v = e("./TokenStream"), m = e("./Tokens"), g = e("./Validation");
            y.DEFAULT_TYPE = 0, y.COMBINATOR_TYPE = 1, y.MEDIA_FEATURE_TYPE = 2, y.MEDIA_QUERY_TYPE = 3, y.PROPERTY_NAME_TYPE = 4, y.PROPERTY_VALUE_TYPE = 5, y.PROPERTY_VALUE_PART_TYPE = 6, y.SELECTOR_TYPE = 7, y.SELECTOR_PART_TYPE = 8, y.SELECTOR_SUB_PART_TYPE = 9, y.prototype = function () { var e = new r, t, n = { __proto__: null, constructor: y, DEFAULT_TYPE: 0, COMBINATOR_TYPE: 1, MEDIA_FEATURE_TYPE: 2, MEDIA_QUERY_TYPE: 3, PROPERTY_NAME_TYPE: 4, PROPERTY_VALUE_TYPE: 5, PROPERTY_VALUE_PART_TYPE: 6, SELECTOR_TYPE: 7, SELECTOR_PART_TYPE: 8, SELECTOR_SUB_PART_TYPE: 9, _stylesheet: function () { var e = this._tokenStream, t, n, r; this.fire("startstylesheet"), this._charset(), this._skipCruft(); while (e.peek() === m.IMPORT_SYM)
                    this._import(), this._skipCruft(); while (e.peek() === m.NAMESPACE_SYM)
                    this._namespace(), this._skipCruft(); r = e.peek(); while (r > m.EOF) {
                    try {
                        switch (r) {
                            case m.MEDIA_SYM:
                                this._media(), this._skipCruft();
                                break;
                            case m.PAGE_SYM:
                                this._page(), this._skipCruft();
                                break;
                            case m.FONT_FACE_SYM:
                                this._font_face(), this._skipCruft();
                                break;
                            case m.KEYFRAMES_SYM:
                                this._keyframes(), this._skipCruft();
                                break;
                            case m.VIEWPORT_SYM:
                                this._viewport(), this._skipCruft();
                                break;
                            case m.DOCUMENT_SYM:
                                this._document(), this._skipCruft();
                                break;
                            case m.SUPPORTS_SYM:
                                this._supports(), this._skipCruft();
                                break;
                            case m.UNKNOWN_SYM:
                                e.get();
                                if (!!this.options.strict)
                                    throw new i("Unknown @ rule.", e.LT(0).startLine, e.LT(0).startCol);
                                this.fire({ type: "error", error: null, message: "Unknown @ rule: " + e.LT(0).value + ".", line: e.LT(0).startLine, col: e.LT(0).startCol }), t = 0;
                                while (e.advance([m.LBRACE, m.RBRACE]) === m.LBRACE)
                                    t++;
                                while (t)
                                    e.advance([m.RBRACE]), t--;
                                break;
                            case m.S:
                                this._readWhitespace();
                                break;
                            default: if (!this._ruleset())
                                switch (r) {
                                    case m.CHARSET_SYM: throw n = e.LT(1), this._charset(!1), new i("@charset not allowed here.", n.startLine, n.startCol);
                                    case m.IMPORT_SYM: throw n = e.LT(1), this._import(!1), new i("@import not allowed here.", n.startLine, n.startCol);
                                    case m.NAMESPACE_SYM: throw n = e.LT(1), this._namespace(!1), new i("@namespace not allowed here.", n.startLine, n.startCol);
                                    default: e.get(), this._unexpectedToken(e.token());
                                }
                        }
                    }
                    catch (s) {
                        if (!(s instanceof i && !this.options.strict))
                            throw s;
                        this.fire({ type: "error", error: s, message: s.message, line: s.line, col: s.col });
                    }
                    r = e.peek();
                } r !== m.EOF && this._unexpectedToken(e.token()), this.fire("endstylesheet"); }, _charset: function (e) { var t = this._tokenStream, n, r, i, s; t.match(m.CHARSET_SYM) && (i = t.token().startLine, s = t.token().startCol, this._readWhitespace(), t.mustMatch(m.STRING), r = t.token(), n = r.value, this._readWhitespace(), t.mustMatch(m.SEMICOLON), e !== !1 && this.fire({ type: "charset", charset: n, line: i, col: s })); }, _import: function (e) { var t = this._tokenStream, n, r, i = []; t.mustMatch(m.IMPORT_SYM), r = t.token(), this._readWhitespace(), t.mustMatch([m.STRING, m.URI]), n = t.token().value.replace(/^(?:url\()?["']?([^"']+?)["']?\)?$/, "$1"), this._readWhitespace(), i = this._media_query_list(), t.mustMatch(m.SEMICOLON), this._readWhitespace(), e !== !1 && this.fire({ type: "import", uri: n, media: i, line: r.startLine, col: r.startCol }); }, _namespace: function (e) { var t = this._tokenStream, n, r, i, s; t.mustMatch(m.NAMESPACE_SYM), n = t.token().startLine, r = t.token().startCol, this._readWhitespace(), t.match(m.IDENT) && (i = t.token().value, this._readWhitespace()), t.mustMatch([m.STRING, m.URI]), s = t.token().value.replace(/(?:url\()?["']([^"']+)["']\)?/, "$1"), this._readWhitespace(), t.mustMatch(m.SEMICOLON), this._readWhitespace(), e !== !1 && this.fire({ type: "namespace", prefix: i, uri: s, line: n, col: r }); }, _supports: function (e) { var t = this._tokenStream, n, r; if (t.match(m.SUPPORTS_SYM)) {
                    n = t.token().startLine, r = t.token().startCol, this._readWhitespace(), this._supports_condition(), this._readWhitespace(), t.mustMatch(m.LBRACE), this._readWhitespace(), e !== !1 && this.fire({ type: "startsupports", line: n, col: r });
                    for (;;)
                        if (!this._ruleset())
                            break;
                    t.mustMatch(m.RBRACE), this._readWhitespace(), this.fire({ type: "endsupports", line: n, col: r });
                } }, _supports_condition: function () { var e = this._tokenStream, t; if (e.match(m.IDENT))
                    t = e.token().value.toLowerCase(), t === "not" ? (e.mustMatch(m.S), this._supports_condition_in_parens()) : e.unget();
                else {
                    this._supports_condition_in_parens(), this._readWhitespace();
                    while (e.peek() === m.IDENT) {
                        t = e.LT(1).value.toLowerCase();
                        if (t === "and" || t === "or")
                            e.mustMatch(m.IDENT), this._readWhitespace(), this._supports_condition_in_parens(), this._readWhitespace();
                    }
                } }, _supports_condition_in_parens: function () { var e = this._tokenStream, t; e.match(m.LPAREN) ? (this._readWhitespace(), e.match(m.IDENT) ? (t = e.token().value.toLowerCase(), t === "not" ? (this._readWhitespace(), this._supports_condition(), this._readWhitespace(), e.mustMatch(m.RPAREN)) : (e.unget(), this._supports_declaration_condition(!1))) : (this._supports_condition(), this._readWhitespace(), e.mustMatch(m.RPAREN))) : this._supports_declaration_condition(); }, _supports_declaration_condition: function (e) { var t = this._tokenStream; e !== !1 && t.mustMatch(m.LPAREN), this._readWhitespace(), this._declaration(), t.mustMatch(m.RPAREN); }, _media: function () { var e = this._tokenStream, t, n, r; e.mustMatch(m.MEDIA_SYM), t = e.token().startLine, n = e.token().startCol, this._readWhitespace(), r = this._media_query_list(), e.mustMatch(m.LBRACE), this._readWhitespace(), this.fire({ type: "startmedia", media: r, line: t, col: n }); for (;;)
                    if (e.peek() === m.PAGE_SYM)
                        this._page();
                    else if (e.peek() === m.FONT_FACE_SYM)
                        this._font_face();
                    else if (e.peek() === m.VIEWPORT_SYM)
                        this._viewport();
                    else if (e.peek() === m.DOCUMENT_SYM)
                        this._document();
                    else if (e.peek() === m.SUPPORTS_SYM)
                        this._supports();
                    else if (e.peek() === m.MEDIA_SYM)
                        this._media();
                    else if (!this._ruleset())
                        break; e.mustMatch(m.RBRACE), this._readWhitespace(), this.fire({ type: "endmedia", media: r, line: t, col: n }); }, _media_query_list: function () { var e = this._tokenStream, t = []; this._readWhitespace(), (e.peek() === m.IDENT || e.peek() === m.LPAREN) && t.push(this._media_query()); while (e.match(m.COMMA))
                    this._readWhitespace(), t.push(this._media_query()); return t; }, _media_query: function () { var e = this._tokenStream, t = null, n = null, r = null, i = []; e.match(m.IDENT) && (n = e.token().value.toLowerCase(), n !== "only" && n !== "not" ? (e.unget(), n = null) : r = e.token()), this._readWhitespace(), e.peek() === m.IDENT ? (t = this._media_type(), r === null && (r = e.token())) : e.peek() === m.LPAREN && (r === null && (r = e.LT(1)), i.push(this._media_expression())); if (t === null && i.length === 0)
                    return null; this._readWhitespace(); while (e.match(m.IDENT))
                    e.token().value.toLowerCase() !== "and" && this._unexpectedToken(e.token()), this._readWhitespace(), i.push(this._media_expression()); return new a(n, t, i, r.startLine, r.startCol); }, _media_type: function () { return this._media_feature(); }, _media_expression: function () { var e = this._tokenStream, t = null, n, r = null; return e.mustMatch(m.LPAREN), this._readWhitespace(), t = this._media_feature(), this._readWhitespace(), e.match(m.COLON) && (this._readWhitespace(), n = e.LT(1), r = this._expression()), e.mustMatch(m.RPAREN), this._readWhitespace(), new u(t, r ? new s(r, n.startLine, n.startCol) : null); }, _media_feature: function () { var e = this._tokenStream; return this._readWhitespace(), e.mustMatch(m.IDENT), s.fromToken(e.token()); }, _page: function () { var e = this._tokenStream, t, n, r = null, i = null; e.mustMatch(m.PAGE_SYM), t = e.token().startLine, n = e.token().startCol, this._readWhitespace(), e.match(m.IDENT) && (r = e.token().value, r.toLowerCase() === "auto" && this._unexpectedToken(e.token())), e.peek() === m.COLON && (i = this._pseudo_page()), this._readWhitespace(), this.fire({ type: "startpage", id: r, pseudo: i, line: t, col: n }), this._readDeclarations(!0, !0), this.fire({ type: "endpage", id: r, pseudo: i, line: t, col: n }); }, _margin: function () { var e = this._tokenStream, t, n, r = this._margin_sym(); return r ? (t = e.token().startLine, n = e.token().startCol, this.fire({ type: "startpagemargin", margin: r, line: t, col: n }), this._readDeclarations(!0), this.fire({ type: "endpagemargin", margin: r, line: t, col: n }), !0) : !1; }, _margin_sym: function () { var e = this._tokenStream; return e.match([m.TOPLEFTCORNER_SYM, m.TOPLEFT_SYM, m.TOPCENTER_SYM, m.TOPRIGHT_SYM, m.TOPRIGHTCORNER_SYM, m.BOTTOMLEFTCORNER_SYM, m.BOTTOMLEFT_SYM, m.BOTTOMCENTER_SYM, m.BOTTOMRIGHT_SYM, m.BOTTOMRIGHTCORNER_SYM, m.LEFTTOP_SYM, m.LEFTMIDDLE_SYM, m.LEFTBOTTOM_SYM, m.RIGHTTOP_SYM, m.RIGHTMIDDLE_SYM, m.RIGHTBOTTOM_SYM]) ? s.fromToken(e.token()) : null; }, _pseudo_page: function () { var e = this._tokenStream; return e.mustMatch(m.COLON), e.mustMatch(m.IDENT), e.token().value; }, _font_face: function () { var e = this._tokenStream, t, n; e.mustMatch(m.FONT_FACE_SYM), t = e.token().startLine, n = e.token().startCol, this._readWhitespace(), this.fire({ type: "startfontface", line: t, col: n }), this._readDeclarations(!0), this.fire({ type: "endfontface", line: t, col: n }); }, _viewport: function () { var e = this._tokenStream, t, n; e.mustMatch(m.VIEWPORT_SYM), t = e.token().startLine, n = e.token().startCol, this._readWhitespace(), this.fire({ type: "startviewport", line: t, col: n }), this._readDeclarations(!0), this.fire({ type: "endviewport", line: t, col: n }); }, _document: function () { var e = this._tokenStream, t, n = [], r = ""; e.mustMatch(m.DOCUMENT_SYM), t = e.token(), /^@-([^-]+)-/.test(t.value) && (r = RegExp.$1), this._readWhitespace(), n.push(this._document_function()); while (e.match(m.COMMA))
                    this._readWhitespace(), n.push(this._document_function()); e.mustMatch(m.LBRACE), this._readWhitespace(), this.fire({ type: "startdocument", functions: n, prefix: r, line: t.startLine, col: t.startCol }); var i = !0; while (i)
                    switch (e.peek()) {
                        case m.PAGE_SYM:
                            this._page();
                            break;
                        case m.FONT_FACE_SYM:
                            this._font_face();
                            break;
                        case m.VIEWPORT_SYM:
                            this._viewport();
                            break;
                        case m.MEDIA_SYM:
                            this._media();
                            break;
                        case m.KEYFRAMES_SYM:
                            this._keyframes();
                            break;
                        case m.DOCUMENT_SYM:
                            this._document();
                            break;
                        default: i = Boolean(this._ruleset());
                    } e.mustMatch(m.RBRACE), t = e.token(), this._readWhitespace(), this.fire({ type: "enddocument", functions: n, prefix: r, line: t.startLine, col: t.startCol }); }, _document_function: function () { var e = this._tokenStream, t; return e.match(m.URI) ? (t = e.token().value, this._readWhitespace()) : t = this._function(), t; }, _operator: function (e) { var t = this._tokenStream, n = null; if (t.match([m.SLASH, m.COMMA]) || e && t.match([m.PLUS, m.STAR, m.MINUS]))
                    n = t.token(), this._readWhitespace(); return n ? c.fromToken(n) : null; }, _combinator: function () { var e = this._tokenStream, t = null, n; return e.match([m.PLUS, m.GREATER, m.TILDE]) && (n = e.token(), t = new o(n.value, n.startLine, n.startCol), this._readWhitespace()), t; }, _unary_operator: function () { var e = this._tokenStream; return e.match([m.MINUS, m.PLUS]) ? e.token().value : null; }, _property: function () { var e = this._tokenStream, t = null, n = null, r = "", i, s, o; return e.peek() === m.STAR && this.options.starHack && (e.get(), i = e.token(), n = i.value, s = i.startLine, o = i.startCol), e.peek() === m.MINUS && (e.get(), i = e.token(), r = i.value, s = i.startLine, o = i.startCol), e.match(m.IDENT) ? (i = e.token(), r += i.value, r.charAt(0) === "_" && this.options.underscoreHack && (n = "_", r = r.substring(1)), t = new f(r, n, s || i.startLine, o || i.startCol), this._readWhitespace()) : e.peek() !== m.RBRACE && this._unexpectedToken(e.LT(1)), t; }, _ruleset: function () { var e = this._tokenStream, t, n; try {
                    n = this._selectors_group();
                }
                catch (r) {
                    if (r instanceof i && !this.options.strict) {
                        this.fire({ type: "error", error: r, message: r.message, line: r.line, col: r.col }), t = e.advance([m.RBRACE]);
                        if (t !== m.RBRACE)
                            throw r;
                        return !0;
                    }
                    throw r;
                } return n && (this.fire({ type: "startrule", selectors: n, line: n[0].line, col: n[0].col }), this._readDeclarations(!0), this.fire({ type: "endrule", selectors: n, line: n[0].line, col: n[0].col })), n; }, _selectors_group: function () { var e = this._tokenStream, t = [], n; n = this._selector(); if (n !== null) {
                    t.push(n);
                    while (e.match(m.COMMA))
                        this._readWhitespace(), n = this._selector(), n !== null ? t.push(n) : this._unexpectedToken(e.LT(1));
                } return t.length ? t : null; }, _selector: function () { var e = this._tokenStream, t = [], n = null, r = null, i = null; n = this._simple_selector_sequence(); if (n === null)
                    return null; t.push(n); do {
                    r = this._combinator();
                    if (r !== null)
                        t.push(r), n = this._simple_selector_sequence(), n === null ? this._unexpectedToken(e.LT(1)) : t.push(n);
                    else {
                        if (!this._readWhitespace())
                            break;
                        i = new o(e.token().value, e.token().startLine, e.token().startCol), r = this._combinator(), n = this._simple_selector_sequence(), n === null ? r !== null && this._unexpectedToken(e.LT(1)) : (r !== null ? t.push(r) : t.push(i), t.push(n));
                    }
                } while (!0); return new h(t, t[0].line, t[0].col); }, _simple_selector_sequence: function () { var e = this._tokenStream, t = null, n = [], r = "", i = [function () { return e.match(m.HASH) ? new d(e.token().value, "id", e.token().startLine, e.token().startCol) : null; }, this._class, this._attrib, this._pseudo, this._negation], s = 0, o = i.length, u = null, a, f; a = e.LT(1).startLine, f = e.LT(1).startCol, t = this._type_selector(), t || (t = this._universal()), t !== null && (r += t); for (;;) {
                    if (e.peek() === m.S)
                        break;
                    while (s < o && u === null)
                        u = i[s++].call(this);
                    if (u === null) {
                        if (r === "")
                            return null;
                        break;
                    }
                    s = 0, n.push(u), r += u.toString(), u = null;
                } return r !== "" ? new p(t, n, r, a, f) : null; }, _type_selector: function () { var e = this._tokenStream, t = this._namespace_prefix(), n = this._element_name(); return n ? (t && (n.text = t + n.text, n.col -= t.length), n) : (t && (e.unget(), t.length > 1 && e.unget()), null); }, _class: function () { var e = this._tokenStream, t; return e.match(m.DOT) ? (e.mustMatch(m.IDENT), t = e.token(), new d("." + t.value, "class", t.startLine, t.startCol - 1)) : null; }, _element_name: function () { var e = this._tokenStream, t; return e.match(m.IDENT) ? (t = e.token(), new d(t.value, "elementName", t.startLine, t.startCol)) : null; }, _namespace_prefix: function () { var e = this._tokenStream, t = ""; if (e.LA(1) === m.PIPE || e.LA(2) === m.PIPE)
                    e.match([m.IDENT, m.STAR]) && (t += e.token().value), e.mustMatch(m.PIPE), t += "|"; return t.length ? t : null; }, _universal: function () { var e = this._tokenStream, t = "", n; return n = this._namespace_prefix(), n && (t += n), e.match(m.STAR) && (t += "*"), t.length ? t : null; }, _attrib: function () { var e = this._tokenStream, t = null, n, r; return e.match(m.LBRACKET) ? (r = e.token(), t = r.value, t += this._readWhitespace(), n = this._namespace_prefix(), n && (t += n), e.mustMatch(m.IDENT), t += e.token().value, t += this._readWhitespace(), e.match([m.PREFIXMATCH, m.SUFFIXMATCH, m.SUBSTRINGMATCH, m.EQUALS, m.INCLUDES, m.DASHMATCH]) && (t += e.token().value, t += this._readWhitespace(), e.mustMatch([m.IDENT, m.STRING]), t += e.token().value, t += this._readWhitespace()), e.mustMatch(m.RBRACKET), new d(t + "]", "attribute", r.startLine, r.startCol)) : null; }, _pseudo: function () { var e = this._tokenStream, t = null, n = ":", r, s; if (e.match(m.COLON)) {
                    e.match(m.COLON) && (n += ":"), e.match(m.IDENT) ? (t = e.token().value, r = e.token().startLine, s = e.token().startCol - n.length) : e.peek() === m.FUNCTION && (r = e.LT(1).startLine, s = e.LT(1).startCol - n.length, t = this._functional_pseudo());
                    if (!t) {
                        var o = e.LT(1).startLine, u = e.LT(0).startCol;
                        throw new i("Expected a `FUNCTION` or `IDENT` after colon at line " + o + ", col " + u + ".", o, u);
                    }
                    t = new d(n + t, "pseudo", r, s);
                } return t; }, _functional_pseudo: function () { var e = this._tokenStream, t = null; return e.match(m.FUNCTION) && (t = e.token().value, t += this._readWhitespace(), t += this._expression(), e.mustMatch(m.RPAREN), t += ")"), t; }, _expression: function () { var e = this._tokenStream, t = ""; while (e.match([m.PLUS, m.MINUS, m.DIMENSION, m.NUMBER, m.STRING, m.IDENT, m.LENGTH, m.FREQ, m.ANGLE, m.TIME, m.RESOLUTION, m.SLASH]))
                    t += e.token().value, t += this._readWhitespace(); return t.length ? t : null; }, _negation: function () { var e = this._tokenStream, t, n, r = "", i, s = null; return e.match(m.NOT) && (r = e.token().value, t = e.token().startLine, n = e.token().startCol, r += this._readWhitespace(), i = this._negation_arg(), r += i, r += this._readWhitespace(), e.match(m.RPAREN), r += e.token().value, s = new d(r, "not", t, n), s.args.push(i)), s; }, _negation_arg: function () { var e = this._tokenStream, t = [this._type_selector, this._universal, function () { return e.match(m.HASH) ? new d(e.token().value, "id", e.token().startLine, e.token().startCol) : null; }, this._class, this._attrib, this._pseudo], n = null, r = 0, i = t.length, s, o, u; s = e.LT(1).startLine, o = e.LT(1).startCol; while (r < i && n === null)
                    n = t[r].call(this), r++; return n === null && this._unexpectedToken(e.LT(1)), n.type === "elementName" ? u = new p(n, [], n.toString(), s, o) : u = new p(null, [n], n.toString(), s, o), u; }, _declaration: function () { var e = this._tokenStream, t = null, n = null, r = null, i = null, s = ""; t = this._property(); if (t !== null) {
                    e.mustMatch(m.COLON), this._readWhitespace(), n = this._expr(), (!n || n.length === 0) && this._unexpectedToken(e.LT(1)), r = this._prio(), s = t.toString();
                    if (this.options.starHack && t.hack === "*" || this.options.underscoreHack && t.hack === "_")
                        s = t.text;
                    try {
                        this._validateProperty(s, n);
                    }
                    catch (o) {
                        i = o;
                    }
                    return this.fire({ type: "property", property: t, value: n, important: r, line: t.line, col: t.col, invalid: i }), !0;
                } return !1; }, _prio: function () { var e = this._tokenStream, t = e.match(m.IMPORTANT_SYM); return this._readWhitespace(), t; }, _expr: function (e) { var t = [], n = null, r = null; n = this._term(e); if (n !== null) {
                    t.push(n);
                    do {
                        r = this._operator(e), r && t.push(r), n = this._term(e);
                        if (n === null)
                            break;
                        t.push(n);
                    } while (!0);
                } return t.length > 0 ? new l(t, t[0].line, t[0].col) : null; }, _term: function (e) { var t = this._tokenStream, n = null, r = null, i = null, s = null, o, u, a; return n = this._unary_operator(), n !== null && (u = t.token().startLine, a = t.token().startCol), t.peek() === m.IE_FUNCTION && this.options.ieFilters ? (r = this._ie_function(), n === null && (u = t.token().startLine, a = t.token().startCol)) : e && t.match([m.LPAREN, m.LBRACE, m.LBRACKET]) ? (o = t.token(), i = o.endChar, r = o.value + this._expr(e).text, n === null && (u = t.token().startLine, a = t.token().startCol), t.mustMatch(m.type(i)), r += i, this._readWhitespace()) : t.match([m.NUMBER, m.PERCENTAGE, m.LENGTH, m.ANGLE, m.TIME, m.FREQ, m.STRING, m.IDENT, m.URI, m.UNICODE_RANGE]) ? (r = t.token().value, n === null && (u = t.token().startLine, a = t.token().startCol, s = c.fromToken(t.token())), this._readWhitespace()) : (o = this._hexcolor(), o === null ? (n === null && (u = t.LT(1).startLine, a = t.LT(1).startCol), r === null && (t.LA(3) === m.EQUALS && this.options.ieFilters ? r = this._ie_function() : r = this._function())) : (r = o.value, n === null && (u = o.startLine, a = o.startCol))), s !== null ? s : r !== null ? new c(n !== null ? n + r : r, u, a) : null; }, _function: function () { var e = this._tokenStream, t = null, n = null, r; if (e.match(m.FUNCTION)) {
                    t = e.token().value, this._readWhitespace(), n = this._expr(!0), t += n;
                    if (this.options.ieFilters && e.peek() === m.EQUALS)
                        do {
                            this._readWhitespace() && (t += e.token().value), e.LA(0) === m.COMMA && (t += e.token().value), e.match(m.IDENT), t += e.token().value, e.match(m.EQUALS), t += e.token().value, r = e.peek();
                            while (r !== m.COMMA && r !== m.S && r !== m.RPAREN)
                                e.get(), t += e.token().value, r = e.peek();
                        } while (e.match([m.COMMA, m.S]));
                    e.match(m.RPAREN), t += ")", this._readWhitespace();
                } return t; }, _ie_function: function () { var e = this._tokenStream, t = null, n; if (e.match([m.IE_FUNCTION, m.FUNCTION])) {
                    t = e.token().value;
                    do {
                        this._readWhitespace() && (t += e.token().value), e.LA(0) === m.COMMA && (t += e.token().value), e.match(m.IDENT), t += e.token().value, e.match(m.EQUALS), t += e.token().value, n = e.peek();
                        while (n !== m.COMMA && n !== m.S && n !== m.RPAREN)
                            e.get(), t += e.token().value, n = e.peek();
                    } while (e.match([m.COMMA, m.S]));
                    e.match(m.RPAREN), t += ")", this._readWhitespace();
                } return t; }, _hexcolor: function () { var e = this._tokenStream, t = null, n; if (e.match(m.HASH)) {
                    t = e.token(), n = t.value;
                    if (!/#[a-f0-9]{3,6}/i.test(n))
                        throw new i("Expected a hex color but found '" + n + "' at line " + t.startLine + ", col " + t.startCol + ".", t.startLine, t.startCol);
                    this._readWhitespace();
                } return t; }, _keyframes: function () { var e = this._tokenStream, t, n, r, i = ""; e.mustMatch(m.KEYFRAMES_SYM), t = e.token(), /^@-([^-]+)-/.test(t.value) && (i = RegExp.$1), this._readWhitespace(), r = this._keyframe_name(), this._readWhitespace(), e.mustMatch(m.LBRACE), this.fire({ type: "startkeyframes", name: r, prefix: i, line: t.startLine, col: t.startCol }), this._readWhitespace(), n = e.peek(); while (n === m.IDENT || n === m.PERCENTAGE)
                    this._keyframe_rule(), this._readWhitespace(), n = e.peek(); this.fire({ type: "endkeyframes", name: r, prefix: i, line: t.startLine, col: t.startCol }), this._readWhitespace(), e.mustMatch(m.RBRACE), this._readWhitespace(); }, _keyframe_name: function () { var e = this._tokenStream; return e.mustMatch([m.IDENT, m.STRING]), s.fromToken(e.token()); }, _keyframe_rule: function () { var e = this._key_list(); this.fire({ type: "startkeyframerule", keys: e, line: e[0].line, col: e[0].col }), this._readDeclarations(!0), this.fire({ type: "endkeyframerule", keys: e, line: e[0].line, col: e[0].col }); }, _key_list: function () { var e = this._tokenStream, t = []; t.push(this._key()), this._readWhitespace(); while (e.match(m.COMMA))
                    this._readWhitespace(), t.push(this._key()), this._readWhitespace(); return t; }, _key: function () { var e = this._tokenStream, t; if (e.match(m.PERCENTAGE))
                    return s.fromToken(e.token()); if (e.match(m.IDENT)) {
                    t = e.token();
                    if (/from|to/i.test(t.value))
                        return s.fromToken(t);
                    e.unget();
                } this._unexpectedToken(e.LT(1)); }, _skipCruft: function () { while (this._tokenStream.match([m.S, m.CDO, m.CDC]))
                    ; }, _readDeclarations: function (e, t) { var n = this._tokenStream, r; this._readWhitespace(), e && n.mustMatch(m.LBRACE), this._readWhitespace(); try {
                    for (;;) {
                        if (!(n.match(m.SEMICOLON) || t && this._margin())) {
                            if (!this._declaration())
                                break;
                            if (!n.match(m.SEMICOLON))
                                break;
                        }
                        this._readWhitespace();
                    }
                    n.mustMatch(m.RBRACE), this._readWhitespace();
                }
                catch (s) {
                    if (!(s instanceof i && !this.options.strict))
                        throw s;
                    this.fire({ type: "error", error: s, message: s.message, line: s.line, col: s.col }), r = n.advance([m.SEMICOLON, m.RBRACE]);
                    if (r === m.SEMICOLON)
                        this._readDeclarations(!1, t);
                    else if (r !== m.RBRACE)
                        throw s;
                } }, _readWhitespace: function () { var e = this._tokenStream, t = ""; while (e.match(m.S))
                    t += e.token().value; return t; }, _unexpectedToken: function (e) { throw new i("Unexpected token '" + e.value + "' at line " + e.startLine + ", col " + e.startCol + ".", e.startLine, e.startCol); }, _verifyEnd: function () { this._tokenStream.LA(1) !== m.EOF && this._unexpectedToken(this._tokenStream.LT(1)); }, _validateProperty: function (e, t) { g.validate(e, t); }, parse: function (e) { this._tokenStream = new v(e, m), this._stylesheet(); }, parseStyleSheet: function (e) { return this.parse(e); }, parseMediaQuery: function (e) { this._tokenStream = new v(e, m); var t = this._media_query(); return this._verifyEnd(), t; }, parsePropertyValue: function (e) { this._tokenStream = new v(e, m), this._readWhitespace(); var t = this._expr(); return this._readWhitespace(), this._verifyEnd(), t; }, parseRule: function (e) { this._tokenStream = new v(e, m), this._readWhitespace(); var t = this._ruleset(); return this._readWhitespace(), this._verifyEnd(), t; }, parseSelector: function (e) { this._tokenStream = new v(e, m), this._readWhitespace(); var t = this._selector(); return this._readWhitespace(), this._verifyEnd(), t; }, parseStyleAttribute: function (e) { e += "}", this._tokenStream = new v(e, m), this._readDeclarations(); } }; for (t in n)
                Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]); return e; }();
        }, { "../util/EventTarget": 23, "../util/SyntaxError": 25, "../util/SyntaxUnit": 26, "./Combinator": 2, "./MediaFeature": 4, "./MediaQuery": 5, "./PropertyName": 8, "./PropertyValue": 9, "./PropertyValuePart": 11, "./Selector": 13, "./SelectorPart": 14, "./SelectorSubPart": 15, "./TokenStream": 17, "./Tokens": 18, "./Validation": 19 }], 7: [function (e, t, n) {
            "use strict";
            var r = t.exports = { __proto__: null, "align-items": "flex-start | flex-end | center | baseline | stretch", "align-content": "flex-start | flex-end | center | space-between | space-around | stretch", "align-self": "auto | flex-start | flex-end | center | baseline | stretch", all: "initial | inherit | unset", "-webkit-align-items": "flex-start | flex-end | center | baseline | stretch", "-webkit-align-content": "flex-start | flex-end | center | space-between | space-around | stretch", "-webkit-align-self": "auto | flex-start | flex-end | center | baseline | stretch", "alignment-adjust": "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical | <percentage> | <length>", "alignment-baseline": "auto | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical", animation: 1, "animation-delay": "<time>#", "animation-direction": "<single-animation-direction>#", "animation-duration": "<time>#", "animation-fill-mode": "[ none | forwards | backwards | both ]#", "animation-iteration-count": "[ <number> | infinite ]#", "animation-name": "[ none | <single-animation-name> ]#", "animation-play-state": "[ running | paused ]#", "animation-timing-function": 1, "-moz-animation-delay": "<time>#", "-moz-animation-direction": "[ normal | alternate ]#", "-moz-animation-duration": "<time>#", "-moz-animation-iteration-count": "[ <number> | infinite ]#", "-moz-animation-name": "[ none | <single-animation-name> ]#", "-moz-animation-play-state": "[ running | paused ]#", "-ms-animation-delay": "<time>#", "-ms-animation-direction": "[ normal | alternate ]#", "-ms-animation-duration": "<time>#", "-ms-animation-iteration-count": "[ <number> | infinite ]#", "-ms-animation-name": "[ none | <single-animation-name> ]#", "-ms-animation-play-state": "[ running | paused ]#", "-webkit-animation-delay": "<time>#", "-webkit-animation-direction": "[ normal | alternate ]#", "-webkit-animation-duration": "<time>#", "-webkit-animation-fill-mode": "[ none | forwards | backwards | both ]#", "-webkit-animation-iteration-count": "[ <number> | infinite ]#", "-webkit-animation-name": "[ none | <single-animation-name> ]#", "-webkit-animation-play-state": "[ running | paused ]#", "-o-animation-delay": "<time>#", "-o-animation-direction": "[ normal | alternate ]#", "-o-animation-duration": "<time>#", "-o-animation-iteration-count": "[ <number> | infinite ]#", "-o-animation-name": "[ none | <single-animation-name> ]#", "-o-animation-play-state": "[ running | paused ]#", appearance: "none | auto", "-moz-appearance": "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized", "-ms-appearance": "none | icon | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal", "-webkit-appearance": "none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox | listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical", "-o-appearance": "none | window | desktop | workspace | document | tooltip | dialog | button | push-button | hyperlink | radio | radio-button | checkbox | menu-item | tab | menu | menubar | pull-down-menu | pop-up-menu | list-menu | radio-group | checkbox-group | outline-tree | range | field | combo-box | signature | password | normal", azimuth: "<azimuth>", "backface-visibility": "visible | hidden", background: 1, "background-attachment": "<attachment>#", "background-clip": "<box>#", "background-color": "<color>", "background-image": "<bg-image>#", "background-origin": "<box>#", "background-position": "<bg-position>", "background-repeat": "<repeat-style>#", "background-size": "<bg-size>#", "baseline-shift": "baseline | sub | super | <percentage> | <length>", behavior: 1, binding: 1, bleed: "<length>", "bookmark-label": "<content> | <attr> | <string>", "bookmark-level": "none | <integer>", "bookmark-state": "open | closed", "bookmark-target": "none | <uri> | <attr>", border: "<border-width> || <border-style> || <color>", "border-bottom": "<border-width> || <border-style> || <color>", "border-bottom-color": "<color>", "border-bottom-left-radius": "<x-one-radius>", "border-bottom-right-radius": "<x-one-radius>", "border-bottom-style": "<border-style>", "border-bottom-width": "<border-width>", "border-collapse": "collapse | separate", "border-color": "<color>{1,4}", "border-image": 1, "border-image-outset": "[ <length> | <number> ]{1,4}", "border-image-repeat": "[ stretch | repeat | round | space ]{1,2}", "border-image-slice": "<border-image-slice>", "border-image-source": "<image> | none", "border-image-width": "[ <length> | <percentage> | <number> | auto ]{1,4}", "border-left": "<border-width> || <border-style> || <color>", "border-left-color": "<color>", "border-left-style": "<border-style>", "border-left-width": "<border-width>", "border-radius": "<border-radius>", "border-right": "<border-width> || <border-style> || <color>", "border-right-color": "<color>", "border-right-style": "<border-style>", "border-right-width": "<border-width>", "border-spacing": "<length>{1,2}", "border-style": "<border-style>{1,4}", "border-top": "<border-width> || <border-style> || <color>", "border-top-color": "<color>", "border-top-left-radius": "<x-one-radius>", "border-top-right-radius": "<x-one-radius>", "border-top-style": "<border-style>", "border-top-width": "<border-width>", "border-width": "<border-width>{1,4}", bottom: "<margin-width>", "-moz-box-align": "start | end | center | baseline | stretch", "-moz-box-decoration-break": "slice | clone", "-moz-box-direction": "normal | reverse", "-moz-box-flex": "<number>", "-moz-box-flex-group": "<integer>", "-moz-box-lines": "single | multiple", "-moz-box-ordinal-group": "<integer>", "-moz-box-orient": "horizontal | vertical | inline-axis | block-axis", "-moz-box-pack": "start | end | center | justify", "-o-box-decoration-break": "slice | clone", "-webkit-box-align": "start | end | center | baseline | stretch", "-webkit-box-decoration-break": "slice | clone", "-webkit-box-direction": "normal | reverse", "-webkit-box-flex": "<number>", "-webkit-box-flex-group": "<integer>", "-webkit-box-lines": "single | multiple", "-webkit-box-ordinal-group": "<integer>", "-webkit-box-orient": "horizontal | vertical | inline-axis | block-axis", "-webkit-box-pack": "start | end | center | justify", "box-decoration-break": "slice | clone", "box-shadow": "<box-shadow>", "box-sizing": "content-box | border-box", "break-after": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column", "break-before": "auto | always | avoid | left | right | page | column | avoid-page | avoid-column", "break-inside": "auto | avoid | avoid-page | avoid-column", "caption-side": "top | bottom", clear: "none | right | left | both", clip: "<shape> | auto", "-webkit-clip-path": "<clip-source> | <clip-path> | none", "clip-path": "<clip-source> | <clip-path> | none", "clip-rule": "nonzero | evenodd", color: "<color>", "color-interpolation": "auto | sRGB | linearRGB", "color-interpolation-filters": "auto | sRGB | linearRGB", "color-profile": 1, "color-rendering": "auto | optimizeSpeed | optimizeQuality", "column-count": "<integer> | auto", "column-fill": "auto | balance", "column-gap": "<length> | normal", "column-rule": "<border-width> || <border-style> || <color>", "column-rule-color": "<color>", "column-rule-style": "<border-style>", "column-rule-width": "<border-width>", "column-span": "none | all", "column-width": "<length> | auto", columns: 1, content: 1, "counter-increment": 1, "counter-reset": 1, crop: "<shape> | auto", cue: "cue-after | cue-before", "cue-after": 1, "cue-before": 1, cursor: 1, direction: "ltr | rtl", display: "inline | block | list-item | inline-block | table | inline-table | table-row-group | table-header-group | table-footer-group | table-row | table-column-group | table-column | table-cell | table-caption | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | none | -moz-box | -moz-inline-block | -moz-inline-box | -moz-inline-grid | -moz-inline-stack | -moz-inline-table | -moz-grid | -moz-grid-group | -moz-grid-line | -moz-groupbox | -moz-deck | -moz-popup | -moz-stack | -moz-marker | -webkit-box | -webkit-inline-box | -ms-flexbox | -ms-inline-flexbox | flex | -webkit-flex | inline-flex | -webkit-inline-flex", "dominant-baseline": "auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge", "drop-initial-after-adjust": "central | middle | after-edge | text-after-edge | ideographic | alphabetic | mathematical | <percentage> | <length>", "drop-initial-after-align": "baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical", "drop-initial-before-adjust": "before-edge | text-before-edge | central | middle | hanging | mathematical | <percentage> | <length>", "drop-initial-before-align": "caps-height | baseline | use-script | before-edge | text-before-edge | after-edge | text-after-edge | central | middle | ideographic | alphabetic | hanging | mathematical", "drop-initial-size": "auto | line | <length> | <percentage>", "drop-initial-value": "<integer>", elevation: "<angle> | below | level | above | higher | lower", "empty-cells": "show | hide", "enable-background": 1, fill: "<paint>", "fill-opacity": "<opacity-value>", "fill-rule": "nonzero | evenodd", filter: "<filter-function-list> | none", fit: "fill | hidden | meet | slice", "fit-position": 1, flex: "<flex>", "flex-basis": "<width>", "flex-direction": "row | row-reverse | column | column-reverse", "flex-flow": "<flex-direction> || <flex-wrap>", "flex-grow": "<number>", "flex-shrink": "<number>", "flex-wrap": "nowrap | wrap | wrap-reverse", "-webkit-flex": "<flex>", "-webkit-flex-basis": "<width>", "-webkit-flex-direction": "row | row-reverse | column | column-reverse", "-webkit-flex-flow": "<flex-direction> || <flex-wrap>", "-webkit-flex-grow": "<number>", "-webkit-flex-shrink": "<number>", "-webkit-flex-wrap": "nowrap | wrap | wrap-reverse", "-ms-flex": "<flex>", "-ms-flex-align": "start | end | center | stretch | baseline", "-ms-flex-direction": "row | row-reverse | column | column-reverse", "-ms-flex-order": "<number>", "-ms-flex-pack": "start | end | center | justify | distribute", "-ms-flex-wrap": "nowrap | wrap | wrap-reverse", "float": "left | right | none", "float-offset": 1, "flood-color": 1, "flood-opacity": "<opacity-value>", font: "<font-shorthand> | caption | icon | menu | message-box | small-caption | status-bar", "font-family": "<font-family>", "font-feature-settings": "<feature-tag-value> | normal", "font-kerning": "auto | normal | none", "font-size": "<font-size>", "font-size-adjust": "<number> | none", "font-stretch": "<font-stretch>", "font-style": "<font-style>", "font-variant": "<font-variant> | normal | none", "font-variant-alternates": "<font-variant-alternates> | normal", "font-variant-caps": "<font-variant-caps> | normal", "font-variant-east-asian": "<font-variant-east-asian> | normal", "font-variant-ligatures": "<font-variant-ligatures> | normal | none", "font-variant-numeric": "<font-variant-numeric> | normal", "font-variant-position": "normal | sub | super", "font-weight": "<font-weight>", gap: "[ <length> | <percentage> ]{1,2}", "glyph-orientation-horizontal": "<glyph-angle>", "glyph-orientation-vertical": "auto | <glyph-angle>", grid: 1, "grid-area": 1, "grid-auto-columns": 1, "grid-auto-flow": 1, "grid-auto-position": 1, "grid-auto-rows": 1, "grid-cell-stacking": "columns | rows | layer", "grid-column": 1, "grid-columns": 1, "grid-column-align": "start | end | center | stretch", "grid-column-sizing": 1, "grid-column-start": 1, "grid-column-end": 1, "grid-column-span": "<integer>", "grid-flow": "none | rows | columns", "grid-gap": "[ <length> | <percentage> ]{1,2}", "grid-layer": "<integer>", "grid-row": 1, "grid-rows": 1, "grid-row-align": "start | end | center | stretch", "grid-row-gap": 1, "grid-row-start": 1, "grid-row-end": 1, "grid-row-span": "<integer>", "grid-row-sizing": 1, "grid-template": 1, "grid-template-areas": 1, "grid-template-columns": 1, "grid-template-rows": 1, "hanging-punctuation": 1, height: "<margin-width> | <content-sizing>", "hyphenate-after": "<integer> | auto", "hyphenate-before": "<integer> | auto", "hyphenate-character": "<string> | auto", "hyphenate-lines": "no-limit | <integer>", "hyphenate-resource": 1, hyphens: "none | manual | auto", icon: 1, "image-orientation": "angle | auto", "image-rendering": "auto | optimizeSpeed | optimizeQuality", "image-resolution": 1, "ime-mode": "auto | normal | active | inactive | disabled", "inline-box-align": "last | <integer>", "justify-content": "flex-start | flex-end | center | space-between | space-around | space-evenly | stretch", "-webkit-justify-content": "flex-start | flex-end | center | space-between | space-around | space-evenly | stretch", kerning: "auto | <length>", left: "<margin-width>", "letter-spacing": "<length> | normal", "line-height": "<line-height>", "line-break": "auto | loose | normal | strict", "line-stacking": 1, "line-stacking-ruby": "exclude-ruby | include-ruby", "line-stacking-shift": "consider-shifts | disregard-shifts", "line-stacking-strategy": "inline-line-height | block-line-height | max-height | grid-height", "list-style": 1, "list-style-image": "<uri> | none", "list-style-position": "inside | outside", "list-style-type": "disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha | none", margin: "<margin-width>{1,4}", "margin-bottom": "<margin-width>", "margin-left": "<margin-width>", "margin-right": "<margin-width>", "margin-top": "<margin-width>", mark: 1, "mark-after": 1, "mark-before": 1, marker: 1, "marker-end": 1, "marker-mid": 1, "marker-start": 1, marks: 1, "marquee-direction": 1, "marquee-play-count": 1, "marquee-speed": 1, "marquee-style": 1, mask: 1, "max-height": "<length> | <percentage> | <content-sizing> | none", "max-width": "<length> | <percentage> | <content-sizing> | none", "min-height": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats", "min-width": "<length> | <percentage> | <content-sizing> | contain-floats | -moz-contain-floats | -webkit-contain-floats", "mix-blend-mode": "<blend-mode>", "move-to": 1, "nav-down": 1, "nav-index": 1, "nav-left": 1, "nav-right": 1, "nav-up": 1, "object-fit": "fill | contain | cover | none | scale-down", "object-position": "<position>", opacity: "<opacity-value>", order: "<integer>", "-webkit-order": "<integer>", orphans: "<integer>", outline: 1, "outline-color": "<color> | invert", "outline-offset": 1, "outline-style": "<border-style>", "outline-width": "<border-width>", overflow: "visible | hidden | scroll | auto", "overflow-style": 1, "overflow-wrap": "normal | break-word", "overflow-x": 1, "overflow-y": 1, padding: "<padding-width>{1,4}", "padding-bottom": "<padding-width>", "padding-left": "<padding-width>", "padding-right": "<padding-width>", "padding-top": "<padding-width>", page: 1, "page-break-after": "auto | always | avoid | left | right", "page-break-before": "auto | always | avoid | left | right", "page-break-inside": "auto | avoid", "page-policy": 1, pause: 1, "pause-after": 1, "pause-before": 1, perspective: 1, "perspective-origin": 1, phonemes: 1, pitch: 1, "pitch-range": 1, "play-during": 1, "pointer-events": "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all", position: "static | relative | absolute | fixed | sticky | -webkit-sticky", "presentation-level": 1, "punctuation-trim": 1, quotes: 1, "rendering-intent": 1, resize: 1, rest: 1, "rest-after": 1, "rest-before": 1, richness: 1, right: "<margin-width>", rotation: 1, "rotation-point": 1, "ruby-align": 1, "ruby-overhang": 1, "ruby-position": 1, "ruby-span": 1, "shape-rendering": "auto | optimizeSpeed | crispEdges | geometricPrecision", size: 1, speak: "normal | none | spell-out", "speak-header": "once | always", "speak-numeral": "digits | continuous", "speak-punctuation": "code | none", "speech-rate": 1, src: 1, "stop-color": 1, "stop-opacity": "<opacity-value>", stress: 1, "string-set": 1, stroke: "<paint>", "stroke-dasharray": "none | <dasharray>", "stroke-dashoffset": "<percentage> | <length>", "stroke-linecap": "butt | round | square", "stroke-linejoin": "miter | round | bevel", "stroke-miterlimit": "<miterlimit>", "stroke-opacity": "<opacity-value>", "stroke-width": "<percentage> | <length>", "table-layout": "auto | fixed", "tab-size": "<integer> | <length>", target: 1, "target-name": 1, "target-new": 1, "target-position": 1, "text-align": "left | right | center | justify | match-parent | start | end", "text-align-last": 1, "text-anchor": "start | middle | end", "text-decoration": "<text-decoration-line> || <text-decoration-style> || <text-decoration-color>", "text-decoration-color": "<text-decoration-color>", "text-decoration-line": "<text-decoration-line>", "text-decoration-style": "<text-decoration-style>", "text-decoration-skip": "none | [ objects || spaces || ink || edges || box-decoration ]", "-webkit-text-decoration-skip": "none | [ objects || spaces || ink || edges || box-decoration ]", "text-underline-position": "auto | [ under || [ left | right ] ]", "text-emphasis": 1, "text-height": 1, "text-indent": "<length> | <percentage>", "text-justify": "auto | none | inter-word | inter-ideograph | inter-cluster | distribute | kashida", "text-outline": 1, "text-overflow": 1, "text-rendering": "auto | optimizeSpeed | optimizeLegibility | geometricPrecision", "text-shadow": 1, "text-transform": "capitalize | uppercase | lowercase | none", "text-wrap": "normal | none | avoid", top: "<margin-width>", "-ms-touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation", "touch-action": "auto | none | pan-x | pan-y | pan-left | pan-right | pan-up | pan-down | manipulation", transform: 1, "transform-origin": 1, "transform-style": 1, transition: 1, "transition-delay": 1, "transition-duration": 1, "transition-property": 1, "transition-timing-function": 1, "unicode-bidi": "normal | embed | isolate | bidi-override | isolate-override | plaintext", "user-modify": "read-only | read-write | write-only", "user-select": "auto | text | none | contain | all", "vertical-align": "auto | use-script | baseline | sub | super | top | text-top | central | middle | bottom | text-bottom | <percentage> | <length>", visibility: "visible | hidden | collapse", "voice-balance": 1, "voice-duration": 1, "voice-family": 1, "voice-pitch": 1, "voice-pitch-range": 1, "voice-rate": 1, "voice-stress": 1, "voice-volume": 1, volume: 1, "white-space": "normal | pre | nowrap | pre-wrap | pre-line | -pre-wrap | -o-pre-wrap | -moz-pre-wrap | -hp-pre-wrap", "white-space-collapse": 1, widows: "<integer>", width: "<length> | <percentage> | <content-sizing> | auto", "will-change": "<will-change>", "word-break": "normal | keep-all | break-all | break-word", "word-spacing": "<length> | normal", "word-wrap": "normal | break-word", "writing-mode": "horizontal-tb | vertical-rl | vertical-lr | lr-tb | rl-tb | tb-rl | bt-rl | tb-lr | bt-lr | lr-bt | rl-bt | lr | rl | tb", "z-index": "<integer> | auto", zoom: "<number> | <percentage> | normal" };
        }, {}], 8: [function (e, t, n) {
            "use strict";
            function s(e, t, n, s) { r.call(this, e, n, s, i.PROPERTY_NAME_TYPE), this.hack = t; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s, s.prototype.toString = function () { return (this.hack ? this.hack : "") + this.text; };
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 9: [function (e, t, n) {
            "use strict";
            function s(e, t, n) { r.call(this, e.join(" "), t, n, i.PROPERTY_VALUE_TYPE), this.parts = e; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 10: [function (e, t, n) {
            "use strict";
            function r(e) { this._i = 0, this._parts = e.parts, this._marks = [], this.value = e; }
            t.exports = r, r.prototype.count = function () { return this._parts.length; }, r.prototype.isFirst = function () { return this._i === 0; }, r.prototype.hasNext = function () { return this._i < this._parts.length; }, r.prototype.mark = function () { this._marks.push(this._i); }, r.prototype.peek = function (e) { return this.hasNext() ? this._parts[this._i + (e || 0)] : null; }, r.prototype.next = function () { return this.hasNext() ? this._parts[this._i++] : null; }, r.prototype.previous = function () { return this._i > 0 ? this._parts[--this._i] : null; }, r.prototype.restore = function () { this._marks.length && (this._i = this._marks.pop()); }, r.prototype.drop = function () { this._marks.pop(); };
        }, {}], 11: [function (e, t, n) {
            "use strict";
            function u(e, t, n, o) { var a = o || {}; r.call(this, e, t, n, s.PROPERTY_VALUE_PART_TYPE), this.type = "unknown"; var f; if (/^([+-]?[\d.]+)([a-z]+)$/i.test(e)) {
                this.type = "dimension", this.value = Number(RegExp.$1), this.units = RegExp.$2;
                switch (this.units.toLowerCase()) {
                    case "em":
                    case "rem":
                    case "ex":
                    case "px":
                    case "cm":
                    case "mm":
                    case "in":
                    case "pt":
                    case "pc":
                    case "ch":
                    case "vh":
                    case "vw":
                    case "vmax":
                    case "vmin":
                        this.type = "length";
                        break;
                    case "fr":
                        this.type = "grid";
                        break;
                    case "deg":
                    case "rad":
                    case "grad":
                    case "turn":
                        this.type = "angle";
                        break;
                    case "ms":
                    case "s":
                        this.type = "time";
                        break;
                    case "hz":
                    case "khz":
                        this.type = "frequency";
                        break;
                    case "dpi":
                    case "dpcm": this.type = "resolution";
                }
            }
            else
                /^([+-]?[\d.]+)%$/i.test(e) ? (this.type = "percentage", this.value = Number(RegExp.$1)) : /^([+-]?\d+)$/i.test(e) ? (this.type = "integer", this.value = Number(RegExp.$1)) : /^([+-]?[\d.]+)$/i.test(e) ? (this.type = "number", this.value = Number(RegExp.$1)) : /^#([a-f0-9]{3,6})/i.test(e) ? (this.type = "color", f = RegExp.$1, f.length === 3 ? (this.red = parseInt(f.charAt(0) + f.charAt(0), 16), this.green = parseInt(f.charAt(1) + f.charAt(1), 16), this.blue = parseInt(f.charAt(2) + f.charAt(2), 16)) : (this.red = parseInt(f.substring(0, 2), 16), this.green = parseInt(f.substring(2, 4), 16), this.blue = parseInt(f.substring(4, 6), 16))) : /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i.test(e) ? (this.type = "color", this.red = Number(RegExp.$1), this.green = Number(RegExp.$2), this.blue = Number(RegExp.$3)) : /^rgb\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(e) ? (this.type = "color", this.red = Number(RegExp.$1) * 255 / 100, this.green = Number(RegExp.$2) * 255 / 100, this.blue = Number(RegExp.$3) * 255 / 100) : /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/i.test(e) ? (this.type = "color", this.red = Number(RegExp.$1), this.green = Number(RegExp.$2), this.blue = Number(RegExp.$3), this.alpha = Number(RegExp.$4)) : /^rgba\(\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)/i.test(e) ? (this.type = "color", this.red = Number(RegExp.$1) * 255 / 100, this.green = Number(RegExp.$2) * 255 / 100, this.blue = Number(RegExp.$3) * 255 / 100, this.alpha = Number(RegExp.$4)) : /^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/i.test(e) ? (this.type = "color", this.hue = Number(RegExp.$1), this.saturation = Number(RegExp.$2) / 100, this.lightness = Number(RegExp.$3) / 100) : /^hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)/i.test(e) ? (this.type = "color", this.hue = Number(RegExp.$1), this.saturation = Number(RegExp.$2) / 100, this.lightness = Number(RegExp.$3) / 100, this.alpha = Number(RegExp.$4)) : /^url\(("([^\\"]|\.)*")\)/i.test(e) ? (this.type = "uri", this.uri = u.parseString(RegExp.$1)) : /^([^(]+)\(/i.test(e) ? (this.type = "function", this.name = RegExp.$1, this.value = e) : /^"([^\n\r\f\\"]|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*"/i.test(e) ? (this.type = "string", this.value = u.parseString(e)) : /^'([^\n\r\f\\']|\\\r\n|\\[^\r0-9a-f]|\\[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)*'/i.test(e) ? (this.type = "string", this.value = u.parseString(e)) : i[e.toLowerCase()] ? (this.type = "color", f = i[e.toLowerCase()].substring(1), this.red = parseInt(f.substring(0, 2), 16), this.green = parseInt(f.substring(2, 4), 16), this.blue = parseInt(f.substring(4, 6), 16)) : /^[,/]$/.test(e) ? (this.type = "operator", this.value = e) : /^-?[a-z_\u00A0-\uFFFF][a-z0-9\-_\u00A0-\uFFFF]*$/i.test(e) && (this.type = "identifier", this.value = e); this.wasIdent = Boolean(a.ident); }
            t.exports = u;
            var r = e("../util/SyntaxUnit"), i = e("./Colors"), s = e("./Parser"), o = e("./Tokens");
            u.prototype = new r, u.prototype.constructor = u, u.parseString = function (e) { e = e.slice(1, -1); var t = function (e, t) { if (/^(\n|\r\n|\r|\f)$/.test(t))
                return ""; var n = /^[0-9a-f]{1,6}/i.exec(t); if (n) {
                var r = parseInt(n[0], 16);
                return String.fromCodePoint ? String.fromCodePoint(r) : String.fromCharCode(r);
            } return t; }; return e.replace(/\\(\r\n|[^\r0-9a-f]|[0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?)/ig, t); }, u.serializeString = function (e) { var t = function (e, t) { if (t === '"')
                return "\\" + t; var n = String.codePointAt ? String.codePointAt(0) : String.charCodeAt(0); return "\\" + n.toString(16) + " "; }; return '"' + e.replace(/["\r\n\f]/g, t) + '"'; }, u.fromToken = function (e) { var t = new u(e.value, e.startLine, e.startCol, { ident: e.type === o.IDENT }); return t; };
        }, { "../util/SyntaxUnit": 26, "./Colors": 1, "./Parser": 6, "./Tokens": 18 }], 12: [function (e, t, n) {
            "use strict";
            var r = t.exports = { __proto__: null, ":first-letter": 1, ":first-line": 1, ":before": 1, ":after": 1 };
            r.ELEMENT = 1, r.CLASS = 2, r.isElement = function (e) { return e.indexOf("::") === 0 || r[e.toLowerCase()] === r.ELEMENT; };
        }, {}], 13: [function (e, t, n) {
            "use strict";
            function o(e, t, n) { r.call(this, e.join(" "), t, n, i.SELECTOR_TYPE), this.parts = e, this.specificity = s.calculate(this); }
            t.exports = o;
            var r = e("../util/SyntaxUnit"), i = e("./Parser"), s = e("./Specificity");
            o.prototype = new r, o.prototype.constructor = o;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6, "./Specificity": 16 }], 14: [function (e, t, n) {
            "use strict";
            function s(e, t, n, s, o) { r.call(this, n, s, o, i.SELECTOR_PART_TYPE), this.elementName = e, this.modifiers = t; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 15: [function (e, t, n) {
            "use strict";
            function s(e, t, n, s) { r.call(this, e, n, s, i.SELECTOR_SUB_PART_TYPE), this.type = t, this.args = []; }
            t.exports = s;
            var r = e("../util/SyntaxUnit"), i = e("./Parser");
            s.prototype = new r, s.prototype.constructor = s;
        }, { "../util/SyntaxUnit": 26, "./Parser": 6 }], 16: [function (e, t, n) {
            "use strict";
            function s(e, t, n, r) { this.a = e, this.b = t, this.c = n, this.d = r; }
            t.exports = s;
            var r = e("./Pseudos"), i = e("./SelectorPart");
            s.prototype = { constructor: s, compare: function (e) { var t = ["a", "b", "c", "d"], n, r; for (n = 0, r = t.length; n < r; n++) {
                    if (this[t[n]] < e[t[n]])
                        return -1;
                    if (this[t[n]] > e[t[n]])
                        return 1;
                } return 0; }, valueOf: function () { return this.a * 1e3 + this.b * 100 + this.c * 10 + this.d; }, toString: function () { return this.a + "," + this.b + "," + this.c + "," + this.d; } }, s.calculate = function (e) { function l(e) { var t, n, i, s, o = e.elementName ? e.elementName.text : "", h; o && o.charAt(o.length - 1) !== "*" && f++; for (t = 0, i = e.modifiers.length; t < i; t++) {
                h = e.modifiers[t];
                switch (h.type) {
                    case "class":
                    case "attribute":
                        a++;
                        break;
                    case "id":
                        u++;
                        break;
                    case "pseudo":
                        r.isElement(h.text) ? f++ : a++;
                        break;
                    case "not": for (n = 0, s = h.args.length; n < s; n++)
                        l(h.args[n]);
                }
            } } var t, n, o, u = 0, a = 0, f = 0; for (t = 0, n = e.parts.length; t < n; t++)
                o = e.parts[t], o instanceof i && l(o); return new s(0, u, a, f); };
        }, { "./Pseudos": 12, "./SelectorPart": 14 }], 17: [function (e, t, n) {
            "use strict";
            function l(e) { return e != null && o.test(e); }
            function c(e) { return e != null && /\d/.test(e); }
            function h(e) { return e != null && f.test(e); }
            function p(e) { return e != null && a.test(e); }
            function d(e) { return e != null && /[a-z_\u00A0-\uFFFF\\]/i.test(e); }
            function v(e) { return e != null && (d(e) || /[0-9\-\\]/.test(e)); }
            function m(e) { return e != null && (d(e) || /-\\/.test(e)); }
            function g(e, t) { for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); return e; }
            function y(e) { return typeof e == "string" && (e[0] === "-" && d(e[1]) || d(e[0])); }
            function b(e) { return typeof e == "string" && (c(e[0]) || e[0] === "." && c(e[1])); }
            function w(e) { r.call(this, e, s); }
            t.exports = w;
            var r = e("../util/TokenStreamBase"), i = e("./PropertyValuePart"), s = e("./Tokens"), o = /^[0-9a-fA-F]$/, u = /^[\u00A0-\uFFFF]$/, a = /\n|\r\n|\r|\f/, f = /\u0009|\u000a|\u000c|\u000d|\u0020/;
            w.prototype = g(new r, { _getToken: function () { var e, t = this._reader, n = null, r = t.getLine(), i = t.getCol(); e = t.read(); while (e) {
                    switch (e) {
                        case "/":
                            t.peek() === "*" ? n = this.commentToken(e, r, i) : n = this.charToken(e, r, i);
                            break;
                        case "|":
                        case "~":
                        case "^":
                        case "$":
                        case "*":
                            t.peek() === "=" ? n = this.comparisonToken(e, r, i) : n = this.charToken(e, r, i);
                            break;
                        case '"':
                        case "'":
                            n = this.stringToken(e, r, i);
                            break;
                        case "#":
                            v(t.peek()) ? n = this.hashToken(e, r, i) : n = this.charToken(e, r, i);
                            break;
                        case ".":
                            c(t.peek()) ? n = this.numberToken(e, r, i) : n = this.charToken(e, r, i);
                            break;
                        case "-":
                            if (b(t.peekCount(2))) {
                                n = this.numberToken(e, r, i);
                                break;
                            }
                            t.peekCount(2) === "->" ? n = this.htmlCommentEndToken(e, r, i) : n = this._getDefaultToken(e, r, i);
                            break;
                        case "+":
                            b(t.peekCount(2)) ? n = this.numberToken(e, r, i) : n = this.charToken(e, r, i);
                            break;
                        case "!":
                            n = this.importantToken(e, r, i);
                            break;
                        case "@":
                            n = this.atRuleToken(e, r, i);
                            break;
                        case ":":
                            n = this.notToken(e, r, i);
                            break;
                        case "<":
                            n = this.htmlCommentStartToken(e, r, i);
                            break;
                        case "\\":
                            /[^\r\n\f]/.test(t.peek()) ? n = this.identOrFunctionToken(this.readEscape(e, !0), r, i) : n = this.charToken(e, r, i);
                            break;
                        case "U":
                        case "u":
                            t.peek() === "+" ? n = this.unicodeRangeToken(e, r, i) : n = this._getDefaultToken(e, r, i);
                            break;
                        default: n = this._getDefaultToken(e, r, i);
                    }
                    break;
                } return !n && e === null && (n = this.createToken(s.EOF, null, r, i)), n; }, _getDefaultToken: function (e, t, n) { var r = this._reader, i = null; return c(e) ? i = this.numberToken(e, t, n) : h(e) ? i = this.whitespaceToken(e, t, n) : y(e + r.peekCount(1)) ? i = this.identOrFunctionToken(e, t, n) : i = this.charToken(e, t, n), i; }, createToken: function (e, t, n, r, i) { var s = this._reader; return i = i || {}, { value: t, type: e, channel: i.channel, endChar: i.endChar, hide: i.hide || !1, startLine: n, startCol: r, endLine: s.getLine(), endCol: s.getCol() }; }, atRuleToken: function (e, t, n) { var r = e, i = this._reader, o = s.CHAR, u; i.mark(), u = this.readName(), r = e + u, o = s.type(r.toLowerCase()); if (o === s.CHAR || o === s.UNKNOWN)
                    r.length > 1 ? o = s.UNKNOWN_SYM : (o = s.CHAR, r = e, i.reset()); return this.createToken(o, r, t, n); }, charToken: function (e, t, n) { var r = s.type(e), i = {}; return r === -1 ? r = s.CHAR : i.endChar = s[r].endChar, this.createToken(r, e, t, n, i); }, commentToken: function (e, t, n) { var r = this.readComment(e); return this.createToken(s.COMMENT, r, t, n); }, comparisonToken: function (e, t, n) { var r = this._reader, i = e + r.read(), o = s.type(i) || s.CHAR; return this.createToken(o, i, t, n); }, hashToken: function (e, t, n) { var r = this.readName(e); return this.createToken(s.HASH, r, t, n); }, htmlCommentStartToken: function (e, t, n) { var r = this._reader, i = e; return r.mark(), i += r.readCount(3), i === "<!--" ? this.createToken(s.CDO, i, t, n) : (r.reset(), this.charToken(e, t, n)); }, htmlCommentEndToken: function (e, t, n) { var r = this._reader, i = e; return r.mark(), i += r.readCount(2), i === "-->" ? this.createToken(s.CDC, i, t, n) : (r.reset(), this.charToken(e, t, n)); }, identOrFunctionToken: function (e, t, n) { var r = this._reader, i = this.readName(e), o = s.IDENT, u = ["url(", "url-prefix(", "domain("], a; return r.peek() === "(" ? (i += r.read(), u.indexOf(i.toLowerCase()) > -1 ? (r.mark(), a = this.readURI(i), a === null ? (r.reset(), o = s.FUNCTION) : (o = s.URI, i = a)) : o = s.FUNCTION) : r.peek() === ":" && i.toLowerCase() === "progid" && (i += r.readTo("("), o = s.IE_FUNCTION), this.createToken(o, i, t, n); }, importantToken: function (e, t, n) { var r = this._reader, i = e, o = s.CHAR, u, a; r.mark(), a = r.read(); while (a) {
                    if (a === "/") {
                        if (r.peek() !== "*")
                            break;
                        u = this.readComment(a);
                        if (u === "")
                            break;
                    }
                    else {
                        if (!h(a)) {
                            if (/i/i.test(a)) {
                                u = r.readCount(8), /mportant/i.test(u) && (i += a + u, o = s.IMPORTANT_SYM);
                                break;
                            }
                            break;
                        }
                        i += a + this.readWhitespace();
                    }
                    a = r.read();
                } return o === s.CHAR ? (r.reset(), this.charToken(e, t, n)) : this.createToken(o, i, t, n); }, notToken: function (e, t, n) { var r = this._reader, i = e; return r.mark(), i += r.readCount(4), i.toLowerCase() === ":not(" ? this.createToken(s.NOT, i, t, n) : (r.reset(), this.charToken(e, t, n)); }, numberToken: function (e, t, n) { var r = this._reader, i = this.readNumber(e), o, u = s.NUMBER, a = r.peek(); return m(a) ? (o = this.readName(r.read()), i += o, /^em$|^ex$|^px$|^gd$|^rem$|^vw$|^vh$|^fr$|^vmax$|^vmin$|^ch$|^cm$|^mm$|^in$|^pt$|^pc$/i.test(o) ? u = s.LENGTH : /^deg|^rad$|^grad$|^turn$/i.test(o) ? u = s.ANGLE : /^ms$|^s$/i.test(o) ? u = s.TIME : /^hz$|^khz$/i.test(o) ? u = s.FREQ : /^dpi$|^dpcm$/i.test(o) ? u = s.RESOLUTION : u = s.DIMENSION) : a === "%" && (i += r.read(), u = s.PERCENTAGE), this.createToken(u, i, t, n); }, stringToken: function (e, t, n) { var r = e, i = e, o = this._reader, u = s.STRING, a = o.read(), f; while (a) {
                    i += a;
                    if (a === "\\") {
                        a = o.read();
                        if (a === null)
                            break;
                        if (/[^\r\n\f0-9a-f]/i.test(a))
                            i += a;
                        else {
                            for (f = 0; l(a) && f < 6; f++)
                                i += a, a = o.read();
                            a === "\r" && o.peek() === "\n" && (i += a, a = o.read());
                            if (!h(a))
                                continue;
                            i += a;
                        }
                    }
                    else {
                        if (a === r)
                            break;
                        if (p(o.peek())) {
                            u = s.INVALID;
                            break;
                        }
                    }
                    a = o.read();
                } return a === null && (u = s.INVALID), this.createToken(u, i, t, n); }, unicodeRangeToken: function (e, t, n) { var r = this._reader, i = e, o, u = s.CHAR; return r.peek() === "+" && (r.mark(), i += r.read(), i += this.readUnicodeRangePart(!0), i.length === 2 ? r.reset() : (u = s.UNICODE_RANGE, i.indexOf("?") === -1 && r.peek() === "-" && (r.mark(), o = r.read(), o += this.readUnicodeRangePart(!1), o.length === 1 ? r.reset() : i += o))), this.createToken(u, i, t, n); }, whitespaceToken: function (e, t, n) { var r = e + this.readWhitespace(); return this.createToken(s.S, r, t, n); }, readUnicodeRangePart: function (e) { var t = this._reader, n = "", r = t.peek(); while (l(r) && n.length < 6)
                    t.read(), n += r, r = t.peek(); if (e)
                    while (r === "?" && n.length < 6)
                        t.read(), n += r, r = t.peek(); return n; }, readWhitespace: function () { var e = this._reader, t = "", n = e.peek(); while (h(n))
                    e.read(), t += n, n = e.peek(); return t; }, readNumber: function (e) { var t = this._reader, n = e, r = e === ".", i = t.peek(); while (i) {
                    if (c(i))
                        n += t.read();
                    else {
                        if (i !== ".")
                            break;
                        if (r)
                            break;
                        r = !0, n += t.read();
                    }
                    i = t.peek();
                } return n; }, readString: function () { var e = this.stringToken(this._reader.read(), 0, 0); return e.type === s.INVALID ? null : e.value; }, readURI: function (e) { var t = this._reader, n = e, r = "", s = t.peek(); while (s && h(s))
                    t.read(), s = t.peek(); s === "'" || s === '"' ? (r = this.readString(), r !== null && (r = i.parseString(r))) : r = this.readUnquotedURL(), s = t.peek(); while (s && h(s))
                    t.read(), s = t.peek(); return r === null || s !== ")" ? n = null : n += i.serializeString(r) + t.read(), n; }, readUnquotedURL: function (e) { var t = this._reader, n = e || "", r; for (r = t.peek(); r; r = t.peek())
                    if (u.test(r) || /^[-!#$%&*-[\]-~]$/.test(r))
                        n += r, t.read();
                    else {
                        if (r !== "\\")
                            break;
                        if (!/^[^\r\n\f]$/.test(t.peek(2)))
                            break;
                        n += this.readEscape(t.read(), !0);
                    } return n; }, readName: function (e) { var t = this._reader, n = e || "", r; for (r = t.peek(); r; r = t.peek())
                    if (r === "\\") {
                        if (!/^[^\r\n\f]$/.test(t.peek(2)))
                            break;
                        n += this.readEscape(t.read(), !0);
                    }
                    else {
                        if (!v(r))
                            break;
                        n += t.read();
                    } return n; }, readEscape: function (e, t) { var n = this._reader, r = e || "", i = 0, s = n.peek(); if (l(s))
                    do
                        r += n.read(), s = n.peek();
                    while (s && l(s) && ++i < 6); if (r.length === 1) {
                    if (!/^[^\r\n\f0-9a-f]$/.test(s))
                        throw new Error("Bad escape sequence.");
                    n.read();
                    if (t)
                        return s;
                }
                else
                    s === "\r" ? (n.read(), n.peek() === "\n" && (s += n.read())) : /^[ \t\n\f]$/.test(s) ? n.read() : s = ""; if (t) {
                    var o = parseInt(r.slice(e.length), 16);
                    return String.fromCodePoint ? String.fromCodePoint(o) : String.fromCharCode(o);
                } return r + s; }, readComment: function (e) { var t = this._reader, n = e || "", r = t.read(); if (r === "*") {
                    while (r) {
                        n += r;
                        if (n.length > 2 && r === "*" && t.peek() === "/") {
                            n += t.read();
                            break;
                        }
                        r = t.read();
                    }
                    return n;
                } return ""; } });
        }, { "../util/TokenStreamBase": 27, "./PropertyValuePart": 11, "./Tokens": 18 }], 18: [function (e, t, n) {
            "use strict";
            var r = t.exports = [{ name: "CDO" }, { name: "CDC" }, { name: "S", whitespace: !0 }, { name: "COMMENT", comment: !0, hide: !0, channel: "comment" }, { name: "INCLUDES", text: "~=" }, { name: "DASHMATCH", text: "|=" }, { name: "PREFIXMATCH", text: "^=" }, { name: "SUFFIXMATCH", text: "$=" }, { name: "SUBSTRINGMATCH", text: "*=" }, { name: "STRING" }, { name: "IDENT" }, { name: "HASH" }, { name: "IMPORT_SYM", text: "@import" }, { name: "PAGE_SYM", text: "@page" }, { name: "MEDIA_SYM", text: "@media" }, { name: "FONT_FACE_SYM", text: "@font-face" }, { name: "CHARSET_SYM", text: "@charset" }, { name: "NAMESPACE_SYM", text: "@namespace" }, { name: "SUPPORTS_SYM", text: "@supports" }, { name: "VIEWPORT_SYM", text: ["@viewport", "@-ms-viewport", "@-o-viewport"] }, { name: "DOCUMENT_SYM", text: ["@document", "@-moz-document"] }, { name: "UNKNOWN_SYM" }, { name: "KEYFRAMES_SYM", text: ["@keyframes", "@-webkit-keyframes", "@-moz-keyframes", "@-o-keyframes"] }, { name: "IMPORTANT_SYM" }, { name: "LENGTH" }, { name: "ANGLE" }, { name: "TIME" }, { name: "FREQ" }, { name: "DIMENSION" }, { name: "PERCENTAGE" }, { name: "NUMBER" }, { name: "URI" }, { name: "FUNCTION" }, { name: "UNICODE_RANGE" }, { name: "INVALID" }, { name: "PLUS", text: "+" }, { name: "GREATER", text: ">" }, { name: "COMMA", text: "," }, { name: "TILDE", text: "~" }, { name: "NOT" }, { name: "TOPLEFTCORNER_SYM", text: "@top-left-corner" }, { name: "TOPLEFT_SYM", text: "@top-left" }, { name: "TOPCENTER_SYM", text: "@top-center" }, { name: "TOPRIGHT_SYM", text: "@top-right" }, { name: "TOPRIGHTCORNER_SYM", text: "@top-right-corner" }, { name: "BOTTOMLEFTCORNER_SYM", text: "@bottom-left-corner" }, { name: "BOTTOMLEFT_SYM", text: "@bottom-left" }, { name: "BOTTOMCENTER_SYM", text: "@bottom-center" }, { name: "BOTTOMRIGHT_SYM", text: "@bottom-right" }, { name: "BOTTOMRIGHTCORNER_SYM", text: "@bottom-right-corner" }, { name: "LEFTTOP_SYM", text: "@left-top" }, { name: "LEFTMIDDLE_SYM", text: "@left-middle" }, { name: "LEFTBOTTOM_SYM", text: "@left-bottom" }, { name: "RIGHTTOP_SYM", text: "@right-top" }, { name: "RIGHTMIDDLE_SYM", text: "@right-middle" }, { name: "RIGHTBOTTOM_SYM", text: "@right-bottom" }, { name: "RESOLUTION", state: "media" }, { name: "IE_FUNCTION" }, { name: "CHAR" }, { name: "PIPE", text: "|" }, { name: "SLASH", text: "/" }, { name: "MINUS", text: "-" }, { name: "STAR", text: "*" }, { name: "LBRACE", endChar: "}", text: "{" }, { name: "RBRACE", text: "}" }, { name: "LBRACKET", endChar: "]", text: "[" }, { name: "RBRACKET", text: "]" }, { name: "EQUALS", text: "=" }, { name: "COLON", text: ":" }, { name: "SEMICOLON", text: ";" }, { name: "LPAREN", endChar: ")", text: "(" }, { name: "RPAREN", text: ")" }, { name: "DOT", text: "." }];
            (function () { var e = [], t = Object.create(null); r.UNKNOWN = -1, r.unshift({ name: "EOF" }); for (var n = 0, i = r.length; n < i; n++) {
                e.push(r[n].name), r[r[n].name] = n;
                if (r[n].text)
                    if (r[n].text instanceof Array)
                        for (var s = 0; s < r[n].text.length; s++)
                            t[r[n].text[s]] = n;
                    else
                        t[r[n].text] = n;
            } r.name = function (t) { return e[t]; }, r.type = function (e) { return t[e] || -1; }; })();
        }, {}], 19: [function (e, t, n) {
            "use strict";
            var r = e("./Matcher"), i = e("./Properties"), s = e("./ValidationTypes"), o = e("./ValidationError"), u = e("./PropertyValueIterator"), a = t.exports = { validate: function (e, t) { var n = e.toString().toLowerCase(), r = new u(t), a = i[n], f; if (!a) {
                    if (n.indexOf("-") !== 0)
                        throw new o("Unknown property '" + e + "'.", e.line, e.col);
                }
                else if (typeof a != "number") {
                    if (s.isAny(r, "inherit | initial | unset")) {
                        if (r.hasNext())
                            throw f = r.next(), new o("Expected end of value but found '" + f + "'.", f.line, f.col);
                        return;
                    }
                    this.singleProperty(a, r);
                } }, singleProperty: function (e, t) { var n = !1, i = t.value, u; n = r.parse(e).match(t); if (!n)
                    throw t.hasNext() && !t.isFirst() ? (u = t.peek(), new o("Expected end of value but found '" + u + "'.", u.line, u.col)) : new o("Expected (" + s.describe(e) + ") but found '" + i + "'.", i.line, i.col); if (t.hasNext())
                    throw u = t.next(), new o("Expected end of value but found '" + u + "'.", u.line, u.col); } };
        }, { "./Matcher": 3, "./Properties": 7, "./PropertyValueIterator": 10, "./ValidationError": 20, "./ValidationTypes": 21 }], 20: [function (e, t, n) {
            "use strict";
            function r(e, t, n) { this.col = n, this.line = t, this.message = e; }
            t.exports = r, r.prototype = new Error;
        }, {}], 21: [function (e, t, n) {
            "use strict";
            function s(e, t) { Object.keys(t).forEach(function (n) { e[n] = t[n]; }); }
            var r = t.exports, i = e("./Matcher");
            s(r, { isLiteral: function (e, t) { var n = e.text.toString().toLowerCase(), r = t.split(" | "), i, s, o = !1; for (i = 0, s = r.length; i < s && !o; i++)
                    r[i].charAt(0) === "<" ? o = this.simple[r[i]](e) : r[i].slice(-2) === "()" ? o = e.type === "function" && e.name === r[i].slice(0, -2) : n === r[i].toLowerCase() && (o = !0); return o; }, isSimple: function (e) { return Boolean(this.simple[e]); }, isComplex: function (e) { return Boolean(this.complex[e]); }, describe: function (e) { return this.complex[e] instanceof i ? this.complex[e].toString(0) : e; }, isAny: function (e, t) { var n = t.split(" | "), r, i, s = !1; for (r = 0, i = n.length; r < i && !s && e.hasNext(); r++)
                    s = this.isType(e, n[r]); return s; }, isAnyOfGroup: function (e, t) { var n = t.split(" || "), r, i, s = !1; for (r = 0, i = n.length; r < i && !s; r++)
                    s = this.isType(e, n[r]); return s ? n[r - 1] : !1; }, isType: function (e, t) { var n = e.peek(), r = !1; return t.charAt(0) !== "<" ? (r = this.isLiteral(n, t), r && e.next()) : this.simple[t] ? (r = this.simple[t](n), r && e.next()) : this.complex[t] instanceof i ? r = this.complex[t].match(e) : r = this.complex[t](e), r; }, simple: { __proto__: null, "<absolute-size>": "xx-small | x-small | small | medium | large | x-large | xx-large", "<animateable-feature>": "scroll-position | contents | <animateable-feature-name>", "<animateable-feature-name>": function (e) { return this["<ident>"](e) && !/^(unset|initial|inherit|will-change|auto|scroll-position|contents)$/i.test(e); }, "<angle>": function (e) { return e.type === "angle"; }, "<attachment>": "scroll | fixed | local", "<attr>": "attr()", "<basic-shape>": "inset() | circle() | ellipse() | polygon()", "<bg-image>": "<image> | <gradient> | none", "<border-style>": "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset", "<border-width>": "<length> | thin | medium | thick", "<box>": "padding-box | border-box | content-box", "<clip-source>": "<uri>", "<color>": function (e) { return e.type === "color" || String(e) === "transparent" || String(e) === "currentColor"; }, "<color-svg>": function (e) { return e.type === "color"; }, "<content>": "content()", "<content-sizing>": "fill-available | -moz-available | -webkit-fill-available | max-content | -moz-max-content | -webkit-max-content | min-content | -moz-min-content | -webkit-min-content | fit-content | -moz-fit-content | -webkit-fit-content", "<feature-tag-value>": function (e) { return e.type === "function" && /^[A-Z0-9]{4}$/i.test(e); }, "<filter-function>": "blur() | brightness() | contrast() | custom() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia()", "<flex-basis>": "<width>", "<flex-direction>": "row | row-reverse | column | column-reverse", "<flex-grow>": "<number>", "<flex-shrink>": "<number>", "<flex-wrap>": "nowrap | wrap | wrap-reverse", "<font-size>": "<absolute-size> | <relative-size> | <length> | <percentage>", "<font-stretch>": "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded", "<font-style>": "normal | italic | oblique", "<font-variant-caps>": "small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps", "<font-variant-css21>": "normal | small-caps", "<font-weight>": "normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900", "<generic-family>": "serif | sans-serif | cursive | fantasy | monospace", "<geometry-box>": "<shape-box> | fill-box | stroke-box | view-box", "<glyph-angle>": function (e) { return e.type === "angle" && e.units === "deg"; }, "<gradient>": function (e) { return e.type === "function" && /^(?:-(?:ms|moz|o|webkit)-)?(?:repeating-)?(?:radial-|linear-)?gradient/i.test(e); }, "<icccolor>": "cielab() | cielch() | cielchab() | icc-color() | icc-named-color()", "<ident>": function (e) { return e.type === "identifier" || e.wasIdent; }, "<ident-not-generic-family>": function (e) { return this["<ident>"](e) && !this["<generic-family>"](e); }, "<image>": "<uri>", "<integer>": function (e) { return e.type === "integer"; }, "<length>": function (e) { return e.type === "function" && /^(?:-(?:ms|moz|o|webkit)-)?calc/i.test(e) ? !0 : e.type === "length" || e.type === "number" || e.type === "integer" || String(e) === "0"; }, "<line>": function (e) { return e.type === "integer"; }, "<line-height>": "<number> | <length> | <percentage> | normal", "<margin-width>": "<length> | <percentage> | auto", "<miterlimit>": function (e) { return this["<number>"](e) && e.value >= 1; }, "<nonnegative-length-or-percentage>": function (e) { return (this["<length>"](e) || this["<percentage>"](e)) && (String(e) === "0" || e.type === "function" || e.value >= 0); }, "<nonnegative-number-or-percentage>": function (e) { return (this["<number>"](e) || this["<percentage>"](e)) && (String(e) === "0" || e.type === "function" || e.value >= 0); }, "<number>": function (e) { return e.type === "number" || this["<integer>"](e); }, "<opacity-value>": function (e) { return this["<number>"](e) && e.value >= 0 && e.value <= 1; }, "<padding-width>": "<nonnegative-length-or-percentage>", "<percentage>": function (e) { return e.type === "percentage" || String(e) === "0"; }, "<relative-size>": "smaller | larger", "<shape>": "rect() | inset-rect()", "<shape-box>": "<box> | margin-box", "<single-animation-direction>": "normal | reverse | alternate | alternate-reverse", "<single-animation-name>": function (e) { return this["<ident>"](e) && /^-?[a-z_][-a-z0-9_]+$/i.test(e) && !/^(none|unset|initial|inherit)$/i.test(e); }, "<string>": function (e) { return e.type === "string"; }, "<time>": function (e) { return e.type === "time"; }, "<uri>": function (e) { return e.type === "uri"; }, "<width>": "<margin-width>" }, complex: { __proto__: null, "<azimuth>": "<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards", "<bg-position>": "<position>#", "<bg-size>": "[ <length> | <percentage> | auto ]{1,2} | cover | contain", "<blend-mode>": "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity", "<border-image-slice>": i.many([!0], i.cast("<nonnegative-number-or-percentage>"), i.cast("<nonnegative-number-or-percentage>"), i.cast("<nonnegative-number-or-percentage>"), i.cast("<nonnegative-number-or-percentage>"), "fill"), "<border-radius>": "<nonnegative-length-or-percentage>{1,4} [ / <nonnegative-length-or-percentage>{1,4} ]?", "<box-shadow>": "none | <shadow>#", "<clip-path>": "<basic-shape> || <geometry-box>", "<dasharray>": i.cast("<nonnegative-length-or-percentage>").braces(1, Infinity, "#", i.cast(",").question()), "<family-name>": "<string> | <ident-not-generic-family> <ident>*", "<filter-function-list>": "[ <filter-function> | <uri> ]+", "<flex>": "none | [ <flex-grow> <flex-shrink>? || <flex-basis> ]", "<font-family>": "[ <generic-family> | <family-name> ]#", "<font-shorthand>": "[ <font-style> || <font-variant-css21> || <font-weight> || <font-stretch> ]? <font-size> [ / <line-height> ]? <font-family>", "<font-variant-alternates>": "stylistic() || historical-forms || styleset() || character-variant() || swash() || ornaments() || annotation()", "<font-variant-ligatures>": "[ common-ligatures | no-common-ligatures ] || [ discretionary-ligatures | no-discretionary-ligatures ] || [ historical-ligatures | no-historical-ligatures ] || [ contextual | no-contextual ]", "<font-variant-numeric>": "[ lining-nums | oldstyle-nums ] || [ proportional-nums | tabular-nums ] || [ diagonal-fractions | stacked-fractions ] || ordinal || slashed-zero", "<font-variant-east-asian>": "[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ] || [ full-width | proportional-width ] || ruby", "<paint>": "<paint-basic> | <uri> <paint-basic>?", "<paint-basic>": "none | currentColor | <color-svg> <icccolor>?", "<position>": "[ center | [ left | right ] [ <percentage> | <length> ]? ] && [ center | [ top | bottom ] [ <percentage> | <length> ]? ] | [ left | center | right | <percentage> | <length> ] [ top | center | bottom | <percentage> | <length> ] | [ left | center | right | top | bottom | <percentage> | <length> ]", "<repeat-style>": "repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}", "<shadow>": i.many([!0], i.cast("<length>").braces(2, 4), "inset", "<color>"), "<text-decoration-color>": "<color>", "<text-decoration-line>": "none | [ underline || overline || line-through || blink ]", "<text-decoration-style>": "solid | double | dotted | dashed | wavy", "<will-change>": "auto | <animateable-feature>#", "<x-one-radius>": "[ <length> | <percentage> ]{1,2}" } }), Object.keys(r.simple).forEach(function (e) { var t = r.simple[e]; typeof t == "string" && (r.simple[e] = function (e) { return r.isLiteral(e, t); }); }), Object.keys(r.complex).forEach(function (e) { var t = r.complex[e]; typeof t == "string" && (r.complex[e] = i.parse(t)); }), r.complex["<font-variant>"] = i.oror({ expand: "<font-variant-ligatures>" }, { expand: "<font-variant-alternates>" }, "<font-variant-caps>", { expand: "<font-variant-numeric>" }, { expand: "<font-variant-east-asian>" });
        }, { "./Matcher": 3 }], 22: [function (e, t, n) {
            "use strict";
            t.exports = { Colors: e("./Colors"), Combinator: e("./Combinator"), Parser: e("./Parser"), PropertyName: e("./PropertyName"), PropertyValue: e("./PropertyValue"), PropertyValuePart: e("./PropertyValuePart"), Matcher: e("./Matcher"), MediaFeature: e("./MediaFeature"), MediaQuery: e("./MediaQuery"), Selector: e("./Selector"), SelectorPart: e("./SelectorPart"), SelectorSubPart: e("./SelectorSubPart"), Specificity: e("./Specificity"), TokenStream: e("./TokenStream"), Tokens: e("./Tokens"), ValidationError: e("./ValidationError") };
        }, { "./Colors": 1, "./Combinator": 2, "./Matcher": 3, "./MediaFeature": 4, "./MediaQuery": 5, "./Parser": 6, "./PropertyName": 8, "./PropertyValue": 9, "./PropertyValuePart": 11, "./Selector": 13, "./SelectorPart": 14, "./SelectorSubPart": 15, "./Specificity": 16, "./TokenStream": 17, "./Tokens": 18, "./ValidationError": 20 }], 23: [function (e, t, n) {
            "use strict";
            function r() { this._listeners = Object.create(null); }
            t.exports = r, r.prototype = { constructor: r, addListener: function (e, t) { this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t); }, fire: function (e) { typeof e == "string" && (e = { type: e }), typeof e.target != "undefined" && (e.target = this); if (typeof e.type == "undefined")
                    throw new Error("Event object missing 'type' property."); if (this._listeners[e.type]) {
                    var t = this._listeners[e.type].concat();
                    for (var n = 0, r = t.length; n < r; n++)
                        t[n].call(this, e);
                } }, removeListener: function (e, t) { if (this._listeners[e]) {
                    var n = this._listeners[e];
                    for (var r = 0, i = n.length; r < i; r++)
                        if (n[r] === t) {
                            n.splice(r, 1);
                            break;
                        }
                } } };
        }, {}], 24: [function (e, t, n) {
            "use strict";
            function r(e) { this._input = e.replace(/(\r\n?|\n)/g, "\n"), this._line = 1, this._col = 1, this._cursor = 0; }
            t.exports = r, r.prototype = { constructor: r, getCol: function () { return this._col; }, getLine: function () { return this._line; }, eof: function () { return this._cursor === this._input.length; }, peek: function (e) { var t = null; return e = typeof e == "undefined" ? 1 : e, this._cursor < this._input.length && (t = this._input.charAt(this._cursor + e - 1)), t; }, read: function () { var e = null; return this._cursor < this._input.length && (this._input.charAt(this._cursor) === "\n" ? (this._line++, this._col = 1) : this._col++, e = this._input.charAt(this._cursor++)), e; }, mark: function () { this._bookmark = { cursor: this._cursor, line: this._line, col: this._col }; }, reset: function () { this._bookmark && (this._cursor = this._bookmark.cursor, this._line = this._bookmark.line, this._col = this._bookmark.col, delete this._bookmark); }, peekCount: function (e) { return e = typeof e == "undefined" ? 1 : Math.max(e, 0), this._input.substring(this._cursor, this._cursor + e); }, readTo: function (e) { var t = "", n; while (t.length < e.length || t.lastIndexOf(e) !== t.length - e.length) {
                    n = this.read();
                    if (!n)
                        throw new Error('Expected "' + e + '" at line ' + this._line + ", col " + this._col + ".");
                    t += n;
                } return t; }, readWhile: function (e) { var t = "", n = this.peek(); while (n !== null && e(n))
                    t += this.read(), n = this.peek(); return t; }, readMatch: function (e) { var t = this._input.substring(this._cursor), n = null; return typeof e == "string" ? t.slice(0, e.length) === e && (n = this.readCount(e.length)) : e instanceof RegExp && e.test(t) && (n = this.readCount(RegExp.lastMatch.length)), n; }, readCount: function (e) { var t = ""; while (e--)
                    t += this.read(); return t; } };
        }, {}], 25: [function (e, t, n) {
            "use strict";
            function r(e, t, n) { Error.call(this), this.name = this.constructor.name, this.col = n, this.line = t, this.message = e; }
            t.exports = r, r.prototype = Object.create(Error.prototype), r.prototype.constructor = r;
        }, {}], 26: [function (e, t, n) {
            "use strict";
            function r(e, t, n, r) { this.col = n, this.line = t, this.text = e, this.type = r; }
            t.exports = r, r.fromToken = function (e) { return new r(e.value, e.startLine, e.startCol); }, r.prototype = { constructor: r, valueOf: function () { return this.toString(); }, toString: function () { return this.text; } };
        }, {}], 27: [function (e, t, n) {
            "use strict";
            function s(e, t) { this._reader = new r(e ? e.toString() : ""), this._token = null, this._tokenData = t, this._lt = [], this._ltIndex = 0, this._ltIndexCache = []; }
            t.exports = s;
            var r = e("./StringReader"), i = e("./SyntaxError");
            s.createTokenData = function (e) { var t = [], n = Object.create(null), r = e.concat([]), i = 0, s = r.length + 1; r.UNKNOWN = -1, r.unshift({ name: "EOF" }); for (; i < s; i++)
                t.push(r[i].name), r[r[i].name] = i, r[i].text && (n[r[i].text] = i); return r.name = function (e) { return t[e]; }, r.type = function (e) { return n[e]; }, r; }, s.prototype = { constructor: s, match: function (e, t) { e instanceof Array || (e = [e]); var n = this.get(t), r = 0, i = e.length; while (r < i)
                    if (n === e[r++])
                        return !0; return this.unget(), !1; }, mustMatch: function (e) { var t; e instanceof Array || (e = [e]); if (!this.match.apply(this, arguments))
                    throw t = this.LT(1), new i("Expected " + this._tokenData[e[0]].name + " at line " + t.startLine + ", col " + t.startCol + ".", t.startLine, t.startCol); }, advance: function (e, t) { while (this.LA(0) !== 0 && !this.match(e, t))
                    this.get(); return this.LA(0); }, get: function (e) { var t = this._tokenData, n = 0, r, i; if (this._lt.length && this._ltIndex >= 0 && this._ltIndex < this._lt.length) {
                    n++, this._token = this._lt[this._ltIndex++], i = t[this._token.type];
                    while (typeof i.channel != "undefined" && e !== i.channel && this._ltIndex < this._lt.length)
                        this._token = this._lt[this._ltIndex++], i = t[this._token.type], n++;
                    if ((typeof i.channel == "undefined" || e === i.channel) && this._ltIndex <= this._lt.length)
                        return this._ltIndexCache.push(n), this._token.type;
                } return r = this._getToken(), r.type > -1 && !t[r.type].hide && (r.channel = t[r.type].channel, this._token = r, this._lt.push(r), this._ltIndexCache.push(this._lt.length - this._ltIndex + n), this._lt.length > 5 && this._lt.shift(), this._ltIndexCache.length > 5 && this._ltIndexCache.shift(), this._ltIndex = this._lt.length), i = t[r.type], i && (i.hide || typeof i.channel != "undefined" && e !== i.channel) ? this.get(e) : r.type; }, LA: function (e) { var t = e, n; if (e > 0) {
                    if (e > 5)
                        throw new Error("Too much lookahead.");
                    while (t)
                        n = this.get(), t--;
                    while (t < e)
                        this.unget(), t++;
                }
                else if (e < 0) {
                    if (!this._lt[this._ltIndex + e])
                        throw new Error("Too much lookbehind.");
                    n = this._lt[this._ltIndex + e].type;
                }
                else
                    n = this._token.type; return n; }, LT: function (e) { return this.LA(e), this._lt[this._ltIndex + e - 1]; }, peek: function () { return this.LA(1); }, token: function () { return this._token; }, tokenName: function (e) { return e < 0 || e > this._tokenData.length ? "UNKNOWN_TOKEN" : this._tokenData[e].name; }, tokenType: function (e) { return this._tokenData[e] || -1; }, unget: function () { if (!this._ltIndexCache.length)
                    throw new Error("Too much lookahead."); this._ltIndex -= this._ltIndexCache.pop(), this._token = this._lt[this._ltIndex - 1]; } };
        }, { "./StringReader": 24, "./SyntaxError": 25 }], 28: [function (e, t, n) {
            "use strict";
            t.exports = { StringReader: e("./StringReader"), SyntaxError: e("./SyntaxError"), SyntaxUnit: e("./SyntaxUnit"), EventTarget: e("./EventTarget"), TokenStreamBase: e("./TokenStreamBase") };
        }, { "./EventTarget": 23, "./StringReader": 24, "./SyntaxError": 25, "./SyntaxUnit": 26, "./TokenStreamBase": 27 }], parserlib: [function (e, t, n) {
            "use strict";
            t.exports = { css: e("./css"), util: e("./util") };
        }, { "./css": 22, "./util": 28 }] }, {}, []), e("parserlib"); }(), r = function () {
    "use strict";
    function e(e, t) { return t != null && e instanceof t; }
    function s(n, o, u, a, f) { function d(n, u) { if (n === null)
        return null; if (u === 0)
        return n; var v, m; if (typeof n != "object")
        return n; if (e(n, t))
        v = new t;
    else if (e(n, r))
        v = new r;
    else if (e(n, i))
        v = new i(function (e, t) { n.then(function (t) { e(d(t, u - 1)); }, function (e) { t(d(e, u - 1)); }); });
    else if (s.__isArray(n))
        v = [];
    else if (s.__isRegExp(n))
        v = new RegExp(n.source, l(n)), n.lastIndex && (v.lastIndex = n.lastIndex);
    else if (s.__isDate(n))
        v = new Date(n.getTime());
    else {
        if (p && Buffer.isBuffer(n))
            return Buffer.allocUnsafe ? v = Buffer.allocUnsafe(n.length) : v = new Buffer(n.length), n.copy(v), v;
        e(n, Error) ? v = Object.create(n) : typeof a == "undefined" ? (m = Object.getPrototypeOf(n), v = Object.create(m)) : (v = Object.create(a), m = a);
    } if (o) {
        var g = c.indexOf(n);
        if (g != -1)
            return h[g];
        c.push(n), h.push(v);
    } e(n, t) && n.forEach(function (e, t) { var n = d(t, u - 1), r = d(e, u - 1); v.set(n, r); }), e(n, r) && n.forEach(function (e) { var t = d(e, u - 1); v.add(t); }); for (var y in n) {
        var b;
        m && (b = Object.getOwnPropertyDescriptor(m, y));
        if (b && b.set == null)
            continue;
        v[y] = d(n[y], u - 1);
    } if (Object.getOwnPropertySymbols) {
        var w = Object.getOwnPropertySymbols(n);
        for (var y = 0; y < w.length; y++) {
            var E = w[y], S = Object.getOwnPropertyDescriptor(n, E);
            if (S && !S.enumerable && !f)
                continue;
            v[E] = d(n[E], u - 1), S.enumerable || Object.defineProperty(v, E, { enumerable: !1 });
        }
    } if (f) {
        var x = Object.getOwnPropertyNames(n);
        for (var y = 0; y < x.length; y++) {
            var T = x[y], S = Object.getOwnPropertyDescriptor(n, T);
            if (S && S.enumerable)
                continue;
            v[T] = d(n[T], u - 1), Object.defineProperty(v, T, { enumerable: !1 });
        }
    } return v; } typeof o == "object" && (u = o.depth, a = o.prototype, f = o.includeNonEnumerable, o = o.circular); var c = [], h = [], p = typeof Buffer != "undefined"; return typeof o == "undefined" && (o = !0), typeof u == "undefined" && (u = Infinity), d(n, u); }
    function o(e) { return Object.prototype.toString.call(e); }
    function u(e) { return typeof e == "object" && o(e) === "[object Date]"; }
    function a(e) { return typeof e == "object" && o(e) === "[object Array]"; }
    function f(e) { return typeof e == "object" && o(e) === "[object RegExp]"; }
    function l(e) { var t = ""; return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), t; }
    var t;
    try {
        t = Map;
    }
    catch (n) {
        t = function () { };
    }
    var r;
    try {
        r = Set;
    }
    catch (n) {
        r = function () { };
    }
    var i;
    try {
        i = Promise;
    }
    catch (n) {
        i = function () { };
    }
    return s.clonePrototype = function (t) { if (t === null)
        return null; var n = function () { }; return n.prototype = t, new n; }, s.__objToStr = o, s.__isDate = u, s.__isArray = a, s.__isRegExp = f, s.__getRegExpFlags = l, s;
}(); typeof e == "object" && e.exports && (e.exports = r); var i = function () {
    "use strict";
    function a(e, t) { var n, r = e && e.match(o), i = r && r[1]; return i && (n = { "true": 2, "": 1, "false": 0, 2: 2, 1: 1, 0: 0 }, i.toLowerCase().split(",").forEach(function (e) { var r = e.split(":"), i = r[0] || "", s = r[1] || ""; t[i.trim()] = n[s.trim()]; })), t; }
    var e = [], t = [], o = /\/\*\s*csslint([^\*]*)\*\//, u = new n.util.EventTarget;
    return u.version = "1.0.5", u.addRule = function (t) { e.push(t), e[t.id] = t; }, u.clearRules = function () { e = []; }, u.getRules = function () { return [].concat(e).sort(function (e, t) { return e.id > t.id ? 1 : 0; }); }, u.getRuleset = function () { var t = {}, n = 0, r = e.length; while (n < r)
        t[e[n++].id] = 1; return t; }, u.addFormatter = function (e) { t[e.id] = e; }, u.getFormatter = function (e) { return t[e]; }, u.format = function (e, t, n, r) { var i = u.getFormatter(n), s = null; return i && (s = i.startFormat(), s += i.formatResults(e, t, r || {}), s += i.endFormat()), s; }, u.hasFormat = function (e) { return t.hasOwnProperty(e); }, u.verify = function (t, f) { var l = 0, c, h, p = {}, d = [], v, m = new n.css.Parser({ starHack: !0, ieFilters: !0, underscoreHack: !0, strict: !1 }); h = t.replace(/\n\r?/g, "$split$").split("$split$"), i.Util.forEach(h, function (e, t) { var n = e && e.match(/\/\*[ \t]*csslint[ \t]+allow:[ \t]*([^\*]*)\*\//i), r = n && n[1], i = {}; r && (r.toLowerCase().split(",").forEach(function (e) { i[e.trim()] = !0; }), Object.keys(i).length > 0 && (p[t + 1] = i)); }); var g = null, y = null; i.Util.forEach(h, function (e, t) { g === null && e.match(/\/\*[ \t]*csslint[ \t]+ignore:start[ \t]*\*\//i) && (g = t), e.match(/\/\*[ \t]*csslint[ \t]+ignore:end[ \t]*\*\//i) && (y = t), g !== null && y !== null && (d.push([g, y]), g = y = null); }), g !== null && d.push([g, h.length]), f || (f = u.getRuleset()), o.test(t) && (f = r(f), f = a(t, f)), c = new s(h, f, p, d), f.errors = 2; for (l in f)
        f.hasOwnProperty(l) && f[l] && e[l] && e[l].init(m, c); try {
        m.parse(t);
    }
    catch (b) {
        c.error("Fatal error, cannot continue: " + b.message, b.line, b.col, {});
    } return v = { messages: c.messages, stats: c.stats, ruleset: c.ruleset, allow: c.allow, ignore: c.ignore }, v.messages.sort(function (e, t) { return e.rollup && !t.rollup ? 1 : !e.rollup && t.rollup ? -1 : e.line - t.line; }), v; }, u;
}(); return s.prototype = { constructor: s, error: function (e, t, n, r) {
        "use strict";
        this.messages.push({ type: "error", line: t, col: n, message: e, evidence: this.lines[t - 1], rule: r || {} });
    }, warn: function (e, t, n, r) {
        "use strict";
        this.report(e, t, n, r);
    }, report: function (e, t, n, r) {
        "use strict";
        if (this.allow.hasOwnProperty(t) && this.allow[t].hasOwnProperty(r.id))
            return;
        if (this.isIgnored(t))
            return;
        this.messages.push({ type: this.ruleset[r.id] === 2 ? "error" : "warning", line: t, col: n, message: e, evidence: this.lines[t - 1], rule: r });
    }, info: function (e, t, n, r) {
        "use strict";
        this.messages.push({ type: "info", line: t, col: n, message: e, evidence: this.lines[t - 1], rule: r });
    }, rollupError: function (e, t) {
        "use strict";
        this.messages.push({ type: "error", rollup: !0, message: e, rule: t });
    }, rollupWarn: function (e, t) {
        "use strict";
        this.messages.push({ type: "warning", rollup: !0, message: e, rule: t });
    }, stat: function (e, t) {
        "use strict";
        this.stats[e] = t;
    }, isIgnored: function (e) {
        "use strict";
        var t = !1;
        return i.Util.forEach(this.ignore, function (n) { n[0] <= e && e <= n[1] && (t = !0); }), t;
    } }, i._Reporter = s, i.Util = { mix: function (e, t) {
        "use strict";
        var n;
        for (n in t)
            t.hasOwnProperty(n) && (e[n] = t[n]);
        return n;
    }, indexOf: function (e, t) {
        "use strict";
        if (e.indexOf)
            return e.indexOf(t);
        for (var n = 0, r = e.length; n < r; n++)
            if (e[n] === t)
                return n;
        return -1;
    }, forEach: function (e, t) {
        "use strict";
        if (e.forEach)
            return e.forEach(t);
        for (var n = 0, r = e.length; n < r; n++)
            t(e[n], n, e);
    } }, i.addRule({ id: "box-model", name: "Beware of broken box size", desc: "Don't use width or height when using padding or border.", url: "https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size", browsers: "All", init: function (e, t) {
        "use strict";
        function u() { s = {}, o = !1; }
        function a() { var e, u; if (!o) {
            if (s.height)
                for (e in i)
                    i.hasOwnProperty(e) && s[e] && (u = s[e].value, (e !== "padding" || u.parts.length !== 2 || u.parts[0].value !== 0) && t.report("Using height with " + e + " can sometimes make elements larger than you expect.", s[e].line, s[e].col, n));
            if (s.width)
                for (e in r)
                    r.hasOwnProperty(e) && s[e] && (u = s[e].value, (e !== "padding" || u.parts.length !== 2 || u.parts[1].value !== 0) && t.report("Using width with " + e + " can sometimes make elements larger than you expect.", s[e].line, s[e].col, n));
        } }
        var n = this, r = { border: 1, "border-left": 1, "border-right": 1, padding: 1, "padding-left": 1, "padding-right": 1 }, i = { border: 1, "border-bottom": 1, "border-top": 1, padding: 1, "padding-bottom": 1, "padding-top": 1 }, s, o = !1;
        e.addListener("startrule", u), e.addListener("startfontface", u), e.addListener("startpage", u), e.addListener("startpagemargin", u), e.addListener("startkeyframerule", u), e.addListener("startviewport", u), e.addListener("property", function (e) { var t = e.property.text.toLowerCase(); i[t] || r[t] ? !/^0\S*$/.test(e.value) && (t !== "border" || e.value.toString() !== "none") && (s[t] = { line: e.property.line, col: e.property.col, value: e.value }) : /^(width|height)/i.test(t) && /^(length|percentage)/.test(e.value.parts[0].type) ? s[t] = 1 : t === "box-sizing" && (o = !0); }), e.addListener("endrule", a), e.addListener("endfontface", a), e.addListener("endpage", a), e.addListener("endpagemargin", a), e.addListener("endkeyframerule", a), e.addListener("endviewport", a);
    } }), i.addRule({ id: "bulletproof-font-face", name: "Use the bulletproof @font-face syntax", desc: "Use the bulletproof @font-face syntax to avoid 404's in old IE (http://www.fontspring.com/blog/the-new-bulletproof-font-face-syntax).", url: "https://github.com/CSSLint/csslint/wiki/Bulletproof-font-face", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = !1, i = !0, s = !1, o, u;
        e.addListener("startfontface", function () { r = !0; }), e.addListener("property", function (e) { if (!r)
            return; var t = e.property.toString().toLowerCase(), n = e.value.toString(); o = e.line, u = e.col; if (t === "src") {
            var a = /^\s?url\(['"].+\.eot\?.*['"]\)\s*format\(['"]embedded-opentype['"]\).*$/i;
            !n.match(a) && i ? (s = !0, i = !1) : n.match(a) && !i && (s = !1);
        } }), e.addListener("endfontface", function () { r = !1, s && t.report("@font-face declaration doesn't follow the fontspring bulletproof syntax.", o, u, n); });
    } }), i.addRule({ id: "compatible-vendor-prefixes", name: "Require compatible vendor prefixes", desc: "Include all compatible vendor prefixes to reach a wider range of users.", url: "https://github.com/CSSLint/csslint/wiki/Require-compatible-vendor-prefixes", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r, s, o, u, a, f, l, c = !1, h = Array.prototype.push, p = [];
        r = { animation: "webkit", "animation-delay": "webkit", "animation-direction": "webkit", "animation-duration": "webkit", "animation-fill-mode": "webkit", "animation-iteration-count": "webkit", "animation-name": "webkit", "animation-play-state": "webkit", "animation-timing-function": "webkit", appearance: "webkit moz", "border-end": "webkit moz", "border-end-color": "webkit moz", "border-end-style": "webkit moz", "border-end-width": "webkit moz", "border-image": "webkit moz o", "border-radius": "webkit", "border-start": "webkit moz", "border-start-color": "webkit moz", "border-start-style": "webkit moz", "border-start-width": "webkit moz", "box-align": "webkit moz", "box-direction": "webkit moz", "box-flex": "webkit moz", "box-lines": "webkit", "box-ordinal-group": "webkit moz", "box-orient": "webkit moz", "box-pack": "webkit moz", "box-sizing": "", "box-shadow": "", "column-count": "webkit moz ms", "column-gap": "webkit moz ms", "column-rule": "webkit moz ms", "column-rule-color": "webkit moz ms", "column-rule-style": "webkit moz ms", "column-rule-width": "webkit moz ms", "column-width": "webkit moz ms", flex: "webkit ms", "flex-basis": "webkit", "flex-direction": "webkit ms", "flex-flow": "webkit", "flex-grow": "webkit", "flex-shrink": "webkit", hyphens: "epub moz", "line-break": "webkit ms", "margin-end": "webkit moz", "margin-start": "webkit moz", "marquee-speed": "webkit wap", "marquee-style": "webkit wap", "padding-end": "webkit moz", "padding-start": "webkit moz", "tab-size": "moz o", "text-size-adjust": "webkit ms", transform: "webkit ms", "transform-origin": "webkit ms", transition: "", "transition-delay": "", "transition-duration": "", "transition-property": "", "transition-timing-function": "", "user-modify": "webkit moz", "user-select": "webkit moz ms", "word-break": "epub ms", "writing-mode": "epub ms" };
        for (o in r)
            if (r.hasOwnProperty(o)) {
                u = [], a = r[o].split(" ");
                for (f = 0, l = a.length; f < l; f++)
                    u.push("-" + a[f] + "-" + o);
                r[o] = u, h.apply(p, u);
            }
        e.addListener("startrule", function () { s = []; }), e.addListener("startkeyframes", function (e) { c = e.prefix || !0; }), e.addListener("endkeyframes", function () { c = !1; }), e.addListener("property", function (e) { var t = e.property; i.Util.indexOf(p, t.text) > -1 && (!c || typeof c != "string" || t.text.indexOf("-" + c + "-") !== 0) && s.push(t); }), e.addListener("endrule", function () { if (!s.length)
            return; var e = {}, o, u, a, f, l, c, h, p, d, v; for (o = 0, u = s.length; o < u; o++) {
            a = s[o];
            for (f in r)
                r.hasOwnProperty(f) && (l = r[f], i.Util.indexOf(l, a.text) > -1 && (e[f] || (e[f] = { full: l.slice(0), actual: [], actualNodes: [] }), i.Util.indexOf(e[f].actual, a.text) === -1 && (e[f].actual.push(a.text), e[f].actualNodes.push(a))));
        } for (f in e)
            if (e.hasOwnProperty(f)) {
                c = e[f], h = c.full, p = c.actual;
                if (h.length > p.length)
                    for (o = 0, u = h.length; o < u; o++)
                        d = h[o], i.Util.indexOf(p, d) === -1 && (v = p.length === 1 ? p[0] : p.length === 2 ? p.join(" and ") : p.join(", "), t.report("The property " + d + " is compatible with " + v + " and should be included as well.", c.actualNodes[0].line, c.actualNodes[0].col, n));
            } });
    } }), i.addRule({ id: "display-property-grouping", name: "Require properties appropriate for display", desc: "Certain properties shouldn't be used with certain display property values.", url: "https://github.com/CSSLint/csslint/wiki/Require-properties-appropriate-for-display", browsers: "All", init: function (e, t) {
        "use strict";
        function s(e, s, o) { i[e] && (typeof r[e] != "string" || i[e].value.toLowerCase() !== r[e]) && t.report(o || e + " can't be used with display: " + s + ".", i[e].line, i[e].col, n); }
        function o() { i = {}; }
        function u() { var e = i.display ? i.display.value : null; if (e)
            switch (e) {
                case "inline":
                    s("height", e), s("width", e), s("margin", e), s("margin-top", e), s("margin-bottom", e), s("float", e, "display:inline has no effect on floated elements (but may be used to fix the IE6 double-margin bug).");
                    break;
                case "block":
                    s("vertical-align", e);
                    break;
                case "inline-block":
                    s("float", e);
                    break;
                default: e.indexOf("table-") === 0 && (s("margin", e), s("margin-left", e), s("margin-right", e), s("margin-top", e), s("margin-bottom", e), s("float", e));
            } }
        var n = this, r = { display: 1, "float": "none", height: 1, width: 1, margin: 1, "margin-left": 1, "margin-right": 1, "margin-bottom": 1, "margin-top": 1, padding: 1, "padding-left": 1, "padding-right": 1, "padding-bottom": 1, "padding-top": 1, "vertical-align": 1 }, i;
        e.addListener("startrule", o), e.addListener("startfontface", o), e.addListener("startkeyframerule", o), e.addListener("startpagemargin", o), e.addListener("startpage", o), e.addListener("startviewport", o), e.addListener("property", function (e) { var t = e.property.text.toLowerCase(); r[t] && (i[t] = { value: e.value.text, line: e.property.line, col: e.property.col }); }), e.addListener("endrule", u), e.addListener("endfontface", u), e.addListener("endkeyframerule", u), e.addListener("endpagemargin", u), e.addListener("endpage", u), e.addListener("endviewport", u);
    } }), i.addRule({ id: "duplicate-background-images", name: "Disallow duplicate background images", desc: "Every background-image should be unique. Use a common class for e.g. sprites.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-background-images", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = {};
        e.addListener("property", function (e) { var i = e.property.text, s = e.value, o, u; if (i.match(/background/i))
            for (o = 0, u = s.parts.length; o < u; o++)
                s.parts[o].type === "uri" && (typeof r[s.parts[o].uri] == "undefined" ? r[s.parts[o].uri] = e : t.report("Background image '" + s.parts[o].uri + "' was used multiple times, first declared at line " + r[s.parts[o].uri].line + ", col " + r[s.parts[o].uri].col + ".", e.line, e.col, n)); });
    } }), i.addRule({ id: "duplicate-properties", name: "Disallow duplicate properties", desc: "Duplicate properties must appear one after the other.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-duplicate-properties", browsers: "All", init: function (e, t) {
        "use strict";
        function s() { r = {}; }
        var n = this, r, i;
        e.addListener("startrule", s), e.addListener("startfontface", s), e.addListener("startpage", s), e.addListener("startpagemargin", s), e.addListener("startkeyframerule", s), e.addListener("startviewport", s), e.addListener("property", function (e) { var s = e.property, o = s.text.toLowerCase(); r[o] && (i !== o || r[o] === e.value.text) && t.report("Duplicate property '" + e.property + "' found.", e.line, e.col, n), r[o] = e.value.text, i = o; });
    } }), i.addRule({ id: "empty-rules", name: "Disallow empty rules", desc: "Rules without any properties specified should be removed.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-empty-rules", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("startrule", function () { r = 0; }), e.addListener("property", function () { r++; }), e.addListener("endrule", function (e) { var i = e.selectors; r === 0 && t.report("Rule is empty.", i[0].line, i[0].col, n); });
    } }), i.addRule({ id: "errors", name: "Parsing Errors", desc: "This rule looks for recoverable syntax errors.", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("error", function (e) { t.error(e.message, e.line, e.col, n); });
    } }), i.addRule({ id: "floats", name: "Disallow too many floats", desc: "This rule tests if the float property is used too many times", url: "https://github.com/CSSLint/csslint/wiki/Disallow-too-many-floats", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("property", function (e) { t.isIgnored(e.property.line) || e.property.text.toLowerCase() === "float" && e.value.text.toLowerCase() !== "none" && r++; }), e.addListener("endstylesheet", function () { t.stat("floats", r), r >= 10 && t.rollupWarn("Too many floats (" + r + "), you're probably using them for layout. Consider using a grid system instead.", n); });
    } }), i.addRule({ id: "font-faces", name: "Don't use too many web fonts", desc: "Too many different web fonts in the same stylesheet.", url: "https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-web-fonts", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("startfontface", function (e) { t.isIgnored(e.line) || r++; }), e.addListener("endstylesheet", function () { r > 5 && t.rollupWarn("Too many @font-face declarations (" + r + ").", n); });
    } }), i.addRule({ id: "font-sizes", name: "Disallow too many font sizes", desc: "Checks the number of font-size declarations.", url: "https://github.com/CSSLint/csslint/wiki/Don%27t-use-too-many-font-size-declarations", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("property", function (e) { t.isIgnored(e.property.line) || e.property.toString() === "font-size" && r++; }), e.addListener("endstylesheet", function () { t.stat("font-sizes", r), r >= 10 && t.rollupWarn("Too many font-size declarations (" + r + "), abstraction needed.", n); });
    } }), i.addRule({ id: "gradients", name: "Require all gradient definitions", desc: "When using a vendor-prefixed gradient, make sure to use them all.", url: "https://github.com/CSSLint/csslint/wiki/Require-all-gradient-definitions", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r;
        e.addListener("startrule", function () { r = { moz: 0, webkit: 0, oldWebkit: 0, o: 0 }; }), e.addListener("property", function (e) { /\-(moz|o|webkit)(?:\-(?:linear|radial))\-gradient/i.test(e.value) ? r[RegExp.$1] = 1 : /\-webkit\-gradient/i.test(e.value) && (r.oldWebkit = 1); }), e.addListener("endrule", function (e) { var i = []; r.moz || i.push("Firefox 3.6+"), r.webkit || i.push("Webkit (Safari 5+, Chrome)"), r.oldWebkit || i.push("Old Webkit (Safari 4+, Chrome)"), r.o || i.push("Opera 11.1+"), i.length && i.length < 4 && t.report("Missing vendor-prefixed CSS gradients for " + i.join(", ") + ".", e.selectors[0].line, e.selectors[0].col, n); });
    } }), i.addRule({ id: "ids", name: "Disallow IDs in selectors", desc: "Selectors should not contain IDs.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-IDs-in-selectors", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("startrule", function (r) { var i = r.selectors, s, o, u, a, f, l, c; for (f = 0; f < i.length; f++) {
            s = i[f], a = 0;
            for (l = 0; l < s.parts.length; l++) {
                o = s.parts[l];
                if (o.type === e.SELECTOR_PART_TYPE)
                    for (c = 0; c < o.modifiers.length; c++)
                        u = o.modifiers[c], u.type === "id" && a++;
            }
            a === 1 ? t.report("Don't use IDs in selectors.", s.line, s.col, n) : a > 1 && t.report(a + " IDs in the selector, really?", s.line, s.col, n);
        } });
    } }), i.addRule({ id: "import-ie-limit", name: "@import limit on IE6-IE9", desc: "IE6-9 supports up to 31 @import per stylesheet", browsers: "IE6, IE7, IE8, IE9", init: function (e, t) {
        "use strict";
        function s() { i = 0; }
        var n = this, r = 31, i = 0;
        e.addListener("startpage", s), e.addListener("import", function () { i++; }), e.addListener("endstylesheet", function () { i > r && t.rollupError("Too many @import rules (" + i + "). IE6-9 supports up to 31 import per stylesheet.", n); });
    } }), i.addRule({ id: "import", name: "Disallow @import", desc: "Don't use @import, use <link> instead.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-%40import", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("import", function (e) { t.report("@import prevents parallel downloads, use <link> instead.", e.line, e.col, n); });
    } }), i.addRule({ id: "important", name: "Disallow !important", desc: "Be careful when using !important declaration", url: "https://github.com/CSSLint/csslint/wiki/Disallow-%21important", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("property", function (e) { t.isIgnored(e.line) || e.important === !0 && (r++, t.report("Use of !important", e.line, e.col, n)); }), e.addListener("endstylesheet", function () { t.stat("important", r), r >= 10 && t.rollupWarn("Too many !important declarations (" + r + "), try to use less than 10 to avoid specificity issues.", n); });
    } }), i.addRule({ id: "known-properties", name: "Require use of known properties", desc: "Properties should be known (listed in CSS3 specification) or be a vendor-prefixed property.", url: "https://github.com/CSSLint/csslint/wiki/Require-use-of-known-properties", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("property", function (e) { e.invalid && t.report(e.invalid.message, e.line, e.col, n); });
    } }), i.addRule({ id: "order-alphabetical", name: "Alphabetical order", desc: "Assure properties are in alphabetical order", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r, i = function () { r = []; }, s = function (e) { var i = r.join(","), s = r.sort().join(","); i !== s && t.report("Rule doesn't have all its properties in alphabetical order.", e.line, e.col, n); };
        e.addListener("startrule", i), e.addListener("startfontface", i), e.addListener("startpage", i), e.addListener("startpagemargin", i), e.addListener("startkeyframerule", i), e.addListener("startviewport", i), e.addListener("property", function (e) { var t = e.property.text, n = t.toLowerCase().replace(/^-.*?-/, ""); r.push(n); }), e.addListener("endrule", s), e.addListener("endfontface", s), e.addListener("endpage", s), e.addListener("endpagemargin", s), e.addListener("endkeyframerule", s), e.addListener("endviewport", s);
    } }), i.addRule({ id: "outline-none", name: "Disallow outline: none", desc: "Use of outline: none or outline: 0 should be limited to :focus rules.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-outline%3Anone", browsers: "All", tags: ["Accessibility"], init: function (e, t) {
        "use strict";
        function i(e) { e.selectors ? r = { line: e.line, col: e.col, selectors: e.selectors, propCount: 0, outline: !1 } : r = null; }
        function s() { r && r.outline && (r.selectors.toString().toLowerCase().indexOf(":focus") === -1 ? t.report("Outlines should only be modified using :focus.", r.line, r.col, n) : r.propCount === 1 && t.report("Outlines shouldn't be hidden unless other visual changes are made.", r.line, r.col, n)); }
        var n = this, r;
        e.addListener("startrule", i), e.addListener("startfontface", i), e.addListener("startpage", i), e.addListener("startpagemargin", i), e.addListener("startkeyframerule", i), e.addListener("startviewport", i), e.addListener("property", function (e) { var t = e.property.text.toLowerCase(), n = e.value; r && (r.propCount++, t === "outline" && (n.toString() === "none" || n.toString() === "0") && (r.outline = !0)); }), e.addListener("endrule", s), e.addListener("endfontface", s), e.addListener("endpage", s), e.addListener("endpagemargin", s), e.addListener("endkeyframerule", s), e.addListener("endviewport", s);
    } }), i.addRule({ id: "overqualified-elements", name: "Disallow overqualified elements", desc: "Don't use classes or IDs with elements (a.foo or a#foo).", url: "https://github.com/CSSLint/csslint/wiki/Disallow-overqualified-elements", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this, r = {};
        e.addListener("startrule", function (i) { var s = i.selectors, o, u, a, f, l, c; for (f = 0; f < s.length; f++) {
            o = s[f];
            for (l = 0; l < o.parts.length; l++) {
                u = o.parts[l];
                if (u.type === e.SELECTOR_PART_TYPE)
                    for (c = 0; c < u.modifiers.length; c++)
                        a = u.modifiers[c], u.elementName && a.type === "id" ? t.report("Element (" + u + ") is overqualified, just use " + a + " without element name.", u.line, u.col, n) : a.type === "class" && (r[a] || (r[a] = []), r[a].push({ modifier: a, part: u }));
            }
        } }), e.addListener("endstylesheet", function () { var e; for (e in r)
            r.hasOwnProperty(e) && r[e].length === 1 && r[e][0].part.elementName && t.report("Element (" + r[e][0].part + ") is overqualified, just use " + r[e][0].modifier + " without element name.", r[e][0].part.line, r[e][0].part.col, n); });
    } }), i.addRule({ id: "regex-selectors", name: "Disallow selectors that look like regexs", desc: "Selectors that look like regular expressions are slow and should be avoided.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-selectors-that-look-like-regular-expressions", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("startrule", function (r) { var i = r.selectors, s, o, u, a, f, l; for (a = 0; a < i.length; a++) {
            s = i[a];
            for (f = 0; f < s.parts.length; f++) {
                o = s.parts[f];
                if (o.type === e.SELECTOR_PART_TYPE)
                    for (l = 0; l < o.modifiers.length; l++)
                        u = o.modifiers[l], u.type === "attribute" && /([~\|\^\$\*]=)/.test(u) && t.report("Attribute selectors with " + RegExp.$1 + " are slow!", u.line, u.col, n);
            }
        } });
    } }), i.addRule({ id: "rules-count", name: "Rules Count", desc: "Track how many rules there are.", browsers: "All", init: function (e, t) {
        "use strict";
        var n = 0;
        e.addListener("startrule", function () { n++; }), e.addListener("endstylesheet", function () { t.stat("rule-count", n); });
    } }), i.addRule({ id: "selector-max-approaching", name: "Warn when approaching the 4095 selector limit for IE", desc: "Will warn when selector count is >= 3800 selectors.", browsers: "IE", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("startrule", function (e) { r += e.selectors.length; }), e.addListener("endstylesheet", function () { r >= 3800 && t.report("You have " + r + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.", 0, 0, n); });
    } }), i.addRule({ id: "selector-max", name: "Error when past the 4095 selector limit for IE", desc: "Will error when selector count is > 4095.", browsers: "IE", init: function (e, t) {
        "use strict";
        var n = this, r = 0;
        e.addListener("startrule", function (e) { r += e.selectors.length; }), e.addListener("endstylesheet", function () { r > 4095 && t.report("You have " + r + " selectors. Internet Explorer supports a maximum of 4095 selectors per stylesheet. Consider refactoring.", 0, 0, n); });
    } }), i.addRule({ id: "selector-newline", name: "Disallow new-line characters in selectors", desc: "New-line characters in selectors are usually a forgotten comma and not a descendant combinator.", browsers: "All", init: function (e, t) {
        "use strict";
        function r(e) { var r, i, s, o, u, a, f, l, c, h, p, d = e.selectors; for (r = 0, i = d.length; r < i; r++) {
            s = d[r];
            for (o = 0, a = s.parts.length; o < a; o++)
                for (u = o + 1; u < a; u++)
                    f = s.parts[o], l = s.parts[u], c = f.type, h = f.line, p = l.line, c === "descendant" && p > h && t.report("newline character found in selector (forgot a comma?)", h, d[r].parts[0].col, n);
        } }
        var n = this;
        e.addListener("startrule", r);
    } }), i.addRule({ id: "shorthand", name: "Require shorthand properties", desc: "Use shorthand properties where possible.", url: "https://github.com/CSSLint/csslint/wiki/Require-shorthand-properties", browsers: "All", init: function (e, t) {
        "use strict";
        function f() { u = {}; }
        function l(e) { var r, i, s, o; for (r in a)
            if (a.hasOwnProperty(r)) {
                o = 0;
                for (i = 0, s = a[r].length; i < s; i++)
                    o += u[a[r][i]] ? 1 : 0;
                o === a[r].length && t.report("The properties " + a[r].join(", ") + " can be replaced by " + r + ".", e.line, e.col, n);
            } }
        var n = this, r, i, s, o = {}, u, a = { margin: ["margin-top", "margin-bottom", "margin-left", "margin-right"], padding: ["padding-top", "padding-bottom", "padding-left", "padding-right"] };
        for (r in a)
            if (a.hasOwnProperty(r))
                for (i = 0, s = a[r].length; i < s; i++)
                    o[a[r][i]] = r;
        e.addListener("startrule", f), e.addListener("startfontface", f), e.addListener("property", function (e) { var t = e.property.toString().toLowerCase(); o[t] && (u[t] = 1); }), e.addListener("endrule", l), e.addListener("endfontface", l);
    } }), i.addRule({ id: "star-property-hack", name: "Disallow properties with a star prefix", desc: "Checks for the star property hack (targets IE6/7)", url: "https://github.com/CSSLint/csslint/wiki/Disallow-star-hack", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("property", function (e) { var r = e.property; r.hack === "*" && t.report("Property with star prefix found.", e.property.line, e.property.col, n); });
    } }), i.addRule({ id: "text-indent", name: "Disallow negative text-indent", desc: "Checks for text indent less than -99px", url: "https://github.com/CSSLint/csslint/wiki/Disallow-negative-text-indent", browsers: "All", init: function (e, t) {
        "use strict";
        function s() { r = !1, i = "inherit"; }
        function o() { r && i !== "ltr" && t.report("Negative text-indent doesn't work well with RTL. If you use text-indent for image replacement explicitly set direction for that item to ltr.", r.line, r.col, n); }
        var n = this, r, i;
        e.addListener("startrule", s), e.addListener("startfontface", s), e.addListener("property", function (e) { var t = e.property.toString().toLowerCase(), n = e.value; t === "text-indent" && n.parts[0].value < -99 ? r = e.property : t === "direction" && n.toString() === "ltr" && (i = "ltr"); }), e.addListener("endrule", o), e.addListener("endfontface", o);
    } }), i.addRule({ id: "underscore-property-hack", name: "Disallow properties with an underscore prefix", desc: "Checks for the underscore property hack (targets IE6)", url: "https://github.com/CSSLint/csslint/wiki/Disallow-underscore-hack", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("property", function (e) { var r = e.property; r.hack === "_" && t.report("Property with underscore prefix found.", e.property.line, e.property.col, n); });
    } }), i.addRule({ id: "universal-selector", name: "Disallow universal selector", desc: "The universal selector (*) is known to be slow.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-universal-selector", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("startrule", function (e) { var r = e.selectors, i, s, o; for (o = 0; o < r.length; o++)
            i = r[o], s = i.parts[i.parts.length - 1], s.elementName === "*" && t.report(n.desc, s.line, s.col, n); });
    } }), i.addRule({ id: "unqualified-attributes", name: "Disallow unqualified attribute selectors", desc: "Unqualified attribute selectors are known to be slow.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-unqualified-attribute-selectors", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("startrule", function (r) { var i = r.selectors, s = !1, o, u, a, f, l; for (f = 0; f < i.length; f++) {
            o = i[f], u = o.parts[o.parts.length - 1];
            if (u.type === e.SELECTOR_PART_TYPE) {
                for (l = 0; l < u.modifiers.length; l++) {
                    a = u.modifiers[l];
                    if (a.type === "class" || a.type === "id") {
                        s = !0;
                        break;
                    }
                }
                if (!s)
                    for (l = 0; l < u.modifiers.length; l++)
                        a = u.modifiers[l], a.type === "attribute" && (!u.elementName || u.elementName === "*") && t.report(n.desc, u.line, u.col, n);
            }
        } });
    } }), i.addRule({ id: "vendor-prefix", name: "Require standard property with vendor prefix", desc: "When using a vendor-prefixed property, make sure to include the standard one.", url: "https://github.com/CSSLint/csslint/wiki/Require-standard-property-with-vendor-prefix", browsers: "All", init: function (e, t) {
        "use strict";
        function o() { r = {}, i = 1; }
        function u() { var e, i, o, u, a, f = []; for (e in r)
            s[e] && f.push({ actual: e, needed: s[e] }); for (i = 0, o = f.length; i < o; i++)
            u = f[i].needed, a = f[i].actual, r[u] ? r[u][0].pos < r[a][0].pos && t.report("Standard property '" + u + "' should come after vendor-prefixed property '" + a + "'.", r[a][0].name.line, r[a][0].name.col, n) : t.report("Missing standard property '" + u + "' to go along with '" + a + "'.", r[a][0].name.line, r[a][0].name.col, n); }
        var n = this, r, i, s = { "-webkit-border-radius": "border-radius", "-webkit-border-top-left-radius": "border-top-left-radius", "-webkit-border-top-right-radius": "border-top-right-radius", "-webkit-border-bottom-left-radius": "border-bottom-left-radius", "-webkit-border-bottom-right-radius": "border-bottom-right-radius", "-o-border-radius": "border-radius", "-o-border-top-left-radius": "border-top-left-radius", "-o-border-top-right-radius": "border-top-right-radius", "-o-border-bottom-left-radius": "border-bottom-left-radius", "-o-border-bottom-right-radius": "border-bottom-right-radius", "-moz-border-radius": "border-radius", "-moz-border-radius-topleft": "border-top-left-radius", "-moz-border-radius-topright": "border-top-right-radius", "-moz-border-radius-bottomleft": "border-bottom-left-radius", "-moz-border-radius-bottomright": "border-bottom-right-radius", "-moz-column-count": "column-count", "-webkit-column-count": "column-count", "-moz-column-gap": "column-gap", "-webkit-column-gap": "column-gap", "-moz-column-rule": "column-rule", "-webkit-column-rule": "column-rule", "-moz-column-rule-style": "column-rule-style", "-webkit-column-rule-style": "column-rule-style", "-moz-column-rule-color": "column-rule-color", "-webkit-column-rule-color": "column-rule-color", "-moz-column-rule-width": "column-rule-width", "-webkit-column-rule-width": "column-rule-width", "-moz-column-width": "column-width", "-webkit-column-width": "column-width", "-webkit-column-span": "column-span", "-webkit-columns": "columns", "-moz-box-shadow": "box-shadow", "-webkit-box-shadow": "box-shadow", "-moz-transform": "transform", "-webkit-transform": "transform", "-o-transform": "transform", "-ms-transform": "transform", "-moz-transform-origin": "transform-origin", "-webkit-transform-origin": "transform-origin", "-o-transform-origin": "transform-origin", "-ms-transform-origin": "transform-origin", "-moz-box-sizing": "box-sizing", "-webkit-box-sizing": "box-sizing" };
        e.addListener("startrule", o), e.addListener("startfontface", o), e.addListener("startpage", o), e.addListener("startpagemargin", o), e.addListener("startkeyframerule", o), e.addListener("startviewport", o), e.addListener("property", function (e) { var t = e.property.text.toLowerCase(); r[t] || (r[t] = []), r[t].push({ name: e.property, value: e.value, pos: i++ }); }), e.addListener("endrule", u), e.addListener("endfontface", u), e.addListener("endpage", u), e.addListener("endpagemargin", u), e.addListener("endkeyframerule", u), e.addListener("endviewport", u);
    } }), i.addRule({ id: "zero-units", name: "Disallow units for 0 values", desc: "You don't need to specify units when a value is 0.", url: "https://github.com/CSSLint/csslint/wiki/Disallow-units-for-zero-values", browsers: "All", init: function (e, t) {
        "use strict";
        var n = this;
        e.addListener("property", function (e) { var r = e.value.parts, i = 0, s = r.length; while (i < s)
            (r[i].units || r[i].type === "percentage") && r[i].value === 0 && r[i].type !== "time" && t.report("Values of 0 shouldn't have units specified.", r[i].line, r[i].col, n), i++; });
    } }), function () {
    "use strict";
    var e = function (e) { return !e || e.constructor !== String ? "" : e.replace(/["&><]/g, function (e) { switch (e) {
        case '"': return "&quot;";
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
    } }); };
    i.addFormatter({ id: "checkstyle-xml", name: "Checkstyle XML format", startFormat: function () { return '<?xml version="1.0" encoding="utf-8"?><checkstyle>'; }, endFormat: function () { return "</checkstyle>"; }, readError: function (t, n) { return '<file name="' + e(t) + '"><error line="0" column="0" severty="error" message="' + e(n) + '"></error></file>'; }, formatResults: function (t, n) { var r = t.messages, s = [], o = function (e) { return !!e && "name" in e ? "net.csslint." + e.name.replace(/\s/g, "") : ""; }; return r.length > 0 && (s.push('<file name="' + n + '">'), i.Util.forEach(r, function (t) { t.rollup || s.push('<error line="' + t.line + '" column="' + t.col + '" severity="' + t.type + '"' + ' message="' + e(t.message) + '" source="' + o(t.rule) + '"/>'); }), s.push("</file>")), s.join(""); } });
}(), i.addFormatter({ id: "compact", name: "Compact, 'porcelain' format", startFormat: function () {
        "use strict";
        return "";
    }, endFormat: function () {
        "use strict";
        return "";
    }, formatResults: function (e, t, n) {
        "use strict";
        var r = e.messages, s = "";
        n = n || {};
        var o = function (e) { return e.charAt(0).toUpperCase() + e.slice(1); };
        return r.length === 0 ? n.quiet ? "" : t + ": Lint Free!" : (i.Util.forEach(r, function (e) { e.rollup ? s += t + ": " + o(e.type) + " - " + e.message + " (" + e.rule.id + ")\n" : s += t + ": line " + e.line + ", col " + e.col + ", " + o(e.type) + " - " + e.message + " (" + e.rule.id + ")\n"; }), s);
    } }), i.addFormatter({ id: "csslint-xml", name: "CSSLint XML format", startFormat: function () {
        "use strict";
        return '<?xml version="1.0" encoding="utf-8"?><csslint>';
    }, endFormat: function () {
        "use strict";
        return "</csslint>";
    }, formatResults: function (e, t) {
        "use strict";
        var n = e.messages, r = [], s = function (e) { return !e || e.constructor !== String ? "" : e.replace(/"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
        return n.length > 0 && (r.push('<file name="' + t + '">'), i.Util.forEach(n, function (e) { e.rollup ? r.push('<issue severity="' + e.type + '" reason="' + s(e.message) + '" evidence="' + s(e.evidence) + '"/>') : r.push('<issue line="' + e.line + '" char="' + e.col + '" severity="' + e.type + '"' + ' reason="' + s(e.message) + '" evidence="' + s(e.evidence) + '"/>'); }), r.push("</file>")), r.join("");
    } }), i.addFormatter({ id: "json", name: "JSON", startFormat: function () {
        "use strict";
        return this.json = [], "";
    }, endFormat: function () {
        "use strict";
        var e = "";
        return this.json.length > 0 && (this.json.length === 1 ? e = JSON.stringify(this.json[0]) : e = JSON.stringify(this.json)), e;
    }, formatResults: function (e, t, n) {
        "use strict";
        return (e.messages.length > 0 || !n.quiet) && this.json.push({ filename: t, messages: e.messages, stats: e.stats }), "";
    } }), i.addFormatter({ id: "junit-xml", name: "JUNIT XML format", startFormat: function () {
        "use strict";
        return '<?xml version="1.0" encoding="utf-8"?><testsuites>';
    }, endFormat: function () {
        "use strict";
        return "</testsuites>";
    }, formatResults: function (e, t) {
        "use strict";
        var n = e.messages, r = [], i = { error: 0, failure: 0 }, s = function (e) { return !!e && "name" in e ? "net.csslint." + e.name.replace(/\s/g, "") : ""; }, o = function (e) { return !e || e.constructor !== String ? "" : e.replace(/"/g, "'").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
        return n.length > 0 && (n.forEach(function (e) { var t = e.type === "warning" ? "error" : e.type; e.rollup || (r.push('<testcase time="0" name="' + s(e.rule) + '">'), r.push("<" + t + ' message="' + o(e.message) + '"><![CDATA[' + e.line + ":" + e.col + ":" + o(e.evidence) + "]]></" + t + ">"), r.push("</testcase>"), i[t] += 1); }), r.unshift('<testsuite time="0" tests="' + n.length + '" skipped="0" errors="' + i.error + '" failures="' + i.failure + '" package="net.csslint" name="' + t + '">'), r.push("</testsuite>")), r.join("");
    } }), i.addFormatter({ id: "lint-xml", name: "Lint XML format", startFormat: function () {
        "use strict";
        return '<?xml version="1.0" encoding="utf-8"?><lint>';
    }, endFormat: function () {
        "use strict";
        return "</lint>";
    }, formatResults: function (e, t) {
        "use strict";
        var n = e.messages, r = [], s = function (e) { return !e || e.constructor !== String ? "" : e.replace(/"/g, "'").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
        return n.length > 0 && (r.push('<file name="' + t + '">'), i.Util.forEach(n, function (e) { if (e.rollup)
            r.push('<issue severity="' + e.type + '" reason="' + s(e.message) + '" evidence="' + s(e.evidence) + '"/>');
        else {
            var t = "";
            e.rule && e.rule.id && (t = 'rule="' + s(e.rule.id) + '" '), r.push("<issue " + t + 'line="' + e.line + '" char="' + e.col + '" severity="' + e.type + '"' + ' reason="' + s(e.message) + '" evidence="' + s(e.evidence) + '"/>');
        } }), r.push("</file>")), r.join("");
    } }), i.addFormatter({ id: "text", name: "Plain Text", startFormat: function () {
        "use strict";
        return "";
    }, endFormat: function () {
        "use strict";
        return "";
    }, formatResults: function (e, t, n) {
        "use strict";
        var r = e.messages, s = "";
        n = n || {};
        if (r.length === 0)
            return n.quiet ? "" : "\n\ncsslint: No errors in " + t + ".";
        s = "\n\ncsslint: There ", r.length === 1 ? s += "is 1 problem" : s += "are " + r.length + " problems", s += " in " + t + ".";
        var o = t.lastIndexOf("/"), u = t;
        return o === -1 && (o = t.lastIndexOf("\\")), o > -1 && (u = t.substring(o + 1)), i.Util.forEach(r, function (e, t) { s = s + "\n\n" + u, e.rollup ? (s += "\n" + (t + 1) + ": " + e.type, s += "\n" + e.message) : (s += "\n" + (t + 1) + ": " + e.type + " at line " + e.line + ", col " + e.col, s += "\n" + e.message, s += "\n" + e.evidence); }), s;
    } }), i; }(); n.exports.CSSLint = r; }), ace.define("ace/mode/css_worker", [], function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("../lib/lang"), s = e("../worker/mirror").Mirror, o = e("./css/csslint").CSSLint, u = t.Worker = function (e) { s.call(this, e), this.setTimeout(400), this.ruleset = null, this.setDisabledRules("ids|order-alphabetical"), this.setInfoRules("adjoining-classes|zero-units|gradients|box-model|import|outline-none|vendor-prefix"); };
    r.inherits(u, s), function () { this.setInfoRules = function (e) { typeof e == "string" && (e = e.split("|")), this.infoRules = i.arrayToMap(e), this.doc.getValue() && this.deferredUpdate.schedule(100); }, this.setDisabledRules = function (e) { if (!e)
        this.ruleset = null;
    else {
        typeof e == "string" && (e = e.split("|"));
        var t = {};
        o.getRules().forEach(function (e) { t[e.id] = !0; }), e.forEach(function (e) { delete t[e]; }), this.ruleset = t;
    } this.doc.getValue() && this.deferredUpdate.schedule(100); }, this.onUpdate = function () { var e = this.doc.getValue(); if (!e)
        return this.sender.emit("annotate", []); var t = this.infoRules, n = o.verify(e, this.ruleset); this.sender.emit("annotate", n.messages.map(function (e) { return { row: e.line - 1, column: e.col - 1, text: e.message, type: t[e.rule.id] ? "info" : e.type, rule: e.rule.name }; })); }; }.call(u.prototype);
});
