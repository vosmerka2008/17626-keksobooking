'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var renderMapPin = function (object) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.querySelector('img').src = object.author.avatar;
    mapPinElement.style.left = (object.location.x + PIN_WIDTH / 2) + 'px';
    mapPinElement.style.top = (object.location.y + PIN_HEIGHT) + 'px';
    mapPinElement.classList.add('hidden');

    return mapPinElement;
  };

  window.pin = {
    renderAllPins: function (objects) {
      var pinFragment = document.createDocumentFragment();
      for (var i = 0; i < objects.length; i++) {
        pinFragment.appendChild(renderMapPin(objects[i]));
      }

      var map = document.querySelector('.map');
      map.appendChild(pinFragment);

      return pinFragment;
    }
  };
})();
