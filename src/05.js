// Heavily inspired by: https://mattdesl.svbtle.com/pen-plotter-2

const canvasSketch        = require('canvas-sketch')
const random              = require('canvas-sketch-util/random')
const clustering          = require('density-clustering')
const convexHull          = require('convex-hull')
const { renderPolylines } = require('canvas-sketch-util/penplot');

const settings = {};

const colors  = [
  "#F5C80B",
  "#AC0025",
  "#2D7B2F",
  "#DE5504",
  "#02569F",
  "#3A2D5B"
]

function clusterizeCoordinates(context, coordinates){
  let clusterCount        = 3
  let scan                = new clustering.KMEANS()
  let remainingCoodinates = []

  while (coordinates.length >= clusterCount) {
    // Create clusters of points sorted by density
    const clusters = scan
      .run(coordinates, clusterCount)
      .filter(c => c.length >= 3)
      .sort((a, b) => a.length - b.length);

    // Ensure we resulted in some clusters
    if (clusters.length === 0) break;

    // Select the least dense cluster
    const cluster = clusters[0];

    const positions = cluster.map(i => coordinates[i]);

    // Create a closed polyline from the hull
    let edges = convexHull(positions)

    // if (edges.length <= 2) break;

    let path  = edges.map(c => positions[c[0]]);
    path.push(path[0]);

    // Remove those coordinates from our data set
    remainingCoodinates.push(coordinates.filter(p => path.includes(p)))
    coordinates            = coordinates.filter(p => !positions.includes(p));

    context.fillStyle = colors[random.rangeFloor(0, colors.length)]
    // context.fillStyle = 'white'
    context.beginPath()
    path.forEach((dot) => context.lineTo(dot[0], dot[1]))
    context.fill()
    context.stroke()
  }

  return remainingCoodinates.reduce((acc, val) => acc.concat(val), [])
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height }) => {
    let coordinates  = [...Array(4000)].map(() => random.insideCircle(height / 2)) 

    context.translate(width / 2, height / 2)

    let remainingCoodinates = clusterizeCoordinates(context, coordinates)


    for (var i = 0; i <= 3; i++) {
      remainingCoodinates = clusterizeCoordinates(context, remainingCoodinates)
    }
  };
}, settings);
