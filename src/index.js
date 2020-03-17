'use strict';
import togglePopUp from './modules/popup';
import initCollapse from './modules/accordion';
import calc from './modules/calculator';
import addBlocks from './modules/addblocks';
import checkFields from './modules/checkFields';
import sendForm from './modules/send';

let callbackForRecount = calc();

togglePopUp('.popup-discount').triggerOpen('call-btn', callbackForRecount ).triggerClose();
togglePopUp('.popup-discount').triggerOpen('discount-btn', () => {
  let calcData = document.querySelector('.popup-discount').querySelector('[name="outer_data"]');
  if( calcData ) {
    calcData.remove();
  }
}).triggerClose();
togglePopUp('.popup-check').triggerOpen('check-btn').triggerClose();

initCollapse('accordion-two');


addBlocks();
checkFields();
sendForm();