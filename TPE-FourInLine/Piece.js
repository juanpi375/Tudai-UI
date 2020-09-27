// "use strict"
class Piece{
    constructor(context, player, size, posX, posY, color){
        this.context = context
        this.player = player
        this.posX = posX
        this.posY = posY
        this.size = size
        this.color = color
        // Auxiliar for chekcing result
        this.isCounted = false
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


    checkDiagonalTop(numY, numX, board){
        let sum = 1
        this.isCounted = true
        if(numY+1 < board.partsH && numX-1 >= 0){
            let previousPiece = board.parts[numY+1][numX-1]
            if(previousPiece != null
                && !previousPiece.isCounted
                && previousPiece.player == this.player){
                    sum += previousPiece.checkDiagonalTop(numY+1, numX-1, board)
            }
        }
        if(numY-1 >= 0 && numX+1 < board.partsW){
            let nextPiece = board.parts[numY-1][numX+1]
            if(nextPiece != null
                && !nextPiece.isCounted
                && nextPiece.player == this.player){
                    sum += nextPiece.checkDiagonalTop(numY-1, numX+1, board)
            }
        }
        this.isCounted = false
        return sum
    }

    checkDiagonalBottom(numY, numX, board){
        let sum = 1
        this.isCounted = true
        if(numY-1 >= 0 && numX-1 >= 0){
            let previousPiece = board.parts[numY-1][numX-1]
            if(previousPiece != null
                && !previousPiece.isCounted
                && previousPiece.player == this.player){
                    sum += previousPiece.checkDiagonalBottom(numY-1, numX-1, board)
            }
        }
        if(numY+1 < board.partsH && numX+1 < board.partsW){
            let nextPiece = board.parts[numY+1][numX+1]
            if(nextPiece != null
                && !nextPiece.isCounted
                && nextPiece.player == this.player){
                    sum += nextPiece.checkDiagonalBottom(numY+1, numX+1, board)
            }
        }
        this.isCounted = false
        return sum
    }

    checkHorizontal(numY, numX, board){
        let sum = 1
        this.isCounted = true
        if(numX-1 >= 0){
            let previousPiece = board.parts[numY][numX-1]
            if(previousPiece != null
                && !previousPiece.isCounted
                && previousPiece.player == this.player){
                    sum += previousPiece.checkHorizontal(numY, numX-1, board)
            }
        }
        if(numX+1 < board.partsW){
            let nextPiece = board.parts[numY][numX+1]
            if(nextPiece != null
                && !nextPiece.isCounted
                && nextPiece.player == this.player){
                    sum += nextPiece.checkHorizontal(numY, numX+1, board)
            }
        }
        this.isCounted = false
        return sum
    }

    checkVertical(numY, numX, board){
        let sum = 1
        this.isCounted = true
        if(numY-1 >= 0){
            let previousPiece = board.parts[numY-1][numX]
            if(previousPiece != null
                && !previousPiece.isCounted
                && previousPiece.player == this.player){
                    sum += previousPiece.checkVertical(numY-1, numX, board)
            }
        }
        this.isCounted = false
        return sum
    }

}