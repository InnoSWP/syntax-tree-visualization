import {editor} from "./editor.js";
import {building} from "./building-array.js";

editor.session.on('change', function (/** @type {any} */ _delta) {


  //delta = JSON.stringify(editor.getValue(0));
  console.log(getvalue());
  let jsonData = 'code=' + editor.getValue();


  $.ajax({
    url: '/array',
    type: 'GET',
    contentType: 'application/json',
    data: jsonData,
    success: function (data) {
      document.getElementById('array').innerText = '';
      building(data);
    }
  })

});

function getvalue() {
  return JSON.stringify(editor.getValue(''));
}
