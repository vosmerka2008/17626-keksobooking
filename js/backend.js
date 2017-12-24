'use strict';

(function () {
  var PAGE_NOT_FOUND = 404;
  var BAD_REQUEST = 400;
  var UNAUTHORIZED = 401;
  var OK = 200;
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var setup = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case OK:
          loadHandler(xhr.response);
          break;
        case BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case PAGE_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }
      if (error) {
        errorHandler(error);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 30000;

    return xhr;
  };

  window.backend = {
    save: function (data, loadHandler, errorHandler) {
      var xhr = setup(loadHandler, errorHandler);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    load: function (loadHandler, errorHandler) {
      var xhr = setup(loadHandler, errorHandler);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
