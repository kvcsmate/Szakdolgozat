import globals from './globals.js';

export default class River{
    constructor()
    {
        this.points = [];
    }
    addPoint(x,y)
    {
        var point =[x,y]
        this.points.push(point);
    }
}