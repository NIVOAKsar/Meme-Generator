'use strict';

function initGen() {
    initMeme();
    createCanvas();
}

function onChangePref(id, value) {
    console.log(value);
    updateMeme(id, value);
    adjustPrefs();
    drawCanvas();
}

function onDownloadLink(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}
