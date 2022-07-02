import {generateTree} from "./tree-builder.js";
import {building} from "./building-array.js";

// @ts-ignore
export let editor = ace.edit("editor");
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/javascript");
editor.setValue(document.getElementById("default_text").innerText)
generateTree(document.getElementById("default_text").innerText) // штука работает не совсем корректно
building(document.getElementById("default_text").innerText) // штука работает не совсем корректно
editor.session.on('change', function (/** @type {any} */ _delta) {
    console.log(getvalue());
    let jsonData = {code: editor.getValue()};
    $.ajax({
        url: '/tree',
        type: 'POST',
        data: jsonData,
        success: function (data) {
            generateTree(data);
        }
    })
});

function getvalue() {
    return JSON.stringify(editor.getValue(''));
}

