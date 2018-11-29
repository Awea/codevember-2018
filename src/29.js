const canvasSketch   = require('canvas-sketch')
const load           = require('load-asset')
const { rangeFloor, chance } = require('canvas-sketch-util/random')

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
    let data = pixels.data

    for (let i = 0; i < data.length; i += 4) {
      // Set grey levels
      let moy = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = moy; 
      data[i + 1] = moy; 
      data[i + 2] = moy; 

      if (chance(.2)) continue;

      // Invert current pixel with another
      let randWidth  = rangeFloor(width)
      let randHeight = rangeFloor(height)
      let randIndex = ((randHeight * (width * 4)) + (randWidth * 4))

      data[i]     = data[randIndex]
      data[i + 1] = data[randIndex + 1]
      data[i + 2] = data[randIndex + 2]
    }

    // Put new pixels back into canvas
    context.putImageData(pixels, 0, 0)
  };
});
