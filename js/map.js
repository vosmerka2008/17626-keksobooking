'use strict';

(function () {
  var ESC = 27;
  var ENTER = 13;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelectorAll('.map__pin');
  var popupClose = map.querySelector('.popup__close');

  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC) {
      window.pin.closeCard();
    }
  }

  popupClose.addEventListener('click', window.pin.closeCard);

  var form = document.querySelector('.notice__form');
  var cardPopup = map.querySelector('.map__card');
  cardPopup.classList.add('hidden');

  function openMap() {
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('hidden');
    }

    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
  }

  document.addEventListener('keydown', onPopupEscPress);

  pinMain.addEventListener('mouseup', openMap);

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      openMap();
    }
  });

  //  перетаскивание главного пина
  var MAP_WIDTH = document.body.clientWidth;
  var HEIGHT_MAIN_PIN = 65;
  var HEIGHT_MAIN_POINTER = 22;
  var MIN_BORDER_Y = 100;
  var MAX_BORDER_Y = parseInt(window.getComputedStyle(map, null).getPropertyValue('height'), 10) - parseInt(window.getComputedStyle(document.querySelector('.map__filters'), null).getPropertyValue('height'), 10);
  var MIN_BORDER_X = Math.round(HEIGHT_MAIN_PIN / 2);
  var MAX_BORDER_X = MAP_WIDTH - MIN_BORDER_X;

  var pinMainTop = Math.round(HEIGHT_MAIN_PIN / 2 + HEIGHT_MAIN_POINTER);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMain.offsetTop < MIN_BORDER_Y - pinMainTop) {
        pinMain.style.top = MIN_BORDER_Y - pinMainTop + 'px';
      } else if (pinMain.offsetTop > MAX_BORDER_Y - pinMainTop) {
        pinMain.style.top = MAX_BORDER_Y - pinMainTop + 'px';
      }
      if (pinMain.offsetLeft < MIN_BORDER_X) {
        pinMain.style.left = MIN_BORDER_X + 'px';
      } else if (pinMain.offsetLeft > MAX_BORDER_X) {
        pinMain.style.left = MAX_BORDER_X + 'px';
      }
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      getAddressValue();
    };

    function getAddressValue() {
      var formNotice = document.querySelector('.notice__form');
      var address = formNotice.querySelector('#address');
      address.value = parseInt(pinMain.style.left, 10) + ', ' + (parseInt(pinMain.style.top, 10) + pinMainTop);
    }

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getAddressValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
