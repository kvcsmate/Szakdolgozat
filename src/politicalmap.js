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
    this.cities = new Array();

    globals.map.landcells.forEach(cell => 
    {
        //Egyiptom átlagos hőmérséklet: 22 fok, ez a globális felmelegedés után
        // Finnország átlagos hőmérséklet 5 fok
        if (cell.temperature<config.MaxTempForCities && cell.temperature>config.minTempForCities)
        {
            let hasWater = false;
            let hasWood = false;
            let neighbors = [...cell.Getneighbors()];
            if (cell.hasWater && !cell.isLake) {
                hasWater = true;
                HasNeighboringCity=false;
            }
                neighbors.forEach(neighborcell =>{
                    if (neighborcell.city) {
                        HasNeighboringCity = true;
                    }
                    if (neighborcell.value==0 || neighborcell.isLake) {
                        hasWater = true;
                    }
                    if (neighborcell.biome == biome.BIOMES.FOREST || neighborcell.biome == biome.BIOMES.TAIGA) //esőerdő túl meleg.
                    {
                        hasWood = true;
                    }
                });

            
            if (!HasNeighboringCity && hasWater && hasWood) 
            {
                let closeToHill=false;
                globals.map.LocalMaximums().forEach(top => {
                    if (globals.map.distance(top,cell)<config.CityDistanceFromHill) {
                        closeToHill = true;
                    }
                });
                if (closeToHill) {
                    cell.city = true;
                    this.cities.push(cell);
                    cell.rendercolor("black");
                }
            }
        }    
    });
}
PoliticalMap.drawCities = function () {
    

}

export default PoliticalMap;