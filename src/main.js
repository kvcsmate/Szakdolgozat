import globals from './globals.js';
import mouse from './mouse.js';
import map from './map.js';
import gui from './gui.js'
import biome from './biome.js';
import names from './names.js';
import mapmarkers from './mapmarkers.js';
const request = async () => {
  const response = await fetch('./src/Fantasy_NameBase.json');
  globals.namesbase = await response.json();
}

Main () 

function Main() {
  InitGlobals ();
  globals.map.Initmap ();
  mouse.SetMouseEvents();
}

function InitGlobals () {
  globals.namesbase = fetch('./src/Fantasy_NameBase.json')
  .then(response => {
     return response.json();
  })
  .then(asd => console.log(asd));
  //globals.namesbase = require('./src/Fantasy_NameBase.json');
  console.log(globals.namesbase);
  // loadJSON(function(response) {
  //   // Parse JSON string into object
  //     globals.namesbase = JSON.parse(response);
  //     console.log(globals.namesbase.cultures[0].Names[2]);
     
      
  //  });
  //console.log(globals.namesbase.cultures[0].Names[2]);
  //globals.namesbase = fetch('./src/Fantasy_NameBase.json')
  request();
  //console.log(json);
  console.log(globals.namesbase)
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

  globals.namesdiv = document.getElementById("labels");
  globals.namesdiv.width = globals.width - 1;
  globals.namesdiv.height = globals.height - 1;
  globals.names.Init();

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
gui.SetButtons();
  /*var gui = document.getElementById("gui");
  globals.guicontext = canvas.getContext("2d");
  gui.width = globals.width - 1;
  gui.height = globals.height - 1;*/
}

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', './src/Fantasy_NameBase.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}





