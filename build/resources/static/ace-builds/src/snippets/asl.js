"use strict";
;
(function () {
    window.require(["ace/snippets/asl"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
