const canvasSketch = require('canvas-sketch')
const { lerp }     = require('canvas-sketch-util/math')

const settings = {
  animate: true,
  duration: 3
}

// Source: https://stackoverflow.com/a/3368118
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

// Start the sketch
canvasSketch(() => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.strokeStyle = 'white'
    context.lineWidth = lerp(.5, 1.5, Math.sin(playhead * Math.PI))

    context.beginPath()
    context.arc(width / 2, height / 2, height / 2.5 - context.lineWidth, 0, Math.PI * 2)
    context.stroke()

    context.fillStyle = 'white'
    roundRect(context, width / 2 - 5, height / 2 - width / 12, 10, width / 6, 5, true) 
  }
}, settings)
