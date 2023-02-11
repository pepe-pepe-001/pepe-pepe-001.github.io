document.body.addEventListener('click', e => {
    if (isSkippable) {
        animateAndNavigate(bc, 'fade-out', 'menu');
    };
});

run();


async function run() {
    let winner = await getEventValue('getWinner', 'winner');
    let difficulty = await getEventValue('getDifficulty', 'difficulty') ?? null

    console.log(winner);
    let text = document.querySelector('.polaroid-text');
    let img = document.querySelector('img');
    if (winner == 'x') {
        text.innerHTML = "!!Victory!!";
        if (difficulty == 'hard') {
            img.src = "../difficulty/assets/hard.png";
        } else if (difficulty == 'medium') {
            img.src = "../difficulty/assets/medium.png";
        } else {
            img.src = "../difficulty/assets/easy.png";
        }
    }

    setTimeout(() => {
        document.querySelector('.polaroid img').classList.add('fade-in');
        
        setTimeout(() => {
            animateAndNavigate(bc, 'fade-out', 'menu');
        }, 10000);
    }, 1000);
};
