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
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  gCurrImgIdx = idx;
  //   var elGallery = document.querySelector('.gallery-container');
  //   elGallery.hidden = true;
  var img = new Image();
  img.src = gImgs[gCurrImgIdx].url;
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawTxt(txt) {
  gCurrTxt = txt;
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = gMeme.lines[0].size + 'px Impact';
  gCtx.textAlign = 'center';
  gCtx.fillText(txt, gLineWidth, gLineHeight);
  gCtx.strokeText(txt, gLineWidth, gLineHeight);
}

function onSetNewInput(val) {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  drawImg(gCurrImgIdx);
  setInput(val);
  drawTxt(val);
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
  var elText = document.querySelector('input[name=meme-text]').value;
  setTextSize(diff);
  drawTxt(elText);
}

function onTextMove(diff) {
  drawImg(gCurrImgIdx);
  gLineHeight += diff;
  drawTxt(gCurrTxt);
}
