'use strict';
import togglePopUp from './popup';

const sendForm = () => {
  const errorMessage = 'Error';
  const successMessage = 'Success';
  const loadMessage = 'Load';
  const statusMessage = document.createElement('div');

  let consultPopup = togglePopUp('.popup-consultation').triggerClose();
  document.addEventListener('submit', (event) => {
    
    event.preventDefault();

    if( event.target.classList.contains( "director-form" ) ){
      const formData = new FormData(event.target);
      let data = JSON.stringify(Object.fromEntries(formData));

      let question = document.createElement("input");
      question.type = 'hidden';
      question.name = 'outer_data';
      question.value = data;
      document.querySelector('.popup-consultation').querySelector('form').prepend( question );
      consultPopup.openPopup();
    } else {
      let buttons = event.target.querySelectorAll("button, input[type=submit]");
      buttons.forEach(element => {
        element.disabled = true;
      });
      event.target.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      let statusImg = document.querySelector('img.status');
      if(!statusImg){
        statusImg = document.createElement('img');
        statusImg.classList.add('status');
        statusImg.style.width = 64+'px';
        statusImg.style.height = 64+'px';
        event.target.append(statusImg);
      }
      statusImg.src = 'img/spinner.gif';
      const formData = new FormData(event.target);
      let jsonData = {};
      for (const [key, value]  of formData.entries()) {
        jsonData[key] =  key === 'outer_data' ? JSON.parse( value ) : value;
      }
      statusMessage.style.display = 'block';

      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(jsonData),
      })
      .then((response)=>{
        if(response.status !== 200){
          throw new Error();
        }
        statusImg.src = 'img/success.png';
        statusMessage.textContent = successMessage;
        event.target.reset();
        
        // проверка на всплывающее ли окно
        setTimeout(()=>{
          let inPopUp = event.target.closest('.popup');
          if(inPopUp){
            togglePopUp(inPopUp).closePopup();
          }
        }, 3000);
      })
      .catch((e) => {
        statusMessage.textContent = errorMessage;
        statusImg.src = 'img/error.png';
      })
      .finally(() => {
        setTimeout(()=>{
          statusMessage.style.display = 'none';
          document.querySelector('img.status').remove();
          buttons.forEach(element => {
            element.disabled = false;
          });
        }, 3000);
      });
    }
  });
};
export default sendForm;