const WIDTH = 15
const HEIGHT = 15

let figures = []
// Reference to the last clicked figure
let clickedFigure = null

let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")

// canvas.addEventListener("mousedown", )
// canvas.addEventListener("mousemove", )
// canvas.addEventListener("mouseup", )

function addRectangle(ct){
    let cord = randomPosition(ct)
    // let r = new Rectangle(ct, cord.x, cord.y, fill?, WIDTH, HEIGHT)
    // figures.push(r)
}

function addCircle(canvas, cont){ 
    let cord = randomPosition(canvas)
    let c = new Circle(cont, cord.x, cord.y, "red", 30)
    figures.push(c) 
}

function drawFigures(){
    for (let i in figures) {
        console.log(figures[i].posX)
        setTimeout(function(){
            figures[i].draw()
        }, 1000)
    }
}

function clearCanvas(){

}

function randomPosition(canv){
    // let rect = canvas.getBoundingClientRect()
    // let corX = e.clientX - rect.left
    // let corY = e.clientY - rect.top
    let corX = Math.random() * canv.width
    let corY = Math.random() * canv.height
    return {x: corX, y: corY}
}

function randomFill(){
    // 
}

// Here goes the MAIN..

//#region 
addCircle(canvas, ctx)
addCircle(canvas, ctx)
addCircle(canvas, ctx)

drawFigures()
// addRectangle(ctx)

//#endregion
