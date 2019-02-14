'use strict';
var gCanvas;
var gCtx;
var isDraggable = false;

function init() {
    initMeme();
    setCanvasOnBoard();
    renderMeme();
}

function renderMeme() {
    var meme = readMeme();

    var elTxt = document.querySelector('.text-container');
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

function drawText() {
    // debugger
    var elTxt = document.querySelector('.text-container');
    var rect = elTxt.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    // console.log(e)
    var text = elTxt.value;
    gCtx.fillStyle = 'white';
    gCtx.font = '20px Impact';
    console.log(elTxt);
    gCtx.fillText(text, 300, 25);
    elTxt.style.display = 'none';
}
function onMouseMove(el, ev) {
    if (isDraggable) {
        var elText = document.querySelector('.text-container')

        console.log('el', el);
        console.log('ev', ev);
    }
}

function onMouseDown() {
    isDraggable = true;
}
function onMouseUp() {
    isDraggable = false;
}
function onChangeTextProp(id, value) {
    updateTextProp(id, value);
    renderMeme();
}

function onSubmitForm(ev) {
    event.preventDefault()
    // debugger
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
    drawText();
    renderMeme();
}