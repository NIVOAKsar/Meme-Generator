'use strict'

var gSelectedImgId = '';
const KEY_CURR_IMG_ID = 'currentImage';
const KEY_WORD_SEARCH = 'searchedKeys';
const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 60;
var gImgKeywords = { happy: 0, sad: 0, funny: 0, animal: 0, bad: 0, akward: 0 };
var filterByWord = '';

function onLoad() {

    console.log('init gallery');
    loadKeywordsSearch();
    renderGallery();
    renderWordsSelector();
}

function loadKeywordsSearch() {
    let imgKeywords = loadFromStorage(KEY_WORD_SEARCH);
    if (!imgKeywords) {
        Object.keys(gImgKeywords).map(function (key, index) {
            gImgKeywords[key] = getRandomIntInclusive(0, 100);
        });
        saveToStorage(KEY_WORD_SEARCH, gImgKeywords);
    }
    else {
        gImgKeywords = imgKeywords;
    }
    console.log(gImgKeywords);
}

function getKeywordsSumVal() {
    var sum = 0;
    for (var key in gImgKeywords) {
        sum += gImgKeywords[key];
    }
    return sum;
}

function renderWordResults(res) {
    let strHtml = '';
    let elGrid = document.querySelector('.fillter-option-container');

    for (let i = 0; i < res.length; i++) { strHtml += `<div class="fillter-option" onclick="onWordSelected(this.innerText)">${res[i]}</div>` }
    elGrid.innerHTML = strHtml;
}

function renderWordsSelector() {
    let sum = getKeywordsSumVal();
    let strHtml = '';
    let el = document.querySelector('.keywords-nav');
    for (let i = 0; i < Object.keys(gImgKeywords).length; i++) {
        let key = Object.keys(gImgKeywords)[i]
        let val = gImgKeywords[key];
        let fontSize = MIN_FONT_SIZE + (val / sum) * MAX_FONT_SIZE;
        strHtml += `<div class="keyword" onclick="onWordSelected(this.innerText)" style="font-size:${fontSize}px">${key}</div>`
    }
    el.innerHTML = strHtml;
}

function renderGallery() {
    let strHtml = '';
    let elGrid = document.querySelector('.img-grid');
    let imgs = getImagesToDisplay();
    for (let i = 0; i < imgs.length; i++) {
        strHtml += `<img class="img-gallery" id="${imgs[i].id}" src="${imgs[i].url}" onclick="onImageSelected(this)">`;
    }
    elGrid.innerHTML = strHtml;
}

function onImageSelected(el) {
    saveToStorage('img', { id: el.id, src: el.src, naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight });
    window.location = 'index.html';
}

function onKeyDown(ev) {
    var str = document.querySelector('.textSearch').value;
    if (str === '') renderWordResults([]);
    else {
        var regexp = new RegExp(str, "gi");
        var filteredRes = Object.keys(gImgKeywords).filter((item) => regexp.test(item));
        renderWordResults(filteredRes);
    }
}

function onWordSelected(word) {
    filterByWord = word
    gImgKeywords[word] += 1;
    saveToStorage(KEY_WORD_SEARCH, gImgKeywords);
    renderGallery();
    renderWordsSelector();
}

function onClearSelection() {
    filterByWord = '';
    renderGallery();
}