import {editor} from "./editor.js";
import {building} from "./building-array.js";

editor.session.on('change', function (/** @type {any} */ _delta) {
  let jsonData = { code: editor.getValue() };

  $.ajax({
    url: '/array',
    type: 'POST',
    data: jsonData,
    success: function (data) {
      // @ts-ignore
      document.getElementById('array').innerText = '';
      building(data);
    }
  })

});

function getvalue() {
  return JSON.stringify(editor.getValue(''));
}
