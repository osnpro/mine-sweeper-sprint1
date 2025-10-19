'use strict'
function renderBoard(board, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j} ${cell.isRevealed ? 'revealed' : ''}`
            const cellCont = cell.isRevealed ? (cell.isMine ? MINE : (cell.minesAroundCount > 0 ? cell.minesAroundCount : EMPTY)) : ''

            strHTML += `<td class="${className}"onclick="onCellClicked(${i}, ${j})">${cellCont}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}