const rbc = new BroadcastChannel('main');
const sbc = new BroadcastChannel('main');

const objectContainer = document.querySelector('object');

const routes = {
    menu: './scenes/menu/index.html',
    gallery: './scenes/gallery/index.html',
    game: './scenes/game/index.html',
    post_game: './scenes/post_game/index.html',
    game_mode: './scenes/game_mode/index.html',
    difficulty: './scenes/difficulty/index.html',
    cutscene01: './scenes/cutscene01/index.html',
    cutscene02: './scenes/cutscene02/index.html'
};

let winner = '',
    difficulty = '';

rbc.addEventListener('message', event => {
    // console.log(event);
    if (event.data.type === 'navigation') {
        objectContainer.setAttribute('data', routes[event.data.destination]);
    } else if (event.data.type === 'setWinner') {
        winner = event.data.winner;
    } else if (event.data.type === 'getWinner' && !event.data.winner) {
        sbc.postMessage({
            type: 'getWinner',
            winner: winner
        });
    } else if (event.data.type === 'setDifficulty') {
        difficulty = event.data.difficulty;
    } else if (event.data.type === 'getDifficulty' && !event.data.difficulty) {
        sbc.postMessage({
            type: 'getDifficulty',
            difficulty: difficulty
        });
    }
});

rbc.addEventListener('messageerror', event => {
    console.error(event);
});

// setTimeout(() => {
//     objectContainer.setAttribute('data', routes['menu']);
// }, 1000);
