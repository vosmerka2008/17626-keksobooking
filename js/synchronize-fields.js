'use strict';

(function () {
  window.synchronizeFields = function (firstElement, secondElement, valuesOfFirstElement, valuesOfSecondElement, action) {
    firstElement.addEventListener('change', function() {
      for (var i = 0; i < valuesOfFirstElement.length; i++) {
        if (valuesOfFirstElement[i] === firstElement.value) {
          action(secondElement, valuesOfSecondElement[i]);
        }
      }
      console.log(firstElementValues.length);
    });
  };
})();
