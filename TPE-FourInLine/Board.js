const PARTWIDTH = 60

class Board{
    constructor(canvas, context, partsW, partsH){
        this.canvas = canvas
        this.context = context
        // Height
        this.partsH = partsH
        // Width
        this.partsW = partsW

        // this.initialWidth = 210
        // Can I get it from canvas?
        this.initialWidth = canvas.width/2 - PARTWIDTH*partsW/2
        this.initialHeight = 40
        // this.backgroundColor = "#753"
        // this.backgroundColor = "#973"
        this.backgroundColor = "#740"
        this.clickablePartColor = "#c51"

        // Matrix to control pieces
        this.parts = [this.partsH]
        // From the bottom upwards
        for (let i = 0; i < this.partsH; i++) {
            this.parts[i] = [this.partsW]
            for (let j = 0; j < this.partsW; j++) {
                // this.context.fillRect(initialWidth, canvas.height-PARTWIDTH, PARTWIDTH, PARTWIDTH)
                this.parts[i][j] = null
            }
        }
    }

    draw() {
        // Pieces for
        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];  
        // }
        for (let i = 0; i < this.partsH; i++) {
            for (let j = 0; j < this.partsW; j++) {
                // Draw the piece if it has
                // console.log(this.parts[i][j])
                if (this.parts[i][j] != null){
                    this.parts[i][j].redraw()
                    // console.log("humm, that is drawn for me")
                }

                // Draw the table borders
                // this.context.fillStyle = "#863"
                this.context.fillStyle = this.backgroundColor
                let posX = this.initialWidth+(PARTWIDTH)*j
                let posY = (canvas.height-this.initialHeight)-(PARTWIDTH)*(i+1)
                
                this.context.beginPath()
                this.context.moveTo(posX, posY)
                this.context.lineTo(posX, posY + PARTWIDTH)
                this.context.lineTo(posX + PARTWIDTH, posY + PARTWIDTH)
                this.context.lineTo(posX + PARTWIDTH, posY)
                this.context.closePath()
                // this.context.fillRect(posX, posY, PARTWIDTH, PARTWIDTH)

                // Draw the empty spaces
                // this.context.fillStyle = "#863"
                this.context.arc(posX+PARTWIDTH/2, posY+PARTWIDTH/2, PARTWIDTH*0.35, 0, 2 * Math.PI)
                this.context.closePath()
                this.context.fill('evenodd')
            }
        }

        // Represents the zone where the piece can be dropped
        for (let j = 0; j < this.partsW; j++) {
            let posX = this.initialWidth+(PARTWIDTH)*j + PARTWIDTH/2
            let posY = (canvas.height-this.initialHeight)-(PARTWIDTH)*(this.partsH+1) + PARTWIDTH/2
            // Positions from where the pieces take action 

            // this.context.globalCompositeOperation = 'destination-out'
            this.context.fillStyle = this.clickablePartColor
            this.context.beginPath()
            this.context.arc(posX, posY, PARTWIDTH*0.2, 0, 2 * Math.PI)
            this.context.closePath()
            this.context.fill()
            // this.context.globalCompositeOperation = 'source-over';
        }
    }

    canIntroduce(piece){
        let closestDif = null
        let closestIndex = null
        for (let j = 0; j < this.partsW; j++) {
            // Middle point in the touchable
            // ERROR: it must recognize the whole piece
            let posX = this.initialWidth+(PARTWIDTH)*j + PARTWIDTH/2
            let posY = (canvas.height-this.initialHeight)-(PARTWIDTH)*(this.partsH+1) + PARTWIDTH/2

            // mmmmm suspicious..
            // center of piece - center of table point
            let difX = (piece.posX + piece.size*0.5) - posX
            let difY = (piece.posY + piece.size*0.5) - posY

            let totalDifference = Math.sqrt(difX * difX + difY * difY)
            // distance to the centers < radius of table point + radius of the piece
            if (totalDifference < PARTWIDTH*0.2 + piece.size/2.8){
                // if (Math.sqrt(Math.abs(difX * difX + difY * difY)) < PARTWIDTH*0.4 + piece.size/2){
                if (closestIndex != null && totalDifference < closestDif){
                    closestIndex = j
                    closestDif = totalDifference
                    // console.log("weeeepa "+ j)
                }
                else if(closestIndex == null){
                    closestIndex = j
                    closestDif = totalDifference
                    // console.log("weeeepa de una"+ j)
                }
            }
        }
        // Here goes the indication to where the piece goes
        return closestIndex
    }

    introduce(clickedElem, indexOfColumn){
        let i = 0
        while (i < this.partsH) {
            if (this.parts[i][indexOfColumn] == null){
                // The canvas height - (height of the previous rows + medium of this row + medium of the piece heigth + distance to bottom) 
                clickedElem.posY = canvas.height - (PARTWIDTH*i + PARTWIDTH/2 + clickedElem.size/2 + this.initialHeight)
                // The beggining of the board + (the center of this column - the middle of the piece width) + width of the previous columns
                clickedElem.posX = this.initialWidth + (PARTWIDTH/2 - clickedElem.size/2) + PARTWIDTH*indexOfColumn
                this.parts[i][indexOfColumn] = clickedElem
                // return true
                return [i, indexOfColumn]
            }
            i++
        }
        // return false
        return []
    }


    // checkDiagonalTop(numY, numX, player){
    //     let winnersArray = []
    //     let startPointX = 0
    //     let startPointY = 0
    //     // Starts the closest possible to the top left..
    //     if(this.partsH-1 - numY < numX){
    //         startPointX = numX - (this.partsH-1 - numY)
    //         startPointY = this.partsH-1
    //     }
    //     else{
    //         startPointY = numY + numX
    //         startPointX = 0
    //     }
    //     // ..traverses all the diagonal long
    //     while(startPointX < this.partsW && startPointY >= 0){
    //         if(this.parts[startPointX][startPointY] != null
    //             && player == this.parts[startPointX][startPointY].player){
    //             winnersArray.push[this.parts[startPointX][startPointY]]
    //         }
    //         else if(winnersArray.length > 3){
    //             return winnersArray
    //         }
    //         else{
    //             winnersArray = []
    //         }
    //         startPointX++
    //         startPointY--
    //     }
    //     return winnersArray
    // }

    // checkDiagonalBottom(numY, numX, player){
    //     let winnersArray = []
    //     let startPointX = 0
    //     let startPointY = 0
    //     // Starts the closest possible to the top left..
    //     if(numX > numY){
    //         startPointX = numX - numY
    //         startPointY = 0
    //     }
    //     else{
    //         startPointY = numY - numX
    //         startPointX = 0
    //     }
    //     // ..traverses all the diagonal long
    //     while(startPointX < this.partsW && startPointY < this.partsH){
    //         if(this.parts[startPointX][startPointY] != null
    //             && player == this.parts[startPointX][startPointY].player){
    //             winnersArray.push[this.parts[startPointX][startPointY]]
    //         }
    //         else if(winnersArray.length > 3){
    //             return winnersArray
    //         }
    //         else{
    //             winnersArray = []
    //         }
    //         startPointX++
    //         startPointY++
    //     }
    //     return winnersArray
    // }

    // checkHorizontal(numY, player){
    //     let winnersArray = []
    //     let startPointX = 0
    //     while(startPointX < this.partsW){
    //         if(this.parts[startPointX][numY] != null
    //             && player == this.parts[startPointX][numY].player){
    //             winnersArray.push[this.parts[startPointX][numY]]
    //         }
    //         else if(winnersArray.length > 3){
    //             return winnersArray
    //         }
    //         else{
    //             winnersArray = []
    //         }
    //         startPointX++
    //     }
    //     return winnersArray
    // }

    // checkVertical(numX, numY, player){
    //     let winnersArray = []
    //     let startPointY = 0
    //     while(startPointY <= numY){
    //         if(this.parts[numX][startPointY] != null
    //             && player == this.parts[numX][startPointY].player){
    //             winnersArray.push[this.parts[numX][startPointY]]
    //         }
    //         else if(winnersArray.length > 3){
    //             return winnersArray
    //         }
    //         else{
    //             winnersArray = []
    //         }
    //         startPointY++
    //     }
    //     return winnersArray
    // }


    // NOT HERE?..
    // checkDiagonalTop(numY, numX, player){
    //     this.pieces[numY][numX].checkDiagonalTop(numY, numX, player)
    // }

    // checkDiagonalBottom(numY, numX, player){
    //     this.pieces[numY][numX].checkDiagonalBottom(numY, numX, player)
    // }

    // checkHorizontal(numY, numX, player){
    //     this.pieces[numY][numX].checkHorizontal(numY, numX, player)
    // }

    // checkVertical(numY, numX, player){
    //     this.pieces[numY][numX].checkVertical(numY, numX, player)
    // }
    // checkDiagonalBottom(){

    // }
    // checkHorizontal(){

    // }
    // checkVertical(){

    // }


    // X and Y have been being used wrongly!!

}

