'use strict';

(function () {
  var OBJECTS_COUNT = 5;

  var loadHandler = function (serverObjects) {
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      window.data.objects.push(serverObjects[i]);
    }

    window.pin.renderAllPins(window.data.objects, true);
  };

  window.data = {
    objects: [],

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 50% auto; text-align: center; background-color: white; border: 2px dashed red; color: red; text-transform: uppercase;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.textShadow = '3px 3px 2px lightgrey';
      node.style.width = '70%';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

  window.backend.load(loadHandler, window.data.errorHandler);
})();
