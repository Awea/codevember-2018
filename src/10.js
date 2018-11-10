const canvasSketch = require('canvas-sketch')
const { noise2D }  = require('canvas-sketch-util/random')

const settings = {
  animate: true,
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.lineWidth = 5

    context.clearRect(0, 0, width, height)
    context.translate(width / 2, height / 2)

    context.beginPath()
    for(let angle = 0; angle < 360; angle++){
      let radian = angle * Math.PI / 180
      let radius = noise2D(
        Math.cos(radian % (Math.PI * 2)), 
        Math.sin(angle % (Math.PI * 2)), 
        Math.sin(time)
      ) * width / 2

      context.lineTo(radius * Math.cos(radian), radius * Math.sin(radian))
    }
    context.stroke()
  }
}, settings)
