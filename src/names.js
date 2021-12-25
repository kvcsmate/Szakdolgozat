import globals from "./globals.js";


globals.names = {};

globals.names.Init = function () {
    this.Collection = new Array();
    
}

globals.names.AddName = function(x,y,size=12,name) {
    // console.log(name);
    let newName = document.createElement("div");
    newName.style.top = y.toString() + "px";
    newName.style.left = x.toString() + "px";
    //newName.style.size = size.toString() + "px;

    let newcontent = document.createTextNode(name);
    newName.appendChild(newcontent);
    globals.namesdiv.appendChild(newName);
    globals.names.Collection.push(newName);
}
globals.names.ChangeName = function(id)
{
    let Name = document.getElementById(id.toString());
    globals.NameChangeId=id;
    let checkbox = document.getElementById("isCapital");
        checkbox.checked = [...globals.capitals].filter(x=> x.cityId==globals.NameChangeId).length>0;

    var rect = Name.getBoundingClientRect();
    let height = rect.top+50;
    globals.NameChanger.style.top = height +"px";
    globals.NameChanger.style.left = rect.left +"px";
    globals.NameChanger.style.visibility="visible";
    
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
}
export default globals.labels;