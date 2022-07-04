var shareWindow = document.getElementById("share");
var button = document.getElementById("share-button");
let spanShare = document.getElementById("shareclose");
import {editor} from "../js/editor.js"

button.onclick = function () {
    shareWindow.style.display = "block";
    $.ajax({
        url: '/save',
        type: 'POST',
        data: {code: editor.getValue('')},
        success: function (data) {
            console.log(data);
            window.history.pushState({}, null, "/?hash=" + data)
            document.getElementById('URL-share').value = window.location.href;
            // Прикрутите пж чтобы url показывался на share страничке, не только в строке наверху
        }
    })
}

spanShare.onclick = function () {
    shareWindow.style.display = "none";
}
