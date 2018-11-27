const canvasSketch = require('canvas-sketch')
const { lerp }     = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 3
}

function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.beginPath()
    context.arc(width / 2, height / 2, lerp(0, height / 3, quarticOut(playhead)), 0, Math.PI * 2)
    context.fill()

    let maskCircPlayHead = (playhead - .6) / 2

    if (maskCircPlayHead >= 0){
      context.fillStyle = 'white'
      let maskCircRadius = lerp(0, height, maskCircPlayHead * 2)

      context.beginPath()
      context.arc(width / 2, height / 2, maskCircRadius, 0, Math.PI * 2)
      context.fill()
    }
  }
}, settings)
