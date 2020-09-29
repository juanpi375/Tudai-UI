"use strict" 
class Game{
    constructor(player1Name, player2Name, boardSize){
        
        this.canvas = document.querySelector("#canvas")


        
        // CLONA EL canvas CADA VEZ QUE CREA UN JUEGO
        // Esto resetea los eventListeners al crear
        // nuevas instancias de game
        let clone = this.canvas.cloneNode(true);
        this.canvas.parentNode.replaceChild(clone, this.canvas);
        this.canvas = clone



        this.ctx = this.canvas.getContext("2d")
        this.clickedElem = null
        this.players = []
        this.playerTourn = 0
        let my = this
        this.canvas.addEventListener("mousedown", function(e){my.mousedown(e)})
        this.canvas.addEventListener("mouseup", function(){my.mouseup()})
        this.canvas.addEventListener("mousemove", function(e){my.mousemove(e)})
        this.canvas.addEventListener("mouseleave", function(){my.mouseleave()})

        // Variables de tamaño del tablero
        this.partsW = null
        this.partsH = null

        switch (boardSize) {
            case "5 - 4":
                this.partsW = 5
                this.partsH = 4
                break
            case "6 - 5":
                this.partsW = 6
                this.partsH = 5
                break;
            // Default is 7 - 6
            default:
                this.partsW = 7
                this.partsH = 6
                break
        }

        // Creación del tablero
        this.b = new Board(this.canvas, this.ctx, this.partsW, this.partsH)

        // Inicialización de nombres y arrays de fichas de los jugadores
        this.players[0] = player1Name
        this.players[1] = player2Name
        this.p = []
        this.s = []

        // Creación de imágen de fondo
        this.backgroundImage = new Image()
        this.backgroundImage.src = "images/backgroundTable2.jpg"
        // b.draw()

        this.backgroundFirstDraw()
    }



    // Primer dibujo del background, se debe esperar la imagen y luego
        // llama a la función común de dibujar, junto con el primer
        // dibujo de las fichas
        backgroundFirstDraw(){
            let my = this
            this.backgroundImage.onload = function(){
                my.ctx.drawImage(my.backgroundImage, 0, 0, my.canvas.width, my.canvas.height)
                my.b.draw()
                my.piecesFirstDraw()
            }
        }

        // --------------------------------------------------------
        mousedown(e){
            let clicked = this.findClicked(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
            if(clicked == null){return}
            // If the piece belongs to == the player whose turn is
            if(clicked.player == this.players[this.playerTourn]){
                this.clickedElem = clicked
            }
        }

        mouseup() {
            if(this.clickedElem != null){
                let indexInBoard = this.b.canIntroduce(this.clickedElem)
                // If I could put it in the board..
                if (indexInBoard != null){
                    this.putPieceInBoard(indexInBoard)
                }
            }
            this.clickedElem = null
        }

        mousemove(e){
            if (this.clickedElem == null){return}
            this.clickedElem.setPos(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
            this.redraw()    
        }

        mouseleave(){
            this.clickedElem = null
        }
        // --------------------------------------------------------
        
        // Inicializa y dibuja las fichas en un lugar preseteado
        piecesFirstDraw(){
            let yIncrement = 50
            let xIncrement = 0
            for (let i = 0; i < this.partsH*this.partsW/2; i++) {
                if (i != 0 && i%7 == 0){
                    yIncrement += 50
                    xIncrement = 0
                }
                this.p[i] = new Piece(this.ctx, this.players[0], 70, 50+25*xIncrement, yIncrement, "#f00")
                this.s[i] = new Piece(this.ctx, this.players[1], 70, this.canvas.width-250+25*xIncrement, yIncrement, "#00f")
                
                xIncrement++
            }
        }
        
        // Redibuja en orden.. (Background, tablero, fichas)
        redraw(){
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height)

            this.b.draw()
            
            for (let i in this.p) {
                this.p[i].redraw()
            }
            for (let i in this.s){
                this.s[i].redraw()
            } 
        }

        // Encuentra si alguna ficha fue cliqueada
        findClicked(x, y){
            let pLimit = this.p.length - 1
            while(pLimit >= 0){
                if (this.p[pLimit].isPointInside(x, y)){
                    return this.p[pLimit]
                }
                pLimit--
            }
            let sLimit = this.s.length - 1
            while(sLimit >= 0){
                if (this.s[sLimit].isPointInside(x, y)){
                    return this.s[sLimit]
                }
                sLimit--
            }
            return null
        }
        
        // Intenta meter la ficha en el tablero
        // Primero consulta de quién es la ficha, después 
        // dónde se encuentra la ficha en
        // el arreglo del jugador, luego si se puede meter
        // en el tablero y finalmente si es una jugada ganadora
        putPieceInBoard(indexInBoard){
            let indexOfPiece = this.p.indexOf(this.clickedElem)
            let introductionInBoard = this.b.introduce(this.clickedElem, indexInBoard)
            // If the piece is of the player 2.. (could be a While)
            if (indexOfPiece == -1){
                indexOfPiece = this.s.indexOf(this.clickedElem)
            // If the piece of player 2 enters..
                if(introductionInBoard != []){
                    this.removePieceFromPlayer(this.s, indexOfPiece)
                    this.redraw()
                    this.checkWin(introductionInBoard[0], introductionInBoard[1], this.clickedElem)
                }
            }
            // If the piece of player 1 enters..
            else if(introductionInBoard != []){
                this.removePieceFromPlayer(this.p, indexOfPiece)
                this.redraw()
                this.checkWin(introductionInBoard[0], introductionInBoard[1], this.clickedElem)
            }
            this.redraw()
        }
        
        // Quita la ficha del jugador para guardarla en el tablero
        // y reestablece los turnos
       removePieceFromPlayer(piecesArray, indexOfPiece){
            piecesArray.splice(indexOfPiece, 1)

            let playersNameSpan = document.querySelectorAll(".playersNameDisplay span")

            // Es turno del segundo jugador
            if(this.playerTourn < this.players.length-1){
                this.playerTourn++

                this.canvas.style.border = "5px solid #00f"
                playersNameSpan[0].innerHTML = ""
                playersNameSpan[1].style = "color: inherit"
                playersNameSpan[2].innerHTML = "&#9755"
                playersNameSpan[2].style = "color: #00f"
                playersNameSpan[3].style = "color: #00f"
            }
            // Es turno del primer jugador
            else{
                this.playerTourn = 0

                this.canvas.style.border = "5px solid #f00"
                playersNameSpan[0].innerHTML = "&#9755"
                playersNameSpan[0].style = "color: #f00"
                playersNameSpan[1].style = "color: #f00"
                playersNameSpan[2].innerHTML = ""
                playersNameSpan[3].style = "color: inherit"
            }

        }

        // Genera los chequeos recursivos de la ficha
        // para verificar si fue una jugada ganadora.
        // En caso de que lo sea, se eliminan las fichas 
        // restantes y se imprime el mensaje del ganador
        checkWin(numY, numX, piece){
            let winnersArray = piece.checkDiagonalTop(numY, numX, this.b)
            if (winnersArray == 1){winnersArray = piece.checkHorizontal(numY, numX, this.b)}
            if (winnersArray == 1){winnersArray = piece.checkDiagonalBottom(numY, numX, this.b)}
            if (winnersArray == 1){winnersArray = piece.checkVertical(numY, numX, this.b)}
            if (winnersArray >= 4){
                // for (let i of this.p) {
                    // let startTime = new Date().getTime()
                    // let interval = setInterval(function(){
                    //     let n = new Date().getTime()
                    //     if(n - startTime > 4000){
                    //         clearInterval(interval);
                    //         return;
                    //     }
                    //     i.setPos(i.posX, i.posY+5)
                    // }, 1000)
                // }
                this.p = null
                this.s = null
                let hiddenMessage = document.querySelector("#winnerMessage")
                let winner = document.querySelector(".winner")
                let loser = document.querySelector(".loser")
                let winnerIndex = 0
                if(this.playerTourn == 0){
                    winnerIndex = this.players.length-1
                }
                else{
                    winnerIndex = this.playerTourn-1
                }

                let playersNameSpan = document.querySelectorAll(".playersNameDisplay span")
                playersNameSpan[0].innerHTML = ""
                playersNameSpan[1].innerHTML = ""
                playersNameSpan[2].innerHTML = ""
                playersNameSpan[3].innerHTML = ""

                winner.innerHTML = this.players[winnerIndex]
                loser.innerHTML = this.players[this.playerTourn]
                hiddenMessage.classList.remove("hidden")
            }
        }



}