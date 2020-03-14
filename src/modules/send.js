'use strict';
import togglePopUp from './popup';

const sendForm = () => {
  const errorMessage = 'Error';
  const successMessage = 'Success';
  const loadMessage = 'Load';
  const statusMessage = document.createElement('div');

  let consultPopup = togglePopUp('.popup-consultation');
  document.addEventListener('submit', (event) => {
    
    event.preventDefault();

    if( event.target.classList.contains( "director-form" ) ){
      const formData = new FormData(event.target);
      let data = JSON.stringify(Object.fromEntries(formData));

      let question = document.createElement("input");
      question.type = 'hidden';
      question.name = 'question';
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
      statusMessage.style.display = 'block';

      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: formData,
      })
      .then((response)=>{
        if(response.status !== 200){
          throw new Error();
        }
        statusImg.src = 'img/success.png';
        statusMessage.textContent = successMessage;
        event.target.reset();
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
        }, 5000);
      });
    }
  });
};
export default sendForm;