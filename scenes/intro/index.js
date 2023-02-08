//set the logo w, h dynamically
setLogoCSSVariables();


//start process to switch to game menu after 3 seconds
//logo will animate for 2 seconds on load
setTimeout(() => {

    //start fade out animation after 3 seconds
    //fade-out animation is set up to be 0.5s long
    animateAndNavigate(bc, 'fade-out', 'menu');
}, 3000);

function setLogoCSSVariables() {
    let gameWidth = parseInt(getCSSvariable('gameWidth').replace('px', '')),
        gameHeight = parseInt(getCSSvariable('gameHeight').replace('px', '')),
        logoWidth = Math.floor(gameWidth * 0.6),
        logoHeight = Math.floor(gameHeight * 0.6);
    setCSSVariable('root', 'logoWidth', `${logoWidth}px`);
    setCSSVariable('root', 'logoHeight', `${logoHeight}px`);
};