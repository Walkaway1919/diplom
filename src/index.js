'use strict';
import togglePopUp from './modules/popup';
import initCollapse from './modules/accordion';

togglePopUp('.popup-call', 'call-btn');
togglePopUp('.popup-discount', 'discount-btn');
togglePopUp('.popup-check', 'check-btn');

initCollapse('accordion-two');
initCollapse('accordion');