import map from './map.js'
import globals from './globals.js';
import County from './county.js'
import config from './config.js';
import biome from './biome.js';
var PoliticalMap = {};

PoliticalMap.Createcounties = function () {
    let starterSet = new Set();
    console.log(this.cities);
    this.cities.forEach(city => {
        city.GetNeighbors().forEach(element => {
            element.countryId = city.countryId
            starterSet.add(element);
        });
    });

    while (starterSet.size > 0) {

        let neighbors = new Set ();
        starterSet.forEach(element => {
          if (element.GetValue () != 0  && !element.hasWater)
          {
            let freeneighbors = element.GetNeighbors().filter(element => element.countryId==0)
            freeneighbors.forEach(cell => {
                cell.countryId = element.countryId;
                
            });
            neighbors= new Set([...freeneighbors,...neighbors]);
          }
        });
        //PoliticalMap.ColorCountries();
        starterSet = neighbors;
      }
}

function RandomColor()
{
    return 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
}
PoliticalMap.AssignRandomColorToCountry = function()
{
    this.colors = new Array();
    for (let i = 0; i < this.cities.size; i++) {
        var randomColor = RandomColor();//Math.floor(Math.random()*16777215).toString(16);
        this.colors.push(randomColor);
        console.log(i  + " " + randomColor);
    }
}
PoliticalMap.ColorCountries = function () {
    
    globals.map.GetLandCells().forEach(element => {
        element.rendercolor(this.colors[element.countryId+5])
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
    this.cities = new Set();
    let cityId = 1;
    globals.map.GetLandCells().forEach(cell => 
    {
        //Egyiptom átlagos hőmérséklet: 22 fok, ez a globális felmelegedés után
        // Finnország átlagos hőmérséklet 5 fok
        if (cell.temperature<config.maxTempForCities && cell.temperature>config.minTempForCities)
        {
            let hasWater = false;
            let hasWood = false;
            let HasNeighboringCity=false;
            if (cell.hasWater && cell.GetValue()>0 && !cell.IsLake) {
                hasWater = true;
            }
            let neighbors = [...cell.GetNeighbors()];
            
            neighbors.forEach(neighborcell =>{
                    // if (neighborcell.city) {
                    //     HasNeighboringCity = true;
                    // }
                    // túl közeli + nem lehet állítani
                    if (!hasWater && neighborcell.GetValue()==0 || neighborcell.isLake) {
                        hasWater = true;
                    }
                    // if (neighborcell.biome == biome.BIOMES.FOREST || neighborcell.biome == biome.BIOMES.TAIGA) //esőerdő túl meleg.
                    // {
                    //     hasWood = true;
                    // }
                    this.cities.forEach(city => {
                        if (globals.map.CellDistance(city,cell)<config.PopulationDensity){
                            HasNeighboringCity =  true;
                        }
                    });
                });

                hasWood=true;
            if (!HasNeighboringCity && hasWater && hasWood) 
            {
                let closeToHill=false;
                globals.map.LocalMaximums().forEach(top => {
                    if (globals.map.CellDistance(top,cell)<config.CityDistanceFromHill) {
                        closeToHill = true;
                    }
                });
                if (closeToHill) {
                    cell.city = true;
                    this.cities.add(cell);
                    cell.countryId = cityId;
                    cityId++;
                    //console.log(cityId);
                }
            }
        }    
     });
    PoliticalMap.drawCities();
    PoliticalMap.AssignRandomColorToCountry();
    PoliticalMap.Createcounties();
    PoliticalMap.ColorCountries();
}
PoliticalMap.drawCities = function () {
    this.cities.forEach(cell => {
            //console.log(globals.namesbase);
            globals.context.fillStyle = "black";
            globals.context.fillRect(cell.x,cell.y,10,10);
            let culture = globals.namesbase.cultures[Math.floor(Math.random() * globals.namesbase.cultures.length)].Names;//[Math.floor(Math.random() * globals.namesbase.length)];
            let name = culture[Math.floor(Math.random() * culture.length)];
            //console.log(name);
            globals.names.AddName(cell.x -20 ,cell.y-20,null,name);
            
    });

}

export default PoliticalMap;