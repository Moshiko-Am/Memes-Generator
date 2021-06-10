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
  resizeCanvas();
  renderGallery(gImgs);
}

function renderGallery(images) {
  var strHTMLs = images.map((img, idx) => {
    return `<img src="${img.url}" data-idx=${idx} style="width: 150px;" onclick="displayImage(${idx})" class="gallery-img"/>`;
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
  var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = gMeme.lines[gMeme.selectedLineIdx].color;
  gCtx.font =
    gMeme.lines[gMeme.selectedLineIdx].size +
    'px ' +
    gMeme.lines[gMeme.selectedLineIdx].font;
  gCtx.textAlign = gMeme.lines[gMeme.selectedLineIdx].align;
  gCtx.fillText(
    txt,
    gMeme.lines[gMeme.selectedLineIdx].lineWidth,
    gMeme.lines[gMeme.selectedLineIdx].lineHeight
  );
  gCtx.strokeText(
    txt,
    gMeme.lines[gMeme.selectedLineIdx].lineWidth,
    gMeme.lines[gMeme.selectedLineIdx].lineHeight
  );
}

function onSetNewInput() {
  var elText = document.querySelector('input[name=meme-text]');
  //   drawImg(gCurrImgIdx);
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
  gCtx.beginPath();
  gCtx.rect(
    0,
    gMeme.lines[gSelectedLine].lineHeight - gMeme.lines[gSelectedLine].size,
    gCanvas.width,
    gMeme.lines[gSelectedLine].size + 10
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
