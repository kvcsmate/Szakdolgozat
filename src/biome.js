import globals from './globals.js';
import gradient from './gradient.js';
import Cell from './cell.js';
import enums from './enums.js';
var biome = {
};

//egyelőre fix méretezés.
//jövőben , 1: 250 000 , 1:1 000 000, és 1:1 5 000 000 
// ez mit jelent: térképen 1cm: valóság 
// itt: mondjuk 50 cm széles képernyőnél, ami 2000 (1920) pixel, 1 cm = 40 pixel, mivel a méretek nem függnek semmitől, legyen 50px
// 100 000 cm = 1 km 
// másszóval, 50px : 2,5km, 50px : 10km , 50px : 50km 
//azaz: 1px: 0,25km, 1px:2 km, 1px:10km
//ez a globalban van tárolva
//fontos, mert 111 -> 110 km enként van egy szélességi fok
// biome.TEMPERATURE = {
//     HOT : 20,
//     TEMPERATE :3,
//     COLD : -10, 
//     WET : 4,
//     SEASONAL : 8,
//     DRY : 12
// }
// biome.BIOMES = {
//     // [temperature,precipitation]
//     DESERT: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.HOT],
//     COLDDESERT: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.TEMPERATE],
//     ICESHEET: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.COLD],
//     RAINFOREST: [biome.TEMPERATURE.WET,biome.TEMPERATURE.HOT],
//     FOREST: [biome.TEMPERATURE.WET,biome.TEMPERATURE.TEMPERATE],
//     TAIGA: [biome.TEMPERATURE.WET,-biome.TEMPERATURE.COLD],
//     SAVANNA: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.HOT],
//     STEPPE: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.TEMPERATE],
//     TUNDRA: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.COLD],
// }
// // biome.BIOMECOLORS = new Array(
// //     [[7,biome.TEMPERATURE.HOT],"rgb(203,203,152)"],
// //     [[9,biome.TEMPERATURE.TEMPERATE],"rgb(255,153,51)"],
// //     [[9,-10],"rgb(0,0,0)"],
// //     [[3,biome.TEMPERATURE.HOT],"rgb(0,255,0)"],
// //     [[3,biome.TEMPERATURE.TEMPERATE],"rgb(0,152,32)"],
// //     [[3,-10],"rgb(1,83,1)"],
// //     [[biome.TEMPERATURE.TEMPERATE,biome.TEMPERATURE.HOT],"rgb(0,0,0)"],
// //     [[biome.TEMPERATURE.TEMPERATE,biome.TEMPERATURE.TEMPERATE],"rgb(102,102,0)"],
// //     [[biome.TEMPERATURE.TEMPERATE,-10],"rgb(153,153,153)"],
// // );

// biome.BIOMECOLORS = {
// [biome.BIOMES.DESERT]: "#cec798",
// [biome.BIOMES.COLDDESERT]:"#cec798",
// [biome.BIOMES.ICESHEET]:"#8b8e40",
// [biome.BIOMES.RAINFOREST]:"#002e00",
// [biome.BIOMES.FOREST]:"#1c6c1d",
// [biome.BIOMES.TAIGA]:"#091a10",
// [biome.BIOMES.SAVANNA]:"#bb944d",
// [biome.BIOMES.STEPPE]:"#72954d",
// [biome.BIOMES.TUNDRA]:"#cdcdd8"
// };

biome.SetTemperatures = function(){
    globals.map.cells.forEach(cell => {
        if(cell.GetValue () != 0)
        {
            if(cell.y > globals.canvas.height/2)
            {
                cell.latitude = (cell.y-globals.canvas.height/2 + globals.Latitude)/(110/globals.mapsize);
            }
            else
            {
                cell.latitude =  (globals.Latitude - (cell.y-globals.canvas.height/2))/(110/globals.mapsize) ;
            }
        
            cell.temperature = 27 - globals.Latitude*(0.4) - cell.GetValue()/(50)*6.5;//gradient.latitude[tindex][1] ;    
            let temperature = 0;
            let precipitation = 0;
            let arctic = false;
            if(cell.temperature>enums.TEMPERATURE.HOT)
            {
                temperature = enums.TEMPERATURE.HOT;
            }
            else if(cell.temperature > enums.TEMPERATURE.TEMPERATE)
            {
                temperature = enums.TEMPERATURE.TEMPERATE;
            }
            else {
                if(temperature < enums.TEMPERATURE.COLD)
                {
                    arctic = true;
                }
                temperature = enums.TEMPERATURE.COLD
            }
            precipitation = enums.TEMPERATURE.DRY;
            if (!arctic) 
            {
                if (cell.waterDistance<enums.TEMPERATURE.WET) 
                {
                    precipitation = enums.TEMPERATURE.WET;    
                }
                else if(cell.waterDistance<enums.TEMPERATURE.SEASONAL)
                {
                    precipitation = enums.TEMPERATURE.SEASONAL;
                }
            }
           
            
            cell.biome = [precipitation,temperature];
            cell.renderBiome();
        }

    });
}


export default biome;