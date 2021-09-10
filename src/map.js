

class Cell
{
    constructor(voronoi,value,id,point)
    {
        this.id = id
        this.voronoi = voronoi;
        this.x = point[0];
        this.y = point[1];
        this.value = value;
    }
    render(voronoi,context)
    {
        context.fillStyle = this.heightColorbyGradient();
        //console.log(this.heightColorbyGradient())
        context.beginPath();
        voronoi.renderCell(this.id,context)
        //context.fillText(this.value,this.x,this.y);
        context.fill();
        //context.stroke();
    }
    contains(voronoi,x,y)
    {
                return voronoi.contains(this.id,x,y);
    }
    heightColorbyGradient()
    {
        if(this.value==0)
        {
            return 'rgb(0,105,148)' ;
        }
        let colorindex=0;
        let cval = this.value/2.25;
        for(let i=0;i<gradient.length;++i)
        {
            if(Math.abs(cval-gradient[i][1])<Math.abs(cval-gradient[colorindex][1]))
            {
                colorindex = i;
            }
            
        }
        return gradient[colorindex][0];
    }
    
    heightColor()
    {
        
        let green,red,blue;
        if(this.value==0)
        {
            return 'rgb(0,105,148)' ;
        }
        red = this.value;
        green = 255 -red/10;
        blue = 0;
        /*
        
        if(this.value >= 0 && this.value <= 128) {
            // interpolate between (1.0f, 0.0f, 0.0f) and (0.0f, 1.0f, 0.0f)
             green = this.value / 128.0;
             red = 1.0 - green;
             blue = 0.0;
            
            } else if(this.value > 128 && this.value <= 255) {
             red = 0.0;
             blue = (this.value - 127) / 128.0;
             green = 1.0 - blue;
            }
            */
            return 'rgb('+red+','+green+','+blue+')' ;
    }
}