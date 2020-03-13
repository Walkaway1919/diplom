'use strict';
import animateThis from './animate';

const togglePopUp = () => {
  let popup = document.querySelector('.popup-call'),
  popupContent = document.querySelector('.popup-content');

  document.addEventListener('click', (e)=>{
    if (e.target.classList.contains('call-btn')){
      e.preventDefault();
      popupContent.style.top = "-100%";
      animateThis( popup, 'opacity', 0, 100, 5, () => {
        animateThis( popupContent, 'top', -100, 25, 5, ()=>{} );
      });
    }
  });
  
  popup.addEventListener('click', (e)=> {
    let target = e.target.closest('.popup-content');
    if(e.target.classList.contains('popup-close') || !target ){
      e.preventDefault();
      animateThis( popupContent, 'top', 25, 100, 10, ()=>{
        animateThis( popup, 'opacity', 100, 0, -3, () => {
          popup.style.display = 'none';
        });
      });
     }
  });
};

 export default togglePopUp;

