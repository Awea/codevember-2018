const canvasSketch   = require('canvas-sketch')
const { lerp }       = require('canvas-sketch-util/math')
const { rangeFloor } = require('canvas-sketch-util/random')
const interpolate    = require('color-interpolate');

const settings = {
  animate: true,
  duration: 5
}

const colors = interpolate(['green', 'yellow', 'black'])
let circles  = []

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    let t = playhead//Math.sin(playhead * Math.PI)

    if (circles.length == 0){
      circles = [...Array(30)].map(() => {
        return {
          r: 0,
          marginNext: rangeFloor(10, width)
        }
      })
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.lineWidth = 2

    circles.forEach((circle, index) => {
      context.strokeStyle = colors(t)
      let radius = lerp(circle.r - circle.marginNext, height / 2, t)

      if (radius > 0){
        context.beginPath();
        context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI)
        context.stroke();  
      }
    })
  };
}, settings)
