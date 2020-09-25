// "use strict"
class Piece{
    constructor(context, size, posX, posY, color){
        this.context = context
        this.posX = posX
        this.posY = posY
        this.size = size
        this.color = color
        // this.player = 0

        this.clickDifferenceX = 0
        this.clickDifferenceY = 0

        this.img = new Image()
        this.img.src = "images/piece1.png"

        this.draw()
    }

    // draw(img1){
    //     let c = this.context
    //     let pX = this.posX
    //     let pY = this.posY
    //     let s = this.size
    //     let colr = this.color

    //     // img1.onload = function(){
    //     c.fillStyle = colr
    //     c.beginPath()
    //     c.arc(pX+s/2, pY+s/2, s/2.8, 0, 2 * Math.PI)
    //     c.closePath()
    //     c.fill()
    //     c.drawImage(img1, pX, pY, s, s)
    //     // }
    // }

    draw(){
        let my = this
        this.img.onload = function(){my.redraw()}

        // let img = new Image()
        // img.src = "images/piece1.png"

        // let c = this.context
        // let pX = this.posX
        // let pY = this.posY
        // let s = this.size
        // let colr = this.color

        // img.addEventListener("load", function(){
        // c.fillStyle = colr
        // c.beginPath()
        // c.arc(pX+s/2, pY+s/2, s/2.8, 0, 2 * Math.PI)
        // c.closePath()
        // c.fill()
        // c.drawImage(img, pX, pY, s, s)
        // })
    }

    // redraw(){
    //     console.log(this.img1)
    //     this.img1.onload = function(){this.redraw1()}
    // }

    redraw(){
        // console.log(this.img1)
        let c = this.context
        let pX = this.posX
        let pY = this.posY
        let s = this.size
        let colr = this.color

        c.fillStyle = colr
        c.beginPath()
        c.arc(pX+s/2, pY+s/2, s/2.8, 0, 2 * Math.PI)
        // c.arc(pX+s/2, pY+s/2, s/2, 0, 2 * Math.PI)
        c.closePath()
        c.fill()
        c.drawImage(this.img, pX, pY, s, s)
    }

    isPointInside(x, y){
        // let difX = this.posX - (x + this.size/2)
        // let difY = this.posY - (y + this.size/2)
        let difX = (this.posX + this.size/2) - x
        let difY = (this.posY + this.size/2) - y
        // Need to set the difference in a var
        this.clickDifferenceX = difX
        this.clickDifferenceY = difY
        // console.log(this.size/2)
        // console.log("distance of x "+difX +"distance of y "+difY+" : "+Math.sqrt(Math.abs(difX * difX + difY * difY)))
       return  Math.sqrt(difX * difX + difY * difY) < (this.size/2.7)
    }


    setPos(x, y){
        this.posX = (x - this.size / 2) + this.clickDifferenceX
        this.posY = (y - this.size / 2) + this.clickDifferenceY
        // console.log("this is the position "+this.posX)
    }

}