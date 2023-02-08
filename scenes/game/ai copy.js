setCellDimensions();

// const bc = new BroadcastChannel('main');

let turn = true;
let gameOver = false;
let turnElement = document.querySelector('#turn');

let cells = document.querySelectorAll('.cell');



document.querySelector('.sceneContainer')
    .addEventListener('click', event => {
        let target = event.target;

        let classList = target.classList;

        if (!gameOver
            && turn
            && classList.contains('cell')
            && (!classList.contains('x')
                && !classList.contains('o'))) {

            let cclass = turn ? 'x' : 'o';
            classList.add(cclass);

            let cellNodes = document.querySelectorAll('.cell');

            let cellArray = Array.from(cellNodes);

            let classArray = cellArray.map(c => {
                let clone = c.cloneNode();
                clone.classList.remove('cell');
                return clone.className;
            });

            //temp
            endGame();

            // console.log(classArray);
            let move = minmax(classArray, 'o');
            // console.log(move);

            document.querySelector(`#cell${move.index}`).classList.add('o');


            //temp
            endGame();

        }

    });



const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkForWinner(board, turn) {

    for (let position of winningPositions) {
        if (board[position[0]] == turn
            && board[position[0]] == board[position[1]]
            && board[position[0]] == board[position[2]]
        ) {
            return true;
        };
    };

    return false;
};

function findEmptyCells(board) {
    let indexArray = [];
    for (let [i, v] of board.entries()) {
        if (v == '') {
            indexArray.push(i);
        };
    };

    return indexArray;
};

function minmax(newBoard, turn) {
    // console.log('------>');

    let emptyCells = findEmptyCells(newBoard);
    // console.log('empty: ', emptyCells);

    if (checkForWinner(newBoard, 'x')) {
        return { score: -10, board: newBoard };
    } else if (checkForWinner(newBoard, 'o')) {
        return { score: 10, board: newBoard };
    } else if (emptyCells.length == 0) {
        return { score: 0, board: newBoard };
    };


    let moves = [];

    // for (let index of emptyCells) {
    for (let index = 0; index < emptyCells.length; index++) {
        var move = {};
        move.index = emptyCells[index];
        // console.log('turn: ', turn);
        newBoard[emptyCells[index]] = turn;
        // console.log('board: ', newBoard);

        if (turn == 'o') {
            move.score = minmax(newBoard, 'x').score;
        } else {
            move.score = minmax(newBoard, 'o').score;
        };

        move.board = newBoard;

        newBoard[emptyCells[index]] = '';

        // console.log('push: ', move);
        moves.push(move);

    };

    // console.log('moves: ', moves);

    let bestMove;

    if (turn == 'o') {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            };
        };
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            };
        };
    };

    // console.log('board: ', newBoard);
    // console.log('best :', moves[bestMove]);
    return moves[bestMove];
};

function changeTurn() {
    turn = !turn;
    turnElement.textContent = `Turn: ${turn ? 'X' : 'O'}`;
};

function endGame() {
    let cellNodes = document.querySelectorAll('.cell');

    let cellArray = Array.from(cellNodes);

    let classArray = cellArray.map(c => {
        let clone = c.cloneNode();
        clone.classList.remove('cell');
        return clone.className;
    });

    let winner = '';
    // let winner = checkForWinner(classArray, 'x') ? 'x' : (checkForWinner(classArray, 'o') ? 'o' : '');


    // //check if draw
    // winner = classArray.some(e => e == '') ? '' : 'draw';
    // console.log(classArray, `result: ${winner}`);

    if (!classArray.some(e => e == '')) {
        winner = 'draw';
    }
    else if (checkForWinner(classArray, 'x')) {
        winner = 'x';
    } else if (checkForWinner(classArray, 'o')) {
        winner = 'o';
    };


    if (winner) {
        gameOver = true;

        // bc.postMessage({
        //     type: 'navigation',
        //     destination: 'post_game'
        // });

        //let main 'controller' know who won
        bc.postMessage({
            type: 'setWinner',
            winner: winner
        });

        animateAndNavigate(bc, 'slide-out-left', 'post_game');
    };
};


// set dimensions of cell
function setCellDimensions() {

    let mw = parseInt(getCSSvariable('gameWidth').replace('px', '')),
        mh = parseInt(getCSSvariable('gameHeight').replace('px', '')),
        cp = 10,
        cw = 0,
        ch = 0;

    cw = Math.round((mw - 6 * cp) / 3);
    ch = Math.round((mh - 6 * cp) / 3);

    let r = document.querySelector(':root');

    r.style.setProperty('--cp', `${cp}px`);
    r.style.setProperty('--cw', `${cw}px`);
    r.style.setProperty('--ch', `${ch}px`);

};
