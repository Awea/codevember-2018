// Heavily inspired by: https://mattdesl.svbtle.com/pen-plotter-2

const canvasSketch = require('canvas-sketch')
const random       = require('canvas-sketch-util/random')
const clustering   = require('density-clustering')
const convexHull   = require('convex-hull')

const settings = {}

const colors  = [
  "#F5C80B",
  "#AC0025",
  "#2D7B2F",
  "#DE5504",
  "#02569F",
  "#3A2D5B"
]

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead, time }) => {
    let coordinates  = [...Array(4000)].map(() => random.insideCircle(height / 2)) 
    let clusterCount = 3
    let scan         = new clustering.KMEANS()

    context.translate(width / 2, height / 2)

    while (coordinates.length >= clusterCount) {
      // Create clusters of points sorted by density
      const clusters = scan
        .run(coordinates, clusterCount)
        .filter(c => c.length >= 3)
        .sort((a, b) => a.length - b.length)

      // Ensure we resulted in some clusters
      if (clusters.length === 0) return

      // Select the least dense cluster
      const cluster = clusters[0]

      const positions = cluster.map(i => coordinates[i])

      // Create a closed polyline from the hull
      let path = convexHull(positions).map(c => positions[c[0]])
      path.push(path[0])

      // Remove those coordinates from our data set
      coordinates = coordinates.filter(p => !positions.includes(p))

      context.fillStyle = colors[random.rangeFloor(0, colors.length)]
      context.beginPath()
      path.forEach((dot) => context.lineTo(dot[0], dot[1]))
      context.fill()
      context.stroke()
    }
  }
}, settings)
