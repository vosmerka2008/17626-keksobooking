'use strict';

(function () {
var MIN_TITLE = 30;
var MAX_TITLE = 100;
var MIN_PRICE_VALUE = 0;
var MAX_PRICE_VALUE = 1000000;
var PRICE_VALUE = 1000;
var FLAT_PRICE = 1000;
var HUT_PRICE = 0;
var HOUSE_PRICE = 5000;
var PALACE_PRICE = 10000;
var formNotice = document.querySelector('.notice__form');
var title = formNotice.querySelector('#title');
var address = formNotice.querySelector('#address');
var type = formNotice.querySelector('#type');
var price = formNotice.querySelector('#price');
var timeIn = formNotice.querySelector('#timein');
var timeOut = formNotice.querySelector('#timeout');
var room = formNotice.querySelector('#room_number');
var capacity = formNotice.querySelector('#capacity');
var submit = formNotice.querySelector('.form__submit');

address.setAttribute('required', '');
address.setAttribute('readonly', '');
address.value = 'Центральная площадь';
title.setAttribute('minlength', MIN_TITLE);
title.setAttribute('maxlength', MAX_TITLE);
title.setAttribute('required', '');

var InvalidTitleInput = function () {
  if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок слишком короткий. Введите не менее 30-ти символов, пожалуйста');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок слишком длинный. Введите не более 100 символов, пожалуйста');
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Нужно заполнить');
  } else {
    title.setCustomValidity('');
  }
};

title.addEventListener('invalid', InvalidTitleInput);

var ChangeTimeIn = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};

var ChangeTimeOut = function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
};

timeIn.addEventListener('change', ChangeTimeIn);
timeOut.addEventListener('change', ChangeTimeOut);

price.setAttribute('type', 'number');
price.setAttribute('value', PRICE_VALUE);
price.setAttribute('min', MIN_PRICE_VALUE);
price.setAttribute('max', MAX_PRICE_VALUE);
price.setAttribute('required', '');

var InvalidPriceInput = function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Слишком дешево');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Слишком дорого');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Нужно заполнить');
  } else {
    price.setCustomValidity('');
  }
};

price.addEventListener('invalid', InvalidPriceInput);

type.addEventListener('change', function () {
  switch (type.selectedIndex) {
    case 0:
      price.value = FLAT_PRICE;
      price.setAttribute('min', FLAT_PRICE);
      break;
    case 1:
      price.value = HUT_PRICE;
      price.setAttribute('min', HUT_PRICE);
      break;
    case 2:
      price.value = HOUSE_PRICE;
      price.setAttribute('min', HOUSE_PRICE);
      break;
    case 3:
      price.value = PALACE_PRICE;
      price.setAttribute('min', PALACE_PRICE);
      break;
  }
});

capacity.selectedIndex = 2;
room.addEventListener('change', function () {
  switch (room.selectedIndex) {
    case 0:
      capacity.selectedIndex = 2;
      break;
    case 1:
      capacity.selectedIndex = 1;
      break;
    case 2:
      capacity.selectedIndex = 0;
      break;
    case 3:
      capacity.selectedIndex = 3;
      break;
  }
});

submit.addEventListener('click', checkForm);

function checkForm() {
  var Inputs = formNotice.querySelectorAll('input');
  var Selects = formNotice.querySelectorAll('select');
  checkFormElements(Inputs);
  checkFormElements(Selects);
}

function checkFormElements(elem) {
  for (var i = 0; i < elem.length; i++) {
    if (!elem[i].validity.valid) {
      elem[i].setAttribute('style', 'border: 2px solid red;');
    } else {
      elem[i].removeAttribute('style');
    }
  }
}
})();
