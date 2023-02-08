function navigateToMenu() {
    bc.postMessage({
        type: 'navigation',
        destination: 'menu'
    });
};