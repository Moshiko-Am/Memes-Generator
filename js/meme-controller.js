'use strict';
var gCanvas;
var gCtx;
var gCurrImgIdx;
var gLineHeight;
var gLineWidth;
var gCurrFont = 'Impact';

function init() {
  gCanvas = document.querySelector('.my-canvas');
  gCtx = gCanvas.getContext('2d');
  addEventListener('resize', () => {
    resizeCanvas();
    drawImg(gCurrImgIdx);
    renderLines();
  });
  renderGallery(gImgs);
}

function renderGallery(images) {
  var strHTMLs = images.map((img) => {
    return `<img src="${img.url}" style="width: 150px;" onclick="displayImage(${img.id})" class="gallery-img"/>`;
  });
  var elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHTMLs.join('');
}

function displayImage(idx) {
  gCurrImgIdx = idx;
  var elSearch = document.querySelector('.gallery-filter');
  var elGallery = document.querySelector('.gallery-container');
  var elMain = document.querySelector('.main-content');
  elMain.classList.toggle('hide');
  elSearch.classList.toggle('hide');
  elGallery.classList.toggle('hide');
  resizeCanvas();
  drawImg(gCurrImgIdx);
}

function drawImg(idx) {
  gCurrImgIdx = idx;
  var img = new Image();
  img.src = gImgs[gCurrImgIdx].url;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawTxt() {
  var currLine = gMeme.lines[gMeme.selectedLineIdx];
  var txt = currLine.txt;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = currLine.color;
  gCtx.font = currLine.size + 'px ' + currLine.font;
  gCtx.textAlign = currLine.align;
  gCtx.fillText(txt, currLine.lineWidth, currLine.lineHeight);
  gCtx.strokeText(txt, currLine.lineWidth, currLine.lineHeight);
  currLine.width = gCtx.measureText(txt).width;
  currLine.startX = currLine.lineWidth - currLine.width / 2;
  currLine.startY = currLine.lineHeight - currLine.size;
}

function onSetNewInput() {
  var elText = document.querySelector('input[name=meme-text]');
  setInput(elText.value);
  drawTxt();
  elText.value = '';
}

function onTextSize(diff) {
  drawImg(gCurrImgIdx);
  setTextSize(diff);
  renderLines();
}

function renderLines() {
  gMeme.selectedLineIdx = 0;
  gMeme.lines.forEach(() => {
    drawTxt(gMeme.lines[gMeme.selectedLineIdx].txt);
    if (gMeme.selectedLineIdx < gMeme.lines.length - 1) {
      gMeme.selectedLineIdx++;
    }
  });
  drawRect();
}

function onTextMove(diff) {
  drawImg(gCurrImgIdx);
  moveText(diff);
  renderLines();
}

function onTextSide(diff) {
  textSide(diff);
  drawImg(gCurrImgIdx);
  renderLines();
}

function onSwitchLine() {
  gSelectedLine++;
  gMeme.selectedLineIdx = gSelectedLine;

  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
    gSelectedLine = 0;
  }
  var elText = document.querySelector('input[name=meme-text]');
  elText.value = gMeme.lines[gSelectedLine].txt;
  drawImg(gCurrImgIdx);
  renderLines();
}

function onRemoveTxt() {
  removeTxt();
  gLineHeight = 50;
  drawImg(gCurrImgIdx);
  renderLines();
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
  gLineHeight = gCanvas.height - (gCanvas.height - 50);
  gLineWidth = gCanvas.width / 2;
}

function drawRect() {
  var currLine = gMeme.lines[gSelectedLine];
  gCtx.beginPath();
  gCtx.rect(
    0,
    currLine.lineHeight - currLine.size,
    gCanvas.width,
    currLine.size + 10
  );
  gCtx.strokeStyle = 'white';
  gCtx.stroke();
}

function onTextAlign(val) {
  textAlign(val);
  drawImg(gCurrImgIdx);
  renderLines();
}

function onFontChange(val) {
  gCurrFont = val;
  fontChange(gCurrFont);
  drawImg(gCurrImgIdx);
  renderLines();
}

function onSetFilter(txt) {
  setFilter(txt);
  var images = getImagesForDisplay();
  renderGallery(images);
}

function biggerSize(elBtn) {
  var font = getComputedStyle(elBtn, null).fontSize;
  font = parseInt(font);
  elBtn.style.fontSize = font + 2 + 'px';
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function showHome() {
  location.reload();
}

function showMenu() {
  var elNav = document.querySelector('.links-container');
  elNav.classList.toggle('links-container-show');
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');
  doTrans();
}

function onSetColor(val) {
  setColor(val);
  drawImg(gCurrImgIdx);
  renderLines();
}
