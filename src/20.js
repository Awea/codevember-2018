const canvasSketch   = require('canvas-sketch')
const { rangeFloor } = require('canvas-sketch-util/random')

const settings = {
}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = '#AC0025'
    context.fillRect(0, 0, width, height)
    
    // Commence au milieu et determine un offset +/- équivalent à la moitié de la largeur du rect
    // Empile n (1-20) rectangle avec toujours le même offset +/- 
    //   Pendant l'empilement ajouter une chance (1/10) d'inverser l'offset
    context.translate(width / 3, 0)

    let rectWidth      = width / 3
    let accRectsHeight = 0
    let margin         = 10

    context.fillStyle = '#000000'

    while (accRectsHeight < height) {
      let prevY = accRectsHeight
      let startOffset = rangeFloor(-rectWidth / 2, rectWidth / 2)
      let groupRects = [...Array(rangeFloor(5, 20))].map((v, index) => {
        let rectHeight = rangeFloor(2, 10)
        let x          = startOffset < 0 ? startOffset + index * 10 : startOffset - index * 10

        context.fillRect(
          x, 
          prevY, 
          rectWidth, 
          rectHeight
        )

        prevY += rectHeight 

        return rectHeight
      })

      accRectsHeight += groupRects.reduce((acc, h) => acc + h, 0) + margin
    }  
  }
}, settings)
