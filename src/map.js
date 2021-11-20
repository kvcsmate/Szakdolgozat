import globals from './globals.js';
import Cell from './cell.js';
import gradient from './gradient.js';
import biome from './biome.js';

globals.map.Initmap = function () {
  this.cells = new Array();
  this.cellsToUpdateWaterdistance = new Set ()
  this.latitude = 0;
  let points = Array.from({ length: 5000 }, () => [Math.random() * globals.width, Math.random() * globals.height]);
  let delaunay = d3.Delaunay.from(points);
  globals.voronoi = delaunay.voronoi([0, 0, globals.width, globals.height]);
  for (let i = 0; i < points.length; i++) {
    let cell = new Cell(globals.voronoi.cellPolygon(i), 0, i, points[i])
    this.cells.push(cell);
  }

  //clear the lines
  {
    globals.context.beginPath();
    globals.context.rect(0, 0, globals.width, globals.height);
    globals.context.fillStyle = globals.defaultColor;
    globals.context.fill();
  }
  //globals.map.DrawBorders () /// TODO TMP

}


globals.map.LocalMaximums = function () {
  var localmaximums = []
  this.cells.forEach(cell => {
    if (cell.isLocalMax) {
      if (cell.GetValue() == 0) {
        cell.isLocalMax = false;
      }
      else {
        var neighbors = [...cell.neighbors]
        for (const i of neighbors) {
          const neighbor = this.cells[i];
          if (neighbor.GetValue() > cell.GetValue()) {
            cell.isLocalMax = false;
          }
          else {
            neighbor.isLocalMax = false;
          }
        }
      }
      if (cell.isLocalMax) {
        localmaximums.push(cell);
      }
    }
  });
  return localmaximums;
}




globals.map.UpdateWaterDistances = function () {
  let starterSet = new Set();
  globals.map.cells.forEach(element => {
    element.waterDistance = 0;
    if (element.GetValue () == 0 && element.shallowWater )
      starterSet.add(...element.GetNeighbors ());
  });

  //shallowWater
  let neighbors = new Set ();
  starterSet.forEach(element => {
    neighbors = new Set([...element.GetNeighbors(),...neighbors]);
    element.waterDistance = 0;
  });
  starterSet = neighbors;


  let waterLevel = 1;


  while (starterSet.size > 0) {

    let neighbors = new Set ();
    starterSet.forEach(element => {
      if (element.waterDistance == 0 && (element.GetValue () != 0 ) && !element.hasWater){
        neighbors= new Set([...element. GetNeighbors(),...neighbors]);
        element.waterDistance = waterLevel;
      }
    });
    starterSet = neighbors;
    waterLevel++;
  }
  biome.SetTemperatures();

}


function redraw() {
  globals.map.cells.forEach((cell)=>{
    let color;
      if (cell.waterDistance == 0) {
        color = globals.defaultColor;
    } else {
    let colorindex = 0;
    let cval = cell.waterDistance;
    for (let i = 0; i < gradient.length; ++i) {
        if (Math.abs(cval - gradient[i][1]) < Math.abs(cval - gradient[colorindex][1])) {
            colorindex = i;
        }

    }
    color = gradient[colorindex][0];
  }
  
    globals.context.fillStyle = color;
    globals.context.lineJoin = 'bevel';
    globals.context.beginPath();
    globals.voronoi.renderCell(cell.id, globals.context)
    globals.context.fill();
  
  });
}

document.getElementsByName("water")[0].onclick = globals.map.UpdateWaterDistances;
document.getElementsByName("waterColor")[0].onclick = redraw;



globals.map.commonpoint = function (cell1, cell2) {

  const points = [];
  for (let i = 0; i < cell1.voronoi.length; i++) {

    for (let j = 0; j < cell2.voronoi.length; j++) {
      if (cell1.voronoi[i][0] == cell2.voronoi[j][0] && cell1.voronoi[i][1] == cell2.voronoi[j][1]) {
        let alreadycontains = false;
        for (let k = 0; k < points.length; k++) {
          if (points[k][0] == cell2.voronoi[j][0] && points[k][1] == cell2.voronoi[j][1]) {
            alreadycontains = true;
            k = points.length;
          }
        }
        if (!alreadycontains) {
          points.push(cell1.voronoi[i]);
        }
      }
    }
  }
  return points;
}


globals.map.distance = function (point1, point2) {
  let a = point1[0] - point2[0];
  let b = point1[1] - point2[1];

  return Math.sqrt(a * a + b * b);
}


globals.map.DrawLocalMaximums = function () {
  var localmax = [];
  localmax = [...this.localmaximums()];
  globals.context.fillStyle = "purple";
  localmax.forEach(element => {
    globals.context.beginPath();
    globals.voronoi.renderCell(element.id, globals.context)
    globals.context.fill();
    console.log(element.id);
  });

}


globals.map.DrawBorders = function () {
  this.cells.forEach(cell => {
    if (cell.isOnBorder)
      cell.SetValue(130);
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

export default globals.map;