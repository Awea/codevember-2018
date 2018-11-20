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

function degToRad(deg){
  return deg * Math.PI / 180
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillRect(0, 0, width, height)
    context.strokeStyle = 'yellow'

    context.translate(width / 2, height / 2)
    // Use scale because I get something cool with my bezier curves so it's simpler to scale it rather than change it - 20181119
    context.scale(.5, .5)

    let t = Math.sin(qinticInOut(playhead) * Math.PI)

    for (var y = 0; y <= 360; y++){
      if (y * 45 != 0){
        context.rotate(-degToRad(y))
      }

      for (var i = 0; i <= 3; i++) {
        context.beginPath()
        context.moveTo(width / 8, height - (i * t * 500))
        context.bezierCurveTo(
          width / 8, height / 2,
          0, height / 2,
          0, height / 2
        )
        context.stroke() 
      }
    }
  }
}, settings)
