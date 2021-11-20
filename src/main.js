import globals from './globals.js';
import mouse from './mouse.js';
import map from './map.js';
import gui from './gui.js'
import biome from './biome.js';
import mapmarkers from './mapmarkers.js';

Main () 

function Main() {
  InitGlobals ();
  globals.map.Initmap ();
  mouse.SetMouseEvents();
}

function InitGlobals () {
  globals.width = window.innerWidth;
  globals.height = window.innerHeight;
  globals.canvas = document.getElementById("canvas");
  globals.context = canvas.getContext("2d");
  canvas.width = globals.width - 1;
  canvas.height = globals.height - 1;

  var canvas2 = document.getElementById("canvas2");
  globals.context2 = canvas2.getContext("2d");
  canvas2.width = globals.width - 1;
  canvas2.height = globals.height - 1;

  var mapmarkercanvas = document.getElementById("mapmarkers");
  globals.mapmarkercontext = mapmarkercanvas.getContext("2d");
  mapmarkercanvas.width = globals.width - 1;
  mapmarkercanvas.height = globals.height - 1;
  mapmarkers.DrawLatitude();

  var buttons = document.getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    gui.buttonInit(button);

}
gui.setMapsizebuttons();
  /*var gui = document.getElementById("gui");
  globals.guicontext = canvas.getContext("2d");
  gui.width = globals.width - 1;
  gui.height = globals.height - 1;*/
}


