'use strict';

const initCollapse = (accordionName) => {
  let panelGroup = document.getElementById(accordionName);
  let panelList = panelGroup.querySelectorAll('.panel-default');

  const toggle = (panel) => {
    let content = panel.querySelector('.panel-collapse');
    if(content) {
      if(content.classList.contains('in')){
        content.classList.remove('in');
      }else{
        content.classList.add('in');
        panelList.forEach((elem)=>{
          if(panel !== elem){
            let content = elem.querySelector('.panel-collapse');
            if(content){
              content.classList.remove('in');
            }
          }
        });
      }
    }
  };

  panelGroup.addEventListener('click', (e)=>{
    if (e.target.classList.contains('panel-heading') || e.target.closest('.panel-heading')) {
      e.preventDefault();
      let panel = e.target.closest('.panel-default');
      toggle(panel);
    }
    if (e.target.classList.contains('construct-btn') || e.target.closest('.construct-btn')) {
      e.preventDefault();
      let currentPanelIndex = false;
      panelList.forEach((elem, index)=>{
        let content = elem.querySelector('.panel-collapse');
        if(content){
          if(content.classList.contains('in')){
            currentPanelIndex = index;
          }
        }
      });
      if(currentPanelIndex < panelList.length - 1){
        toggle(panelList[currentPanelIndex+1]);
      }
    }
  });
};

export default initCollapse;
