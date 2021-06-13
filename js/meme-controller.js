'use strict';
const MEMES_KEY = 'memesDB';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

var gCanvas;
var gCtx;
var gCurrImgIdx;
var gLineHeight;
var gLineWidth;
var gCurrFont = 'Impact';
var gStartPos;

var gDragLine = null;

function init() {
  gCanvas = document.querySelector('.my-canvas');
  gCtx = gCanvas.getContext('2d');
  addListeners();
  resizeCanvas();
  addEventListener('resize', () => {
    resizeCanvas();
    drawImg(gCurrImgIdx);
    renderLines();
  });
  renderGallery(gImgs);
  initMemes();
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
  gMeme.selectedImgId = idx;
  var elSearch = document.querySelector('.gallery-filter');
  var elGallery = document.querySelector('.gallery-container');
  var elMain = document.querySelector('.main-content');
  elMain.classList.toggle('hide');
  elSearch.classList.toggle('hide');
  elGallery.classList.toggle('hide');
  resizeCanvas();
  drawImg(gCurrImgIdx, true);
}

function drawImg(idx, isDisplay) {
  gCurrImgIdx = idx;
  var img = new Image();
  img.src = gImgs[gCurrImgIdx].url;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    if (!isDisplay) renderLines();
  };
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
  // currLine.startX = currLine.lineWidth - currLine.width / 2;
  // currLine.startY = currLine.lineHeight - currLine.size;
}

function onSetNewInput() {
  var elText = document.querySelector('input[name=meme-text]');
  setInput(elText.value);
  //drawTxt();
  renderLines();
  elText.value = '';
}

function onUpdateInput(val) {
  updateInput(val);
  drawImg(gCurrImgIdx);
}

function onTextSize(diff) {
  drawImg(gCurrImgIdx);
  setTextSize(diff);
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
}

function onTextSide(diff) {
  textSide(diff);
  drawImg(gCurrImgIdx);
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
}

function onRemoveTxt() {
  removeTxt();
  gLineHeight = 50;
  drawImg(gCurrImgIdx);
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
  if (gSelectedLine === -1) return;
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
}

function onFontChange(val) {
  gCurrFont = val;
  fontChange(gCurrFont);
  drawImg(gCurrImgIdx);
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
  console.log(imgContent);
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
}

function onClickedText(ev) {
  var selectedIdx = gMeme.lines.findIndex((line) => {
    return (
      ev.offsetY >= line.lineHeight - line.size &&
      ev.offsetY <= line.lineHeight + line.size
    );
  });
  if (selectedIdx === -1) {
    gSelectedLine = -1;
    drawImg(gCurrImgIdx);
    return;
  }
  gSelectedLine = selectedIdx;

  var elInput = document.querySelector('.txt-input');
  elInput.value = gMeme.lines[gSelectedLine].txt;
  elInput.focus();
  drawImg(gCurrImgIdx);
}

function onSetLineDrag(ev) {
  ev.stopPropagation();
  var pos = getEvPos(ev);
  gStartPos = pos;
  var selectedIdx = gMeme.lines.findIndex((line) => {
    return (
      gStartPos.y >= line.lineHeight - line.size &&
      gStartPos.y <= line.lineHeight + line.size
    );
  });
  if (selectedIdx === -1) return;
  gDragLine = selectedIdx;
}

function onMove(ev) {
  const line = gMeme.lines[gDragLine];
  if (line) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, dy);
    gStartPos = pos;
    drawImg(gCurrImgIdx);
  }
}

function onFinishLineDrag() {
  gDragLine = null;
}

function onSaveMemes() {
  saveMeme();
}

function onLoadMemes() {
  var elGallery = document.querySelector('.gallery-wrapper');
  var elSearch = document.querySelector('.gallery-filter');
  var elMain = document.querySelector('.main-content');
  var elMemes = document.querySelector('.memes-container');

  elGallery.classList.add('hide');
  elSearch.classList.add('hide');
  elMain.classList.add('hide');
  elMemes.classList.remove('hide');

  var strHTML = gSavedMemes.map((meme, idx) => {
    return `<img src="${meme.url}" style="max-width: 300px; max-height: 300px; cursor:pointer;" onclick="updateMeme(${idx})"/>`;
  });
  elMemes.innerHTML = strHTML;
}

function updateMeme(idx) {
  gMeme = gSavedMemes[idx].data;
  var elMain = document.querySelector('.main-content');
  var elMemes = document.querySelector('.memes-container');

  elMain.classList.remove('hide');
  elMemes.classList.add('hide');
  drawImg(gMeme.selectedImgId);
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mousedown', onSetLineDrag);
  gCanvas.addEventListener('mouseup', onFinishLineDrag);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchstart', onSetLineDrag);
  gCanvas.addEventListener('touchend', onFinishLineDrag);
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
}
