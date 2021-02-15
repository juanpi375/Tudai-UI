"use strict"

let resetGameBtn = document.querySelector("#resetGameBtn")
let newGameBtn = document.querySelector("#newGameBtn")
let backgroundCover = document.querySelector("#backgroundCover")
let mainMenu = document.querySelector("#mainMenu")
let nameForm = document.querySelector("#nameForm")
let boardSizeForm = document.querySelector("#boardSizeForm")
let mainMenuButton = document.querySelector("#mainMenuButton")
let namesForm = document.querySelector("#namesForm")
let winnerMessage = document.querySelector("#winnerMessage")
let drawMessage = document.querySelector("#drawMessage")

newGameBtn.addEventListener("click", prepareNewGame)
mainMenuButton.addEventListener("click", startNewGame)
resetGameBtn.addEventListener("click", resetGame)

namesForm.addEventListener("submit", function(e){
    e.preventDefault()
})

let boardSize = document.querySelector("#boardSizeForm")
let namePlayer1 = ""
let namePlayer2 = ""
let boardSizeValue = ""
namePlayer1 = getNamePlayer1()
namePlayer2 = getNamePlayer2()
boardSizeValue = getBoardSize()

let g = new Game(namePlayer1, namePlayer2, boardSizeValue)

function getBoardSize(){
    for (let i in boardSize.elements) {
        if(boardSize.elements[i].checked){
            return boardSize.elements[i].value
        }
    }
}
function getNamePlayer1(){
    return document.querySelector("#namePlayer1").value
}
function getNamePlayer2(){
    return document.querySelector("#namePlayer2").value
}

function prepareNewGame(){
    backgroundCover.classList.remove("hidden")
    mainMenu.classList.remove("mainMenuHidden")
}

function startNewGame(){
    document.querySelector('#names').click()
    // namePlayer1 = document.querySelector("#namePlayer1").value
    namePlayer1 = getNamePlayer1()
    // namePlayer2 = document.querySelector("#namePlayer2").value
    namePlayer2 = getNamePlayer2()
    if(namePlayer1 != "" && namePlayer2 != ""){
    boardSizeValue = getBoardSize()
    resetGame()
    }
}

function resetGame(){
    g = new Game(namePlayer1, namePlayer2, boardSizeValue)

    winnerMessage.classList.add("hidden")
    drawMessage.classList.add("hidden")

    backgroundCover.classList.add("hidden")
    mainMenu.classList.add("mainMenuHidden")

    let canvas = document.querySelector("#canvas")
    canvas.style.border = "5px solid #f00"

    let playersNameSpan = document.querySelectorAll(".playersNameDisplay span")
    playersNameSpan[0].innerHTML = "&#9755"
    playersNameSpan[0].style = "color: #f00"
    playersNameSpan[1].innerHTML = getNamePlayer1()
    playersNameSpan[1].style = "color: #f00"
    playersNameSpan[2].innerHTML = ""
    playersNameSpan[3].innerHTML = getNamePlayer2()
    playersNameSpan[3].style = "color: inherit"
}