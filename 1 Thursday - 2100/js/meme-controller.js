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
    var el = document.getElementById('text-container');

    var textWidth = gCtx.measureText(el.value).width;
    var leftPosToRender = el.offsetLeft + (el.offsetWidth / 2) - (textWidth);
    var topPosToRender = el.offsetTop + (el.offsetHeight/2) +7 ;

    var text = el.value;
    gCtx.fillStyle = 'white';
    gCtx.font = '20px Impact';

    gCtx.fillText(text, leftPosToRender, topPosToRender);
    //hide the input element
    el.style.display = 'none';
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