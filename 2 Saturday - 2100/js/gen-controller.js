'use strict';


function init() {
    initMeme();
    renderCanvas();
}

function onChangePref(id, value) {
    console.log(value);
    updateText(id, value);
    adjustCanvasPrefs();
    renderCanvas();
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
    drawText();
    renderMeme();
}

function onDownloadLink(elLink) {
    console.log(elLink);
    console.log(gCanvas);
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.jpg';
}
