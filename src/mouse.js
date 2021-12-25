import config from './config.js';
import globals from './globals.js';
import PoliticalMap from './politicalmap.js';
import water from './watermap.js';

var mouse = {};
var interval;
var lastPressedMouseButton;
var lastCircleX = 0;
var lastCircleY = 0;

const MOUSEKEY = {
	NONE: 0,
	LEFT: 1,
	RIGHT: 3,
	MIDDLE: 2,
}

var SetMouseEvents = function () {
	window.addEventListener("mousedown", mouseDown);
	window.addEventListener("mousemove", oMousePos);
	window.addEventListener("wheel", scroll);
	window.addEventListener("mouseup", stopIncrement);
	window.addEventListener("contextmenu", e => e.preventDefault());
};


var mouseDown = function (e) {
	clearInterval(interval);
	lastPressedMouseButton = e.which;
	interval = setInterval(handleMouseDown, globals.tickrate)
}


var handleMouseDown = function () {
	if (globals.iselElevatingActive) 
	{
		switch (globals.menu) {
			case 1:
				ElevationSwitcher();
				break;
			case 2:
				BiomeSwitcher();
				break;
			case 3:
				PoliticalSwitcher();
				break;
			default:
				break;
		}
	}
	
		// if (lastPressedMouseButton == MOUSEKEY.MIDDLE) {
		// 	globals.map.cells.forEach(cell => {
		// 		let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				
		// 		if (distanceFromMouse < Math.pow(globals.circleRadius,2)) {
		// 			console.log(cell);
		// 		}
		// 	})
		// }
	
}
var ElevationSwitcher = function ()
{
		globals.riversGenerated = false;
		switch (globals.Elevationtype) {
			case 1:
				FlatElevation();
				break;
			case 2:
				MountainElevation();
				break;
			case 3 :
				FalloffElevation();
				break;	
			default:
				break;
		}
	
	
}
var PoliticalSwitcher = function () {
	switch (globals.Politicaltype) {
		case 1: AddCity();
			
			break;
	
		default:
			break;
	}
}
var AddCity = function () {
		if (lastPressedMouseButton == MOUSEKEY.LEFT) {
			globals.map.GetLandCells().forEach(cell => {
				if (cell.contains(globals.mouseX,globals.mouseY) && !cell.city) {
					PoliticalMap.addCity(cell);
				}
			});
		}
}
var BiomeSwitcher = function ()
{
	if (lastPressedMouseButton == MOUSEKEY.LEFT) {
		globals.map.cells.forEach(cell => {
			let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
			if (distanceFromMouse < Math.pow(globals.circleRadius,2) && cell.GetValue()>0) {
				cell.biome = globals.Biometype;
				cell.temperature = globals.Biometype[1];
				console.log(cell.temperature);
				cell.renderBiome();
			};
		})
	} 
}

var FlatElevation = function ()
{
	
	var rsquare = Math.pow(globals.circleRadius,2);
		if (lastPressedMouseButton == MOUSEKEY.LEFT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				if (distanceFromMouse < Math.pow(globals.circleRadius,2)) {
					cell.isLake = false;
					cell.hasWater = false;
					cell.SetValue (Math.min(cell.GetValue () + config.ELevationSpeed + (Math.random()-0.5)*0.3, 255))
					//cell.isLocalMax=true;
					cell.render();
				};
			})
		} else if (lastPressedMouseButton == MOUSEKEY.RIGHT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				if (distanceFromMouse < rsquare) {
					cell.isLake = false;
					cell.SetValue (Math.max(cell.GetValue () - config.ELevationSpeed, 0))
					cell.hasWater = (cell.GetValue () == 0);
					cell.render();
				};
			})
		}
}

var MountainElevation = function ()
{
	var rsquare = Math.pow(globals.circleRadius,2);
		if (lastPressedMouseButton == MOUSEKEY.LEFT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				
				if (distanceFromMouse < Math.pow(globals.circleRadius,2)) {
					cell.isLake = false;
					cell.hasWater = false;
					let ratio = Math.sqrt(distanceFromMouse)/globals.circleRadius;
					cell.SetValue (Math.min(cell.GetValue () + config.ELevationSpeed*(1-ratio)+ (Math.random()-0.5)*0.3, 255))
					cell.isLocalMax=true;
					cell.render();
				};
			})
		} else if (lastPressedMouseButton == MOUSEKEY.RIGHT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				if (distanceFromMouse < rsquare) {
					cell.isLake = false;
					let ratio = Math.sqrt(distanceFromMouse)/globals.circleRadius;
					cell.SetValue (Math.max(cell.GetValue () -(1-ratio)*config.ELevationSpeed/2, 0))
					cell.hasWater = (cell.GetValue () == 0);
					cell.render();
				};
			})
		}
}
var FalloffElevation = function ()
{	
	var rsquare = Math.pow(globals.circleRadius,2);
		if (lastPressedMouseButton == MOUSEKEY.LEFT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				
				if (distanceFromMouse <rsquare) {
					cell.isLake = false;
					cell.hasWater = false;
					let ratio = Math.sqrt(distanceFromMouse)/globals.circleRadius;
					cell.SetValue (Math.min(cell.GetValue () +config.ELevationSpeed*(Math.cos(ratio*Math.PI)+1) + (Math.random()-0.5)*0.3, 255))
					cell.isLocalMax=true;
					cell.render();
				};
			})
		} else if (lastPressedMouseButton == MOUSEKEY.RIGHT) {
			globals.map.cells.forEach(cell => {
				let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
				if (distanceFromMouse < rsquare) {
					cell.isLake = false;
					let ratio = Math.sqrt(distanceFromMouse)/globals.circleRadius;
					cell.SetValue (Math.max(cell.GetValue () - config.ELevationSpeed*(Math.cos(ratio/Math.PI)+1), 0))
					cell.hasWater = (cell.GetValue () == 0);
					cell.render();
				};
			})
		}
}
var redrawCircle = function (evt) {
	let offset = 2 * globals.circleRadius + 2;
	let size = 4 * globals.circleRadius;

	globals.context2.clearRect(lastCircleX - offset, lastCircleY - offset, size, size);
	
	if(globals.iselElevatingActive)
	{
		globals.context2.beginPath();
		globals.context2.arc(evt.pageX, evt.pageY, globals.circleRadius, 0, 2 * Math.PI);
		globals.context2.stroke();

		lastCircleX = evt.pageX
		lastCircleY = evt.pageY
	}
}


var oMousePos = function (evt) {
	redrawCircle(evt)
	globals.mouseX = Math.round(evt.clientX);
	globals.mouseY = Math.round(evt.clientY);
}


var stopIncrement = function () {
	clearInterval(interval);
	
}


var scroll = function (e) {
	redrawCircle(e);
	globals.circleRadius = e.wheelDelta < 0 ? Math.min(globals.circleRadius + 5, 200) : Math.max(globals.circleRadius - 5, 10);

	
}


mouse.SetMouseEvents = SetMouseEvents;
export default mouse;