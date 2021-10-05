import globals from './globals.js';
import Cell from './cell.js';

var map = {}; 


map.InitMap = function () {

    let points = Array.from({ length: 5000 }, () => [Math.random() * globals.width, Math.random() * globals.height])
    let delaunay = d3.Delaunay.from(points);
    globals.voronoi = delaunay.voronoi([0, 0, globals.width, globals.height]);
  
    for (let i = 0; i < points.length; i++) {
      let cell = new Cell(globals.voronoi.cellPolygon(i), 0, i, points[i])
      globals.cells.push(cell);
    }
  
    //clear the lines
    {
      globals.context.beginPath();
      globals.context.rect(0, 0, globals.width, globals.height);
      globals.context.fillStyle = globals.defaultColor;
      globals.context.fill();
    }
    map.DrawBorders () /// TODO TMP

}


map.DrawBorders = function () {
    globals.cells.forEach(cell => {
      if (cell.isOnBorder)
      cell.value = 130;
      cell.render();
    });
}


function generatePointsByGrid() {
    let chaos = 10;
    pts = new Array();
    for (let i = 0; i < (density / 2); i++) {
        for (let j = 0; j < (density / 2); j++) {

        let x = i * (globals.height / (density / 2)) + plusOrMinus() * chaos;
        let y = j * (globals.width / (density / 2)) + plusOrMinus() * chaos;
        pts.push([globals.mouseX, globals.mouseY]);
        console.log(i * (globals.width / (density / 2)), j * (globals.height / (density / 2)));
        }
    }
    return pts;
}


function plusOrMinus() {
    return (Math.random() - 0.5) * 2;
} 

export default map;