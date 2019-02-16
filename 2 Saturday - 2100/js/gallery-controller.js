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
    renderWordsSelecotr();
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

function renderWordsSelecotr() {

    let sum = getKewordsSumVal();

    let strHtml = '';
    let el = document.querySelector('.world-selector-container');
    for (let i = 0; i < Object.keys(gImgKeywords).length; i++) {

        let key = Object.keys(gImgKeywords)[i]
        let val = gImgKeywords[key];
        let fontSize = MIN_FONT_SIZE + (val / sum) * MAX_FONT_SIZE;

        strHtml += `
        <!-- Start New Word -->
        <div class="keword" onclick="onWordSelected(this.innerText)" style="font-size:${fontSize}px">${key}</div>
        
        <!-- End New Word -->
        `
    }
    el.innerHTML = strHtml;
}

function getKewordsSumVal() {
    var sum = 0;
    for (var key in gImgKeywords) {
        sum += gImgKeywords[key];
    }
    return sum;
}

function onWordSelected(word) {
    filterByWord = word
    gImgKeywords[word] += 1;
    saveToStorage(KEY_WORD_SEARCH, gImgKeywords);
    renderGallery();
    renderWordsSelecotr();
}

//SHOULD BE IN IMAGE-SERVICE
function getImagesToDisplay() {
    gImgs = getImages();
    var filteredImges = gImgs.filter(function (img) {
        if (filterByWord === '') return true;
        return img.keywords === filterByWord;
    })
    return filteredImges;
}

function renderGallery() {
    let strHtml = '';
    let elGrid = document.querySelector('.gallery-grid-container');

    var imgs = getImagesToDisplay();

    for (let i = 0; i < imgs.length; i++) {
        strHtml += `
        <!-- Start Image -->

        <a href="index.html">
            <img class="img-gallery" id="${imgs[i].id}" src="${imgs[i].url}" onclick="onImageSelected(this.id)">
        </a>

        <!-- End Image -->
        `
    }
    elGrid.innerHTML = strHtml;
}

function onImageSelected(id) {
    saveToStorage(KEY_CURR_IMG_ID, id);
}
function renderWordResults(res) {
    let strHtml = '';
    let elGrid = document.querySelector('.word-result-container');

    for (let i = 0; i < res.length; i++) {
        strHtml += `
        <!-- Start Result -->

            <div class="keyword-option" onclick="onWordSelected(this.innerText)">${res[i]}</div>

        <!-- End Result -->
        `
    }
    elGrid.innerHTML = strHtml;

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





















