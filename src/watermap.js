import globals from './globals.js';
import map from './map.js';
import River from './river.js';
var counter = 0;
var water = {}; 
water.DrawShallowWater = function()
{
    for (const cell of globals.cells) 
    {
        if(cell.value==0)
        {
            var neighbors =   [...cell.neighbors]
            for (let i = 0; i < neighbors.length; i++) 
            {
                if (globals.cells[neighbors[i]].value>0) 
                {
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
    var tops = [...map.LocalMaximums()];
    tops.forEach(hilltop => {
        var river = new River();
        counter = 0;
        expandRiver(river,hilltop)
        rivers.push(river);
    });
    return rivers;
}

water.DrawRiver = function(river)
{
    
    globals.context.lineWidth = 5;
    globals.context.lineJoin = 'bevel';
    globals.context.strokeStyle = globals.shallowColor;
    globals.context.beginPath();
    globals.context.moveTo(river.points[0][0], river.points[0][1]);
    for (let i = 1; i < river.points.length; i++) 
    {
        globals.context.lineTo(river.points[i][0], river.points[i][1]);
    }
    //globals.context.closePath();
    globals.context.stroke();
}

function expandRiver(river,cell)
{

    if(cell.value==0 || counter > 10)
    {
        return;
    }
    var cell_lowest = cell;
    var neighbors = [...cell.neighbors];
    var lowest_neighbor = globals.cells[neighbors[0]];
    //console.log(neighbors);
    for (let i = 1;i<neighbors.length;++i) 
    {
        let newcell = globals.cells[neighbors[i]];
        if(lowest_neighbor.value>newcell.value)
        {
            
            lowest_neighbor = newcell;
        }

    }
    if(lowest_neighbor.value>cell_lowest.value)
    {
        cell_lowest.isLake = true;
        cell_lowest.value = lowest_neighbor.value+1;
        cell_lowest.render();
        counter++;
    }
        
        if(lowest_neighbor.value<globals.riverLevel)
        {
            var route = [...map.commonpoint(cell_lowest,lowest_neighbor)];
            river.addPoint(route[0],route[1]);
        }
        expandRiver(river,lowest_neighbor);
}
export default water;