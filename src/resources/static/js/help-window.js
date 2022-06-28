var helpWindow = document.getElementById("help");
var btn = document.getElementById("help-button");
let spanHelp = document.getElementById("helpclose");
btn.onclick = function () {
  helpWindow.style.display = "block";
}

spanHelp.onclick = function () {
  helpWindow.style.display = "none";

}
