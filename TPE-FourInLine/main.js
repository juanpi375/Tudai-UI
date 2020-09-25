"use strict"
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d")
let clickedElem = null

canvas.addEventListener("mousedown", function(e){
    let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
    // console.log("wherehte: "+ (e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop))
    if(clicked == null){return}
    clickedElem = clicked
    // console.log("clicked"+clicked)
    // console.log("clickedElem"+clickedElem.size)
    // p[0].pos
    // p[0].posX = 30
    // clElem = new Piece(ctx, 70, 400, 700)
    // clickedElem.draw()
    // console.log("clicked elem: "+clickedElem+" "+clicked)
    // p[clicked].setPos(10, 300)
    // clickedElem.setPos(10, 300)
    // p[clicked].posX+=50
    // p[clicked].size=200
    // clickedElem.draw()

    // console.log(p[0].size)
    // ctx.fillStyle = "#999"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // b.draw()
    // for (let i in p) {
    //     p[i].draw()
    // }
})
canvas.addEventListener("mouseup", function(){
    if(clickedElem != null){
        let indexInBoard = b.canIntroduce(clickedElem)
        if (indexInBoard != null){
            let indexOfPiece = p.indexOf(clickedElem)
            if (indexOfPiece == -1){
                indexOfPiece = s.indexOf(clickedElem)
                if(b.introduce(clickedElem, indexInBoard)){
                    s.splice(indexOfPiece, 1)
                }
            }
            else if(b.introduce(clickedElem, indexInBoard)){
                p.splice(indexOfPiece, 1)
            }
            ctx.fillStyle = "#999"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            b.draw()
            
            for (let i in p) {
                p[i].redraw()
            }
            for (let i in s){
                s[i].redraw()
            } 
        }
    }
    clickedElem = null
})

canvas.addEventListener("mousemove", function(e){
    if (clickedElem == null){return}
    clickedElem.setPos(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    ctx.fillStyle = "#999"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    b.draw()
    
    for (let i in p) {
        p[i].redraw()
    }
    for (let i in s){
        s[i].redraw()
    }    
})


ctx.fillStyle = "#999"
ctx.fillRect(0, 0, canvas.width, canvas.height)

let b = new Board(canvas, ctx, 7, 6)
// let p1 = new Piece(ctx, 70, 250, 100)
// let p2 = new Piece(ctx, 70, 275, 100)
b.draw()


// let img1 = new Image()
// img1.url = "images/piece1.png"



let p = []
let s = []
let yIncrement = 100
let xIncrement = 0
for (let i = 0; i < 21; i++) {
    if (i != 0 && i%7 == 0){
        yIncrement += 50
        xIncrement = 0
    }
    p[i] = new Piece(ctx, 70, 50+25*xIncrement, yIncrement, "#f00")
    s[i] = new Piece(ctx, 70, canvas.width-250+25*xIncrement, yIncrement, "#00f")
    xIncrement++
}

// console.log(img1)
// img1.addEventListener("load", function(){
    // for (let i = 0; i < 21; i++) {
    //     // if(i>15){break}
    //     p[i].draw()
    //     s[i].draw()
    // }
    // console.log("ut")
// })
function findClicked(x, y){
    // let pLimit = p.length
    // let sLimit = s.length
    // for (let i in p) {
    //     if (p[pLimit-i].isPointInside(x, y)){
    //         return p[pLimit-i]
    //     }
    //     if (s[sLimit-i].isPointInside(x, y)){
    //         return s[sLimit-i]
    //     }
    // }

    let pLimit = p.length - 1
    while(pLimit >= 0){
        if (p[pLimit].isPointInside(x, y)){
            return p[pLimit]
        }
        pLimit--
    }
    let sLimit = s.length - 1
    while(sLimit >= 0){
        if (s[sLimit].isPointInside(x, y)){
            return s[sLimit]
        }
        sLimit--
    }
    return null
}

// p1.draw()
// p2.draw()



