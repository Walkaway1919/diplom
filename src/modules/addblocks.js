'use strict';
const addBlocks = () => {
  let button = document.querySelector('.add-sentence-btn');
  let parent = button.parentNode;
  button.addEventListener('click', ()=> {
    parent.querySelectorAll(".col-xs-12").forEach(elem => {
      elem.classList.remove('visible-sm-block');
      elem.classList.remove('hidden');
    });
    button.style.display = 'none';
  });
};

export default addBlocks;