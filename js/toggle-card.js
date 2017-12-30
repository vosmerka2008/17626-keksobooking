'use strict';

(function () {
  var ESC = 27;
  var ENTER = 13;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var prevIndex = -1;

  var createCardFragment = function (object) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.renderMapCard(object));
    return fragment;
  };

  var showCard = function (pinsImg, index, lastIndex) {
    var cardPopup = map.querySelector('.map__card');
    if (cardPopup !== null) {
      mapPins.removeChild(cardPopup);
    }

    pinsImg[index].parentNode.classList.add('map__pin--active');

    var src = pinsImg[index].src;
    var object = window.pin.pinsDictionary[src];
    mapPins.appendChild(createCardFragment(object));

    if (lastIndex !== -1) {
      pinsImg[lastIndex].parentNode.classList.remove('map__pin--active');
    }
  };

  window.closeCard = function () {
    var cardPopup = map.querySelector('.map__card');
    if (cardPopup !== null) {
      mapPins.removeChild(cardPopup);
    }

    lowlightActivePin();
  };

  var lowlightActivePin = function () {
    var pinsImg = map.querySelectorAll('.map__pin img');

    if (prevIndex !== -1) {
      pinsImg[prevIndex].parentNode.classList.remove('map__pin--active');
    }
    prevIndex = -1;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC) {
      window.closeCard();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);

  document.body.addEventListener('click', function (evt) {
    var pinsImg = map.querySelectorAll('.map__pin img');

    for (var i = 0; i < pinsImg.length; i++) {
      if (evt.target === pinsImg[i] && !pinsImg[i].parentNode.classList.contains('map__pin--main')) {
        if (pinsImg[i].parentNode.classList.contains('map__pin--active')) {
          window.closeCard();
        } else {
          showCard(pinsImg, i, prevIndex);
          prevIndex = i;
        }
        break;
      }
    }
  });

  document.body.addEventListener('keydown', function (evt) {
    var pinsImg = map.querySelectorAll('.map__pin img');

    for (var i = 0; i < pinsImg.length; i++) {
      if (!pinsImg[i].parentNode.classList.contains('map__pin--main') && evt.target === pinsImg[i].parentNode && evt.keyCode === ENTER) {
        showCard(pinsImg, i, prevIndex);
        prevIndex = i;
      }
    }
  });
})();
