'use strict';

var topTxt;
var bottomTxt;
var gCanvas;
var gCtx;
var currImg;
var isMouseDown;
var isDragging = null;

function createCanvas() {
    isMouseDown = false;
    let container = document.querySelector('.canvas-container');
    let img = readMeme().img;
    container.innerHTML = `
    <canvas id="main-canvas"
    onmousedown="onMouseDown(event)"
    onmouseup="isMouseDown=false; isDragging=null;"
    onmousemove="onMouseMove(event)" 
    onclick="onCanvasClick(event)">
        <img src="${img.src}" onload="currImg=this; drawCanvas()" />
    </canvas>`;

    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    adjustSize();

    getTxtById('content-top')['x'] = gCanvas.width / 2;
    getTxtById('content-top')['y'] = gCanvas.height - (0.8 * gCanvas.height)
    getTxtById('content-bottom')['x'] = gCanvas.width / 2;
    getTxtById('content-bottom')['y'] = gCanvas.height - (0.2 * gCanvas.height);
}

function adjustSize() {
    let imgWidth = readMeme().img.naturalWidth;
    let imgHeight = readMeme().img.naturalHeight;

    let oW = document.querySelector('.canvas-container').offsetWidth;
    let oH = document.querySelector('.canvas-container').offsetHeight;
    console.log(oW, oH);
    if (oW < 530) {
        gCanvas.width = oW;
        gCanvas.height = oH;
        return;
    }
    let vw = window.innerWidth;
    let ratio = imgWidth / (0.4 * vw);
    imgWidth = (0.4 * vw);
    imgHeight = imgHeight / ratio;
    gCanvas.width = imgWidth;
    gCanvas.height = imgHeight;
}

function adjustPrefs(item) {

    readMeme()['txt'].forEach(searchedItem => {
        if (searchedItem.id === item.id) {
            gCtx.font = `${item['size']} ${item['font-family']}`;
            gCtx.fillStyle = item['fill-style'];
            gCtx.strokeStyle = item['stroke-style'];
            gCtx.lineWidth = item['stroke-width'];
            gCtx.textAlign = item['align'];
            gCtx.textBaseline = 'middle';
        }
    });
}

function drawCanvas() {
    gCtx.drawImage(currImg, 0, 0, gCanvas.width, gCanvas.height);
    readMeme()['txt'].forEach(item => {
        adjustPrefs(item)
        gCtx.beginPath();
        if (item['fill-on']) {
            gCtx.fillText(item['content'], item['x'], item['y'])
        }

        if (item['stroke-on']) {
            gCtx.strokeText(item['content'], item['x'], item['y'])
        }
        gCtx.closePath();
    });
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function isItemSelected(ev, item) {
    let [x, y] = [ev.offsetX, ev.offsetY];

    var minX = item['x'] - (item['content-width'] / 2);
    var maxX = item['x'] + (item['content-width'] / 2);

    var str = item['size'];
    var idx = str.indexOf('px');
    var res = str.substr(0, idx);

    var minY = item['y'] - parseInt(res);
    var maxY = item['y'] + parseInt(res);
    if (x > minX && x < maxX && y > minY && y < maxY) return true;
    return false;
}

function onMouseMove(ev) {
    if (isMouseDown) {

        readMeme()['txt'].forEach(item => {
            if (isItemSelected(ev, item)) {

                if (isDragging === null || isDragging[0] === item.id) {
                    isDragging = [item.id];
                    readMeme().isSelected = true;
                    item['x'] = ev.offsetX;
                    item['y'] = ev.offsetY;
                    clearCanvas();
                    drawCanvas();
                }
            }
        });
    }
}

function onMouseDown(ev) {
    isMouseDown = true;
    readMeme()['txt'].forEach(item =>{
        if(isItemSelected(ev, item)) gLastSelectedInputId = item.id;
    })
}

function getTxtById(id) {
    return readMeme()['txt'].find(function (item) {
        return item.id === id;
    })
}

function onChangeAlign(id, value) {
    var offsetX = 0;
    if (value === 'center') offsetX = .5;
    else if (value === 'right') offsetX = .8;
    else offsetX = .2;

    var itemTxt = getTxtById(gLastSelectedInputId);

    if (gLastSelectedInputId === 'content-top') {
        itemTxt['x'] = gCanvas.width * offsetX;
        itemTxt['y'] = gCanvas.height - (0.8 * gCanvas.height);
    } else {
        itemTxt['x'] = gCanvas.width * offsetX;
        itemTxt['y'] = gCanvas.height - (0.2 * gCanvas.height);
    }
    clearCanvas();
    drawCanvas();
}






