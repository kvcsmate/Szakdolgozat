import globals from './globals.js';
import River from './river.js';
let counter = 0;
var underlevel = false;
var water = {}; 


water.DrawShallowWater = function()
{
    for (const cell of globals.map.cells) 
    {
        cell.shallowWater = false;
        if(cell.GetValue () == 0)
        {
            var neighbors =   [...cell.neighbors]
            for (let i = 0; i < neighbors.length; i++) 
            {
                if (globals.map.cells[neighbors[i]].GetValue ()>0) 
                {
                    cell.shallowWater = true;
                    ShallowWaterRender(cell.id);
                }

           }
        }
    }
}


function ShallowWaterRender(id) {
    globals.context.fillStyle = globals.shallowColor;
    globals.context.beginPath();
    globals.voronoi.renderCell(id, globals.context)
    globals.context.fill();
}


water.CreateRivers = function()
{
    var rivers = [];
    var tops = [...globals.map.LocalMaximums()];
    tops.forEach(hilltop => {
        if(hilltop.distancefromwater < globals.dryness)
        {
            var river = new River();
            counter = 0;
            underlevel = false;
            expandRiver(river,hilltop)
            if(river.points.length>5)
            {
                rivers.push(river);
            }
        }
    });
    return rivers;
}

water.DrawRiverfix = function(river)
{
    globals.context.lineWidth = 1;
    globals.context.lineJoin = 'bevel';
    globals.context.strokeStyle = globals.shallowColor;
    globals.context.beginPath();
    globals.context.moveTo(river.points[0][0], river.points[0][1]);
    let i;
    for ( i = 1; i < river.length - 2; i ++)
    {
       var xc = (river.points[i][0] + river.points[i + 1][0]) / 2;
       var yc = (river.points[i][1] + river.points[i + 1][1]) / 2;
       globals.context.quadraticCurveTo(river.points[i][0], river.points[i][1], xc, yc);
    }
  // curve through the last two points
    globals.context.quadraticCurveTo(river.points[i][0], river.points[i][1], river.points[i+1][0],river.points[i+1][1]);
    //globals.context.closePath();
    globals.context.stroke();
}


water.DrawRiver = function(river)
{
    globals.context.lineWidth = 2;
    //globals.context.lineJoin = 'bevel';
    globals.context.strokeStyle = globals.shallowColor;
    globals.context.beginPath();
    globals.context.moveTo((river.points[0][0]), river.points[0][1]);

    for(var i = 0; i < river.points.length-1; i ++)
    {
      var x_mid = (river.points[i][0] + river.points[i+1][0]) / 2;
      var y_mid = (river.points[i][1] + river.points[i+1][1]) / 2;
      var cp_x1 = (x_mid + river.points[i][0]) / 2;
      var cp_x2 = (x_mid + river.points[i+1][0]) / 2;
      globals.context.quadraticCurveTo(cp_x1,river.points[i][1] ,x_mid, y_mid);
      globals.context.quadraticCurveTo(cp_x2,river.points[i+1][1] ,river.points[i+1][0],river.points[i+1][1]);
    }
    globals.context.stroke();
}


function expandRiver(river,cell)
{
    counter++;

    if(cell.GetValue () == 0 || counter > 30) {
        return;
    }
    var cell_lowest = cell;
    var neighbors = [...cell.neighbors];
    var lowest_neighbor = globals.map.cells[neighbors[0]];
    //console.log(neighbors);
    for (let i = 1;i<neighbors.length;++i) {
        let newcell = globals.map.cells[neighbors[i]];
        if(lowest_neighbor.GetValue ()>newcell.GetValue ()) {
            lowest_neighbor = newcell;
        }

    }
        if (lowest_neighbor.GetValue () < globals.riverLevel || underlevel) {
            underlevel = true;
            if(lowest_neighbor.GetValue ()>cell_lowest.GetValue ()) {
                if(Math.abs(lowest_neighbor.GetValue () - cell_lowest.GetValue ())<1) {
                    lowest_neighbor.SetValue ( Math.max(cell_lowest.GetValue ()-1,1));
                }
                else if(counter>3) {
                    cell_lowest.isLake = true;
                    cell_lowest.hasWater = true;
                    cell_lowest.SetValue (lowest_neighbor.GetValue () + 1);
                    cell_lowest.render();
                } else {
                    return;
                }
            }
            var route = [...globals.map.commonpoint(cell_lowest,lowest_neighbor)];
            if (globals.map.distance([cell_lowest.x,cell_lowest.y],route[0]) < globals.map.distance([cell_lowest.x,cell_lowest.y],route[1])) {
                river.addPoint(route[0][0],route[0][1],lowest_neighbor.GetValue ());
                //river.addPoint(route[1][0],route[1][1],lowest_neighbor.value);
            }
            else {
                river.addPoint(route[1][0],route[1][1],lowest_neighbor.GetValue ());
                //river.addPoint(route[0][0],route[0][1],lowest_neighbor.value);
            }
            //river.addPoint(route[0],route[1],lowest_neighbor.value);
            //river.addPoint(route[1][0],route[1][1],lowest_neighbor.value);
        }
        lowest_neighbor.hasWater = true;
        expandRiver (river,lowest_neighbor);
}
export default water;