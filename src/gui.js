import globals from './globals.js';
import mapmarkers from './mapmarkers.js';
import water from './watermap.js';
import watermap from './watermap.js';
import PoI from './PoI.js';
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
gui.SetButtons = function()
{
     var waterButton = document.getElementsByName("water")[0];
    var waterColor = document.getElementsByName("waterColor")[0];
    var smallbutton = document.getElementsByName("Small")[0];
    var mediumbutton = document.getElementsByName("Medium")[0];
    var bigbutton = document.getElementsByName("Big")[0];
    var createRiversButton = document.getElementsByName("CreateRiver")[0];
    var drawridges = document.getElementsByName("Ridges")[0];
    waterButton.onclick = globals.map.UpdateWaterDistances;
    waterColor.onclick = globals.map.redraw;
    createRiversButton.onclick = function() {
        var rivers = [...watermap.CreateRivers()];
	    rivers.forEach(element => {
		watermap.drawCurve(globals.context,element.curve);
	});
	//console.log(rivers);
	water.DrawShallowWater();
    }

    
    
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
    drawridges.onclick = function() {
        globals.PoI.Init();
    }
}   




export default gui;