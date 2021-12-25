import globals from "./globals.js";

var enums = {};

//egyelőre fix méretezés.
//jövőben , 1: 250 000 , 1:1 000 000, és 1:1 5 000 000 
// ez mit jelent: térképen 1cm: valóság 
// itt: mondjuk 50 cm széles képernyőnél, ami 2000 (1920) pixel, 1 cm = 40 pixel, mivel a méretek nem függnek semmitől, legyen 50px
// 100 000 cm = 1 km 
// másszóval, 50px : 2,5km, 50px : 10km , 50px : 50km 
//azaz: 1px: 0,25km, 1px:2 km, 1px:10km
//ez a globalban van tárolva
//fontos, mert 111 -> 110 km enként van egy szélességi fok
enums.TEMPERATURE = {
    HOT : 20,
    TEMPERATE :3,
    COLD : -5, 
    WET : 4,
    SEASONAL : 8,
    DRY : 12
}
enums.BIOMES = {
    // [temperature,precipitation]
    DESERT: [enums.TEMPERATURE.DRY,enums.TEMPERATURE.HOT],
    COLDDESERT: [enums.TEMPERATURE.DRY,enums.TEMPERATURE.TEMPERATE],
    ICESHEET: [enums.TEMPERATURE.DRY,enums.TEMPERATURE.COLD],
    RAINFOREST: [enums.TEMPERATURE.WET,enums.TEMPERATURE.HOT],
    FOREST: [enums.TEMPERATURE.WET,enums.TEMPERATURE.TEMPERATE],
    TAIGA: [enums.TEMPERATURE.WET,enums.TEMPERATURE.COLD],
    SAVANNA: [enums.TEMPERATURE.SEASONAL,enums.TEMPERATURE.HOT],
    STEPPE: [enums.TEMPERATURE.SEASONAL,enums.TEMPERATURE.TEMPERATE],
    TUNDRA: [enums.TEMPERATURE.SEASONAL,enums.TEMPERATURE.COLD],
}
enums.BIOMEBRUSH = {
    DESERT:1,
COLDDESERT:2,
ICESHEET:3,
RAINFOREST:4,
FOREST:5,
TAIGA:6,
SAVANNA:7,
STEPPE:8,
TUNDRA:9
}

enums.BIOMECOLORS = {
[enums.BIOMES.DESERT]: "#cec798",
[enums.BIOMES.COLDDESERT]:"#cec798",
[enums.BIOMES.ICESHEET]:"#ffffff",
[enums.BIOMES.RAINFOREST]:"#002e00",
[enums.BIOMES.FOREST]:"#1c6c1d",
[enums.BIOMES.TAIGA]:"#091a10",
[enums.BIOMES.SAVANNA]:"#bb944d",
[enums.BIOMES.STEPPE]:"#72954d",
[enums.BIOMES.TUNDRA]:"#a4a4db"
};


enums.MENU = 
{
    ELEVATION : 1,
    BIOMES : 2, 
    POLITICAL : 3,
    SETTINGS : 4,
    EXPORT : 5,
}

enums.ELEVATIONTYPE =
{
    FLAT : 1,
    MOUNTAIN : 2,
    FALLOFF : 3
}

enums.POLITICALTYPE = 
{
    ADDCITY : 1,
    COUNTRY : 2
}
export default enums;