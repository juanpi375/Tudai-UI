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
context.fillStyle = "#024359"; // canvas background color
context.fillRect(0, 0, canvas.width, canvas.height);

// 
let imageData = context.createImageData(canvas.width, canvas.height)

// when click OK in the File Dialog
input.onchange = e => {
    // Deletes the previous image
    context.fillStyle = "#024359"; // canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height);

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

            // ----Here the filters go-----------------------


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

            // draw the modified image
            context.putImageData(imageData, 0, 0);
        }
    }
}




// Attemp 1 of Pluma
canvas.addEventListener("mousedown", function() {
    action = true 
});

canvas.addEventListener("mouseup", function() {
    action = false
    // console.log(lines)
    // console.log(e)
})

let action = false;
let lines = [];

canvas.addEventListener("mousedown", function() {
    action = true;
});

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
    }
})

canvas.addEventListener("mouseup", function() {
    action = false;
    lines = []
    // console.log(lines);
})

let r = 0;
let g = 0;
let b = 0;

function Draw(x, y) {
    // console.log(imageData)
    // console.log("ak")
    setPixel(imageData, x, y, r, g, b, 255)
}
// console.log(imageData)
function setPixel(imageData, x, y, r, g, b, a) {
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // Is there a better solution???
    let index = (x + y * imageData.width) * 4
    imageData.data[index + 0] = r
    imageData.data[index + 1] = g
    imageData.data[index + 2] = b
    imageData.data[index + 3] = a
    context.putImageData(imageData, 0, 0)
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

