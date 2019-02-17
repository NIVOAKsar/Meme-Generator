'use strict';

var gMeme = {};

function initMeme() {
    gMeme = createMeme(loadFromStorage('img'));
}

function createMeme(img) {
    return {
        img: img,
        txt: {
            'content-top': '',
            'content-bottom': '',
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

function updateMeme(prop, value) {
    gMeme['txt'][prop] = value;
}

function readMeme() {
    return gMeme;
}



