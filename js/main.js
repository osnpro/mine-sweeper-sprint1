'use strict'
// cells tipe
const MINE = '💣'
const EMPTY = ' '
const HIDDEN = '?'


var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}


function restartGame() {
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '#board')
}





function buildBoard() {
    var board = []


    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []


        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                isMine: false,
                isReveald: false,
                minesAroundCount: 0
            }
        }
    }
    // board[2][2].isMine = true
    // board[3][3].isMine = true
    randomMines(board)

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
            const cellCont = cell.isReveald ? (cell.isMine ? MINE : (cell.minesAroundCount > 0 ? cell.minesAroundCount : EMPTY)) : '?'

            strHTML += `<td class="${className}"onclick="onCellClicked(${i}, ${j})">${cellCont}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function setMinesNegsCount(board) {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine) continue

            var count = 0

            for (var x = i - 1; x <= i + 1; x++) {
                if (x < 0 || x >= gLevel.SIZE) continue

                for (var y = j - 1; y <= j + 1; y++) {
                    if (y < 0 || y >= gLevel.SIZE) continue
                    if (x === i && y === j) continue

                    if (board[x][y].isMine) count++
                }
            }

            board[i][j].minesAroundCount = count
        }
    }
}


function onCellClicked(i, j) {
    const cell = gBoard[i][j]
    if (cell.isReveald) return
    cell.isReveald = true
    if (cell.isMine) {

        playSound()

        setTimeout(gameOver, 2000)

        renderBoard(gBoard, '#board')
        return


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

function level(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    restartGame()
}

function randomMines(board) {
    var numOfMines = 0
    while (numOfMines < gLevel.MINES) {
        var i = Math.floor(Math.random() * gLevel.SIZE)
        var j = Math.floor(Math.random() * gLevel.SIZE)

  
    if (!board[i][j].isMine) {
        board[i][j].isMine = true
        numOfMines++
    }
}

}