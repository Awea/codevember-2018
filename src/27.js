const canvasSketch   = require('canvas-sketch')
const { noise1D, chance }  = require('canvas-sketch-util/random')

const settings = {
  animate: true
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.clearRect(0, 0, width, height)

    let t = Math.sin(time * Math.PI)

    for (var x = 5; x <= width - 10; x += 5) {
      for (var y = 5; y <= height - 5; y += 5){
        if (chance()){
          context.fillRect(x, y, noise1D(2.5, t), noise1D(2.5, t)) 
        } else {
          context.fillRect(x, y, 2.5, 2.5) 
        }
      }
    }
  }
}, settings)
