const canvasSketch   = require('canvas-sketch')
const { lerpFrames } = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 9
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'rgba(255,255,255,0.1)'
    context.fillRect(0, 0, width, height)
    
    context.fillStyle = 'black'

    let oX      = width / 2
    let oY      = height / 2
    let reverse = false

    for (var i = 10; i <= width; i += 10) {
      let frames = [
        [oX - i, oY + i], 
        [oX - i, oY - i], 
        [oX + i, oY - i], 
        [oX + i, oY + i], 
        [oX - i, oY + i] 
      ]

      if (reverse){
        frames  = frames.reverse()
      }

      let sides  = lerpFrames(frames, playhead)

      context.fillRect(sides[0], sides[1], 10, 10)

      reverse = !reverse
    }
  }
}, settings)
