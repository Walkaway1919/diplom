'use strict';
import togglePopUp from './modules/popup';
import initCollapse from './modules/accordion';
import calc from './modules/calculator';
import addBlocks from './modules/addblocks';
import checkFields from './modules/checkFields';
import sendForm from './modules/send';

togglePopUp('.popup-discount').triggerOpen('call-btn').triggerClose();
togglePopUp('.popup-discount').triggerOpen('discount-btn').triggerClose();
togglePopUp('.popup-check').triggerOpen('check-btn').triggerClose();

initCollapse('accordion-two');


calc();
addBlocks();
checkFields();
sendForm();