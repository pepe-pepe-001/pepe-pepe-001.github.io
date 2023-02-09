const playButton = document.querySelector('#playButton');


function navigateToGallery() {
    bc.postMessage({
        type: 'navigation',
        destination: 'gallery'
    });
};

playButton.addEventListener('click', event => {
    animateAndNavigate(bc, 'slide-out-left', 'difficulty');
});

//sound button
let soundButton = document.querySelector('#sound_button');
soundButton.addEventListener('click', event => {
    if (soundButton.dataset.sound == 'true') {
        soundButton.dataset.sound = 'false';
        soundButton.textContent = '🔇';
    } else {
        soundButton.dataset.sound = 'true';
        soundButton.textContent = '🔊';
    }
});