const canvasSketch   = require('canvas-sketch')
const { lerp }       = require('canvas-sketch-util/math')
const { rangeFloor, range } = require('canvas-sketch-util/random')
const interpolate    = require('color-interpolate');

const settings = {
  animate: true,
  // duration: 10
}

const colors = interpolate(['green', 'yellow'])
let lines    = []

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    let t = time * .5 

    if (lines.length == 0){
      let lastX = 0

      while (lastX < width) {
        let line = {
          x: lastX + rangeFloor(5, 30),
          speedFactor: range(.5, 1.5), 
          parts: []
        }

        let lastY = -height * 2

        while (lastY < 0){
          let part = {
            startY: lastY + rangeFloor(10, 80),
            endY: 0
          }

          part.endY = part.startY + rangeFloor(10, 80)

          lastY = part.endY
          line.parts.push(part)
        } 

        lastX = line.x

        lines.push(line)
      }
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.lineWidth = 2
    context.strokeStyle = 'white'

    lines.forEach((line, index) => {
      context.strokeStyle = colors(Math.sin(time * Math.PI) * .25)
      let currentY = lerp(0, height, t / line.speedFactor)

      context.save()
      context.translate(0, currentY)
      context.beginPath()

      line.parts.forEach((part, i) => {
        context.moveTo(line.x, part.startY)
        context.lineTo(line.x, part.endY)
      }) 

      context.stroke()
      context.restore()

      // Offset parts that are outside the viewport
      line.parts = line.parts.map((part) => {
        if (currentY + part.startY > height){
          part.startY -= currentY
          part.endY -= currentY
        }

        return part
      })
    })
  };
}, settings)
