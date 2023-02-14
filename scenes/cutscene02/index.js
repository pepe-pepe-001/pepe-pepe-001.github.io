document.body.addEventListener('click', e => {
    if (isSkippable()) {
        animateAndNavigate(bc, 'fade-out', 'game');
    };
});

run();


async function run() {
    let textElement = document.querySelector('#text01');
    let difficulty = await getEventValue('getDifficulty', 'difficulty') ?? null;

    if (difficulty === 'hard') {
        textElement.textContent = `Even tough she's the most popular\nand beautiful girl in school I'm sure\nyou stand a chance. R-r-r-right?`;
    } else if (difficulty === 'medium') {
        textElement.textContent = `I'm certain her cold exterior means\nshe secretly loves you. R-r-right?`;
    } else if (difficulty === 'easy') {
        textElement.textContent = `She's your childhood friend, romance\nis essentially inevitable. Right?`;
    } else {
        textElement.textContent = 'Something went wrong...';
    };

    setTimeout(() => {
        textElement.classList.add('fade-in');
        
        setTimeout(() => {
            animateAndNavigate(bc, 'fade-out', 'game');
        }, 10000);
    }, 2000);
};

