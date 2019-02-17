'use strict';

var gImgs = [];
var KEY_IMAGES = 'images';
const ID_LENGTH = 8;
var initialInfo = ['animal', 'funny', 'akward', 'animal', 'happy', 'bad', 'funny', 'akward', 'akward', 'funny', 'funny', 'animal', 'funny',
    'happy', 'animal', 'bad', 'happy', 'funny', 'bad', 'akward', 'funny', 'sad', 'happy', 'happy', 'happy']


function loadImgs() {
    let imgs = [];
    for (let i = 1; i <= 25; i++) {
        var img = createImg('' + i, `meme-imgs/${i}.jpg`);
        imgs.push(img);
    }
    return imgs;
}

function setCurrentImage(id) {
    gCurrentImgId = id;
}

function createImg(id, url, keywords) {
    return {
        id: id,
        url: url,
        keywords: keywords
    };
}
function createImgs() {
    for (let i = 1; i <= 25; i++) {
        var img = createImg(getRandomId(ID_LENGTH), `meme-imgs/${i}.jpg`, initialInfo[i - 1]);
        gImgs.push(img);
    }
    return gImgs;
}

function getImgById(id) {
    return gImgs.find(function (img) {
        return img.id === id;
    })
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

function getImagesToDisplay() {
    gImgs = getImages();
    var filteredImges = gImgs.filter(function (img) {
        if (filterByWord === '') return true;
        return img.keywords === filterByWord;
    })
    return filteredImges;
}