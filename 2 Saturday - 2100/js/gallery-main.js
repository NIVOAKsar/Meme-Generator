'use strict';

function initGallery() {

    initImgs();
    renderGallery();
}

function renderGallery() {
    let imgs = readImgs();
    let count = 1;
    let row = 1;
    let strHtmls = imgs.map((img) => {
        if (count > 7) {
            row++;
            count = 1;
        }
        else count++;
        return `<img id="${img.id}" src="${img.url}" style="grid-row:${row}" onclick="imgClicked(this)"/>`;
    });

    $('.img-grid').html(strHtmls.join(''));
}

function imgClicked(elImg) {
    saveToStorage('img', {
        id: elImg.id,
        src: elImg.src,
        naturalWidth: elImg.naturalWidth,
        naturalHeight: elImg.naturalHeight
    });
    window.location = 'index.html';
}