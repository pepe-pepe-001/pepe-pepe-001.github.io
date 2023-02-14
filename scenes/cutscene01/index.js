//moved to html
//document.body.classList.add('fade-in');

animateText();

document.body.addEventListener('click', e => {
    if (isSkippable()) {
        animateAndNavigate(bc, 'fade-out', 'menu');
    };
});




function animateText() {
    //moved to css
    // //hide all text 
    // Array.from(document.querySelectorAll('.text'))
    //     .forEach(e => {
    //         e.style.opacity = 0;
    //     });

    setTimeout(() => {
        document.querySelector('#text01').classList.add('fade-in');

        setTimeout(() => {
            document.querySelector('#text02').classList.add('fade-in');

            setTimeout(() => {
                document.querySelector('#text03').classList.add('fade-in');

                setTimeout(() => {
                    animateAndNavigate(bc, 'fade-out', 'menu');
                }, 5000);
            }, 3000);
        }, 3000);
    }, 3000);


};