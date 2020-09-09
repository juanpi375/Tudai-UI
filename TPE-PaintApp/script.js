let canvas = document.querySelector('#canvas1');
let selectImageButton = document.querySelector('#selectImageButton');

let context = canvas.getContext('2d');
let imageData = context.createImageData(canvas.width, canvas.height)

let downloadButton = document.querySelector("#buttonDownload")
let grayScaleButton = document.querySelector("#grayScaleButton")
let brightButton = document.querySelector("#brightButton")
let thresholdButton = document.querySelector("#thresholdButton")
let negativeButton = document.querySelector("#negativeButton")
let sobelButton = document.querySelector("#sobelButton")
let blurButton = document.querySelector("#blurButton")
let saturateButton = document.querySelector("#saturateButton")
let sepiaButton = document.querySelector("#sepiaButton")


downloadButton.addEventListener("click", download)
grayScaleButton.addEventListener("click", function(){Filters.grayScale()})
brightButton.addEventListener("click", function(){Filters.bright()})
thresholdButton.addEventListener("click", function(){Filters.threshold()})
negativeButton.addEventListener("click", function(){Filters.negative()})
sepiaButton.addEventListener("click", function(){Filters.sepia()})
blurButton.addEventListener("click", function(){Filters.blur(imageData, matReference, false)})
saturateButton.addEventListener("click", function(){Filters.saturate()})

// [  0, -1,  0,
//   -1,  5, -1,
//    0, -1,  0 ]
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [ 0, -1,  0, -1,  5, -1, 0, -1,  0 ], false)})
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9], false)})
// blurButton.addEventListener("click", function(){Filters.blur(imageData, [0.15, 0.15, 0.15, 0.15, -0.2, 0.15, 0.15, 0.15, 0.15], false)})
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
let matReference = [1/36, 1/36, 1/36,
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

// --------------------------PHOTO LOADING---------------------------
selectImageButton.onchange = e => {
    deleteImage()

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
            let imageAspectRatio = 0
            let imageScaledWidth = 0
            let imageScaledHeight = 0

            if (this.height > this.width){
                imageAspectRatio = (1.0 * this.height) / this.width;
                imageScaledWidth = canvas.width;
                imageScaledHeight = canvas.width * imageAspectRatio;
            }
            else{
                imageAspectRatio = (1.0 * this.width) / this.height;
                imageScaledWidth = canvas.height * imageAspectRatio;
                imageScaledHeight = canvas.height;
            }
            // draw image on canvas
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            // get imageData from content of canvas
            imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

            // draw the modified image
            context.putImageData(imageData, 0, 0);
            
            // Let Filters be applied
            // imageLoaded = true
        }
    }
}
            
let toolSelector = document.querySelector("#toolSelector")
// Set starting selected tool
let pen = document.querySelector("#pen")
pen.checked = true 
// Set the initial tool value, because the form has not changed yet
let toolSelected = "1"

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
})

function Draw(x, y) {
    if (toolSelected == 1){
        setPixel(imageData, x-1, y, 0, 0, 0, 255)
        setPixel(imageData, x, y-1, 0, 0, 0, 255)

        setPixel(imageData, x, y, 0, 0, 0, 255)

        setPixel(imageData, x+1, y, 0, 0, 0, 255)
        setPixel(imageData, x, y+1, 0, 0, 0, 255)
    }
    if (toolSelected == 2){
        // setPixel(imageData, x-1, y, 180, 180, 180, 255)
        // setPixel(imageData, x, y-1, 180, 180, 180, 255)

        // setPixel(imageData, x, y, 180, 180, 180, 255)

        // setPixel(imageData, x+1, y, 180, 180, 180, 255)
        // setPixel(imageData, x, y+1, 180, 180, 180, 255)

        let factor = 20
        for(let i = y-factor; i < y+factor; i++){
            for(let j = x-factor; j < x+factor; j++){
                setPixel(imageData, j, i, 180, 180, 180, 255)
            }
        }
    }
}




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
    // imageLoaded = false
    imageData = context.createImageData(canvas.width, canvas.height)
    context.putImageData(imageData, 0, 0)
}

let Filters = {}
// Represents if a filter can be applied
// Setted on the photo loading
// let imageLoaded = false

Filters.grayScale = function(){
    // If there´s no image yet, the filter won´t be applied
    // if (!imageLoaded){return}
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
    // if (!imageLoaded){return}
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
    // if (!imageLoaded){return}
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
    // if (!imageLoaded){return}
    let d = imageData.data;
    for (let i=0; i<d.length; i+=4) {
        d[i] = 255 - d[i]
        d[i+1] = 255 - d[i+1]
        d[i+2] = 255 - d[i+2]
    }
    context.putImageData(imageData, 0, 0)
}

Filters.sepia = function(){
    // for(let i = 0; i<canvas.width-1; i++){
        // for(let j = 0; j<canvas.height; j++){
            let d = imageData.data
            for (let i=0; i<d.length; i+=4) {
            // let promedio = Math.floor((getRed(i,j)+getGreen(i,j)+getBlue(i,j))/3)
            let media = Math.floor((d[i]+d[i+1]+d[i+2])/3)
            // let newRed = Math.min(promedio+40,255)
            // let newGreen = Math.min(promedio+15,255)
            // let newBlue = Math.min(promedio,255)
            d[i] = Math.min(media+40,255)
            d[i+1] = Math.min(media+15,255)
            d[i+2] = Math.min(media,255)
            // setPixel(imageData,i,j,newRed,newGreen,newBlue,255)
        // }
    }
    context.putImageData(imageData,0,0)
}



Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
    return this.tmpCtx.createImageData(w,h);
    // return context.createImageData(w,h);
};

// Filters.blur = function(){

// }

Filters.blur = function(pixels, weights, opaque) {
    // if (!imageLoaded){return}
    // Square of the elements in the matrix
  let side = Math.round(Math.sqrt(weights.length));
  let halfSide = Math.floor(side/2);
  let src = pixels.data;
  let sw = pixels.width;
  let sh = pixels.height;
  // pad output by the convolution matrix
  let w = sw;
  let h = sh;
//   Creates aux canvas
  let output = Filters.createImageData(w, h);
  let dst = output.data;
  // Goes through the aux canvas
  let alphaFac = opaque ? 1 : 0;
  for (let y=0; y<h; y++) {
    for (let x=0; x<w; x++) {
      let sy = y;
      let sx = x;
      let dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix

    // Goes through the numbers
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
//   The previous image data becomes the new one
  imageData = output
  context.putImageData(imageData, 0, 0)
//   console.log(imageData)
//   console.log(output)
  //   return output;
}

Filters.saturate = function(){
    // if (!imageLoaded){return}
    // let d = imageData.data;
    // for (let i=0; i<d.length; i+=4) {
    //     d[i] = 255 - d[i]
    //     d[i+1] = 255 - d[i+1]
    //     d[i+2] = 255 - d[i+2]
    //     let r = d[i]/255, g = d[i+1]/255, b = d[i+2]/255
        // let cmax = Math.max(r,g,b)
    // }
    for(let i = 0; i<canvas.width-1; i++){
        for(let j = 0; j<canvas.height; j++){
            // let red = getRed(i,j)
            // let green = getGreen(i,j)
            // let blue = getBlue(i,j)
            let mod = (i + j * imageData.width) * 4
            let r = imageData.data[mod]/255, g = imageData.data[mod+1]/255, b = imageData.data[mod+2]/255
            // let r = red/255
            // let g = green/255
            // let b = blue/255
            let cmax = Math.max(r,g,b)
            let cmin = Math.min(r,g,b)
            let delta = cmax-cmin
            let hue = calcularHue(delta,cmax,r,g,b)
            let light = calcularLight(cmax,cmin)
            let sat = calcularSat(light,delta) + 0.2
            let c = calcularC(sat,light)
            let x = obtenerX(hue,c)
            let m = light - (c/2)
            let arrayNewRGB = calcularNewRGB(hue,c,x)
            let r1 = arrayNewRGB[0]
            let g1 = arrayNewRGB[1]
            let b1 = arrayNewRGB[2]
            let newRed = (r1+m)*255
            let newGreen = (g1+m)*255
            let newBlue = (b1+m)*255
            setPixel(imageData,i,j,newRed,newGreen,newBlue,255)
        }
    }
    context.putImageData(imageData,0,0)
}

function calcularNewRGB(hue,c,x){
    if(hue>=0 && hue<60){
        return [c,x,0]
    }else if (hue>=60 && hue<120){
        return [x,c,0]
    }else if (hue>=120 && hue <180){
        return [0,c,x]
    }else if (hue>=180 && hue<240){
        return [0,x,c]
    }else if (hue>=240 && hue<300){
        return [x,0,c]
    }else{
        return [c,0,x]
    }
}

function obtenerX(hue, c){
    let aux = ((hue / 60) % 2) - 1
    if (aux<0){
        aux = aux*-1
    }
    return c * (1 - aux)
}

function calcularC(sat,light){
    let aux = 2*light - 1
    if (aux<0){
        aux = aux* -1
    }
    return (1 - aux) * sat
}

function calcularHue(delta,cmax,r,g,b){
    if (delta==0){
        return 0
    }else if (cmax==r){
        return Math.floor(60*(((g-b)/delta)%6))
    }else if(cmax==g){
        return Math.floor(60*(((b-r)/delta)+2))
    }else{
        return Math.floor(60*(((r-g)/delta)+4))
    }
}

function calcularLight(cmax,cmin){
    return (cmax + cmin) / 2
}

function calcularSat(light,delta){
    if (delta==0){
        return 0
    }else{
        let aux = (2*light)-1
        if (aux<0){
            aux = aux * -1
        }
        return delta/(1-((2*light)-1))
    }
}
