'use strict';

var gImgs = [];
var gMeme = {};


function initMeme() {
    gImgs = createImgs();
    gMeme = createMeme();
    console.log(gImgs);
}

function createImgs() {
    for (let i = 1; i <= 25; i++) {
        gImgs.push(createImg('' + i, `meme-imgs/${i}.jpg`));
    }
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
        txts: {
            content: 'default',
            size: 20,
            align: 'center',
            color: 'white'
        }
    };
}

function genMeme(meme) {
    gMeme = meme;
}

function updateMemeProp(prop, value) {
    gMeme[prop] = value;
}

function updateTextProp(prop, value) {
    gMeme['txts'][prop] = value;
}

function readMeme() {
    return gMeme;
}



