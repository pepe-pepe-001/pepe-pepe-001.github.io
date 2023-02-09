const testEle = document.querySelector('#test');

bc.addEventListener('message', event => {
    console.log('getWinner in post_game');
    if (event.data.type === 'getWinner' && event?.data?.winner) {
        if (event?.data?.winner == 'x') {
            testEle.textContent = 'You won!!!';
        } else if (event?.data?.winner == 'o') {
            testEle.textContent = 'You lost...';
        } else {
            testEle.textContent = 'It was a draw.';
        };
    };
});

bc.postMessage({
    type: 'getWinner',

})

setTimeout(() => {
    //set skip true to enable skipping cutscenes
    localStorage.setItem('skip', 'true');

    animateAndNavigate(bc, 'slide-out-left', 'menu');
}, 3000);