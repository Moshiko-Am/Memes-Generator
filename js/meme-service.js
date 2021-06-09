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
  selectedLineIdx: 0,
  lines: [
    {
      txt: ['I never eat Falafel'],
      size: 40,
      align: 'left',
      color: 'red',
    },
  ],
};

function setInput(txt) {
  gMeme.lines[gSelectedLine].txt = txt;
}

function setTextSize(diff) {
  gMeme.lines[0].size += diff;
}
