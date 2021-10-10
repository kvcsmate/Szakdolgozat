import globals from './globals.js';

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

export default water;