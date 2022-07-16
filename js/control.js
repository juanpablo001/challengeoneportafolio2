const btnUp = document.getElementById('btn__up');


window.addEventListener('scroll', () => {
    if (window.innerWidth >= 900 && window.scrollY > 400) {
        btnUp.classList.add('btn__up__ver');
    } else {
        btnUp.classList.remove('btn__up__ver');
    }
});