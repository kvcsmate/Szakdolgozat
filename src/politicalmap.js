import map from './map.js'
import globals from './globals.js';
import config from './config.js';
import biome from './biome.js';
var PoliticalMap = {};

PoliticalMap.Createcounties = function () {
    if (globals.cities.size==0)
    {
        alert("Nincsenek Városok létrehozva! Hozz létre városokat a 'Városok Generálása' vagy a 'Város hozzáadás' gombok segítségével!")     
        return;
    }
    if (globals.capitals.size==0) 
    {
        alert("Nincsenek Fővárosok! A városok közül jelölj ki legalább egyet és tedd fővárossá!")    
        return;
    }
    PoliticalMap.AssignRandomColorToCountry();

    let starterSet = new Set();
    globals.map.GetLandCells().forEach(cell => {
            cell.countryId=0;
    });
    let countryId = 1;
    globals.capitals.forEach(city => {
        city.countryId = countryId;
        city.GetNeighbors().forEach(element => {
            element.countryId = city.countryId;
            starterSet.add(element);
        });
        countryId++;
    });
    while (starterSet.size > 0) {

        let neighbors = new Set ();
        starterSet.forEach(element => {
          if (element.GetValue () != 0  && !element.hasWater && !element.naturalBorder)
          {
            let freeneighbors = element.GetNeighbors().filter(a => a.countryId==0);
            freeneighbors.forEach(cell => {
                cell.countryId = element.countryId;
                
            });
            neighbors= new Set([...freeneighbors,...neighbors]);
          }
        });
        PoliticalMap.ColorCountries();
        starterSet = neighbors;
      }
    let wildLands = new Set([...globals.map.GetLandCells().filter(a => a.countryId==0)]);
    while(wildLands.size > 0)
    {
        wildLands.forEach(element => {
            let countryneighbors = element.GetNeighbors().filter(a => a.countryId!=0);
            if(countryneighbors.length>0)
            {
                element.countryId = countryneighbors[0].countryId;
                wildLands.delete(element);
            }
        });
        PoliticalMap.ColorCountries();
    }
}

function RandomColor()
{
    return 'rgb('+Math.round(Math.random()*12.75)*20+','+Math.round(Math.random()*12.75)*20+','+Math.round(Math.random()*12.75)*20+')';
}
PoliticalMap.AssignRandomColorToCountry = function()
{
    this.colors = new Array();
    for (let i = 0; i < globals.capitals.size+1; i++) {
        var randomColor =RandomColor();
        while(this.colors.includes(randomColor))
        {
            randomColor = RandomColor();
            //console.log("új szín");
        }
        //Math.floor(Math.random()*16777215).toString(16);

        this.colors.push(randomColor);
        // console.log(i  + " " + randomColor);
    }
}
PoliticalMap.ColorCountries = function () {
    
    globals.map.GetLandCells().forEach(element => {
        element.rendercolor(this.colors[element.countryId])
        // console.log(element.countryId);
    });
}
/*
https://www.yourarticlelibrary.com/essay/factors-influencing-growth-of-cities-around-the-world/24287
város növését befolyásoló faktor: 
alapanyag, készlet többlet : fa, (ércek), folyó, termőföld
tehát : megfelelő hőmérséklet : 10 és 30 fok között
folyó mellett, tenger legalább egy mező távolságban
erdő mellett legyen
közelben legyen hegység, építőanyagok és ércek miatt
"catan" szabály : ne legyen a közelben másik nagyváros, azaz 4 mezőnyire mondjuk
*/
PoliticalMap.GenerateCities = function(){
    globals.cities = new Set();
    globals.capitals = new Set();
    PoliticalMap.deleteCityDivs();
    globals.cityId = 1;
    globals.map.GetLandCells().forEach(cell => 
    {
        //Egyiptom átlagos hőmérséklet: 22 fok, ez a globális felmelegedés után
        // Finnország átlagos hőmérséklet 5 fok
        if (cell.temperature<config.MaxTempForCities && cell.temperature>config.MinTempForCities)
        {
            let hasWater = false;
            let HasNeighboringCity=false;
            if (cell.hasWater && cell.GetValue()>0 && !cell.IsLake) {
                hasWater = true;
            }
            let neighbors = [...cell.GetNeighbors()];
            
            neighbors.forEach(neighborcell =>{
                    // túl közeli + nem lehet állítani
                    if (!hasWater && neighborcell.GetValue()==0 || neighborcell.isLake) {
                        hasWater = true;
                    }
                   
                    globals.cities.forEach(city => {
                        if (globals.map.CellDistance(city,cell)<config.PopulationDensity){
                            HasNeighboringCity =  true;
                        }
                    });
                });
            if (!HasNeighboringCity && hasWater) 
            {
                let closeToHill=false;
                globals.map.LocalMaximums().forEach(top => {
                    if (globals.map.CellDistance(top,cell)<config.CityDistanceFromHill) {
                        closeToHill = true;
                    }
                });
                if (closeToHill) {
                    cell.city = true;
                    cell.cityId=globals.cityId;
                    globals.cities.add(cell);
                    if(globals.cityId % config.RealmSize == 0 || globals.cityId==1)
                    {
                        globals.capitals.add(cell);
                    }
                    globals.cityId++;
                }
            }
        }    
     });
    
    //PoliticalMap.AssignRandomColorToCountry();
    //PoliticalMap.Createcounties();
    //PoliticalMap.ColorCountries();
    //PoliticalMap.drawCities();
    PoliticalMap.addCitiesAsDiv();
}
PoliticalMap.drawCities = function () {
    globals.cities.forEach(cell => {
            //console.log(globals.namesbase);
            globals.context.fillStyle = "black";
            globals.context.fillRect(cell.x,cell.y,10,10);
            let culture = globals.namesbase.cultures[Math.floor(Math.random() * globals.namesbase.cultures.length)].Names;//[Math.floor(Math.random() * globals.namesbase.length)];
            let name = culture[Math.floor(Math.random() * culture.length)];
            //console.log(name);
            globals.names.AddName(cell.x -20 ,cell.y-20,null,name);
            
    });
}
PoliticalMap.addCitiesAsDiv = function () 
{
    globals.cities.forEach(cell => {
        PoliticalMap.addCityDiv(cell);
    });
}
PoliticalMap.addCityDiv = function (cell) {
    
        
        let culture = globals.namesbase.cultures[config.NameCulture].Names;
        let name = culture[Math.floor(Math.random() * culture.length)];
        let newCity = document.createElement("div");
        if ( [...globals.capitals].filter(x=> x.cityId==cell.cityId).length>0) {
            newCity.classList.add("town","capital")
        }
        else
        {
            newCity.className='town';
        }
        
        newCity.style.top = cell.y.toString() + "px";
        newCity.style.left = cell.x.toString() + "px";

        newCity.id=cell.cityId;
        let newcontent = document.createTextNode('°   '+name);
        newCity.appendChild(newcontent);
      
        globals.citiesdiv.appendChild(newCity);
        let cityDiv = document.getElementById(newCity.id.toString())
        cityDiv.onclick = function() 
        {
            //console.log(newCity.id.toString());
            globals.names.ChangeName(newCity.id);
        }
        
}
PoliticalMap.deleteCityDivs = function () {
   let cities = document.getElementsByClassName("town");
   if(cities.length>0)
   {
        console.log(cities);
        while(cities[0]) {
            cities[0].parentNode.removeChild(cities[0]);
        }       
   }
}
PoliticalMap.addCity = function(cell)
{
    cell.city = true;
    cell.cityId=globals.cityId;
    globals.cities.add(cell);
    globals.cityId++;
    PoliticalMap.addCityDiv(cell);
}

export default PoliticalMap;