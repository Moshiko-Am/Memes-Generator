'use strict';

var gTrans = {
  gallery: {
    en: 'Gallery',
    he: 'גלריה',
  },
  siblings: {
    en: 'siblings',
    he: 'אחים',
  },
  president: {
    en: 'president',
    he: 'נשיא',
  },
  surprise: {
    en: 'surprise',
    he: 'הפתעה',
  },
  funny: {
    en: 'funny',
    he: 'מצחיק',
  },
  baby: {
    en: 'baby',
    he: 'תינוק',
  },
  dog: {
    en: 'dog',
    he: 'כלב',
  },
  meme: {
    en: 'Your Text Here',
    he: 'כתוב כאן',
  },
  share: {
    en: 'share',
    he: 'שתף',
  },
  download: {
    en: 'download',
    he: 'הורד',
  },
  copyrights: {
    en: '© All rights reserved 2021',
    he: 'כל הזכויות שמורות 2021 ©',
  },
  search: {
    en: 'Search',
    he: 'חפש',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];

  if (!keyTrans) return 'UNKNOWN';

  var txt = keyTrans[gCurrLang];
  if (!txt) return keyTrans.en;

  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');

  els.forEach(function (el) {
    var txt = getTrans(el.dataset.trans);
    if (el.nodeName === 'INPUT') el.placeholder = txt;
    else el.innerText = txt;
  });
}

function setLang(lang) {
  gCurrLang = lang;
}
