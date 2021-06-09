'use strict';
var gId = 0;
var gKeywords;
var gSelectedLine = 0;

var gImgs = [
  { id: gId++, url: '../img/1.jpg' },
  { id: gId++, url: '../img/2.jpg' },
  { id: gId++, url: '../img/3.jpg' },
  { id: gId++, url: '../img/4.jpg' },
  { id: gId++, url: '../img/5.jpg' },
  { id: gId++, url: '../img/6.jpg' },
  { id: gId++, url: '../img/7.jpg' },
  { id: gId++, url: '../img/8.jpg' },
  { id: gId++, url: '../img/9.jpg' },
  { id: gId++, url: '../img/10.jpg' },
  { id: gId++, url: '../img/11.jpg' },
  { id: gId++, url: '../img/12.jpg' },
  { id: gId++, url: '../img/13.jpg' },
  { id: gId++, url: '../img/14.jpg' },
  { id: gId++, url: '../img/15.jpg' },
  { id: gId++, url: '../img/16.jpg' },
  { id: gId++, url: '../img/17.jpg' },
  { id: gId++, url: '../img/18.jpg' },
];

var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: gSelectedLine,
  lines: [
    {
      txt: [],
      size: 40,
      align: 'center',
      color: 'white',
    },
  ],
};

function setInput(txt) {
  if (!gMeme.lines[gSelectedLine].txt) {
    gMeme.lines[gSelectedLine].txt = txt;
  } else {
    gMeme.lines[gSelectedLine].txt.push(txt);
  }
}

function setTextSize(diff) {
  gMeme.lines[gSelectedLine].size += diff;
}

function createNewLine() {
  var newLine = {
    txt: [],
    size: 40,
    align: 'center',
    color: 'white',
  };
  gMeme.lines.push(newLine);
}
