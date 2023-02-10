document.body.addEventListener('click', e => {
    if (isSkippable) {
        animateAndNavigate(bc, 'fade-out', 'menu');
    };
});

run();


async function run() {
    // let textElement = document.querySelector('#text01');

    setTimeout(() => {
        document.querySelector('.polaroid img').classList.add('fade-in');
        
        setTimeout(() => {
            animateAndNavigate(bc, 'fade-out', 'menu');
        }, 10000);
    }, 1000);
};
