import map from './map.js'
import globals from './globals.js';
import County from './county.js'
import config from './config.js';
import biome from './biome.js';
var PoliticalMap = {};

PoliticalMap.Createcounties = function () {
    null;
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
                }
            }
        }    
     });
    PoliticalMap.drawCities();
}
PoliticalMap.drawCities = function () {
    this.cities.forEach(cell => {
            console.log(globals.namesbase);
            globals.context.fillStyle = "black";
            globals.context.fillRect(cell.x,cell.y,10,10);
            let culture = globals.namesbase.cultures[Math.floor(Math.random() * globals.namesbase.cultures.length)].Names;//[Math.floor(Math.random() * globals.namesbase.length)];
            let name = culture[Math.floor(Math.random() * culture.length)];
            console.log(name);
            globals.names.AddName(cell.x -20 ,cell.y-20,null,name);
            
    });

}

export default PoliticalMap;