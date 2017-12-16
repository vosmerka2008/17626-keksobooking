'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  function createCardFragment(i) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.renderMapCard(window.data.objects[i]));
    return fragment;
  }

  window.showCard = function (pinsImg, index, lastIndex) {
    var cardPopup = map.querySelector('.map__card');
    pinsImg[index].parentNode.classList.add('map__pin--active');
    mapPins.appendChild(createCardFragment(index - 1));
    cardPopup.classList.remove('hidden');
    if (lastIndex !== -1) {
      pinsImg[lastIndex].parentNode.classList.remove('map__pin--active');
    }
  }
})();
