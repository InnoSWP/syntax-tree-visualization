var shareWindow = document.getElementById("share");
var btn = document.getElementById("share-button");
let spanShare = document.getElementById("shareclose");

btn.onclick = function () {
  shareWindow.style.display = "block";
}

spanShare.onclick = function () {
  shareWindow.style.display = "none";
}
