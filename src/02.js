const canvasSketch = require('canvas-sketch');

const settings = {
  // Enable an animation loop
  animate: true,
  // Set loop duration to 2
  duration: 2,
};

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead, time }) => {
    let margin = 10

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'hsla(98, 100%, 50%, 0.9)'
    for (var i = 0; i <= width - margin * 2; i+= 10) {
      if (i / 10 % 2 == 0)
        context.fillRect(margin + i, margin, 10, height - margin * 2)
    }

    let rotation = .3 * Math.sin(Math.PI * time) * .5;

    context.translate(width / 2, height / 2)
    context.rotate(rotation)
    context.translate(-width / 2, -height / 2)

    context.fillStyle = 'hsla(0, 100%, 50%, 0.5)'
    for (var i = 0; i <= width - margin * 2; i+= 10) {
      if (i / 10 % 2 == 0)
        context.fillRect(margin + i, margin, 10, height - margin * 2)
    }
  };
}, settings);
