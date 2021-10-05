import Cell from './map.js';
import globals from './globals.js';
import mouse from './mouse.js';

//globals.context2.clearRect(0, 0, canvas2.width, canvas2.height);
globals.width = window.innerWidth;
globals.height = window.innerHeight;
var c = document.getElementById("canvas");
globals.context = c.getContext("2d");
canvas.width = globals.width - 1;
canvas.height = globals.height - 1;
var c2 = document.getElementById("canvas2");
globals.context2 = c2.getContext("2d");
canvas2.width = globals.width - 1;
canvas2.height = globals.height - 1;
globals.context2.fillStyle = "rgba(0, 0, 0, 1)";
globals.context2.globalAlpha = 1;
const density = 5000;
const chaos = 10;
globals.circleRadiusradius = 50
console.log(globals.circleRadiusradius);

//const points =generatePointsByGrid();
var points = Array.from({ length: density }, () => [Math.random() * globals.width, Math.random() * globals.height])


var delaunay = d3.Delaunay.from(points);
globals.voronoi = delaunay.voronoi([0, 0, globals.width, globals.height]);
globals.cells = new Array();
for (let i = 0; i < density; i++) {
  let cell = new Cell(globals.voronoi.cellPolygon(i), 0, i, points[i])
  cell.value = cell.isOnBorder * 50;
  globals.cells.push(cell);
}

globals.context.beginPath();
globals.context.rect(0, 0, globals.width, globals.height);
globals.context.fillStyle = "rgb(0,105,148)";
globals.context.fill();

globals.cells.forEach(element => {
  element.render(globals.voronoi, globals.context);
});
mouse.SetMouse(globals.cells);


function generatePointsByGrid() {
  pts = new Array();
  for (let i = 0; i < (density / 2); i++) {
    for (let j = 0; j < (density / 2); j++) {

      let x = i * (globals.height / (density / 2)) + plusOrMinus() * chaos;
      let y = j * (globals.width / (density / 2)) + plusOrMinus() * chaos;
      pts.push([globals.x, globals.y]);
      console.log(i * (globals.width / (density / 2)), j * (globals.height / (density / 2)));
    }
  }
  return pts;
}
function plusOrMinus() {

  return (Math.random() - 0.5) * 2;
} 
