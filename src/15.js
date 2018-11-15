// Inspiration: http://foxcodex.html.xdomain.jp/SpinFade.html

const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 1
}

// Source: https://github.com/mattdesl/eases/blob/master/quint-out.js
function qinticOut(t) {
  return --t * t * t * t * t + 1
}

function degToRad(deg){
  return deg * Math.PI / 180
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillRect(0, 0, width, height)

    let rectWidth  = 400
    let rectHeight = 80
    let easeT      = qinticOut(playhead)

    context.fillStyle = 'white'

    // Rotate canvas
    context.translate(width / 2, height /2)
    context.rotate(lerp(0, degToRad(90), easeT))
    context.translate(-width / 2, -height /2)

    // Draw first rectangle visible
    context.save()
    context.globalAlpha = lerp(1, 0, easeT)
    context.fillRect(width / 2 - rectWidth / 2, height / 2 - rectHeight / 2, rectWidth, rectHeight)
    context.restore()

    // Draw second rectangle invisible
    context.globalAlpha = lerp(0, 1, easeT)
    context.fillRect(width / 2 - rectHeight / 2, height / 2 - rectWidth / 2, rectHeight, rectWidth)
  }
}, settings)
