const computerButton = document.querySelector('#computerButton');

computerButton.addEventListener('click', event => {
    animateAndNavigate(bc, 'slide-out-left', 'difficulty');
});