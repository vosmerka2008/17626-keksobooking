'use strict';

window.form = (function () {
  var MIN_TITLE = 30;
  var MAX_TITLE = 100;
  var MIN_PRICE_VALUE = 0;
  var MAX_PRICE_VALUE = 1000000;
  var PRICE_VALUE = 1000;
  var FLAT_PRICE = 1000;
  var HUT_PRICE = 0;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;
  var PRICES = [FLAT_PRICE, HUT_PRICE, HOUSE_PRICE, PALACE_PRICE];
  var APARTMENTS = ['flat', 'bungalo', 'house', 'palace'];
  var ROOMS = ['1', '2', '3', '100'];
  var CAPACITY = [['1'], ['1', '2'], ['1', '2', '3'], ['0']];
  var CHECKS = ['12:00', '13:00', '14:00'];

  var formNotice = document.querySelector('.notice__form');

  var triggerOnChangeEventOnSingleElement = function (element) {
    if ('createEvent' in document) {
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      element.dispatchEvent(evt);
    } else {
      element.fireEvent('onchange');
    }
  };

  var setupAddress = function () {
    var address = formNotice.querySelector('#address');

    address.setAttribute('required', '');
    address.setAttribute('readonly', '');
    address.value = 'Центральная площадь';
  };

  var setupTitle = function () {
    var title = formNotice.querySelector('#title');

    title.setAttribute('minlength', MIN_TITLE);
    title.setAttribute('maxlength', MAX_TITLE);
    title.setAttribute('required', '');
    title.addEventListener('invalid', invalidTitleInput);
  };

  var invalidTitleInput = function (target) {
    if (target.currentTarget.validity.tooShort) {
      target.currentTarget.setCustomValidity('Заголовок слишком короткий. Введите не менее 30-ти символов, пожалуйста');
    } else if (target.currentTarget.validity.tooLong) {
      target.currentTarget.setCustomValidity('Заголовок слишком длинный. Введите не более 100 символов, пожалуйста');
    } else if (target.currentTarget.validity.valueMissing) {
      target.currentTarget.setCustomValidity('Нужно заполнить');
    } else {
      target.currentTarget.setCustomValidity('');
    }
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var setupVacationTime = function () {
    var timeIn = formNotice.querySelector('#timein');
    var timeOut = formNotice.querySelector('#timeout');

    window.synchronizeFields(timeIn, timeOut, CHECKS, CHECKS, syncValues);
    window.synchronizeFields(timeOut, timeIn, CHECKS, CHECKS, syncValues);
  };

  var setupPrice = function () {
    var price = formNotice.querySelector('#price');

    price.setAttribute('type', 'number');
    price.setAttribute('value', PRICE_VALUE);
    price.setAttribute('min', MIN_PRICE_VALUE);
    price.setAttribute('max', MAX_PRICE_VALUE);
    price.setAttribute('required', '');
    price.addEventListener('invalid', invalidPriceInput);
  };

  var invalidPriceInput = function (target) {
    if (target.currentTarget.validity.rangeUnderflow) {
      target.currentTarget.setCustomValidity('Слишком дешево');
    } else if (target.currentTarget.validity.rangeOverflow) {
      target.currentTarget.setCustomValidity('Слишком дорого');
    } else if (target.currentTarget.validity.valueMissing) {
      target.currentTarget.setCustomValidity('Нужно заполнить');
    } else {
      target.currentTarget.setCustomValidity('');
    }
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var setupTypePriceConnection = function () {
    var type = formNotice.querySelector('#type');
    var price = formNotice.querySelector('#price');

    window.synchronizeFields(type, price, APARTMENTS, PRICES, syncValueWithMin);
    triggerOnChangeEventOnSingleElement(type);
  };

  var contains = function (array, object) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === object) {
        return true;
      }
    }
    return false;
  };

  var syncValuesWithDisabling = function (element, values) {
    var firstEnabledElementIndex = -1;

    for (var i = 0; i < element.length; i++) {
      var option = element.options[i];

      var isOptionValueExistsInValuesArray = contains(values, option.value);
      option.disabled = !isOptionValueExistsInValuesArray;

      option.selected = false;

      if (firstEnabledElementIndex === -1 && isOptionValueExistsInValuesArray) {
        firstEnabledElementIndex = i;
      }
    }

    if (firstEnabledElementIndex !== -1) {
      element.options[firstEnabledElementIndex].selected = true;
    }

  };

  var setupRoomCapacityConnection = function () {
    var roomElement = formNotice.querySelector('#room_number');
    var capacityElement = formNotice.querySelector('#capacity');

    window.synchronizeFields(roomElement, capacityElement, ROOMS, CAPACITY, syncValuesWithDisabling);
    triggerOnChangeEventOnSingleElement(roomElement);
  };

  var setupSubmitButton = function () {
    var submit = formNotice.querySelector('.form__submit');

    submit.addEventListener('click', checkForm);
  };

  var checkForm = function () {
    var inputs = formNotice.querySelectorAll('input');
    var selects = formNotice.querySelectorAll('select');
    checkFormElements(inputs);
    checkFormElements(selects);
  };

  var checkFormElements = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      if (!elem[i].validity.valid) {
        elem[i].setAttribute('style', 'border: 2px solid red;');
      } else {
        elem[i].removeAttribute('style');
      }
    }
  };

  var syncAllFormElements = function () {
    var type = formNotice.querySelector('#type');
    var timeIn = formNotice.querySelector('#timein');
    var roomElement = formNotice.querySelector('#room_number');

    triggerOnChangeEventOnSingleElement(type);
    triggerOnChangeEventOnSingleElement(timeIn);
    triggerOnChangeEventOnSingleElement(roomElement);
  };

  var createSubmitHandler = function () {
    formNotice.addEventListener('submit', function (evt) {
      evt.preventDefault();

      window.backend.save(new FormData(formNotice), function () {
        formNotice.reset();

        window.moveMainPinOnStartCoordinates();
        syncAllFormElements();
      }, window.data.errorHandler);
    });
  };

  setupTitle();
  setupPrice();
  setupAddress();
  setupVacationTime();
  setupTypePriceConnection();
  setupRoomCapacityConnection();
  setupSubmitButton();
  createSubmitHandler();
})();
