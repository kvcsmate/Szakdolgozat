import globals from './globals.js';

var gui = {}
gui.buttonInit = function(button)
{
    button.addEventListener("mouseover",buttonmouseover);
    button.addEventListener("mouseout",buttonmouseout);
}
var buttonmouseover = function(e)
{
    console.log("in");
    globals.iselElevatingActive=false;
    globals.canvas.style["pointer-events"] = "none";
}

var buttonmouseout = function(e)
{
    console.log("out");
    globals.iselElevatingActive=true;
    globals.canvas.style.pointerEvents = "auto";
}




export default gui;