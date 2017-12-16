'use strict';

(function () {

  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var ENTER = 13;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  window.pin = {
    renderMapPin: function (mapPin) {
      var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
      var mapPinElement = mapPinTemplate.cloneNode(true);

      mapPinElement.querySelector('img').src = mapPin.author.avatar;
      mapPinElement.style.left = (mapPin.location.x + PIN_WIDTH / 2) + 'px';
      mapPinElement.style.top = (mapPin.location.y + PIN_HEIGHT) + 'px';
      mapPinElement.classList.add('hidden');

      return mapPinElement;
    },

    closeCard: innerCloseCard
  };

  var renderPinFragment = function () {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.objects.length; i++) {
      pinFragment.appendChild(window.pin.renderMapPin(window.data.objects[i]));
    }

    return pinFragment;
  };

  mapPins.appendChild(renderPinFragment());

  var pinsImg = map.querySelectorAll('.map__pin img');
  var prevIndex = -1;

  function innerCloseCard() {
    var cardPopup = map.querySelector('.map__card');
    cardPopup.classList.add('hidden');
    if (prevIndex !== -1) {
      pinsImg[prevIndex].parentNode.classList.remove('map__pin--active');
    }
    prevIndex = -1;
  }

  document.body.addEventListener('click', function (evt) {
    for (var i = 0; i < pinsImg.length; i++) {
      if (!pinsImg[i].parentNode.classList.contains('map__pin--main') && evt.target === pinsImg[i]) {
        window.showCard(pinsImg, i, prevIndex);
        prevIndex = i;
      }

      if (!pinsImg[i].parentNode.classList.contains('map__pin--active') && evt.target === pinsImg[i]) {
        innerCloseCard();
      }
    }
  });

  document.body.addEventListener('keydown', function (evt) {
    for (var i = 0; i < pinsImg.length; i++) {
      if (!pinsImg[i].parentNode.classList.contains('map__pin--main') && evt.target === pinsImg[i].parentNode && evt.keyCode === ENTER) {
        window.showCard(pinsImg, i, prevIndex);
        prevIndex = i;
      }
    }
  });
})();
