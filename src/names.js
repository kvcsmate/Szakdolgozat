import globals from "./globals";


globals.names = {};

globals.names.Init = function () {
    this.Collection = new Array();
    
}

globals.names.AddName() = function(x,y,size=12) {
    let newName = globals.namesdiv.CreateElement("div");
    newName.style.top = y;
    newName.style.left = x;
    newName.style.size = size;
    globals.names.Collection.push(newName);
}

export default globals.labels;