import {generateTree} from "./tree-builder.js";

export let editor = ace.edit("editor");
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/javascript");
editor.session.on('change', function (delta) {
    console.log(getvalue());
    let jsonData = 'code=' + editor.getValue();
    $.ajax({
        url: '/tree',
        type: 'GET',
        contentType: 'application/json',
        data: jsonData,
        success: function (data) {
            generateTree(data);
        }
    })
});

function getvalue() {
    return JSON.stringify(editor.getValue(''));
}

