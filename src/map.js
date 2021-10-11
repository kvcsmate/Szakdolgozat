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
    //map.DrawBorders () /// TODO TMP

}

map.LocalMaximums = function () {
  var localmaximums = []
  globals.cells.forEach(cell => {
    if(cell.isLocalMax)
    {
      if(cell.value ==0)
      {
        cell.isLocalMax = false;
      }
      else
      {
        var neighbors = [...cell.neighbors]
        for (const i of neighbors) {
          const neighbor = globals.cells[i];
          if(neighbor.value>cell.value)
          {
            cell.isLocalMax=false;
          }
          else
          {
            neighbor.isLocalMax = false;
          }
        }
      }
      if(cell.isLocalMax)
      {
        localmaximums.push(cell);    
      }
    }
  });
  return localmaximums;

}
map.commonpoint = function (cell1,cell2) 
{
  /*
  const points = [];
  for (let i = 0; i < cell1.voronoi.length; i++) 
  {
    for (let j = 0; j < cell2.voronoi.length; j++) 
    {
        if(cell1.voronoi[i][0] == cell2.voronoi[j][0] && cell1.voronoi[i][1] == cell2.voronoi[j][1] )
        {
          if(points.length>1)
          {
            return points;
          }
          points.push(cell1.voronoi[i]);
        }
    }
    
  } return points;*/
  for (let i = 0; i < cell1.voronoi.length; i++) 
  {
    for (let j = 0; j < cell2.voronoi.length; j++) 
    {
        if(cell1.voronoi[i][0] == cell2.voronoi[j][0] && cell1.voronoi[i][1] == cell2.voronoi[j][1] )
        {
          return cell1.voronoi[i];
        }
    }
    
  }
  
}

map.DrawLocalMaximums = function () {
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