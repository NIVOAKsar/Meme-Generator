'use strict';

var isMouseDown;
var gCurrImg;
var gCtx;
var gTxtPos;
var gCanvas;

function initCanvas(img) {
    isMouseDown = false;
    gCurrImg = img;
    gCanvas = document.querySelector('#main-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 100;
    gCanvas.height = 100;

    adjustCanvasSize();
    addListeners();
    adjustCanvasPrefs();
    gTxtPos = { x: gCanvas.width / 2, y: gCanvas.height - (0.8 * gCanvas.height) };
}

function adjustCanvasSize() {
    var width = document.querySelector('.canvas-container').scrollWidth;
    var height = document.querySelector('.canvas-container').scrollHeight;
    gCanvas.width = width;
    gCanvas.height = height;
    // let imgWidth = gCurrImg.width;
    // let imgHeight = gCurrImg.height;

    // var max = Math.max(imgWidth, imgHeight);
    // let maxSize = 1 * width;
    // if (max > maxSize) {
    //     let ratio = max / maxSize;
    //     imgWidth /= ratio;
    //     imgHeight /= ratio;
    // }
    // gCanvas.width = imgWidth;
    // gCanvas.height = imgHeight;
}

function adjustCanvasPrefs() {
    let memeTxt = readMeme()['txt'];
    gCtx.font = `${memeTxt['size']} ${memeTxt['font-family']}`;
    gCtx.fillStyle = memeTxt['fill-style'];
    gCtx.strokeStyle = memeTxt['stroke-style'];
    gCtx.lineWidth = memeTxt['stroke-width'];
    gCtx.textAlign = memeTxt['align'];
    gCtx.textBaseline = 'middle';
}

function addListeners() {
    gCanvas.addEventListener('mousedown', (event) => { isMouseDown = true; });
    gCanvas.addEventListener('mouseup', (event) => { isMouseDown = false; });
    gCanvas.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            var x = event.offsetX;
            var y = event.offsetY;
            gTxtPos.x = x;
            gTxtPos.y = y;
            cleanCanvas();
            gCtx.beginPath();
            drawImg();
            drawTxt(x, y);
            gCtx.closePath();
        }
    });
}

function renderCanvas() {
    gCtx.beginPath();
    drawImg();
    drawTxt(gTxtPos.x, gTxtPos.y);
    gCtx.closePath();
}

function cleanCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
    let img = document.querySelector('#main-canvas img');
    img.id = gCurrImg['id'];
    img.src = gCurrImg['url'];
    // console.log(img);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawTxt(x, y) {
    let memeTxt = readMeme()['txt'];
    let content = memeTxt['content'];
    if (memeTxt['fill-on'])
        gCtx.fillText(content, x, y);
    if (memeTxt['stroke-on'])
        gCtx.strokeText(content, x, y);
}







