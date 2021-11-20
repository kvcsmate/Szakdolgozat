import globals from './globals.js';
import mapmarkers from './mapmarkers.js';

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
gui.setMapsizebuttons = function()
{
    var smallbutton = document.getElementsByName("Small")[0];
    var mediumbutton = document.getElementsByName("Medium")[0]
    var bigbutton = document.getElementsByName("Big")[0];
    
    smallbutton.onclick = function() {
        globals.mapsize = 0.025;
        mapmarkers.DrawLatitude();
    };
    mediumbutton.onclick = function() {
        globals.mapsize = 0.3;
        
        mapmarkers.DrawLatitude();
    };
    bigbutton.onclick = function() {
        globals.mapsize = 1;
        mapmarkers.DrawLatitude();
    };

}




export default gui;