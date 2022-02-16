const hint = document.getElementById('hint');
const btn = document.getElementById('btn_show');

btn.addEventListener('click', function () {
    let ctr = 1;
    hint.className = hint.className !== 'show' ? 'show' : 'hide';
    if (hint.className === 'show') {
        hint.style.display = 'block';
        window.setTimeout(function () {
            hint.style.opacity = 1;
            hint.style.transform = 'scale(1)';
        }, 0);
    }
    if (hint.className === 'hide') {
        hint.style.opacity = 0;
        hint.style.transform = 'scale(0)';
        window.setTimeout(function () {
            hint.style.display = 'none';
        }, 700);
    }
});