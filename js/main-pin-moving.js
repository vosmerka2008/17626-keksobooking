'use strict';

(function () {
  var MAP_WIDTH = document.body.clientWidth;
  var HEIGHT_MAIN_PIN = 65;
  var HEIGHT_MAIN_POINTER = 22;
  var MIN_BORDER_Y = 100;
  var MAX_BORDER_Y = parseInt(window.getComputedStyle(document.querySelector('.map'), null).getPropertyValue('height'), 10) - parseInt(window.getComputedStyle(document.querySelector('.map__filters'), null).getPropertyValue('height'), 10);
  var MIN_BORDER_X = Math.round(HEIGHT_MAIN_PIN / 2);
  var MAX_BORDER_X = MAP_WIDTH - MIN_BORDER_X;
  var PIN_MAIN_TOP = Math.round(HEIGHT_MAIN_PIN / 2 + HEIGHT_MAIN_POINTER);
  var START_PIN_MAIN_COORDINATES = {
    top: null,
    left: null
  };

  var pinMain = document.querySelector('.map__pin--main');

  var getAddressValue = function () {
    var formNotice = document.querySelector('.notice__form');
    var address = formNotice.querySelector('#address');
    address.value = parseInt(pinMain.style.left, 10) + ', ' + (parseInt(pinMain.style.top, 10) + PIN_MAIN_TOP);
  };

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

      if (pinMain.offsetTop < MIN_BORDER_Y - PIN_MAIN_TOP) {
        pinMain.style.top = MIN_BORDER_Y - PIN_MAIN_TOP + 'px';
      } else if (pinMain.offsetTop > MAX_BORDER_Y - PIN_MAIN_TOP) {
        pinMain.style.top = MAX_BORDER_Y - PIN_MAIN_TOP + 'px';
      }
      if (pinMain.offsetLeft < MIN_BORDER_X) {
        pinMain.style.left = MIN_BORDER_X + 'px';
      } else if (pinMain.offsetLeft > MAX_BORDER_X) {
        pinMain.style.left = MAX_BORDER_X + 'px';
      }
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      if (START_PIN_MAIN_COORDINATES.top === null) {
        START_PIN_MAIN_COORDINATES.top = pinMain.style.top;
        START_PIN_MAIN_COORDINATES.left = pinMain.style.left;
      }

      getAddressValue();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMouseMove(upEvt);
      getAddressValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.moveMainPinOnStartCoordinates = function () {
    pinMain.style.top = START_PIN_MAIN_COORDINATES.top;
    pinMain.style.left = START_PIN_MAIN_COORDINATES.left;
    getAddressValue();
  };

})();
