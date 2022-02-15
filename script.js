'use strict';
{
    const elements = document.getElementsByClassName('headerSearch');
    const header = document.getElementById('header');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mousemove', (e) => {
            // header.style.display = "block";
            if (e) {
                // alert('hi');
                header.style.display = "block";
            } else if (!e) {
                console.log('hi')
            }
        })
        // elements[i].addEventListener('mousemove', () => {
        //     document.getElementById('header').style.display = "block";
        // });
    }
}