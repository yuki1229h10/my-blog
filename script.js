'use strict';
{
    const elements = document.getElementsByClassName('headerSearch');
    const header = document.getElementById('header');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('mouseover', () => {
            header.style.top = '80px';
            header.style.pointerEvents = 'auto';
        });
        elements[i].addEventListener('mouseleave', () => {
            header.style.top = '0';
            header.style.pointerEvents = 'none';
        });
    }
}