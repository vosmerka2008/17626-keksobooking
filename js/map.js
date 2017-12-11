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
})();
