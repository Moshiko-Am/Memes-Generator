'use strict';
var gCanvas;
var gCtx;
var gCurrImgIdx;
var gCurrTxt = '';
var gLineWidth = 225;
var gLineHeight = 56;

function init() {
  gCanvas = document.querySelector('.my-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}

function drawImg(idx) {
  //   gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCurrImgIdx = idx;
  //   var elGallery = document.querySelector('.gallery-container');
  //   elGallery.hidden = true;
  var img = new Image();
  img.src = gImgs[gCurrImgIdx].url;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawTxt(txt) {
  gSelectedLine = 0;
  gMeme.lines.forEach(() => {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gMeme.lines[gSelectedLine].color;
    gCtx.font = gMeme.lines[gSelectedLine].size + 'px Impact';
    gCtx.textAlign = gMeme.lines[gSelectedLine].align;
    gCtx.fillText(txt, gLineWidth, gLineHeight);
    gCtx.strokeText(txt, gLineWidth, gLineHeight);
  });
  if (gMeme.gSelectedLine < gMeme.lines.length - 1) {
    gMeme.gSelectedLine++;
  }
}

function onSetNewInput() {
  var elText = document.querySelector('input[name=meme-text]').value;
  //   drawImg(gCurrImgIdx);
  setInput(elText);
  drawTxt(elText);
}

function renderGallery() {
  var strHTMLs = gImgs.map((img, idx) => {
    return `<img src="${img.url}" data-idx=${idx} style="width: 150px;" onclick="drawImg(${idx})" class="gallery-img"/>`;
  });
  var elGallery = document.querySelector('.gallery-container');
  elGallery.innerHTML = strHTMLs.join('');
}

function onTextSize(diff) {
  drawImg(gCurrImgIdx);
  setTextSize(diff);
  drawTxt(gMeme.lines[gSelectedLine].txt);
}

function onTextMove(diff) {
  drawImg(gCurrImgIdx);
  gLineHeight += diff;
  drawTxt(gMeme.lines[gSelectedLine].txt);
}

function onAddNewLine() {
  createNewLine();
  gSelectedLine++;
  drawTxt(gMeme.lines[gSelectedLine].txt);
}
