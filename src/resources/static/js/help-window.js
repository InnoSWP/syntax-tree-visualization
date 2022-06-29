var helpWindow = document.getElementById("help");
var button = document.getElementById("help-button");
let spanHelp = document.getElementById("helpclose");
button.onclick = function () {
  helpWindow.style.display = "block";
}

spanHelp.onclick = function () {
  helpWindow.style.display = "none";

}
