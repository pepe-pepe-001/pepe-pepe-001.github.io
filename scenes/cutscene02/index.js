document.body.addEventListener('click', e => {
    if (isSkippable) {
        animateAndNavigate(bc, 'fade-out', 'game');
    };
});

run();


async function run() {
    let textElement = document.querySelector('#text01');
    let difficulty = await getEventValue('getDifficulty', 'difficulty') ?? null;

    if (difficulty === 'hard') {
        textElement.textContent = 'hard text';
    } else if (difficulty === 'medium') {
        textElement.textContent = 'medium text';
    } else if (difficulty === 'easy') {
        textElement.textContent = 'easy text';
    } else {
        textElement.textContent = 'Something went wrong...';
    };

    setTimeout(() => {
        textElement.classList.add('fade-in');
        
        setTimeout(() => {
            animateAndNavigate(bc, 'fade-out', 'game');
        }, 5000);
    }, 3000);
};


function isSkippable() {
    return (localStorage.getItem('skip') ?? 'false') === 'true';
};






