'use strict';
import animateThis from './animate';

const togglePopUp = (popupName) => {
  let popup = typeof popupName === 'string' ? document.querySelector(popupName) : popupName,
  popupContent = popup.querySelector('.popup-content');

  

  return {
    openPopup() {
      popupContent.style.top = "-100%";
      animateThis( popup, 'opacity', 0, 100, 5, () => {
        animateThis( popupContent, 'top', -100, 25, 5, ()=>{} );
      });
      return this;
    },
    closePopup() {
      animateThis( popupContent, 'top', 25, 100, 10, ()=>{
        animateThis( popup, 'opacity', 100, 0, -3, () => {
          popup.style.display = 'none';
        });
      });
      return this;
    },
    triggerOpen( buttonName, callback ){
      document.addEventListener('click', (e)=>{
        if (e.target.classList.contains(buttonName)){
          e.preventDefault();
          callback();
          this.openPopup();
        }
      });
      return this;
    },
    triggerClose(){
      popup.addEventListener('click', (e)=> {
        let target = e.target.closest('.popup-content');
        if(e.target.classList.contains('popup-close') || !target ){
          e.preventDefault();
          this.closePopup();
         }
      });
      return this;
    }
  };
  
};

 export default togglePopUp;

