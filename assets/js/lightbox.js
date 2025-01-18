

document.querySelectorAll('.thumb').forEach((elem) => {
    

    elem.addEventListener('click', () => {
        const bigImg = elem.getAttribute('data-big');
        document.querySelector('#big-img > img').setAttribute('src', bigImg);
        document.querySelector('#big-img').style.display = 'flex';
        document.querySelector('#x').style.opacity = '1';
    });
});

function closeLightbox() {
    document.querySelector('#big-img').style.display = 'none';
}

document.querySelector('#big-img').addEventListener('click', closeLightbox);
document.addEventListener('keydown', closeLightbox); 