'use strict';

var gMeme = {};

function initMeme() {
    gMeme = createMeme(loadFromStorage('img'));
}

function createMeme(img) {
    return {
        img: img,
        isSelected: false,
        txt: [
            {
                'id': 'content-top',
                'content': '',
                'size': '80px',
                'content-width:':'',
                'font-family': 'impact',
                'fill-style': '#ffffff',
                'fill-on': true,
                'stroke-on': true,
                'stroke-style': '#000000',
                'stroke-width': 3,
                'align': 'center',
                'isSelected':'false',
                'x':'',
                'y':''
            },
            {
                'id': 'content-bottom',
                'content': '',
                'size': '80px',
                'content-width:':'',
                'font-family': 'impact',
                'fill-style': '#ffffff',
                'fill-on': true,
                'stroke-on': true,
                'stroke-style': '#000000',
                'stroke-width': 3,
                'align': 'center',
                'isSelected':'false',
                'x':'',
                'y':''
            }
        ]
    };
}

function updateMeme(prop, value) {
    gMeme['txt'].forEach(itemTxt => {
        if (itemTxt.id === gLastSelectedInputId) {
            if (prop === 'content-top' || prop === 'content-bottom') prop = 'content';
            itemTxt[prop] = value;
            if(prop==='size' || prop === 'content'){
                // debugger
                gCtx.font = `${itemTxt['size']} ${itemTxt['font-family']}`;
                itemTxt['content-width'] = gCtx.measureText(itemTxt['content']).width;
            }
        }
    });
}

function readMeme() {
    return gMeme;
}



