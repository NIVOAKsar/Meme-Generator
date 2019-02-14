'use strict';
var gCanvas;
var gCtx;

function init() {
    initMeme();
    render();
    setCanvasOnBoard();
}

function render() {
    var meme = readMeme();
    console.table(meme);
}

function onChangeProp() {
    updateMeme('imgId', 2);
    render();
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




/* CONTROLLER*/
// init()
// render()
// onEvent()

/* MODEL */
// init()
// create()
// add()
// remove()
// update()
// read() => get for display