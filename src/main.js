var c = document.getElementById("canvas");
var context = c.getContext("2d");

const points = [[0, 0], [0, 1], [1, 0], [1, 1]];
const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, 960, 500]);

context.beginPath();
delaunay.renderPoints(context);
context.fill();
context.beginPath();
voronoi.render(context);
context.stroke();

