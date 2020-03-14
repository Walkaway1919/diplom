'use strict';
import togglePopUp from './modules/popup';
import initCollapse from './modules/accordion';
import calc from './modules/calculator';
import addBlocks from './modules/addblocks';
import checkFields from './modules/checkFields';
import sendForm from './modules/send';

togglePopUp('.popup-call').trigger('call-btn');
togglePopUp('.popup-discount').trigger('discount-btn');
togglePopUp('.popup-check').trigger('check-btn');

initCollapse('accordion-two');
initCollapse('accordion');

calc();
addBlocks();
checkFields();
sendForm();