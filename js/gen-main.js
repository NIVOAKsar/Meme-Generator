'use strict';
var gLastSelectedInputId = '';

function initGen() {
    initMeme();
    createCanvas();
}

function onChangePref(id, value) {
    console.log(value);
    updateMeme(id, value);
    drawCanvas();
}
function onContentFocus(id){
    gLastSelectedInputId = id;
}

function onDownloadLink(elLink, ev) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function onCanvasClick(ev){
    console.log(ev)
}