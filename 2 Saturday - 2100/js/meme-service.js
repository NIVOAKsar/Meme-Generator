'use strict';

var gImgs = [];

var gMeme = {};
var KEY_IMAGES = 'images';

const ID_LENGTH = 8;

function initMeme() {
    gMeme = createMeme();
    getImages();
    var selectedId = loadFromStorage(KEY_CURR_IMG_ID);
    var selectedImg = getImgById(selectedId);
    if (selectedImg) initCanvas(selectedImg);
}

function getImgById(id) {
    return gImgs.find(function (img) {
        return img.id === id;
    })
}
function createImgs() {
    debugger
    for (let i = 1; i <= 25; i++) {
        var img = createImg(getRandomId(ID_LENGTH), `meme-imgs/${i}.jpg`, Object.keys(gImgKeywords)[getRandomIntInclusive(0, 5)]);
        gImgs.push(img);
    }
    return gImgs;
}

function getImages() {
    if (!gImgs || gImgs.length === 0) {
        let imgs = loadFromStorage(KEY_IMAGES);
        if (!imgs) {
            gImgs = createImgs();
            saveToStorage(KEY_IMAGES, gImgs);
        } else {
            gImgs = imgs;
        }
    }
    return gImgs;
}

function createImg(id, url, keywords) {
    return {
        id: id,
        url: url,
        keywords: keywords
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

function setCurrentImage(id) {
    gCurrentImgId = id;
}

