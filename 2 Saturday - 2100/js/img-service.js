'use strict';

var gImgs = [];


function initImgs() {
    gImgs = loadImgs();
}

function loadImgs() {
    let imgs = [];
    for (let i = 1; i <= 25; i++) {
        var img = createImg('' + i, `meme-imgs/${i}.jpg`);
        imgs.push(img);
    }
    return imgs;
}

function createImg(id, url, keywords) {
    return {
        id: id,
        url: url,
        keywords: 'happy'
    };
}

function readImgs() {
    return gImgs;
}