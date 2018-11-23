const canvasSketch   = require('canvas-sketch')
const { lerpFrames } = require('canvas-sketch-util/math')
const { rangeFloor, pick } = require('canvas-sketch-util/random')

const settings = {
  animate: true,
  duration: 3
}

let points;
let lastPoint;

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.globalCompositeOperation = "lighter"

    context.fillStyle = '#000000'
    context.fillRect(0, 0, width, height)
    
    context.strokeStyle = pick(['orange', 'green', 'purple'])

    if (playhead <= 0.01 || !points)
      points = [...Array(400)].map(() => [rangeFloor(0, width), rangeFloor(0, height)]) 

    if (playhead <= 0.01 || !lastPoint){
      firstPoint = points.shift()
      lastPoint  = lerpFrames(points, playhead)

      context.beginPath()
      context.moveTo(firstPoint[0], firstPoint[1])
      context.lineTo(lastPoint[0], lastPoint[1])
      context.stroke()
    } else {
      let point = lerpFrames(points, playhead)
      
      context.beginPath()
      context.moveTo(lastPoint[0], lastPoint[1])
      context.lineTo(point[0], point[1])
      context.stroke()

      lastPoint = point
    }
  }
}, settings)
