// let canv = document.querySelector("#canvas1")
// let cx = canv.getContext("2d")
// let paint = false
// let clickX = []
// let clickY = []
// let clickDrag = []

// canv.onmousedown = (function(e){
//     let mouseX = e.pageX - this.offsetLeft
//     let mouseY = e.pageY - this.offsetTop

//     paint = true
//     addClick(mouseX, mouseY)
//     redraw()
// })

// canv.onmousemove = (function(e){
//     if (paint){
//         addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
//         redraw()
//     }
// })

// canv.onmouseup = (function(e){
//     paint = false
// })

// canv.onmouseleave = (function(e){
//     paint = false
// })

// function addClick(x, y, dragging){
//     clickX.push(x);
//     clickY.push(y);
//     clickDrag.push(dragging);
// }

// function redraw(){
//     cx.clearRect(0, 0, canv.width, canv.height)
//     cx.strokeStyle = "#fff"
//     cx.lineJoin = "round"
//     cx.lineWidth = 5
//     for(let i = 0; i < clickX; i++){
//         cx.beginPath()
//         if(clickDrag[i] && i){
//             cx.moveTo(clickX[i-1], clickY[i-1])
//         }else{
//             cx.moveTo(clickX[i]-1, clickY[i])
//         }
//         cx.lineTo(clickX[i], clickY[i])
//         cx.closePath()
//         cx.stroke()
//         // console.log("some")
//     }
// }

// Code for setting an image:

//get component references
let canvas = document.querySelector('#canvas1');
let input = document.querySelector('#input1');

// clear canvas
let context = canvas.getContext('2d');

// 
let imageData = context.createImageData(canvas.width, canvas.height)
let grayScaleButton = document.querySelector("#grayScaleButton")
let brightButton = document.querySelector("#brightButton")
let thresholdButton = document.querySelector("#thresholdButton")
let negativeButton = document.querySelector("#negativeButton")
let sobelButton = document.querySelector("#sobelButton")
let blurButton = document.querySelector("#blurButton")

grayScaleButton.addEventListener("click", function(){Filters.grayScale()})
brightButton.addEventListener("click", function(){Filters.bright()})
thresholdButton.addEventListener("click", function(){Filters.threshold()})
negativeButton.addEventListener("click", function(){Filters.negative()})
sobelButton.addEventListener("click", function(){Filters.sobel()})
// [  0, -1,  0,
//   -1,  5, -1,
//    0, -1,  0 ]
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [ 0, -1,  0, -1,  5, -1, 0, -1,  0 ], false)})
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9], false)})
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [0.15, 0.15, 0.15, 0.15, -0.2, 0.15, 0.15, 0.15, 0.15], false)})
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [0.00, 0.00, 0.00, 0.00, 1, 0.00, 0.00, 0.00, 0.00], false)})
// let matReference = [1/16, 1/16, 1/16, 1/16,
                    // 1/16, 1/16, 1/16, 1/16, 
                    // 1/16, 1/16, 1/16, 1/16, 
                    // 1/16, 1/16, 1/16, 1/16]
// let matReference = [ 1/18, 1/18, 1/18,
//                     1/18, 1/18, 1/18,
//                     1/18, 1/18, 1/18,
//                     1/18, 1/18, 1/18,
//                     1/18, 1/18, 1/18,
//                     1/18, 1/18, 1/18 ]
// let matReference = [ 1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27,
//                     1/27, 1/27, 1/27]

// The greater the matrix, the deeper the blur
let matReference = [ 1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36 ]

blurButton.addEventListener("click", function(){Filters.blur(imageData, matReference, false)})
// let blurMatrix = matGenerator(9)
// blurButton.addEventListener("click", function(){Filters.blur(imageData, blurMatrix, false)})

// Matrix generator
// function matGenerator(grade){
//     let pre = [0.1]
//     for (let i = 0; i < grade-1; i++) {
//         pre[0] += ", "+0.1
//     }
//     let output = "["
//     output += pre
//     output += "]"
//     console.log(output)
//     return output
// }
// matGenerator(9)

// when click OK in the File Dialog
input.onchange = e => {
    // getting a hold of the file reference
    let file = e.target.files[0];

    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        let content = readerEvent.target.result; // this is the content!

        let image = new Image();
        //image.crossOrigin = 'Anonymous';

        image.src = content;

        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            // draw image on canvas
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

            // draw the modified image
            context.putImageData(imageData, 0, 0);
            // Filters.grayScale()
        }
    }
}
            // Filter of black stripes:
            // for (let j = 0; j < imageData.height; j++) {
            //     for (let i = 0; i < imageData.width; i++) {
            //         if (i % 2 == 0) {
            //             let index = (i + imageData.width * j) * 4;
            //             imageData.data[index + 0] = 0;
            //             imageData.data[index + 1] = 0;
            //             imageData.data[index + 2] = 0;
            //         }
            //     }
            // }
            
let toolSelector = document.querySelector("#toolSelector")
// Set starting selected tool
let pen = document.querySelector("#pen")
pen.checked = true 
// Set the initial tool value, because the form has not changed yet
let toolSelected = "1"
let downloadButton = document.querySelector("#buttonDownload")

downloadButton.addEventListener("click", download)

toolSelector.addEventListener("change", function(){
    let inputs = document.querySelectorAll(".toolSelection")
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked){
            toolSelected = inputs[i].value
        }
    }
})

function download(){
    downloadButton.href = canvas.toDataURL()
    downloadButton.download = "myCustomImage.png"
}         
            
let action = false
let lines = []
            
// Attemp 1 of Pluma
canvas.addEventListener("mousedown", function() {
    action = true 
})

canvas.addEventListener("mouseup", function() {
    action = false
    // console.log(lines)
    // console.log(e)
})

canvas.addEventListener("mousedown", function() {
    action = true
})

canvas.onmouseleave = (function(e){
    action = false
    lines = []
})

canvas.addEventListener("mousemove", function(e) {
    // console.log(action)
    if (action) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        if (lines.length > 0){
            // El índice que va a ir al for..
            let val = 0
            // Los últimos valores previos guardados de líneas..
            let prevX = lines[lines.length - 1][0]
            let prevY = lines[lines.length - 1][1]

            let x1 = x - prevX
            let y1 = y - prevY
            let xAbs = Math.abs(x1)
            let yAbs = Math.abs(y1)
            // Si es mayor la distancia entre las X que entre las Y..
            if (xAbs > yAbs){
                val = xAbs
            }
            else{
                val = yAbs
            }
            let auxX = prevX
            let auxY = prevY
            // Supongo que auxX y auxY soolo van a aumentar cuando 
            // sean números enteros.. 
            for (let i = 0; i < val; i++){
                auxX += x1 / val
                auxY += y1 / val
                Draw(Math.round(auxX), Math.round(auxY))
                // .round works better than .trunc
                // console.log("in")
            }
        }
        lines.push([x, y]);
        Draw(x, y);
        context.putImageData(imageData, 0, 0)
    }
})

canvas.addEventListener("mouseup", function() {
    action = false;
    lines = []
    // console.log(lines);
})

function Draw(x, y) {
    // console.log(imageData)
    // console.log("ak")
    if (toolSelected == 1){
        setPixel(imageData, x-1, y, 0, 0, 0, 255)
        setPixel(imageData, x, y-1, 0, 0, 0, 255)

        setPixel(imageData, x, y, 0, 0, 0, 255)

        setPixel(imageData, x+1, y, 0, 0, 0, 255)
        setPixel(imageData, x, y+1, 0, 0, 0, 255)
    }
    if (toolSelected == 2){
        setPixel(imageData, x-1, y, 180, 180, 180, 255)
        setPixel(imageData, x, y-1, 180, 180, 180, 255)

        setPixel(imageData, x, y, 180, 180, 180, 255)

        setPixel(imageData, x+1, y, 180, 180, 180, 255)
        setPixel(imageData, x, y-1, 180, 180, 180, 255)
    }
}

// console.log(imageData)
function setPixel(imageData, x, y, r, g, b, a) {
    if (x < imageData.width && x > -1 && y < imageData.height && y > -1){
        let index = (x + y * imageData.width) * 4
        imageData.data[index + 0] = r
        imageData.data[index + 1] = g
        imageData.data[index + 2] = b
        imageData.data[index + 3] = a
    }
}

let deleteImageButton = document.querySelector("#deleteImageButton")
deleteImageButton.addEventListener("click", deleteImage)

function deleteImage(){
    let c = canvas
    let d = imageData.data;
    for (let i=0; i<c.width*c.height*4; i++) {
        d[i] = 180
        d[i+1] = 180
        d[i+2] = 180
    }
    context.putImageData(imageData, 0, 0)
}

Filters = {}
Filters.grayScale = function(){
    let d = imageData.data;
    for (let i=0; i<d.length; i+=4) {
        let r = d[i];
        let g = d[i+1];
        let b = d[i+2];
        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        let v = 0.1126*r + 0.7152*g + 0.0722*b;
        // Whaaaatt???
        // Supongo que setea a imageData.data con 
        // los valores que preparé arriba..
        d[i] = d[i+1] = d[i+2] = v
    }
    context.putImageData(imageData, 0, 0)
    // console.log("GrayScale applied")
    // return pixels;
}

Filters.bright = function(){
    let d = imageData.data;
    let adjustment = 15
    for (let i=0; i<d.length; i+=4) {
        d[i] += adjustment;
        d[i+1] += adjustment;
        d[i+2] += adjustment;
    }
    context.putImageData(imageData, 0, 0)
}

Filters.threshold = function(){
    let d = imageData.data;
    let reference = 70
    for (let i=0; i<d.length; i+=4) {
        let r = d[i];
        let g = d[i+1];
        let b = d[i+2];
        let v = (0.1126*r + 0.7152*g + 0.0722*b >= reference) ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v
    }
    context.putImageData(imageData, 0, 0)
}

Filters.negative = function(){
    let d = imageData.data;
    for (let i=0; i<d.length; i+=4) {
        d[i] = 255 - d[i]
        d[i+1] = 255 - d[i+1]
        d[i+2] = 255 - d[i+2]
    }
    context.putImageData(imageData, 0, 0)
}

// ---------------------experiment------------------

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
    return this.tmpCtx.createImageData(w,h);
};

// Filters.blur = function(){

// }

Filters.blur = function(pixels, weights, opaque) {
  let side = Math.round(Math.sqrt(weights.length));
  let halfSide = Math.floor(side/2);
  let src = pixels.data;
  let sw = pixels.width;
  let sh = pixels.height;
  // pad output by the convolution matrix
  let w = sw;
  let h = sh;
  let output = Filters.createImageData(w, h);
  let dst = output.data;
  // go through the destination image pixels
  let alphaFac = opaque ? 1 : 0;
  for (let y=0; y<h; y++) {
    for (let x=0; x<w; x++) {
      let sy = y;
      let sx = x;
      let dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      let r=0, g=0, b=0, a=0;
      for (let cy=0; cy<side; cy++) {
        for (let cx=0; cx<side; cx++) {
          let scy = sy + cy - halfSide;
          let scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            let srcOff = (scy*sw+scx)*4;
            let wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  context.putImageData(output, 0, 0)
//   console.log(imageData)
//   console.log(output)
  //   return output;
}









/* canvas.addEventListener("mousemove", function(e) {
    if (action) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;

      
        
if(lines.length > 0) {
            let distanceY = y - lines[lines.length - 1][1];
            let distanceX = x - lines[lines.length - 1][0];
            let moduleY = Math.abs(distanceY);
            let moduleX = Math.abs(distanceX);
            let aux = 0;
            if(moduleX > moduleY) {
                aux = moduleX;
            }
else {
                aux = moduleY;
            }
            let auxX = lines[lines.length - 1][0];
            let auxY = lines[lines.length - 1][1];
            for(let i = 0; i < aux; i ++) {
                auxX += distanceX / aux;
                auxY += distanceY / aux;
                Draw(Math.round(auxX), Math.round(auxY));
            }
        }
        lines.push([x, y]);
        Draw(x, y);
    }
});
function setPixel(imageData, y, x, r, g, b, a) {
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let index = (y + x * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
    ctx.putImageData(imageData, 0, 0);
} */

