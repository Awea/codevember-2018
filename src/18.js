const canvasSketch = require('canvas-sketch')
const { lerp }     = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 3
}

function qinticInOut(t) {
    if ( ( t *= 2 ) < 1 ) return 0.5 * t * t * t * t * t
    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2 )
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillRect(0, 0, width, height)
    context.strokeStyle = 'white'

    let t = Math.sin(qinticInOut(playhead) * Math.PI)

    for (var i = 0; i <= 40; i++) {
      context.beginPath()
      context.moveTo(0, height / 1.6 - i * 10)
      context.bezierCurveTo(
        width / 10, lerp(height * 1.5, height * 1.75, t), 
        width - width / 10, lerp(-height * .5, -height * .75, t),
        width, height / 1.6  - i * 10
      )
      context.stroke() 
    }
  }
}, settings)
