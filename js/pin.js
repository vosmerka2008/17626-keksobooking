'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var renderMapPin = function (object, isPinInvisible) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.querySelector('img').src = object.author.avatar;
    mapPinElement.style.left = (object.location.x + PIN_WIDTH / 2) + 'px';
    mapPinElement.style.top = (object.location.y + PIN_HEIGHT) + 'px';
    if (isPinInvisible) {
      mapPinElement.classList.add('hidden');
    }

    return mapPinElement;
  };

  var removePins = function () {
    window.pin.pinsDictionary = {};

    var mapPins = document.querySelector('.map');
    var pins = mapPins.querySelectorAll('.map__pin');
    var pinMain = mapPins.querySelector('.map__pin--main');

    for (var i = 1; i < pins.length; i++) {
      if (pins[i] !== pinMain) {
        mapPins.removeChild(pins[i]);
      }
    }
  };

  window.pin = {
    pinsDictionary: {},

    renderAllPins: function (objects, isPinsInvisible) {
      removePins();

      var pinFragment = document.createDocumentFragment();
      for (var i = 0; i < objects.length; i++) {
        var pin = renderMapPin(objects[i], isPinsInvisible);
        pinFragment.appendChild(pin);
        var src = pin.querySelector('img').src;
        window.pin.pinsDictionary[src] = objects[i];
      }

      var map = document.querySelector('.map');
      map.appendChild(pinFragment);
    }
  };
})();
