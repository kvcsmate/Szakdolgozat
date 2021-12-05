import globals from './globals.js';
import gradient from './gradient.js';
import Cell from './cell.js';
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
biome.TEMPERATURE = {
    HOT : 20,
    TEMPERATE :3,
    COLD : -10, 
    WET : 4,
    SEASONAL : 8,
    DRY : 12
}
biome.BIOMES = {
    // [temperature,precipitation]
    DESERT: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.HOT],
    COLDDESERT: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.TEMPERATE],
    ICESHEET: [biome.TEMPERATURE.DRY,biome.TEMPERATURE.COLD],
    RAINFOREST: [biome.TEMPERATURE.WET,biome.TEMPERATURE.HOT],
    FOREST: [biome.TEMPERATURE.WET,biome.TEMPERATURE.TEMPERATE],
    TAIGA: [biome.TEMPERATURE.WET,-biome.TEMPERATURE.COLD],
    SAVANNA: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.HOT],
    STEPPE: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.TEMPERATE],
    TUNDRA: [biome.TEMPERATURE.SEASONAL,biome.TEMPERATURE.COLD],
}
// biome.BIOMECOLORS = new Array(
//     [[7,biome.TEMPERATURE.HOT],"rgb(203,203,152)"],
//     [[9,biome.TEMPERATURE.TEMPERATE],"rgb(255,153,51)"],
//     [[9,-10],"rgb(0,0,0)"],
//     [[3,biome.TEMPERATURE.HOT],"rgb(0,255,0)"],
//     [[3,biome.TEMPERATURE.TEMPERATE],"rgb(0,152,32)"],
//     [[3,-10],"rgb(1,83,1)"],
//     [[biome.TEMPERATURE.TEMPERATE,biome.TEMPERATURE.HOT],"rgb(0,0,0)"],
//     [[biome.TEMPERATURE.TEMPERATE,biome.TEMPERATURE.TEMPERATE],"rgb(102,102,0)"],
//     [[biome.TEMPERATURE.TEMPERATE,-10],"rgb(153,153,153)"],
// );

biome.BIOMECOLORS = {
[biome.BIOMES.DESERT]: "#cec798",
[biome.BIOMES.COLDDESERT]:"#cec798",
[biome.BIOMES.ICESHEET]:"#8b8e40",
[biome.BIOMES.RAINFOREST]:"#002e00",
[biome.BIOMES.FOREST]:"#1c6c1d",
[biome.BIOMES.TAIGA]:"#aebfbe",
[biome.BIOMES.SAVANNA]:"#bb944d",
[biome.BIOMES.STEPPE]:"#72954d",
[biome.BIOMES.TUNDRA]:"#cdcdd8"
};

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
        
            // let tindex = 0;
            // let cval = cell.latitude;
            // for (let i = 1; i < gradient.latitude.length; ++i) {
            //     if (Math.abs(cval - gradient[i][0]) < Math.abs(cval - gradient[tindex][0])) {
            //         tindex = i;
            //     }

            // }
            
            cell.temperature = 27 - globals.Latitude*(0.4) - cell.GetValue()/(6.5)*2;//gradient.latitude[tindex][1] ;    
            console.log(cell.temperature);        
            let temperature = 0;
            let precipitation = 0;
            if(cell.temperature>biome.TEMPERATURE.HOT)
            {
                temperature = biome.TEMPERATURE.HOT;
            }
            else if(cell.temperature > biome.TEMPERATURE.TEMPERATE)
            {
                temperature = biome.TEMPERATURE.TEMPERATE;
            }
            else
            {
                temperature = biome.TEMPERATURE.COLD;
            }
            
            if (cell.waterDistance<biome.TEMPERATURE.WET) 
            {
                precipitation = biome.TEMPERATURE.WET;    
            }
            else if(cell.waterDistance<biome.TEMPERATURE.SEASONAL)
            {
                precipitation = biome.TEMPERATURE.SEASONAL;
            }
            else
            {
                precipitation = biome.TEMPERATURE.DRY;
            }
            cell.biome = [precipitation,temperature];
            
        }

    });
}

biome.drawBiome =  function (cell)
{
    let color = biome.BIOMECOLORS[cell.biome];
            
    globals.context.fillStyle = color;
    globals.context.lineJoin = 'bevel';
    globals.context.beginPath();
    globals.voronoi.renderCell(cell.id, globals.context)
    globals.context.fill();
}
export default biome;