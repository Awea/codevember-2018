// Heavily inspired by: https://mattdesl.svbtle.com/pen-plotter-2

const canvasSketch        = require('canvas-sketch')
const random              = require('canvas-sketch-util/random')
const clustering          = require('density-clustering')
const convexHull          = require('convex-hull')
const { renderPolylines } = require('canvas-sketch-util/penplot')

const settings = {};

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

    if (edges.length <= 2) break;

    let path  = edges.map(c => positions[c[0]]);
    path.push(path[0]);

    // Get remaining coordinates within polyline
    remainingCoodinates.push(positions.filter(p => !path.includes(p)))
    
    // Remove those coordinates from our data set
    coordinates = coordinates.filter(p => !positions.includes(p));

    context.beginPath()
    path.forEach((dot) => context.lineTo(dot[0], dot[1]))
    context.stroke()
  }

  return remainingCoodinates
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height }) => {
    let coordinates  = [...Array(6000)].map(() => {
      return [
        random.range(0, width),
        random.range(0, height)
      ]
    }) 

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.strokeStyle = 'white'
    context.lineWidth = 2

    let remainingCoodinates = clusterizeCoordinates(context, coordinates)

    remainingCoodinates.forEach((coordinates) => clusterizeCoordinates(context, coordinates));
  };
}, settings);
