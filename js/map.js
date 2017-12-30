'use strict';

(function () {
  var ENTER = 13;

  var map = document.querySelector('.map');

  var makeMapActive = function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('hidden');
    }

    map.classList.remove('map--faded');

    var form = document.querySelector('.notice__form');
    form.classList.remove('notice__form--disabled');
  };

  var setupPinMain = function () {
    var pinMain = map.querySelector('.map__pin--main');

    pinMain.addEventListener('mouseup', makeMapActive);
    pinMain.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        makeMapActive();
      }
    });
  };

  setupPinMain();
})();
