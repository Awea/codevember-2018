// Inspiration: http://foxcodex.html.xdomain.jp/RepeatScale.html

const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 6
}

// Source: https://github.com/mattdesl/eases/blob/master/circ-in-out.js
function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

function degToRad(deg){
  return deg * Math.PI / 180
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.fillRect(0, 0, width, height)

    let rectWidth  = width / 6
    let rectHeight = rectWidth
    
    context.strokeStyle = 'white'

    context.translate(width / 2, height /2)
    context.rotate(degToRad(45))

    // Static rectangle
    context.strokeRect(- rectWidth / 2, - rectHeight / 2, rectWidth, rectHeight)

    // Scaled rectangle over time
    for (var i = 0; i <= settings.duration; i+=.2) {
      let playhead = (time - i) / (settings.duration -i)

      if (playhead > 0){
        let easeT    = Math.sin(circInOut(playhead) * Math.PI)
        let scale    = lerp(1, 2 + i * 2, easeT)
        
        context.save()
        context.rotate(lerp(0, degToRad(90), easeT))
        context.scale(scale, scale)
        context.strokeRect(- rectWidth / 2, - rectHeight / 2, rectWidth, rectHeight)
        context.restore()
      }
    }
  }
}, settings)
