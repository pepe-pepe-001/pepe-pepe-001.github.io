//set line height of title
setCSSVariable('root', 'titleHeight', `${document.querySelector('.title').clientHeight}px`)

//set size of portraits on load
let h = document.querySelector('.option').clientHeight;
setCSSVariable('root', 'imgHeight', `${h}px`)

// hard button
const hardButton = document.querySelector('#hardButton');
hardButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'hard'
    });

    animateAndNavigate(bc, 'slide-out-left', 'cutscene02');
});

//easy button
const easyButton = document.querySelector('#easyButton');
easyButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'easy'
    });

    animateAndNavigate(bc, 'slide-out-left', 'cutscene02');
});

//medium button
const mediumButton = document.querySelector('#mediumButton');
mediumButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'medium'
    });

    animateAndNavigate(bc, 'slide-out-left', 'cutscene02');
});

