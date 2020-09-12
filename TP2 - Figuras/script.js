let can = document.querySelector("#canvas")
let ctx = can.getContext("2d")

let imageData = ctx.createImageData(can.width, can.height)

function setPixel(imageData, x, y, r, g, b, a) {
    if (x < imageData.width && x > -1 && y < imageData.height && y > -1){
        let index = (x + y * imageData.width) * 4
        imageData.data[index + 0] = r
        imageData.data[index + 1] = g
        imageData.data[index + 2] = b
        imageData.data[index + 3] = a
    }
}


document.querySelectorAll(".").forEach(element => {
    
});