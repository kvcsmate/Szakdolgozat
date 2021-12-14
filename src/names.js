import globals from "./globals.js";


globals.names = {};

globals.names.Init = function () {
    this.Collection = new Array();
    
}

globals.names.AddName = function(x,y,size=12,name) {
    console.log(name);
    let newName = document.createElement("div");
    newName.style.top = y.toString() + "px";
    newName.style.left = x.toString() + "px";
    //newName.style.size = size.toString() + "px;

    let newcontent = document.createTextNode(name);
    newName.appendChild(newcontent);
    globals.namesdiv.appendChild(newName);
    console.log(globals.names.Collection);
    globals.names.Collection.push(newName);
}

export default globals.labels;