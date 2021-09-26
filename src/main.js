
var c = document.getElementById("canvas");
let circle = document.getElementById('circle');
//c.innerHTML = "Width: " + width + "<br>Height: " + height;
var context = c.getContext("2d");
const width=c.width;
const tickrate = 100;
const height = c.height;
//context.canvas.style.width = 1800;
//context.canvas.style.height= 1000;
const density = 5000;
const chaos = 10;
var radius = 50;




//const points =generatePointsByGrid();
points = Array.from({length: density}, () => [Math.random() * width, Math.random() * height])


delaunay = d3.Delaunay.from(points);
voronoi = delaunay.voronoi([0, 0, width, height]);        
const cells = new Array(); 
for(let i=0;i<density;i++)
{
    cell = new Cell(voronoi.cellPolygon(i),0,i,points[i])
    cells.push(cell);
    cell.render(voronoi,context);
    
}

/*const onMouseMove = (e) =>{
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);*/
	mouse = new Mouse(canvas,cells);
  
  
 
 
 function generatePointsByGrid()
 {
  pts= new Array();
  for(let i=0;i<(density/2);i++)
  {
    for(let j=0;j<(density/2);j++)
    {

      let x = i*(height/(density/2)) + plusOrMinus()*chaos;
      let y = j*(width/(density/2)) + plusOrMinus()*chaos;
      pts.push([x,y]);
      console.log(i*(width/(density/2)),j*(height/(density/2)));
    }
  }
  return pts;
 }
 function plusOrMinus()
 {
   
   return (Math.random() - 0.5) * 2;
 } 
