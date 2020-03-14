'use strict';

const calc = () => {
  let calcBlock = document.getElementById('accordion'),
  onoffswitch = document.getElementById('myonoffswitch'),
  wellTwo = document.getElementById('well-two'),
  result = document.getElementById('calc-result'),
  formForSave = document.querySelector('.save_calc_data_here'),
  savedInput = document.createElement("input"),
  calcResults = {};

  savedInput.type = 'hidden';
  savedInput.name = 'calc_results';
  formForSave.prepend( savedInput );

  const saveVal = (elem) => {
    if(elem.type === 'checkbox' ){
      calcResults[elem.name] = elem.checked;
    } else {
      calcResults[elem.name] = elem.value;
    }
    countSum();
  };

  const check = () =>{
    if(onoffswitch.checked){
      wellTwo.style.display = 'none';
    }else{
      wellTwo.style.display = 'block';
    }
    countSum();
  };
  
  const countSum = () => {
    let start = calcResults.septic_type ? 10000 : 15000;
    let coef = 100;

    if( calcResults.septic_well_1_d === '2 метра' ){
      coef += 20;
    }

    if( calcResults.septic_well_1_a === '2 штуки' ){
      coef += 30;
    } else if( calcResults.septic_well_1_a === '3 штуки' ){
      coef += 50;
    }

    if( !calcResults.septic_type ) {
      if( calcResults.septic_well_2_d === '2 метра' ){
        coef += 20;
      }
  
      if( calcResults.septic_well_2_a === '2 штуки' ){
        coef += 30;
      } else if( calcResults.septic_well_2_a === '3 штуки' ){
        coef += 50;
      }
    }
    let final = start*coef/100;

    if( calcResults.bottom_exist ){
      final += calcResults.septic_type ? 1000 : 2000;
    }

    result.value = final;
    calcResults.calc_result = final;
    savedInput.value = JSON.stringify( calcResults );
  };

  check();
  calcBlock.querySelectorAll("input,select").forEach( input => saveVal(input) );

  onoffswitch.addEventListener('change', check);
  calcBlock.addEventListener('change', (e) => saveVal(e.target) );
};

export default calc;

