'use strict';

function initGen() {
    initMeme();
    createCanvas();
}

function onChangePref(id, value) {
    // debugger
    console.log(value);
    updateMeme(id, value);
    adjustPrefs();
    drawCanvas();
}

function onDownloadLink(elLink, ev) {
    ev.preventDefault();
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}
