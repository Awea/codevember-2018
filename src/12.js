const canvasSketch = require('canvas-sketch')
const { noise2D, rangeFloor }  = require('canvas-sketch-util/random')
const { lerp }  = require('canvas-sketch-util/math')

const settings = {
  animate: true,
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.fillRect(0, 0, width, height)
    context.strokeStyle = 'white'

    let frequency = 1
    let magnitude = lerp(-10, 10, Math.sin(time * 6))

    for (let dotY = 10; dotY < height - 10; dotY += 50){
      context.beginPath();
      for (let dotX = 0; dotX < width; dotX += 20){
        context.lineTo(
          dotX, 
          dotY + noise2D(
            dotX, dotY, frequency, magnitude
          )
        )
      }
      context.stroke();   
    }
  }
}, settings)
