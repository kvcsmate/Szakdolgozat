import globals from "./globals.js";
import watermap from './watermap.js';
//globals.PoI = {};

globals.PoI.Init = function () {
    var rivers = [...watermap.CreateRivers()];
    rivers.forEach(element => {
    watermap.drawCurve(globals.context,element.curve);
});
	
	watermap.DrawShallowWater();

    globals.PoI.mountainTops = [...globals.map.LocalMaximums()];
    globals.PoI.ridges = new Array();
    globals.PoI.GetRidges();
}

globals.PoI.GetRidges = function () {
    globals.PoI.ridges = new Array();
    globals.PoI.mountainTops.forEach(top0 => {
        //top0.rendercolor("lime");
        globals.PoI.mountainTops.forEach(top1 => {
            //top1.rendercolor("lime");
            let topdistance = getDistance(top0.x,top0.y,top1.x,top1.y); 
            if (topdistance<50) {
                let ridge = new Array();
                let neighbors = new Set([...top0.GetNeighbors()]);
                let closestcell = top0;
                while(closestcell != top1)
                {
                    neighbors.forEach(ridgecell => {
                        
                        let celldistance =  getDistance(ridgecell.x,ridgecell.y,top1.x,top1.y);
                        if (celldistance<topdistance) {
                            topdistance = celldistance;
                            closestcell = ridgecell;
                        }
                    });
                    let oldneighbors = [...neighbors];
                    neighbors = [...closestcell.GetNeighbors()];
                    neighbors = neighbors.filter(neighbor => !oldneighbors.includes(neighbor));
                    ridge.push(closestcell);
                    ridge.naturalBorder = true;
                    //closestcell.rendercolor("purple");
                }
                    // while nem 0 a getdistance. egy set-be berakni a szomszédokat, aztán kiválasztani a
                    //legközelebbi szomszédot, törölni a set-et és berakni az új szomszédokat.
            }
        });
    });
}

function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

export default globals.PoI;