const bc = new BroadcastChannel('main');

//set the size of our scenes
setSceneCSSVariables(300, 300);



const navigate = function (bc, page) {
    bc.postMessage({
        type: 'navigation',
        destination: page
    });
};

// export {bc, navigate};

//animate and navigate to new scene
function animateAndNavigate(bc, animation, destination) {

    //add animation class to the body element
    document.body.className = '';
    document.body.classList.add(animation);

    //trigger scene change after animation
    setTimeout(() => {
        bc.postMessage({
            type: 'navigation',
            destination: destination
        });
    }, 500);
};

// set the size of the scene var in global.css
function setSceneCSSVariables(gw, gh) {
    // let r = document.querySelector(':root');

    // r.style.setProperty('--gameWidth', `${gw}px`);
    // r.style.setProperty('--gameHeight', `${gh}px`);
    setCSSVariable('root', 'gameWidth', `${gw}px`);
    setCSSVariable('root', 'gameHeight', `${gh}px`);
};

// helper function to set css variable
function setCSSVariable(eleName, varName, value) {
    document.querySelector(`:${eleName}`)
    .style.setProperty(`--${varName}`, value);
};

//helper funciton to get css variable
function getCSSvariable(varName) {
    return getComputedStyle(document.body).getPropertyValue(`--${varName}`);
};