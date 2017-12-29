'use strict';

(function() {
  var lastTimeout;

  window.debounce = function (callback, delayInMills) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, delayInMills);
  };
})();
