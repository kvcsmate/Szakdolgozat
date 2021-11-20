export default {
    width: null,
    height: null,
    tickrate: 15,
    voronoi: null,
    cells: null,
    circumcenters : null,
    epsilon: 15,
    iselElevatingActive:true,
    //UI
    mouseX: null,
    mouseY: null,
    canvas: null,
    context: null,
    context2: null,
    mapmarkercontext : null,
    guicontext : null,
    circleRadius: 50,
    defaultColor : 'rgb(0,105,148)',
    shallowColor : 'rgb(83,156,202)',
    riverLevel : 999999,
    map : {},
    Latitude : 50,
    mapsize : 0.2,
    dryness : 10,
    // folyók hol generálódhatnak, értéke : dryness < distancefromwater
}