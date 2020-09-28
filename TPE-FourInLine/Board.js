const PARTWIDTH = 60

class Board{
    constructor(canvas, context, partsW, partsH){
        this.canvas = canvas
        this.context = context

        // Partes de altp
        this.partsH = partsH
        // Partes de ancho
        this.partsW = partsW

        // Ancho desde el que el tablero será dibujado.
        // Se acomoda a la mitad del ancho del canvas
        this.initialWidth = canvas.width/2 - PARTWIDTH*partsW/2
        this.initialHeight = 40

        // this.backgroundColor = "#753"
        // this.backgroundColor = "#740"
        this.backgroundColor ="#c51"
        // #cc5511
        this.clickablePartColor = "#f51"

        // Matriz para el control de las piezas
        this.parts = [this.partsH]
        // Se dibuja desde abajo hacia arriba
        for (let i = 0; i < this.partsH; i++) {
            this.parts[i] = [this.partsW]
            for (let j = 0; j < this.partsW; j++) {
                this.parts[i][j] = null
            }
        }
    }

    // DIBUJA LOS BLOQUES DEL TABLERO DE A UNO
    draw() {
        for (let i = 0; i < this.partsH; i++) {
            for (let j = 0; j < this.partsW; j++) {
                // Dibuja piezas si las tiene
                if (this.parts[i][j] != null){
                    this.parts[i][j].redraw()
                }

                // Dibuja los cuadrados con hoyos
                this.context.fillStyle = this.backgroundColor
                let posX = this.initialWidth+(PARTWIDTH)*j
                let posY = (canvas.height-this.initialHeight)-(PARTWIDTH)*(i+1)
                
                this.context.beginPath()
                this.context.moveTo(posX, posY)
                this.context.lineTo(posX, posY + PARTWIDTH)
                this.context.lineTo(posX + PARTWIDTH, posY + PARTWIDTH)
                this.context.lineTo(posX + PARTWIDTH, posY)
                this.context.closePath()

                // Dibuja los espacios vacíos
                this.context.arc(posX+PARTWIDTH/2, posY+PARTWIDTH/2, PARTWIDTH*0.35, 0, 2 * Math.PI)
                this.context.closePath()
                this.context.fill('evenodd')
            }
        }

        // Representa la zona donde las piezas pueden ser soltadas
        for (let j = 0; j < this.partsW; j++) {
            let posX = this.initialWidth+(PARTWIDTH)*j + PARTWIDTH/2
            let posY = (canvas.height-this.initialHeight)-(PARTWIDTH)*(this.partsH+1) + PARTWIDTH/2

            this.context.fillStyle = this.clickablePartColor
            this.context.beginPath()
            this.context.arc(posX, posY, PARTWIDTH*0.2, 0, 2 * Math.PI)
            this.context.closePath()
            this.context.fill()
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
                }
                else if(closestIndex == null){
                    closestIndex = j
                    closestDif = totalDifference
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
                
                return [i, indexOfColumn]
            }
            i++
        }
        return []
    }

}

