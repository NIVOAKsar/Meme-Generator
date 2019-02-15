'use strict';

var gImgs = [];
var gMeme = {};


function initMeme() {
    gImgs = createImgs();
    gMeme = createMeme();
    initCanvas(gImgs[9]);
}

function createImgs() {
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

function createMeme() {
    return {
        imgId: 1,
        txt: {
            'content': '',
            'size': '80px',
            'font-family': 'impact',
            'fill-style': '#ffffff',
            'fill-on': true,
            'stroke-on': true,
            'stroke-style': '#000000',
            'stroke-width': 3,
            'align': 'center'
        }
    };
}

function genMeme(meme) {
    gMeme = meme;
}

function updateText(prop, value) {
    gMeme['txt'][prop] = value;
}
function readMeme() {
    return gMeme;
}



