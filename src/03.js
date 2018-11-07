const canvasSketch = require('canvas-sketch')
const random       = require('canvas-sketch-util/random')
const triangulate  = require('delaunay-triangulate') 

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
    let coordinates = [...Array(400)].map(() => random.insideCircle(height / 2)) 
    let triangles   = triangulate(coordinates)

    context.translate(width / 2, height / 2)

    triangles.forEach((triangle) => {
      let triangleCoordinates = triangle.map(i => coordinates[i])

      context.fillStyle = colors[random.rangeFloor(0, colors.length)]
      context.beginPath()
      context.moveTo(triangleCoordinates[0][0], triangleCoordinates[0][1])
      context.lineTo(triangleCoordinates[1][0], triangleCoordinates[1][1])
      context.lineTo(triangleCoordinates[2][0], triangleCoordinates[2][1])
      context.fill()
      context.stroke()
    })
  }
}, settings)
