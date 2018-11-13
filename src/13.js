const canvasSketch = require('canvas-sketch')
const { noise2D, rangeFloor, range }  = require('canvas-sketch-util/random')

const settings = {
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, time }) => {
    context.fillRect(0, 0, width, height)

    var gradient = context.createLinearGradient(width, height, 0, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(0.2, "blue");
    gradient.addColorStop(1.0, "red");

    context.strokeStyle = gradient

    context.translate(width, height)
    context.rotate(Math.PI)

    for (let dotY = 10; dotY < height - 10; dotY += 50){
      for (let dotX = 0; dotX < width; dotX += 20){
        context.beginPath();
        context.quadraticCurveTo(
          dotX, 
          dotY,
          noise2D(
            dotX, dotY, range(.5, 1), rangeFloor(-150, 150)
          ),
          noise2D(
            dotX, dotY, range(.5, 1), rangeFloor(-150, 150)
          )
        )
        context.stroke();   
      }
    }
  }
}, settings)
