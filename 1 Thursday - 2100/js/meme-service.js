'use strict';

var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
var gMeme = {};


function initMeme() {
    gMeme = createMeme();
}

function createMeme() {
    return {
        imgId: 1,
        txts: {
            line: 'default',
            size: 20,
            align: 'center',
            color: 'white'
        }
    };
}

function updateMeme(prop, value) {
    gMeme[prop] = value;
}

function readMeme() {
    return gMeme;
}


function drawImg() {
    var img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width / 2, gCanvas.height / 2);
}

