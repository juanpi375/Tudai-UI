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
                this.context.fillStyle = "#863"
                let posX = this.initialWidth+(PARTWIDTH)*j
                let posY = (canvas.height-10)-(PARTWIDTH)*(i+1)
                
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
            let posY = (canvas.height-10)-(PARTWIDTH)*(this.partsH+1) + PARTWIDTH/2
            // Positions from where the pieces take action 

            // this.context.globalCompositeOperation = 'destination-out'
            this.context.fillStyle = "#863"
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
            let posY = (canvas.height-10)-(PARTWIDTH)*(this.partsH+1) + PARTWIDTH/2

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
                clickedElem.posY = canvas.height - (PARTWIDTH*i + PARTWIDTH/2 + clickedElem.size/2 + 10)
                // The beggining of the board + (the center of this column - the middle of the piece width) + width of the previous columns
                clickedElem.posX = this.initialWidth + (PARTWIDTH/2 - clickedElem.size/2) + PARTWIDTH*indexOfColumn
                this.parts[i][indexOfColumn] = clickedElem
                return true
            }
            i++
        }
        return false
    }

}