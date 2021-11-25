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
           // ide majd az alsót
        }
        var river = new River();
        counter = 0;
        underlevel = false;
        expandRiver(river,hilltop)
        if(river.points.length>5)
        {
            rivers.push(river);
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

water.drawCurve = function(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {

    showPoints  = showPoints ? showPoints : false;

    globals.context.beginPath();
    globals.context.lineWidth = 2;
    globals.context.strokeStyle = globals.shallowColor;

    drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));

    if (showPoints) {
        globals.context.stroke();
        globals.context.beginPath();
        for(var i=0;i<ptsa.length-1;i+=2) 
                ctx.rect(ptsa[i] - 2, ptsa[i+1] - 2, 4, 4);
    }
}

function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    // use input value if provided, or use a default value   
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    // clone array so we don't change the original
    //
    
    // _pts = pts.slice(0);
    //console.log(pts);
    _pts = [...pts];

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.push(pts[0]);
        _pts.push(pts[1]);
    }
    else {
        _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
        _pts.unshift(pts[0]);
        _pts.push(pts[pts.length - 2]); //copy last point and append
        _pts.push(pts[pts.length - 1]);
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=2; i < (_pts.length - 4); i+=2) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+2] - _pts[i-2]) * tension;
            t2x = (_pts[i+4] - _pts[i]) * tension;

            t1y = (_pts[i+3] - _pts[i-1]) * tension;
            t2y = (_pts[i+5] - _pts[i+1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push(x);
            res.push(y);

        }
    }

    return res;
}
function drawLines(ctx, pts) {
    globals.context.moveTo(pts[0], pts[1]);
    for(let i=2;i<pts.length-1;i+=2) {
        globals.context.lineTo(pts[i], pts[i+1]);
    };
    globals.context.stroke();
}


function expandRiver(river,cell)
{
    counter++;

    if(cell.GetValue () == 0 || counter > 50) {
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
                    if (counter>10) {
                        lowest_neighbor.isLake = true;
                        lowest_neighbor.hasWater = true;
                    }
                    cell_lowest.hasWater = true;
                    cell_lowest.SetValue (lowest_neighbor.GetValue () + 1);
                    cell_lowest.render();
                } else {
                    return;
                }
            }
            // var route = [...globals.map.commonpoint(cell_lowest,lowest_neighbor)];
            // if (globals.map.distance([cell_lowest.x,cell_lowest.y],route[0]) < globals.map.distance([cell_lowest.x,cell_lowest.y],route[1])) {
            //     river.addPoint(route[0][0],route[0][1],lowest_neighbor.GetValue ());
            //     //river.addPoint(route[1][0],route[1][1],lowest_neighbor.value);
            // }
            // else {
            //     river.addPoint(route[1][0],route[1][1],lowest_neighbor.GetValue ());
            //     //river.addPoint(route[0][0],route[0][1],lowest_neighbor.value);
            // }
            river.addPoint(lowest_neighbor.x,lowest_neighbor.y,lowest_neighbor.GetValue())
            river.addCurvePoints(lowest_neighbor.x,lowest_neighbor.y)
            //river.addPoint(route[0],route[1],lowest_neighbor.value);
            //river.addPoint(route[1][0],route[1][1],lowest_neighbor.value);
        }
        if (lowest_neighbor.hasWater && !lowest_neighbor.isLake) {
            return;
        }
        lowest_neighbor.hasWater = true;

        expandRiver (river,lowest_neighbor);
}
export default water;