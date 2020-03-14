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
      event.target.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

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
        statusMessage.textContent = successMessage;
        event.target.reset();
      })
      .catch((e) => {
        statusMessage.textContent = errorMessage;
      })
      .finally(() => {
        setTimeout(()=>{
          statusMessage.style.display = 'none';
        }, 5000);
      });
    }
  });
};
export default sendForm;