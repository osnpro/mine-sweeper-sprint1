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
            board[i][j] = HIDDEN
            
        }
    }
    board[2][2] = MINE
    board[3][3] = MINE
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

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}
restartGame()
