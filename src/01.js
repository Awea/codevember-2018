const canvasSketch = require('canvas-sketch');

const settings = {
  // Enable an animation loop
  animate: true,
  // Set loop duration to 3
  duration: 3,
};

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'black'
    for (var i = 0; i <= height * 2; i+= 10) {
      if (i / 10 % 2 == 0)
        context.fillRect(10, i + height * .2, width * .8, 10)
    }

    context.beginPath();
    context.rect(width * .2, 0, width * .8 - 10, height * .8)
    context.clip()

    let offset = -playhead * Math.PI * height * .08

    // By moving the gap between the group of lines we can change the direction. If it's less than the line height it will increase their speed in the moving way. If it's less it will go in the other way - 20181101
    for (var i = 0; i <= height * 2; i+= 9) {
      if (i / 9 % 2 == 0)
        context.fillRect(width * .2, i + offset, width * .8, 10)
    }
  };
}, settings);
