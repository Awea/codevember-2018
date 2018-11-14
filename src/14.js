const canvasSketch                   = require('canvas-sketch')
const { noise2D, rangeFloor, range } = require('canvas-sketch-util/random')

const settings = {
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height }) => {
    context.fillRect(0, 0, width, height)

    context.translate(width / 2, height / 2)

    context.strokeStyle = 'white'

    for (let angle = 0; angle <= 360; angle+=10) {
      context.save()
      context.rotate(angle * Math.PI / 180)
      context.beginPath()
      context.moveTo(
        noise2D(100, 0, range(.25 , 1), rangeFloor(0, 100)), 
        noise2D(100, 0, range(.25 , 1), rangeFloor(0, 100))
      )
      context.quadraticCurveTo(250, -150, 0, - height / 2)
      context.quadraticCurveTo(-250, -150, 0, 0)
      context.stroke() 
      context.restore()
    }
  }
}, settings)
