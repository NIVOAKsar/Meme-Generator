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
            content: 'default',
            size: 20,
            align: 'center',
            color: 'white'
        }
    };
}

function genMeme(meme) {
    console.log('hey');
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



