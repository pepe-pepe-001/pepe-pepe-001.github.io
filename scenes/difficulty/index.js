// hard button
const hardButton = document.querySelector('#hardButton');
hardButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'hard'
    });

    animateAndNavigate(bc, 'slide-out-left', 'game');
});

//easy button
const easyButton = document.querySelector('#easyButton');
easyButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'easy'
    });

    animateAndNavigate(bc, 'slide-out-left', 'game');
});

//medium button
const mediumButton = document.querySelector('#mediumButton');
mediumButton.addEventListener('click', event => {


    //let main 'controller' know the difficulty selected
    bc.postMessage({
        type: 'setDifficulty',
        difficulty: 'medium'
    });

    animateAndNavigate(bc, 'slide-out-left', 'game');
});

