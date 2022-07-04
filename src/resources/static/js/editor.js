import {generateTree} from "./tree-builder.js";
import {building} from "./building-array.js";

// @ts-ignore
export let editor = ace.edit("editor");
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/javascript");
// @ts-ignore
editor.setValue(document.getElementById("default_text").innerText)
// @ts-ignore
generateTree(document.getElementById("default_text").innerText) // штука работает не совсем корректно
// @ts-ignore
building(document.getElementById("default_text").innerText) // штука работает не совсем корректно
editor.session.on('change', function (/** @type {any} */ _delta) {
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


export function selectText(/** @type {any} position*/ position){
  editor.selection.setRange(position);
}
