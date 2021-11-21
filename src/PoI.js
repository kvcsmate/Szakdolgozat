import globals from "./globals";

globals.PoI = {};

PoI.Init = function () {
    this.rivers = [...water.CreateRivers()];
	rivers.forEach(element => {
		water.DrawRiver(element);
	});
	
	water.DrawShallowWater();

    this.mountainTops = [...globals.map.Localmaximums()]
    this.ridges = new Array();
}

globals.PoI.GetRidges = function () {
    globals.PoI.ridges = new Array();
    globals.mountainTops.forEach(top0 => {
        globals.mountainTops.forEach(top1 => {
            let topdistance = getDistance(top0.x,top0.y,top1.x,top1.y); 
            if (topdistance>50) {
                let ridge = new Array();
                let neighbors = new Set([...top0.GetNeighbors()]);
                let closestcell = top0;
                while(closestcell != top1)
                {
                    neighbors.forEach(ridgecell => {
                        
                        let celldistance =  getDistance(ridgecell.x,ridgecell.y,top1.x,top1.y);
                        if (celldistance<topdistance) {
                            null;
                        }
                    });
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