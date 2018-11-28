// Heavily inspired by: https://github.com/mattdesl/canvas-sketch/blob/master/examples/canvas-image-processing.js

const canvasSketch           = require('canvas-sketch')
const load                   = require('load-asset')
const { chance, noise1D } = require('canvas-sketch-util/random')

const settings = {
  animate: true
}

// Start the sketch
canvasSketch(async ({ update }) => {
  const image = await load({
    url: 'https://cats.wearemd.com/cats', 
    type: 'image', 
    crossOrigin: 'Anonymous'
  })

  if (image.width > image.height){
    let ratio = image.height / image.width

    update({
      dimensions: [ window.innerWidth, Math.floor(window.innerWidth * ratio)]
    })
  } else {
    let ratio = image.width / image.height

    update({
      dimensions: [ Math.floor(window.innerWidth * ratio), window.innerHeight]
    })
  }

  return ({ context, width, height }) => {
    // Draw the loaded image to the canvas
    context.drawImage(image, 0, 0, width, height)

    // Extract bitmap pixel data
    let pixels = context.getImageData(0, 0, width, height)

    // Manipulate pixel data
    const data = pixels.data
    let len    = width

    while (len) {
      const newX = Math.floor(Math.random() * len--)
      const oldX = len

      // Sometimes leave row in tact
      if (chance(.2)) continue;

      for (let y = 0; y < height; y++) {
        // Sometimes leave column in tact
        if (chance(.02)) continue;

        // Copy new random column into old column
        const newIndex = newX + y * width
        const oldIndex = oldX + y * width

        // Make 'grayscale' by just copying blue channel
        data[oldIndex * 4 + 0] = data[newIndex * 4 + 2]
        data[oldIndex * 4 + 1] = data[newIndex * 4 + 2]
        data[oldIndex * 4 + 2] = data[newIndex * 4 + 2]
      }
    }

    // Put new pixels back into canvas
    context.putImageData(pixels, 0, 0)
  };
});
