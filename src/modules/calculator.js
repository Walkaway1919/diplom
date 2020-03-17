'use strict';
import initCollapse from './accordion';

const calc = () => {
  let calcBlock = document.getElementById('accordion'),
  onoffswitch = document.getElementById('myonoffswitch'),
  wellTwo = document.getElementById('well-two'),
  result = document.getElementById('calc-result'),
  formForSave = document.querySelector('.save_calc_data_here'),
  savedInput = document.createElement("input"),
  calcResults = {};
  calcBlock.reset();
  result.value = '';
  savedInput.type = 'hidden';
  savedInput.name = 'outer_data';
  formForSave.prepend( savedInput );


  const saveVal = (elem, recout = true) => {
    if(elem.type === 'checkbox' ){
      calcResults[elem.name] = elem.checked;
    } else {
      calcResults[elem.name] = elem.value;
    }
    if( recout ){
      countSum();
    }
  };

  const check = () =>{
    if(onoffswitch.checked){
      wellTwo.style.display = 'none';
    }else{
      wellTwo.style.display = 'block';
    }
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
    let finalResults = {...calcResults};
    if( calcResults.septic_type ){

      delete finalResults.septic_well_2_d;
      delete finalResults.septic_well_2_a;

    }
    if( !finalResults.distance ) {
      finalResults.distance = 0;
    }
    
    let savedInput = formForSave.querySelector('[name="outer_data"]');
    if( !savedInput ){
      savedInput = document.createElement("input");
      savedInput.type = 'hidden';
      savedInput.name = 'outer_data';
      formForSave.prepend( savedInput );
    }
    savedInput.value = JSON.stringify( finalResults );
  };

  check();
  calcBlock.querySelectorAll("input,select").forEach( input => saveVal(input, false) );

  onoffswitch.addEventListener('change', check);
  calcBlock.addEventListener('change', (e) => saveVal(e.target) );

  
  initCollapse('accordion', countSum );

  return countSum;
};

export default calc;

