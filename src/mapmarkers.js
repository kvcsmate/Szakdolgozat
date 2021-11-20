import globals from './globals.js';

var mapmarkers = {}
mapmarkers.DrawLatitude = function(){
    globals.mapmarkercontext.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    let latitude = globals.canvas.height/2
    while(latitude< globals.canvas.height){
        globals.mapmarkercontext.beginPath();
        globals.mapmarkercontext.moveTo(1,latitude);
        globals.mapmarkercontext.lineTo(globals.canvas.width-1,latitude);
        globals.mapmarkercontext.stroke();
        latitude += 110/globals.mapsize;    
    }
    latitude = globals.canvas.height/2
    while(latitude >  0){
        latitude -=  110/globals.mapsize;
        globals.mapmarkercontext.beginPath();
        globals.mapmarkercontext.moveTo(1,latitude);
        globals.mapmarkercontext.lineTo(globals.canvas.width-1,latitude);
        globals.mapmarkercontext.stroke();
    }
    
}
export default mapmarkers;