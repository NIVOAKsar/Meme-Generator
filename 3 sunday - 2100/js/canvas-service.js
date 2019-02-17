'use strict';

var topTxt;
var bottomTxt;
var gCanvas;
var gCtx;
var currImg;
var isMouseDown;

function createCanvas() {
    isMouseDown = false;
    let container = document.querySelector('.canvas-container');
    let img = readMeme().img;
    container.innerHTML = `
    <canvas id="main-canvas"
    onmousedown="isMouseDown=true"
    onmouseup="isMouseDown=false"
    onmousemove="onMouseMove(event)">
        <img src="${img.src}" onload="currImg=this; drawCanvas()" />
    </canvas>`;

    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    adjustSize();
    adjustPrefs();

    topTxt = { x: gCanvas.width / 2, y: gCanvas.height - (0.8 * gCanvas.height) };
    bottomTxt = { x: gCanvas.width / 2, y: gCanvas.height - (0.2 * gCanvas.height) };

}

function adjustSize() {
    let imgWidth = readMeme().img.naturalWidth;
    let imgHeight = readMeme().img.naturalHeight;
    gCanvas.width = imgWidth;
    gCanvas.height = imgHeight;

    // let parentWidth = document.querySelector('.canvas-container').scrollWidth;
    // let parentHeight = document.querySelector('.canvas-container').scrollHeight;
    // let ratio = 1;
    // if (imgWidth > parentWidth) ratio = imgWidth / parentWidth;
    // else if (imgHeight > parentHeight) ratio = imgHeight / parentHeight

    // gCanvas.width = imgWidth / ratio;
    // gCanvas.height = imgHeight / ratio;
}

function adjustPrefs() {
    let memeTxt = readMeme()['txt'];
    gCtx.font = `${memeTxt['size']} ${memeTxt['font-family']}`;
    gCtx.fillStyle = memeTxt['fill-style'];
    gCtx.strokeStyle = memeTxt['stroke-style'];
    gCtx.lineWidth = memeTxt['stroke-width'];
    gCtx.textAlign = memeTxt['align'];
    gCtx.textBaseline = 'middle';
}

function drawCanvas() {
    gCtx.drawImage(currImg, 0, 0, gCanvas.width, gCanvas.height);
    gCtx.beginPath();
    let memeTxt = readMeme()['txt'];
    if (memeTxt['fill-on']) {
        gCtx.fillText(memeTxt['content-top'], topTxt['x'], topTxt['y']);
        gCtx.fillText(memeTxt['content-bottom'], bottomTxt['x'], bottomTxt['y']);
    }

    if (memeTxt['stroke-on']) {
        gCtx.strokeText(memeTxt['content-top'], topTxt['x'], topTxt['y']);
        gCtx.strokeText(memeTxt['content-bottom'], bottomTxt['x'], bottomTxt['y']);
    }

    gCtx.closePath();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onMouseMove(ev) {
    if (isMouseDown) {
        let [x, y] = [ev.offsetX, ev.offsetY];
        topTxt = { x: x, y: y };
        clearCanvas();
        drawCanvas();
    }
}

function onChangeAlign(id, value) {
    var offsetX = 0;
    if (value === 'center') offsetX = .5;
    else if (value === 'right') offsetX = .8;
    else offsetX = .2;  //left
    
    topTxt = { x: gCanvas.width * offsetX, y: gCanvas.height - (0.8 * gCanvas.height) };
    bottomTxt = { x: gCanvas.width * offsetX, y: gCanvas.height - (0.2 * gCanvas.height) };
    clearCanvas();
    drawCanvas();
}





