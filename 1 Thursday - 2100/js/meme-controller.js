'use strict';
var gCanvas;
var gCtx;

function init() {
    initMeme();
    setCanvasOnBoard();
    renderMeme();
}

function renderMeme() {
    var meme = readMeme();
    console.table(meme);
}

function onChangeMemeProp(id, value) {
    updateMemeProp(id, value);
    renderMeme();
}

function setCanvasOnBoard() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
}


function drawImg() {
    var img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}



function onChangeTextProp(id, value) {
    updateTextProp(id, value);
    renderMeme();
}

function onSubmitForm(ev) {
    event.preventDefault()
    let meme = {
        imgId: readMeme().imgId,
        txts: {
            content: document.querySelector('#memeForm #content').value,
            size: document.querySelector('#memeForm #size').value,
            align: document.querySelector('#memeForm #align').value,
            color: document.querySelector('#memeForm #color').value
        }
    }
    genMeme(meme);
    renderMeme();
}