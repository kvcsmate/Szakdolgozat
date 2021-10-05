import globals from './globals.js';


var mouse = {};
var tickrate = 13;
var interval;

var MouseKey;

const MOUSEKEY = {
	NONE: 0,
	LEFT: 1,
	RIGHT: 3,
	MIDDLE: 2,
}

var SetMouse = function (cellstoassign) {
	globals.cells = new Array();
	cellstoassign.forEach(element => {
		globals.cells.push(element);
	});
	window.addEventListener("mousedown", mouseDown);
	window.addEventListener("mousemove", oMousePos);

	window.addEventListener("wheel", scroll);
	window.addEventListener("mouseup", stopIncrement);
	window.addEventListener("contextmenu", e => e.preventDefault());

};


var mouseDown = function (e) {
	clearInterval(interval);
	MouseKey = e.which;
	interval = setInterval(handleMouseDown, tickrate)
}

var handleMouseDown = function () {
	if (MouseKey == MOUSEKEY.LEFT) {
		globals.cells.forEach(element => {
			let val = (element.x - globals.x) * (element.x - globals.x) + (element.y - globals.y) * (element.y - globals.y);
			if (val < globals.circleRadiusradius * globals.circleRadiusradius) {
				element.value = Math.min(element.value + 5, 255);
				element.render(globals.voronoi, globals.context);
			};
		})
	}
	else if (MouseKey == MOUSEKEY.RIGHT) {
		globals.cells.forEach(element => {
			let val = (element.x - globals.x) * (element.x - globals.x) + (element.y - globals.y) * (element.y - globals.y);
			if (val < globals.circleRadiusradius * globals.circleRadiusradius) {

				element.value = Math.max(element.value - 1, 0);
				element.render(globals.voronoi, globals.context);
			};
		})
	}

}


//ui
var lastcircleX = 0;
var lastcircleY = 0;

var redrawCircle = function (evt) {
	globals.context2.clearRect(lastcircleX - 2 * globals.circleRadiusradius - 2, lastcircleY - 2 * globals.circleRadiusradius - 2, 4 * globals.circleRadiusradius, 4 * globals.circleRadiusradius);
	globals.context2.beginPath();
	globals.context2.arc(evt.pageX, evt.pageY, globals.circleRadiusradius, 0, 2 * Math.PI);
	globals.context2.stroke();
}

var oMousePos = function (evt) {

	redrawCircle(evt)

	lastcircleX = evt.pageX
	lastcircleY = evt.pageY

	globals.x = Math.round(evt.clientX);
	globals.y = Math.round(evt.clientY);

}
var stopIncrement = function () {
	clearInterval(interval);
}

var scroll = function (e) {
	redrawCircle(e)
	globals.circleRadiusradius = e.wheelDelta < 0 ? Math.min(globals.circleRadiusradius + 5, 200) : Math.max(globals.circleRadiusradius - 5, 10);
}



mouse.SetMouse = SetMouse;
export default mouse;