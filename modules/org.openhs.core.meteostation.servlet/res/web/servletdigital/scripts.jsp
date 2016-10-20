
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var name = document.getElementById("InputVars").getAttribute("ccc");

ctx.font = "normal 80px Arial";
ctx.textBaseline = 'middle';
ctx.fillStyle = 'white';
ctx.fillText(TempInDesc, 20, 60);
ctx.fillText(TempInVal, 200, 60);
ctx.fillText(TempOutDesc, 20, 160);
ctx.fillText(TempOutVal, 200, 160);
ctx.fillText(Time, 10, 260);

