var shareWindow = document.getElementById("share");
var button = document.getElementById("share-button");
let spanShare = document.getElementById("shareclose");

// @ts-ignore
button.onclick = function () {
  // @ts-ignore
  shareWindow.style.display = "block";
}

// @ts-ignore
spanShare.onclick = function () {
  // @ts-ignore
  shareWindow.style.display = "none";
}
