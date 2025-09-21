'use strict'
// cells tipe
const MINE = '@'
const EMPTY = ' '
const HIDDEN = '?'


var gBoard

gBoard = buildBoard()

function buildBoard() {
    var board = []


    for (var i = 0; i < 4; i++) {
        board[i] = []


        for (var j = 0; j < 4; j++) {
            board[i][j] = HIDDEN
            if (i === 2 && j === 2) board[i][j] = MINE
            if (i === 3 && j === 3) board[i][j] = MINE

        }
    }
    console.table(board)
    return board

}
