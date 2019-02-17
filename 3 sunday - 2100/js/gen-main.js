'use strict';
var gLastSelectedInputId = '';

function initGen() {
    initMeme();
    createCanvas();
}

function onChangePref(id, value) {
    // debugger
    // if (id === 'content-top' || id === 'content-bottom') gLastSelectedInputId = id;

    console.log(value);
    updateMeme(id, value);
    // adjustPrefs(id);
    drawCanvas();
}
function onContentFocus(id){
    // debugger
    gLastSelectedInputId = id;
}

function onDownloadLink(elLink, ev) {
    ev.preventDefault();
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}

function onCanvasClick(ev){
    console.log(ev)
}