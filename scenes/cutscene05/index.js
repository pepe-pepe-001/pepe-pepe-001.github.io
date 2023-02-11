document.body.addEventListener('click', e => {
    if (isSkippable) {
        transition();
    };
});

run();


async function run() {
    let textElement = document.querySelector('#text01');
    // let winner = await getEventValue('getWinner', 'winner') ?? null;



    setTimeout(() => {
        textElement.classList.add('fade-in');
        
        setTimeout(() => {
            transition();
        }, 10000);
    }, 2000);
};


function isSkippable() {
    return (localStorage.getItem('skip') ?? 'false') === 'true';
};

function transition() {
    setTimeout(() => {
        let ele = document.querySelector('#sound');
        ele.play();
    }, 1000);
    document.querySelector('.container').style.opacity = 0;
    animateAndNavigate(bc, 'camera-flash', 'photo', 2000);
}




