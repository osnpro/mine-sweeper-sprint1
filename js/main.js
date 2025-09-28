'use strict'
// cells tipe
const MINE = '💣'
const EMPTY = ' '
const HIDDEN = '?'
const BOARD_SIZE = 4

var gBoard

function restartGame() {
    gBoard = buildBoard()
    renderBoard(gBoard, '#board')
}





function buildBoard() {
    var board = []


    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []


        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = {
                isMine: false,
                isShown: false
            }
        }
    }
    board[2][2].isMine = true
    board[3][3].isMine = true
    console.table(board)
    return board

}

function renderBoard(board, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            const cellCont = cell.isShown ? (cell.isMine ? MINE : EMPTY) : '?'

            strHTML += `<td class="${className}"onclick="CellClicked(${i}, ${j})">${cellCont}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function CellClicked(i, j) {
    const cell = gBoard[i][j]
    if (cell.isShown) return
    cell.isShown = true
    if (cell.isMine) {
        playSound()
        gameOver()

    }


    renderBoard(gBoard, '#board')
}

restartGame()

function playSound() {
    const audio = new Audio('sound/pop.mp3')
    audio.play()
}

function gameOver() {
    const elContainer = document.querySelector('#game-message')
    elContainer.innerText = 'Game  Over!'
}


