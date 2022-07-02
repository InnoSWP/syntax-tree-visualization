import {editor} from "./editor.js";
import {building} from "./building-array.js";

editor.session.on('change', function (/** @type {any} */ _delta) {


  //delta = JSON.stringify(editor.getValue(0));
  console.log(getvalue());
  let jsonData = { code: editor.getValue() };
<<<<<<< HEAD
=======

>>>>>>> 4d39fa4a83e2451541b8d02d11e7fa7ef2913283

  $.ajax({
    url: '/array',
    type: 'POST',
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
