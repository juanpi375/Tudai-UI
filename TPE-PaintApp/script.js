let canv = document.querySelector("#canvas1")
let cx = canv.getContext("2d")
let paint = false
let clickX = []
let clickY = []
let clickDrag = []

canv.onmousedown = (function(e){
    let mouseX = e.pageX - this.offsetLeft
    let mouseY = e.pageY - this.offsetTop

    paint = true
    addClick(mouseX, mouseY)
    redraw()
})

canv.onmousemove = (function(e){
    if (paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true)
        redraw()
    }
})

canv.onmouseup = (function(e){
    paint = false
})

canv.onmouseleave = (function(e){
    paint = false
})

function addClick(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw(){
    cx.clearRect(0, 0, canv.width, canv.height)
    cx.strokeStyle = "#fff"
    cx.lineJoin = "round"
    cx.lineWidth = 5
    for(let i = 0; i < clickX; i++){
        cx.beginPath()
        if(clickDrag[i] && i){
            cx.moveTo(clickX[i-1], clickY[i-1])
        }else{
            cx.moveTo(clickX[i]-1, clickY[i])
        }
        cx.lineTo(clickX[i], clickY[i])
        cx.closePath()
        cx.stroke()
        // console.log("some")
    }
}

// Method 2
