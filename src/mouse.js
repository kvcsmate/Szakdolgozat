class Mouse
{
	
	constructor(canvas,cellstoassign)
	{
		
		this.x, this.y, this.interval_;
		this.tickrate = 100;
		this.cells = cellstoassign.map((x)=>x);
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
		this.x = Math.round(evt.clientX - ClientRect.left);
		this.y = Math.round(evt.clientY - ClientRect.top);
		
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
				console.log(this.cells);
				this.cells.forEach(element => {
				  
					let val = (element.x - this.x)*(element.x - this.x) + (element.y - this.y)*(element.y - this.y); 
					if( val < radius*radius) // benne van e a körben
					{
						console.log(val); // ha igen, írja ki mennyi ez, és mennyi a rádiusz
						element.value+=10
						element.render(voronoi,context)
					};
				})
			}, this.tickrate);;
		}
		else if(e.which ==3)
		{
			this.interval_ = setInterval(function()
			{ 
				this.cells.forEach(element => {
				  
					let val = (element.x - this.x)*(element.x - this.x) + (element.y - this.y)*(element.y - this.y); 
					if( val < radius*radius) // benne van e a körben
					{
					  //console.log(val); // ha igen, írja ki mennyi ez, és mennyi a rádiusz
						element.value-=10
						element.render(voronoi,context)
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