'use strict'

function restartGame() {
    gGame.isOn = true
    gGame.revealedCount = 0
    updateRevealedCellsCount()
    document.querySelector('#game-message').innerText = ''
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '#board')
}

function gameOver() {
    const elContainer = document.querySelector('#game-message')
    elContainer.innerText = 'Game  Over!'
    gGame.isOn = false
}

function checkVictory() {
    const totalCells = gLevel.SIZE * gLevel.SIZE
    const totalSafeCells = totalCells - gLevel.MINES

    if (gGame.revealedCount === totalSafeCells) {
        gGame.isOn = false
        const elMsg = document.querySelector('#game-message')
        elMsg.innerText = 'You won 😄'
    }
}