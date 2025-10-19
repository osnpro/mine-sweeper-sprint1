'use strict'
const MINE = '💣'
const EMPTY = ' '

var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    revealedCount: 0,
}

function buildBoard() {
    var board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []

        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                isMine: false,
                isRevealed: false,
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

function onInit() {
    restartGame()
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

function expandReveal(board, i, j) {
    var cell = board[i][j]
    if (cell.isRevealed || cell.isMine) return

    cell.isRevealed = true
    gGame.revealedCount++
    updateRevealedCellsCount()
    checkVictory()

    if (cell.minesAroundCount > 0) return

    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= board.length) continue

        for (var y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y >= board[0].length) continue
            if (x === i && y === j) continue

            expandReveal(board, x, y)
        }
    }
}

function onCellClicked(i, j) {
    if (!gGame.isOn) return
    const cell = gBoard[i][j]
    if (cell.isRevealed) return
    if (cell.isMine) {
        cell.isRevealed = true
        playSound()

        setTimeout(gameOver, 2000)
    }
    else if (cell.minesAroundCount === 0) {
        expandReveal(gBoard, i, j)
    }
    else {
        cell.isRevealed = true
        gGame.revealedCount++
        updateRevealedCellsCount()
        checkVictory()
    }
    renderBoard(gBoard, '#board')
    return
}

function playSound() {
    const audio = new Audio('sound/pop.mp3')
    audio.play()
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

function updateRevealedCellsCount() {
    const elCount = document.getElementById('revealedCells-count')
    elCount.innerText = gGame.revealedCount
}

