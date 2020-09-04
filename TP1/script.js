// 1) 
console.info("---------Ejercicio 1---------")

let cols = 10
let rows = 10

let matrix = []
for (let i = 0; i < cols; i++){
    matrix[i] = []
    for (let j = 0; j < rows; j++){
        matrix[i][j] = Math.random() * 100
    }
}

// console.table shows matrix in table format
console.table(matrix)

// a) Max value of matrix
function maxValue(param){
    let max = 0;
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            if(param[i][j] >= max){
                max = param[i][j]
            }
        }
    }
    return max
}
console.log("Valor máximo: " + maxValue(matrix))

// b) Max value in odd rows and min value in even rows
function maxMinValue(param){
    let maxAndMin = [2]
    maxAndMin[0] = 0
    maxAndMin[1] = 100
    // let max = 0;
    // let min = 0;
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            if(i % 2 == 1){ 
                // Even - Minor
                if (param[i][j] < maxAndMin[1]){
                    maxAndMin[1] = param[i][j]
                }
            }
            else{
                // Odd - Major
                if (param[i][j] >= maxAndMin[0]){
                    maxAndMin[0] = param[i][j]
                }
            }
        }
    }
    return maxAndMin
}
let maxMinVal = maxMinValue(matrix)
console.log("Valor máximo de las pares: " + maxMinVal[0])
console.log("Valor mínimo de los impares: " + maxMinVal[1])

// c) Media of each row saved in an array
function mediaValue(param){
    let mediaArray = []
    for (let i = 0; i < cols; i++){
        let sum = 0
        for (let j = 0; j < rows; j++){
            sum += param[i][j]
        }
        mediaArray[i] = sum / rows
    }
    return mediaArray
}
console.log("Promedio de las filas: ["+mediaValue(matrix)+"]")

// 2)
console.info("---------Ejercicio 2---------")

let canvas1 = document.querySelector("#canvas1")
let c1 = canvas1.getContext("2d")
c1.fillStyle = "#11f"
c1.lineWidth = 15
// c1.strokeStyle = "#4ff"
c1.fillRect(30, 30, 180, 180)
// c1.strokeRect(30, 30, 180, 180)

console.info("---------Ejercicio 3---------")

let canvas2 = document.querySelector("#canvas2")
let c2 = canvas2.getContext("2d")
let imgData1 = c2.createImageData(350, 200)
for (let i = 0; i < imgData1.data.length; i += 4) {
  imgData1.data[i + 0] = 255
  imgData1.data[i + 1] = 100
  imgData1.data[i + 2] = 0
  imgData1.data[i + 3] = 255
}
c2.putImageData(imgData1, 30, 30)

console.info("---------Ejercicio 4---------")

// let gradient1 = c3.createLinearGradient(0, 30, 0, 330)
// gradient1.addColorStop(0, "black")

// gradient1.addColorStop(.2, "white")
// gradient1.addColorStop(.4, "gold")
// gradient1.addColorStop(.5, "white")
// gradient1.addColorStop(.6, "gold")
// gradient1.addColorStop(.8, "white")
// gradient1.addColorStop(1, "white")
// c3.fillStyle = gradient1
// c3.fillRect(60, 30, 200, 300)

// Corrección:
let canvas3 = document.querySelector("#canvas3")
let c3 = canvas3.getContext("2d")
let imgData2Height = 300
let imgData2Width = 350

function drawSimpleGradient(width, height, rI, gI, bI, rF, gF, bF, ctx){
    if (rI < 0 && rI > 255 && gI < 0 && gI > 255 && bI < 0 && bI > 255
        && rF < 0 && rF > 255 && gF < 0 && gF > 255 && bF < 0 && bF > 255){
            console.error("Valor para gradiente inválido")
            return
    }
    let imgDataN = ctx.createImageData(width, height)
    // let pixelAmount = height * width * 4
    let r = rI
    let g = gI
    let b = bI

    for (let i = 0; i < imgDataN.data.length; i += 4) {
            imgDataN.data[i + 0] = r
            imgDataN.data[i + 1] = g
            imgDataN.data[i + 2] = b
            imgDataN.data[i + 3] = 255

            if ((i+4) % (width * 4) == 0){
                r += ((rF-rI) / (height-1))
                g += ((gF-rI) / (height-1))
                b += ((bF-rI) / (height-1))
            }

        }
    ctx.putImageData(imgDataN, 30, 30)
    // This "30 30" could be defined as margin"
}
drawSimpleGradient(imgData2Width, imgData2Height, 0,0,0, 255,255,255, c3)


console.info("---------Ejercicio 5---------")

let canvas4 = document.querySelector("#canvas4")
let c4 = canvas4.getContext("2d")
let imgData3Height = 300
let imgData3Width = 350
// let gradient2 = c4.createLinearGradient(60, 0, 460, 0)
// gradient2.addColorStop(0, "black")
// // gradient1.addColorStop(.2, "white")
// // gradient1.addColorStop(.4, "gold")
// gradient2.addColorStop(.5, "gold")
// // gradient1.addColorStop(.6, "gold")
// // gradient1.addColorStop(.8, "white")
// gradient2.addColorStop(1, "red")
// c4.fillStyle = gradient2
// c4.fillRect(60, 30, 400, 300)






// draw3Gradient version 1.0
// function draw3GradientVert(width, height, rI, gI, bI, r2, g2, b2, r3, g3, b3, ctx){
//     if (rI < 0 && rI > 255 && gI < 0 && gI > 255 && bI < 0 && bI > 255
//         && r2 < 0 && r2 > 255 && g2 < 0 && g2 > 255 && b2 < 0 && b2 > 255
//         && r3 < 0 && r3 > 255 && g3 < 0 && g3 > 255 && b3 < 0 && b3 > 255){
//             console.error("Valor para gradiente inválido")
//             return
//     }
//     let imgDataN = ctx.createImageData(width, height)
//     let pixelAmount = height * width * 4
//     let r = rI
//     let g = gI
//     let b = bI

//     for (let i = 0; i < imgDataN.data.length; i += 4) {
//             imgDataN.data[i + 0] = r
//             imgDataN.data[i + 1] = g
//             imgDataN.data[i + 2] = b
//             imgDataN.data[i + 3] = 255
            
//             if ((i % (width*4)) == 0){
//                 r = rI
//                 g = gI
//                 b = bI
//                 // workss..
//             }
//             else if (((i % (width*4/2)) == 0)){
//                 r += ((r3-r2) / (width/2))
//                 // r = 255
//                 g = ((g3-g2) / (width/2))
//                 b += ((b3-b2) / (width/2))
//                 // console.log("eurekita")
//             }
//             else{
//                 r += ((r2-rI) / (width/2))
//                 g += ((g2-gI) / (width/2))
//                 b += ((b2-bI) / (width/2))
//                 // console.log("eureka")
//             }
//         }
//     ctx.putImageData(imgDataN, 30, 30)
//     // This "30 30" could be defined as margin"
// }
// draw3GradientVert(imgData3Width, imgData3Height, 0,0,0, 255,255,0, 255,0,0, c4)

// draw3Gradient version 2.0
function draw3GradientVert(width, height, rI, gI, bI, r2, g2, b2, r3, g3, b3, ctx){
    if (rI < 0 && rI > 255 && gI < 0 && gI > 255 && bI < 0 && bI > 255
        && r2 < 0 && r2 > 255 && g2 < 0 && g2 > 255 && b2 < 0 && b2 > 255
        && r3 < 0 && r3 > 255 && g3 < 0 && g3 > 255 && b3 < 0 && b3 > 255){
            console.error("Valor para gradiente inválido")
            return
    }
    let imgDataN = ctx.createImageData(width, height)
    for (let y = 0; y < height; y++){
        let r = rI
        let g = gI
        let b = bI
        for (let x = 0; x < width*4; x += 4){
            imgDataN.data[(y*width*4+x) + 0] = r
            imgDataN.data[(y*width*4+x) + 1] = g
            imgDataN.data[(y*width*4+x) + 2] = b
            imgDataN.data[(y*width*4+x) + 3] = 255

            let divisionConst = (width-5)/2.0
            if (x < ((width*4) / 2)){
                r += ((r2-rI) / (divisionConst))
                g += ((g2-gI) / (divisionConst))
                b += ((b2-bI) / (divisionConst))
            }
            else if (x >= ((width*4-1) / 2)){
                r += ((r3-r2) / (divisionConst))
                g += ((g3-g2) / (divisionConst))
                b += ((b3-b2) / (divisionConst))
            }
        }
    }
    ctx.putImageData(imgDataN, 30, 30)
}
draw3GradientVert(imgData3Width, imgData3Height, 0,0,0, 255,255,0, 255,0,0, c4)










// function draw3Gradient(width, height, rI, gI, bI, r2, g2, b2, r3, g3, b3, ctx){
//     if (rI < 0 && rI > 255 && gI < 0 && gI > 255 && bI < 0 && bI > 255
//         && r2 < 0 && r2 > 255 && g2 < 0 && g2 > 255 && b2 < 0 && b2 > 255
//         && r3 < 0 && r3 > 255 && g3 < 0 && g3 > 255 && b3 < 0 && b3 > 255){
//             console.error("Valor para gradiente inválido")
//             return
//     }
//     let imgDataN = ctx.createImageData(width, height)
//     let pixelAmount = height * width * 4
//     let r = rI
//     let g = gI
//     let b = bI

//     for (let i = 0; i < imgDataN.data.length; i += 4) {
//             imgDataN.data[i + 0] = r
//             imgDataN.data[i + 1] = g
//             imgDataN.data[i + 2] = b
//             imgDataN.data[i + 3] = 255

            
//             if ((i+4) % (width * 4) == 0 && i < pixelAmount / 2){
//                 r += ((r2-rI) / (height)*2)
//                 g += ((g2-gI) / (height)*2)
//                 b += ((b2-bI) / (height)*2)
//             }
//             else if ((i+4) % (width * 4) == 0){
//                 r += ((r3-r2) / (height)*2)
//                 g += ((g3-g2) / (height)*2)
//                 b += ((b3-b2) / (height)*2)
//             }
//         }
//     ctx.putImageData(imgDataN, 30, 30)
//     // This "30 30" could be defined as margin"
// }
// draw3Gradient(imgData3Width, imgData3Height, 0,0,0, 255,255,0, 255,0,0, c4)

console.info("---------Ejercicio 6---------")

let canvas5 = document.querySelector("#canvas5")
let c5 = canvas5.getContext("2d")
// let gradient3 = c5.createLinearGradient(70, 40, 370, 340)
// gradient3.addColorStop(0, "#68D911")
// gradient3.addColorStop(.333, "#C4F01F")
// gradient3.addColorStop(.666, "#D9D111")
// gradient3.addColorStop(1, "#F8D814")
// // gradient3.addColorStop(0, "#000")
// // gradient3.addColorStop(1, "#00f")
// c5.fillStyle = gradient3
// c5.fillRect(70, 40, 300, 300)





console.info("Images----------------------")
// index = 

input.onchange = e => {
    let file = e.target.files[0]

    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = readerEvent => {
        let content = readerEvent.target.result

        let image = new Image()

        image.src = content

        image.onload = function(){
            let imageAspectRatio = (1.0 * this.height) / this.width
            imageScaledWidth = canvas.width
            imageScaledHeight = canvas.width * imageAspectRatio
            // im2
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight)

            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight)

            for (let k = 0; k < array.length; k++) {
                const element = array[k];
                for (let l = 0; l < array.length; l++) {
                    const element = array[l];
                    if (i % 2 == 0){
                        let index = (i + imageData.width * j) * 4
                    }
                }
            }
        }
    }

}