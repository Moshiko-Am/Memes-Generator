'use strict';
var gId = 0;
var gSelectedLine = 0;
var gFilterBy = '';

var gCurrTxt = '';

var gImgs = [
  { id: gId++, url: 'img/1.jpg', keyword: ['trump', 'president'] },
  { id: gId++, url: 'img/2.jpg', keyword: ['dogs', 'puppy', 'siblings'] },
  { id: gId++, url: 'img/3.jpg', keyword: ['baby', 'puppy', 'siblings'] },
  {
    id: gId++,
    url: 'img/4.jpg',
    keyword: ['cat', 'computer', 'keyboard', 'tired'],
  },
  { id: gId++, url: 'img/5.jpg', keyword: ['baby', 'success'] },
  { id: gId++, url: 'img/6.jpg', keyword: ['history', 'crazy', 'hair'] },
  { id: gId++, url: 'img/7.jpg', keyword: ['baby', 'surprise'] },
  { id: gId++, url: 'img/8.jpg', keyword: ['lister', 'happy'] },
  {
    id: gId++,
    url: 'img/9.jpg',
    keyword: ['baby', 'chinese', 'funny', 'laughing'],
  },
  {
    id: gId++,
    url: 'img/10.jpg',
    keyword: ['obama', 'president', 'laughing', 'funny'],
  },
  {
    id: gId++,
    url: 'img/11.jpg',
    keyword: ['wrestling', 'siblings', 'brother'],
  },
  { id: gId++, url: 'img/12.jpg', keyword: ['got you', 'glasses', 'tv'] },
  { id: gId++, url: 'img/13.jpg', keyword: ['cheers', 'got you'] },
  { id: gId++, url: 'img/14.jpg', keyword: ['matrix', 'teach'] },
  { id: gId++, url: 'img/15.jpg', keyword: ['lord', 'rings', 'teach'] },
  { id: gId++, url: 'img/16.jpg', keyword: ['omg', 'surprise'] },
  { id: gId++, url: 'img/17.jpg', keyword: ['putin', 'president'] },
  { id: gId++, url: 'img/18.jpg', keyword: ['cartoon'] },
];

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [],
};

function setTextSize(diff) {
  gMeme.lines[gSelectedLine].size += diff;
}

function moveText(diff) {
  gMeme.lines[gSelectedLine].lineHeight += diff;
}

function textSide(diff) {
  gMeme.lines[gSelectedLine].lineWidth += diff;
}

function setInput(txt) {
  var newLine = {
    txt,
    size: 40,
    font: 'Impact',
    align: 'center',
    color: 'white',
    lineHeight: gLineHeight,
    lineWidth: gLineWidth,
  };
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  gSelectedLine = gMeme.selectedLineIdx;
  switch (gLineHeight) {
    case 50:
      gLineHeight = gCanvas.height - 20;
      break;
    case gCanvas.height - 20:
      gLineHeight = gCanvas.height / 2;
      break;
  }
}

function removeTxt() {
  gMeme.lines.splice(gSelectedLine, 1);
}

function textAlign(val) {
  gMeme.lines[gSelectedLine].align = val;
}

function fontChange(val) {
  gCurrFont = val;
  gMeme.lines[gSelectedLine].font = gCurrFont;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function getImagesForDisplay() {
  var images = gImgs.filter((image) => {
    return image.keyword.some((word) => {
      return word.includes(gFilterBy);
    });
  });
  return images;
}
