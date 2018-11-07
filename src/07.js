const canvasSketch   = require('canvas-sketch')
const { lerp }       = require('canvas-sketch-util/math')
const { rangeFloor } = require('canvas-sketch-util/random')

const settings = {
  animate: true,
  duration: 5
}

const margin    = 10
const radiusMin = .5
const radiusMax = 30

let dots = []

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    let t = Math.sin(playhead * Math.PI)

    if (dots.length == 0){
      dots = [...Array(500)].map(() => {
        return {
          x: rangeFloor(margin, width - margin),
          y: rangeFloor(margin, height - margin),
          rMin: rangeFloor(radiusMin, radiusMax),
          rMax: rangeFloor(radiusMin, radiusMax)
        }
      })
    }

    context.fillStyle = '#ea7317'
    context.fillRect(0, 0, width, height)

    dots.forEach((dot) => {
      context.fillStyle = '#fec601'
      context.beginPath();
      context.arc(dot.x, dot.y, lerp(dot.rMin, dot.rMax, t), 0, 2 * Math.PI)
      context.fill();

      context.fillStyle = '#ea7317'
      context.beginPath();
      context.arc(dot.x, dot.y, lerp(dot.rMin / 2, dot.rMax / 2, t), 0, 2 * Math.PI)
      context.fill();   
    })
  };
}, settings)
