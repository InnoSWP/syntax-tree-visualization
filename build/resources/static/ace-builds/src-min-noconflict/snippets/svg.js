"use strict";
;
(function () {
    ace.require(["ace/snippets/svg"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();