'use strict';

function init() {
    initMeme();
    render();
}

function render() {
    var meme = readMeme();
    console.table(meme);
}

function onChangeProp() {
    updateMeme('imgId', 2);
    render();
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