import globals from './globals.js';
import mouse from './mouse.js';
import map from './map.js';


Main () 

function Main() {
  InitGlobals ();
  map.InitMap ();
  mouse.SetMouseEvents();
}

function InitGlobals () {
  globals.width = window.innerWidth;
  globals.height = window.innerHeight;
  var canvas = document.getElementById("canvas");
  globals.context = canvas.getContext("2d");
  canvas.width = globals.width - 1;
  canvas.height = globals.height - 1;
  var canvas2 = document.getElementById("canvas2");
  globals.context2 = canvas2.getContext("2d");
  canvas2.width = globals.width - 1;
  canvas2.height = globals.height - 1;
  globals.cells = new Array();
}


