"use strict";
;
(function () {
    window.require(["ace/snippets/ini"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
