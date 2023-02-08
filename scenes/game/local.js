
let turn = true;
let gameOver = false;
let turnElement = document.querySelector('#turn');

let cells = document.querySelectorAll('.cell');

// Array.from(cells).forEach(c => {
//     c.addEventListener('click', () => {
//         console.log('click');

//         let cclass = turn ? 'x' : 'o';
//         c.classList.add(cclass);
//         changeTurn();

//     });
// });

document.querySelector('#main')
    .addEventListener('click', event => {
        let target = event.target;

        let classList = target.classList;
        if (!gameOver
            && classList.contains('cell')
            && (!classList.contains('x')
                && !classList.contains('o'))) {

            let cclass = turn ? 'x' : 'o';
            classList.add(cclass);

            changeTurn();

            checkForWinner();

        }

    });


function changeTurn() {
    turn = !turn;
    turnElement.textContent = `Turn: ${turn ? 'X' : 'O'}`;
};

function checkForWinner() {
    let cellNodes = document.querySelectorAll('.cell');

    let cellArray = Array.from(cellNodes);

    let classArray = cellArray.map(c => {
        let clone = c.cloneNode();
        clone.classList.remove('cell');
        return clone.className;
    });

    console.log(classArray);

    let winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = '';
    for (let position of winningPositions) {
        if (classArray[position[0]] != ''
            && classArray[position[0]] == classArray[position[1]]
            && classArray[position[0]] == classArray[position[2]]) {

            winner = classArray[position[0]];
            turnElement.textContent = `${winner} is the winner!`;
            gameOver = true;
            console.log('there was a winner');
            return;
        }
    }

    

    // if (winner != '') {
    //     turnElement.textContent = `${winner} is the winner!`;
    //     gameOver = true;
    // }
};

