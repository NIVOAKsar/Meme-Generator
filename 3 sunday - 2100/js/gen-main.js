'use strict';
var gLastSelectedInputId = '';

function initGen() {
    initMeme();
    createCanvas();
}

function onChangePref(id, value) {
    console.log(value);
    updateMeme(id, value);
    // adjustPrefs(id);
    drawCanvas();
}
function onContentFocus(id) {
    gLastSelectedInputId = id;
}

function onDownloadLink(elLink, ev) {
    ev.preventDefault();
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function onCanvasClick(ev) {
    console.log(ev)
}