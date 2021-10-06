import globals from './globals.js';


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
	if (lastPressedMouseButton == MOUSEKEY.LEFT) {
		globals.cells.forEach(cell => {
			let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
			if (distanceFromMouse < Math.pow(globals.circleRadius,2)) {
				cell.value = Math.min(cell.value + 5, 255);
				cell.render();
			};
		})
	} else if (lastPressedMouseButton == MOUSEKEY.RIGHT) {
		globals.cells.forEach(cell => {
			let distanceFromMouse = Math.pow(cell.x - globals.mouseX,2) + Math.pow(cell.y - globals.mouseY,2);
			if (distanceFromMouse < Math.pow(globals.circleRadius,2)) {
				cell.value = Math.max(cell.value - 1, 0);
				cell.render();
			};
		})
	}
}


var redrawCircle = function (evt) {
	let offset = 2 * globals.circleRadius + 2;
	let size = 4 * globals.circleRadius;

	globals.context2.clearRect(lastCircleX - offset, lastCircleY - offset, size, size);
	globals.context2.beginPath();
	globals.context2.arc(evt.pageX, evt.pageY, globals.circleRadius, 0, 2 * Math.PI);
	globals.context2.stroke();

	lastCircleX = evt.pageX
	lastCircleY = evt.pageY
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