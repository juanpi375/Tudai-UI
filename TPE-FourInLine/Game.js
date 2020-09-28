"use strict" 
class Game{
    constructor(player1Name, player2Name, boardSize){
        let canvas = document.querySelector("#canvas")




        // CLONO EL CANVAS CADA VEZ QUE CREO UN JUEGO
        // Esto resetea los eventListeners al crear
        // nuevas instancias de game
        let elClone = canvas.cloneNode(true);
        canvas.parentNode.replaceChild(elClone, canvas);
        canvas = elClone






        // canvas.removeEventListener("mousedown", mousedown)

        let ctx = canvas.getContext("2d")
        let clickedElem = null
        let players = []
        let playerTourn = 0
        canvas.addEventListener("mousedown", mousedown)
        // canvas.addEventListener("mousedown", function(e){
        //     let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - this.offsetTop)
        //     if(clicked == null){return}
        //     // If the piece belongs to == the player whose turn is
        //     if(clicked.player == players[playerTourn]){
        //         clickedElem = clicked
        //     }
        // })

        function mousedown(e){
                let clicked = findClicked(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
                if(clicked == null){return}
                // If the piece belongs to == the player whose turn is
                if(clicked.player == players[playerTourn]){
                    clickedElem = clicked
                }
        }

        canvas.addEventListener("mouseup", function(){
            if(clickedElem != null){
                let indexInBoard = b.canIntroduce(clickedElem)
                // If I could put it in the board..
                if (indexInBoard != null){
                    putPieceInBoard(indexInBoard)
                }
            }
            clickedElem = null
        })

        canvas.addEventListener("mousemove", function(e){
            if (clickedElem == null){return}
            clickedElem.setPos(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
            redraw()    
        })

        canvas.addEventListener("mouseleave", function(){
            clickedElem = null
        })

        let partsW = null
        let partsH = null
        switch (boardSize) {
            case "5 - 4":
                partsW = 5
                partsH = 4
                break
            case "6 - 5":
                partsW = 6
                partsH = 5
                break;
            // Default is 7 - 6
            default:
                partsW = 7
                partsH = 6
                break
        }
        console.log(partsW+"w...h"+partsH)
        let b = new Board(canvas, ctx, partsW, partsH)

        players[0] = player1Name
        players[1] = player2Name
        let p = []
        let s = []

        let backgroundImage = new Image()
        backgroundImage.src = "images/backgroundTable2.jpg"

        b.draw()

        backgroundFirstDraw()

        function backgroundFirstDraw(){
            backgroundImage.onload = function(){
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
                b.draw()
                piecesFirstDraw()
            }
        }

        function piecesFirstDraw(){
            let yIncrement = 50
            let xIncrement = 0
            for (let i = 0; i < partsH*partsW/2; i++) {
                if (i != 0 && i%7 == 0){
                    yIncrement += 50
                    xIncrement = 0
                }
                p[i] = new Piece(ctx, players[0], 70, 50+25*xIncrement, yIncrement, "#f00")
                s[i] = new Piece(ctx, players[1], 70, canvas.width-250+25*xIncrement, yIncrement, "#00f")
                
                xIncrement++
            }
        }

        function redraw(){
            // Here draws the image
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

            b.draw()
            
            for (let i in p) {
                p[i].redraw()
            }
            for (let i in s){
                s[i].redraw()
            } 
        }

        function findClicked(x, y){
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

        function putPieceInBoard(indexInBoard){
            let indexOfPiece = p.indexOf(clickedElem)
            // let playerInTourn = clickedElem.player
            // This must be fixed...
            let introductionInBoard = b.introduce(clickedElem, indexInBoard)
            // If the piece is of the player 2.. (could be a while)
            if (indexOfPiece == -1){
                indexOfPiece = s.indexOf(clickedElem)
            // If the piece of player 2 enters..
                if(introductionInBoard != []){
                    removePieceFromPlayer(s, indexOfPiece)
                    redraw()
                    // clickedElem()
                    // checkWin(introductionInBoard[0], introductionInBoard[1], playerInTourn, clickedElem)
                    checkWin(introductionInBoard[0], introductionInBoard[1], clickedElem)

                }
            }
            // If the piece of player 1 enters..
            else if(introductionInBoard != []){
                removePieceFromPlayer(p, indexOfPiece)
                redraw()
                checkWin(introductionInBoard[0], introductionInBoard[1], clickedElem)
            }
            redraw()
        }

        function removePieceFromPlayer(piecesArray, indexOfPiece){
            piecesArray.splice(indexOfPiece, 1)
            if(playerTourn < players.length-1){
                playerTourn++
            }
            else{
                playerTourn = 0
            }
        }

        function checkWin(numY, numX, piece){
            let winnersArray = piece.checkDiagonalTop(numY, numX, b)
            if (winnersArray == 1){winnersArray = piece.checkHorizontal(numY, numX, b)}
            if (winnersArray == 1){winnersArray = piece.checkDiagonalBottom(numY, numX, b)}
            if (winnersArray == 1){winnersArray = piece.checkVertical(numY, numX, b)}
            if (winnersArray >= 4){
                // console.log("Player "+piece.player+" wins!!")
                // console.log("("+winnersArray+" pieces)")
                // alert("Player "+piece.player+" wins!!")
                p = null
                s = null
                let hiddenMessage = document.querySelector("#winnerMessage")
                let winner = document.querySelector(".winner")
                let loser = document.querySelector(".loser")
                winner.innerHTML = player1Name
                loser.innerHTML = player2Name
                hiddenMessage.classList.remove("hidden")
            }
        }
    }



}