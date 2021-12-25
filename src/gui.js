import globals from './globals.js';
import mapmarkers from './mapmarkers.js';
import water from './watermap.js';
import watermap from './watermap.js';
import politicalmap from './politicalmap.js';
import enums from './enums.js';
import PoliticalMap from './politicalmap.js';
var gui = {}
gui.buttonInit = function(button)
{
    button.addEventListener("mouseover",buttonmouseover);
    button.addEventListener("mouseout",buttonmouseout);
}
var buttonmouseover = function(e)
{
    globals.iselElevatingActive=false;
    globals.canvas.style["pointer-events"] = "none";
}

var buttonmouseout = function(e)
{
    globals.iselElevatingActive=true;
    globals.canvas.style.pointerEvents = "auto";
}
gui.SetDivs = function()
{   
    this.MenuDivs = document.getElementsByClassName("menu");
    for (let index = 0; index < this.MenuDivs.length; index++) {
        this.MenuDivs[index].style.left = 180+'px';
        this.MenuDivs[index].style.top = 0+'px';
    }
    document.getElementById("Menu").style.visibility = "hidden";
    gui.MenuChanged();
}
gui.SetButtons = function()
{
    var MenuButton = document.getElementsByName("MenuButton")[0];
    var ElevationMenuButton = document.getElementsByName("ElevationMenuButton")[0];
    var BiomeMenuButton = document.getElementsByName("BiomeMenuButton")[0];
    var PoliticalMenuButton = document.getElementsByName("PoliticalMenuButton")[0];
    var SettingsMenuButton = document.getElementsByName("SettingsMenuButton")[0];
    var ExportMenuButton = document.getElementsByName("ExportMenuButton")[0];
    var waterButton = document.getElementsByName("water")[0];
    var FlatElevation = document.getElementsByName("FlatElevation")[0];
    var FalloffElevation = document.getElementsByName("FalloffElevation")[0];
    var MountainElevation = document.getElementsByName("MountainElevation")[0];

    var createRiversButton = document.getElementsByName("CreateRiver")[0];

    
    var RainforestButton = document.getElementsByName("RainforestButton")[0];
    var SavannaButton = document.getElementsByName("SavannaButton")[0];
    var DesertButton = document.getElementsByName("DesertButton")[0];
    var ForestButton = document.getElementsByName("ForestButton")[0];
    var SteppeButton = document.getElementsByName("SteppeButton")[0];
    var ColddesertButton = document.getElementsByName("ColddesertButton")[0];
    var TaigaButton = document.getElementsByName("TaigaButton")[0];
    var TundraButton = document.getElementsByName("TundraButton")[0];
    var IcesheetButton = document.getElementsByName("IcesheetButton")[0];

    var generateCities = document.getElementsByName("generateCities")[0];
    var AddCityButton = document.getElementsByName("AddCityButton")[0];
    var GenerateCountriesButton =document.getElementsByName("GenerateCountriesButton")[0];

    globals.NameChanger = document.getElementById("townNameInput");
    var TownNameConfirmButton = document.getElementsByName("TownNameConfirmButton")[0];
    var EscapeButton = document.getElementById("escapebutton");
    var RemoveButton = document.getElementById("removeButton");


    TownNameConfirmButton.onclick = function () {
        let name = document.getElementById("townName").value;
        if (name.length > 0) 
        {
            document.getElementById(globals.NameChangeId.toString()).innerHTML ='°   ' + name;
            document.getElementById("townName").value = "";
        }
        let capital =[...globals.cities].filter(x=> x.cityId==globals.NameChangeId)[0];
        if(document.getElementById("isCapital").checked)
        {
            console.log(globals.capitals);
            console.log(capital);
            globals.capitals.add(capital);
            document.getElementById(globals.NameChangeId.toString()).classList.add("town","capital");
            console.log(globals.capitals);
        }
        else
        {
            console.log(globals.capitals);
            console.log(capital);
            document.getElementById(globals.NameChangeId.toString()).className = 'town';
            globals.capitals = new Set([...globals.capitals].filter(x=> x.cityId!=globals.NameChangeId));
            console.log(globals.capitals);
        }
        globals.NameChangeId=0;
        globals.NameChanger.style.visibility="hidden";
    }
    EscapeButton.onclick = function () {
        document.getElementById("townName").value = "";
        globals.NameChangeId=0;
        globals.NameChanger.style.visibility="hidden";
        
    }
    RemoveButton.onclick = function () {
        let removable =  [...globals.cities].filter(x=> x.cityId==globals.NameChangeId);
        console.log(removable);
        globals.cities.delete(removable);
        globals.capitals.delete(removable);

        let elem = document. getElementById(globals.NameChangeId.toString()); 
        elem. parentNode. removeChild(elem);
        document.getElementById("townName").value = "";
        globals.NameChangeId=0;
        globals.NameChanger.style.visibility="hidden";
    }

   
    FlatElevation.onclick = function () {
        globals.Elevationtype = enums.ELEVATIONTYPE.FLAT;
    }
    FalloffElevation.onclick = function () {
        globals.Elevationtype = enums.ELEVATIONTYPE.FALLOFF;
    }
    MountainElevation.onclick = function () {
        globals.Elevationtype = enums.ELEVATIONTYPE.MOUNTAIN;
    }
        ElevationMenuButton.onclick = function(){
            globals.menu = enums.MENU.ELEVATION;
            globals.brushstyle = enums.ELEVATIONTYPE.MOUNTAIN;
            gui.MenuChanged();
        }  
        BiomeMenuButton.onclick = function(){
          BiomeGenerate();


            globals.menu = enums.MENU.BIOMES;
            gui.MenuChanged();
        }  
        PoliticalMenuButton.onclick = function(){
            if (!globals.biomesGenerated) {
                BiomeGenerate();
            }
            globals.menu = enums.MENU.POLITICAL;
            gui.MenuChanged();
        }  
        SettingsMenuButton.onclick = function(){
            globals.menu = enums.MENU.SETTINGS;
            gui.MenuChanged();
        }  
        ExportMenuButton.onclick = function(){
            // //globals.menu = enums.MENU.EXPORT;
            let buttons = document.getElementById("buttons");
            buttons.style.visibility = 'hidden';
            globals.context2.clearRect(0,0,globals.width,globals.height);
            // var img    = canvas.toDataURL("image/png");
            // document.write('<img src="'+img+'"/>'); 
             gui.MenuChanged();
            const screenshotTarget = document.body;

            html2canvas(screenshotTarget).then((canvas) => {
                const base64image = canvas.toDataURL("image/png");
                //window.location.href = base64image;
                debugBase64(base64image);
                });
                buttons.style.visibility = 'visible';
            }  
            function debugBase64(base64URL){
                var win = window.open();
                win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
            }
createRiversButton.onclick = function() {
    water.GenerateRivers();
    }

RainforestButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.RAINFOREST;
}
SavannaButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.SAVANNA;
}
DesertButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.DESERT;
}
ForestButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.FOREST;
}
SteppeButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.STEPPE;
}
ColddesertButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.COLDDESERT;
}
TaigaButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.TAIGA;
}
TundraButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.TUNDRA;
}
IcesheetButton.onclick = function() { 
    globals.Biometype = enums.BIOMES.ICESHEET;
}

    MenuButton.onclick = function () {
        let menuDiv = document.getElementById("Menu");
        if (menuDiv.style.visibility =="hidden") 
        {
            menuDiv.style.visibility = "visible";
        }
        else
        {
            menuDiv.style.visibility = "hidden";
        }
        gui.MenuChanged();
    }

    
    // smallbutton.onclick = function() {
    //     globals.mapsize = 0.025;
    //     mapmarkers.DrawLatitude();
    // };
    // mediumbutton.onclick = function() {
    //     globals.mapsize = 0.3;
        
    //     mapmarkers.DrawLatitude();
    // };
    // bigbutton.onclick = function() {
    //     globals.mapsize = 1;
    //     mapmarkers.DrawLatitude();
    // };
    // drawridges.onclick = function() {
    //     globals.PoI.Init();
    // }


    generateCities.onclick = function() {
        politicalmap.GenerateCities();
    }
    AddCityButton.onclick = function () {
        globals.Politicaltype = enums.POLITICALTYPE.ADDCITY;
    }
    GenerateCountriesButton.onclick = function(){
        PoliticalMap.Createcounties();
    }


    waterButton.onclick = function() {
      BiomeGenerate();
    }
}   
var BiomeGenerate = function () {
    if (!globals.riversGenerated) {
        water.GenerateRivers();
    }
    globals.map.UpdateWaterDistances();
    globals.biomesGenerated = true;
}
gui.MenuChanged = function() 
{
    for (let index = 0; index <  this.MenuDivs.length; index++) {
        this.MenuDivs[index].style.visibility = "hidden";
   }
   //console.log(globals.menu);
    if (document.getElementById("Menu").style.visibility == "visible") 
    {
        switch (globals.menu) {
            case 1: document.getElementById("ElevationUI").style.visibility = "visible";
                break;
            case 2: document.getElementById("BiomeUI").style.visibility = "visible";
                break;
            case 3: document.getElementById("PoliticalUI").style.visibility = "visible";
                break;
            case 4: document.getElementById("SettingsUI").style.visibility = "visible";
                break;
            case 5: document.getElementById("ExportUI").style.visibility = "visible";
                break;
        }
    }
    
}
export default gui;