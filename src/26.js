const canvasSketch   = require('canvas-sketch')
const { rangeFloor } = require('canvas-sketch-util/random')
const { lerp }       = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 3
}

let prevColor = null
const colors  = [
  "#e8ca00", 
  "#c00111", 
  "#3a8e2c", 
  "#f8640c", 
  "#0b55c0", 
  "#442068"  
]

function randomColor(){
  let nextColor = colors[rangeFloor(0, colors.length)]

  while (prevColor == nextColor) {
    nextColor = colors[rangeFloor(0, colors.length)]
  }
  prevColor = nextColor

  return nextColor
}

function backInOut(t) {
  var s = 1.70158 * 1.525
  if ((t *= 2) < 1)
    return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    let oX = width / 2
    let oY = height / 2

    context.fillRect(0, 0, width, height)

    context.lineWidth = 5

    context.translate(width / 2, height /2)
    context.rotate(lerp(0, Math.PI * 2, playhead))
    context.translate(-width / 2, -height /2)

    for (var r = width; r >= 50; r-=50) {
      context.strokeStyle = '#555555'
      context.beginPath()
      context.arc(oX, oY, r, 0, Math.PI * 2)
      context.stroke()

      context.strokeStyle = 'white'
      context.beginPath()
      context.arc(oX, oY, r, 0, Math.PI / 4)
      context.stroke()
    }
  }
}, settings)
