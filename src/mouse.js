class Mouse
{
	x;
	y;
	cells;
	constructor(canvas,cellstoassign,x,y)
	{
		this.x = x;
		this.y = y;
		this.interval_;
		this.tickrate = 100;
		this.cells = new Array();
		cellstoassign.forEach(element => {
			this.cells.push(element);
		});
		console.log(this.cells[10]);
		canvas.addEventListener("mousedown",this.handleMouseDown);
		canvas.addEventListener("mousemove",this.oMousePos);
		window.addEventListener("wheel", this.scroll);
		canvas.onmouseup =this.stopIncrement;
		window.addEventListener("contextmenu",e=>e.preventDefault());
		
	}
	
	oMousePos(evt) 
	{
		circle.style.left = evt.pageX + 'px';
		circle.style.top = evt.pageY + 'px';
		circle.style.width =radius*2 + 'px';
		circle.style.height = radius*2 + 'px';
		var ClientRect = canvas.getBoundingClientRect();
		x = Math.round(evt.clientX - ClientRect.left);
		y = Math.round(evt.clientY - ClientRect.top);
		
		/*return 
		{
		  x: Math.round(evt.clientX - ClientRect.left),
		  y: Math.round(evt.clientY - ClientRect.top)
		}*/
    
	}
	
	handleMouseDown(e)
	{
		
		if(e.which == 1)
		{
			
			this.interval_ = setInterval(function()
			{
				console.log(cells[1]);
				cells.forEach(element => {
					let val = (element.x - x)*(element.x - x) + (element.y - y)*(element.y - y); 
					console.log(x);
					if( val < radius*radius) // benne van e a körben
					{
						
						console.log(val); // ha igen, írja ki mennyi ez, és mennyi a rádiusz
						element.value = Math.min(element.value+5,255);
						element.render(voronoi,context);
					};
				})
			}, this.tickrate);;
		}
		else if(e.which ==3)
		{
			this.interval_ = setInterval(function()
			{ 
					console.log("asd");
					cells.forEach(element => {
				  
					let val = (element.x - x)*(element.x - x) + (element.y - y)*(element.y - y); 
					if( val < radius*radius) // benne van e a körben
					{
					  //console.log(val); // ha igen, írja ki mennyi ez, és mennyi a rádiusz
						element.value= Math.max(0,element.value-1);
						element.render(voronoi,context);
					};
				})
			}, this.tickrate);;
		}
		
	}
	
 
 
	stopIncrement() 
	{
		clearInterval(this.interval_); 
	}
	
	scroll(e)
	{
		radius = e.wheelDelta < 0 ? Math.min(radius+5,200) : Math.max(radius-5,10);
		circle.style.width =radius*2 + 'px';
		circle.style.height = radius*2 + 'px';
		console.log(radius);
	}


	
  
}