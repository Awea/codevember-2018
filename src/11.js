const canvasSketch = require('canvas-sketch')
const { noise2D }  = require('canvas-sketch-util/random')
const { lerp }  = require('canvas-sketch-util/math')

const settings = {
  animate: true,
}

let rotation = 0

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.fillRect(0, 0, width, height)
    context.strokeStyle = 'white'

    let oX        = width / 2
    let oY        = height / 2
    let frequency = 1
    let magnitude = lerp(.02, .06, Math.sin(time * 3))

    rotation += 0.003
    context.translate(width / 2, height / 2)
    context.rotate(rotation)
    context.translate(-width / 2, -height / 2)

    for (let radius = height / 100; radius < height / 2.2; radius += 20){
      context.beginPath();
      
      for (let j = 0; j < 360 + 1; ++j) {
         let angle = (2 * Math.PI * j) / 360
         let x     = Math.cos(angle)
         let y     = Math.sin(angle)

         let deformation = noise2D(x * frequency, y * frequency)
         let newRadius   = radius * (1 + magnitude * deformation)

         context.lineTo(oX + newRadius * x, oY + newRadius * y)
      }
      
      context.stroke();
    }
  }
}, settings)
