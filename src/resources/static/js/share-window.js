var shareWindow = document.getElementById("share");
var button = document.getElementById("share-button");
let spanShare = document.getElementById("shareclose");

button.onclick = function () {
  shareWindow.style.display = "block";
}

spanShare.onclick = function () {
  shareWindow.style.display = "none";
}
