"use strict"
class Piece{
    constructor(context, player, size, posX, posY, color){
        this.context = context
        this.player = player
        this.posX = posX
        this.posY = posY
        this.size = size
        this.color = color
        // Auxiliar para calcular valor con recurrencia
        this.isCounted = false

        // Auxiliares para calcular distancia de draggueo
        this.clickDifferenceX = 0
        this.clickDifferenceY = 0

        // Carga de imágen de fondo
        this.img = new Image()
        this.img.src = "images/piece1.png"

        // Llamado a carga por primera y única vez
        this.draw()
    }

    // Cuando cargue la imágen, llama al redraw común
    draw(){
        let my = this
        this.img.onload = function(){
            my.redraw()
        }
    }

    // Dibuja la imagen y le pinta el fondo
    redraw(){
        let c = this.context
        let pX = this.posX
        let pY = this.posY
        let s = this.size
        let colr = this.color

        c.fillStyle = colr
        c.beginPath()
        c.arc(pX+s/2, pY+s/2, s/2.8, 0, 2 * Math.PI)
        c.closePath()
        c.fill()
        c.drawImage(this.img, pX, pY, s, s)
    }

    // DEFINE SI ESTÁ SIENDO CLIQUEADA
    // Retorna la diferencia entre su punto medio
    // y el click
    isPointInside(x, y){
        let difX = (this.posX + this.size/2) - x
        let difY = (this.posY + this.size/2) - y

        this.clickDifferenceX = difX
        this.clickDifferenceY = difY
       return  Math.sqrt(difX * difX + difY * difY) < (this.size/2.7)
    }


    setPos(x, y){
        this.posX = (x - this.size / 2) + this.clickDifferenceX
        this.posY = (y - this.size / 2) + this.clickDifferenceY
    }

// CHEQUEOS RECURSIVOS EN BUSCA DE PIEZAS DEL MISMO COLOR
// -----------------------------------------------------------------------
// Chequea que en el tablero, exista una posición
// superior izquierda. Si la hay, verifica que haya
// una ficha y, si la hay, no ha sido contada aun y
// es del mismo color, le aplico la misma operación sobre ella.
// Luego realiza la misma operación en el sentido contrario.
// Importante: hay que sumar 1 en alguna parte del proceso
checkDiagonalTop(numY, numX, board){
        let sum = 1
        this.isCounted = true
        // Verifica que los índices no se salgan del tablero
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

    // Lo mismo que checkDiagonalTop pero de
    // la diagonal inferior izquierda a la superior derecha
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
    
    // Lo mismo que checkDiagonalTop pero de
    // la horizontal izquierda a la horizonatal derecha
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
  
    // Lo mismo que checkDiagonalTop pero en
    // la vertical inferior. No se necesita chequear
    // arriba porque es por donde la ficha cayó
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
    // --------------------------------------------------------------

}