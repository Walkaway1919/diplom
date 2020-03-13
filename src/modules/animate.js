const animateThis = (elem, animType, start, end, speed, callback) => {
  // задать начальные значения анимации
  elem.style[animType] = start + "%";
  // показать элемент
  elem.style.display = 'block';
  // делаем анимацию
  if( speed !== 0 && speed > 0 ? start <= end : start >= end ){ // смотрим условие куда движемся - увеличение или уменьшение
    start += speed;
    requestAnimationFrame(() => { animateThis(elem, animType, start, end, speed, callback);});
  }else{
    elem.style[animType] = end + "%";
    callback(); 
  }
};

export default animateThis;