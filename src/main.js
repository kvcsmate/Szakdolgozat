
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

var x,y;

/*const onMouseMove = (e) =>{
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);*/

function oMousePos(evt) {
    circle.style.left = evt.pageX + 'px';
    circle.style.top = evt.pageY + 'px';
    circle.style.width =radius*2 + 'px';
    circle.style.height = radius*2 + 'px';
    //circle.style.width, circle.style.length = radius;
    //console.log(circle.style.left);
    var ClientRect = canvas.getBoundingClientRect();
    x = Math.round(evt.clientX - ClientRect.left);
    y = Math.round(evt.clientY - ClientRect.top);
    
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    }
    
  }
  
  canvas.addEventListener("mousedown",handleMouseDown,true);
  canvas.addEventListener("mousemove",oMousePos);
  
  function handleMouseDown(e)
{
    
    interval_ = setInterval(function()
    { 
        cells.forEach(element => {
          
            let val = (element.x - x)*(element.x - x) + (element.y - y)*(element.y - y); 
            if( val < radius*radius) // benne van e a körben
            {
              //console.log(val); // ha igen, írja ki mennyi ez, és mennyi a rádiusz
                element.value+=10
                element.render(voronoi,context)
            };
        })
    }, tickrate);;
 }
 
 canvas.onmouseup =stopIncrement;
 
 
 function stopIncrement() {
   clearInterval(interval_); 
 }

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

 window.addEventListener("scroll",asd);
 function asd(e)
 {
   console.log('lefutott');
 }



window.addEventListener("wheel", function(e){
  radius = e.wheelDelta < 0 ? Math.min(radius+5,200) : Math.max(radius-5,10);
   
  circle.style.width =radius*2 + 'px';
  circle.style.height = radius*2 + 'px';
   //circle.setAttribute("style","height:500px");
   console.log(radius);
});
