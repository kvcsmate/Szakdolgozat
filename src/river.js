import globals from './globals.js';

export default class River{
    constructor()
    {
        this.points = [];
        this.curve=[]
    }
    addPoint(x,y,z)
    {
        var point =[x,y,z]
        this.points.push(point);
    }
    addCurvePoints(x,y)
    {
        this.curve.push(x,y);
    }
    addVector(x1,y1,z1,x2,y2,z2)
    {
        if(x1 == this.points[length-1][0] && y1 == this.points[length-1][1])
        {
            this.addPoint([x2,y2,z2]);
        }
        else
        {
            this.addPoint([x1,y1,z1])
        }
    }
}