setCellDimensions();
getDifficulty();


// const bc = new BroadcastChannel('main');

let turn = true;
let gameOver = false;
let difficulty = null;
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
            if (endGame()) return;

            // console.log(classArray);
            //console.log(difficulty);
            let move = minmax(classArray, 'o', difficulty);
            // console.log(move);
            move = move.bestMove;

            document.querySelector(`#cell${move.index}`).classList.add('o');


            //temp
            if (endGame()) return;

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

function minmax(newBoard, turn, difficulty = 'hard') {
    let node = {};
    node.id = Math.floor(Math.random() * 100000000);
    node.board = newBoard;
    node.turn = turn;
    // console.log('------>');

    let emptyCells = findEmptyCells(newBoard);
    // console.log('empty: ', emptyCells);

    if (checkForWinner(newBoard, 'x')) {
        node.score = -10;
        return node;
    } else if (checkForWinner(newBoard, 'o')) {
        node.score = 10;
        return node;
    } else if (emptyCells.length == 0) {
        node.score = 0;
        return node;
    };



    node.moves = [];

    // for (let index of emptyCells) {
    for (let index = 0; index < emptyCells.length; index++) {
        var move = {};
        // console.log('turn: ', turn);
        newBoard[emptyCells[index]] = turn;
        // console.log('board: ', newBoard);

        if (turn == 'o') {
            move = minmax(newBoard, 'x', difficulty);
        } else {
            move = minmax(newBoard, 'o', difficulty);
        };
        // console.log(move.score);
        // if (!move?.score) debugger;
        move.index = emptyCells[index];

        // move.board = newBoard;

        newBoard[emptyCells[index]] = '';

        // console.log('push: ', move);
        node.moves.push(move);

    };

    function getBestMove() {
        let easyMoves = [];
        let mediumMoves = [];
        let bestMove;

        //hard
        if (turn == 'o') {
            let bestScore = -10000;
            for (let i = 0; i < node.moves.length; i++) {
                if (node.moves[i].score > bestScore) {
                    bestScore = node.moves[i].score;
                    bestMove = i;

                };
            };
        } else {
            let bestScore = 10000;
            for (let i = 0; i < node.moves.length; i++) {
                if (node.moves[i].score < bestScore) {
                    bestScore = node.moves[i].score;
                    bestMove = i;
                };
            };
        };

        //medium
        mediumMoves.push(bestMove);
        mediumMoves.push(bestMove);
        mediumMoves.push(bestMove);
        mediumMoves.push(getRandomInt(0, node.moves.length));
        mediumMoves.push(bestMove);

        //easy
        easyMoves.push(getRandomInt(0, node.moves.length));
        easyMoves.push(bestMove);
        easyMoves.push(getRandomInt(0, node.moves.length));

        // for (let i = 0; i < 2; i++) {
        // };

        let temp;
        if (difficulty == 'easy') {
            return easyMoves[getRandomInt(0, easyMoves.length)];
        } else if (difficulty == 'medium') {
            return mediumMoves[getRandomInt(0, mediumMoves.length)];
        } else {
            return bestMove;
        };
    };

    let bestMove = getBestMove();

    node.bestMove = node.moves[bestMove];
    node.score = node.bestMove.score;
    node.branchScore = node.moves.reduce((p, c) => p + (c.score ?? -10), 0);
    // if (!node?.bestMove) debugger;
    // console.log(node.bestMove);
    return node;
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

        if (winner === 'x') {
            animateAndNavigate(bc, 'slide-out-left', 'post_game');
        } else {
            animateAndNavigate(bc, 'slide-out-left', 'cutscene03');
        };

        return true;
    };
    return false;
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

function plotDecision(node) {
    let code = `
    graph TD
    node.id['${JSON.stringify(node.board.join())}'] --> 512512[Two]
    `;
    code = code.trim();
    mermaid.render('preparedScheme', code, c => {
        document.querySelector('.mermaid').innerHTML = c;
    });

};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

function getDifficulty() {

    bc.addEventListener('message', event => {
        console.log('getDifficulty in game');
        if (event.data.type === 'getDifficulty' && event?.data?.difficulty) {
            difficulty = event?.data?.difficulty;
        };
    });

    bc.postMessage({
        type: 'getDifficulty'
    })

};