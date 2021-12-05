import globals from './globals.js';
import gradient from './gradient.js';
import biome from './biome.js';


function IsNear (a ,b) {
    return Math.abs(a - b) < globals.epsilon;
}


function IsonBorder(cell) {
    return (IsNear(cell.x , globals.width) ||
            IsNear (cell.x, 0) ||
            IsNear (cell.y, 0) ||
            IsNear (cell.y, globals.height));
}


export default class Cell {
    #value;
    constructor(voronoi, value, id, point) {
        this.id = id
        this.voronoi = voronoi;
        this.x = point[0];
        this.y = point[1];
        this.#value = value;
        this.isOnBorder = IsonBorder(this);
        this.isLocalMax = true;
        this.neighbors =[...globals.voronoi.neighbors(this.id)];
        this.isLake = false;
        this.latitude = 0;
        this.biome = biome.BIOMES.FOREST;
        this.hasWater = true;
        this.waterDistance = 0;
        this.shallowWater = false;
        this.temperature = 0;
    }


    SetValue (number) {
        globals.map.cellsToUpdateWaterdistance.add(this.id);
        this.#value = Math.max (Math.min (number,255),0);
        this.hasWater = (this.#value == 0);
    }


    GetValue () {
        return this.#value;
    }

    GetNeighbors () {
        let array = new Array();
        this.neighbors.forEach((n)=> {
            array.push(globals.map.cells[n]);
        })
        return array;
    }

    render() {
        globals.context.fillStyle = "rgb(112,153,89)"
        globals.context.fillStyle = this.heightColorbyGradient();
        globals.context.lineJoin = 'bevel';
        globals.context.beginPath();
        globals.voronoi.renderCell(this.id, globals.context)
        globals.context.fill();
    }
    rendercolor(color)
    {
        globals.context.fillStyle = color;
        globals.context.lineJoin = 'bevel';
        globals.context.beginPath();
        globals.voronoi.renderCell(this.id, globals.context)
        globals.context.fill();
    }

    contains(x, y) {
        return globals.voronoi.contains(this.id, x, y);
    }


    heightColorbyGradient() {
        if (this.#value == 0) {
            return globals.defaultColor;
        }
        if (this.isLake) {
            return globals.shallowColor;
        }
        let colorindex = 0;
        let cval = this.#value / 2.25;
        for (let i = 0; i < gradient.length; ++i) {
            if (Math.abs(cval - gradient[i][1]) < Math.abs(cval - gradient[colorindex][1])) {
                colorindex = i;
            }

        }
        return gradient[colorindex][0];
    }


    heightColor() {

        let green, red, blue;
        if (this.#value == 0) {
            return 'rgb(0,105,148)';
        }
        red = this.#value;
        green = 255 - red / 10;
        blue = 0;
        /*
        
        if(this.#value >= 0 && this.#value <= 128) {
            // interpolate between (1.0f, 0.0f, 0.0f) and (0.0f, 1.0f, 0.0f)
             green = this.#value / 128.0;
             red = 1.0 - green;
             blue = 0.0;
            
            } else if(this.#value > 128 && this.#value <= 255) {
             red = 0.0;
             blue = (this.#value - 127) / 128.0;
             green = 1.0 - blue;
            }
            */
        return 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
}
