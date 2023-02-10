document.body.addEventListener('click', e => {
    if (isSkippable) {
        animateAndNavigate(bc, 'fade-out', 'photo');
    };
});

run();


async function run() {
    let textElement = document.querySelector('#text01');
    // let winner = await getEventValue('getWinner', 'winner') ?? null;



    setTimeout(() => {
        textElement.classList.add('fade-in');
        
        setTimeout(() => {
            animateAndNavigate(bc, 'fade-out', 'photo');
        }, 10000);
    }, 2000);
};


function isSkippable() {
    return (localStorage.getItem('skip') ?? 'false') === 'true';
};






