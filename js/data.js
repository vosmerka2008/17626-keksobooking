'use strict';

(function () {
  var AVATAR = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var TYPES = ['flat', 'house', 'bungalo'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 10;
  var CHECKS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OBJECTS_COUNT = 8;


  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //  map.classList.remove('map--faded');

  var getAvatar = function () {
    var avatarRandomIndex = getRandomValue(0, AVATAR.length);
    var avatarIndex = AVATAR.splice(avatarRandomIndex, 1);

    return 'img/avatars/user' + avatarIndex + '.png';
  };

  var getFeatures = function () {
    var features = FEATURES.slice();
    var randomFeaturesLength = getRandomValue(1, features.length + 1);
    var newFeatures = [];

    for (var i = 0; i < randomFeaturesLength; i++) {
      var randomElement = getRandomValue(0, features.length);
      newFeatures.push(features[randomElement]);
      features.splice(randomElement, 1);
    }

    return newFeatures;
  };

  var getNewObject = function () {
    var locationX = getRandomValue(MIN_X, MAX_X);
    var locationY = getRandomValue(MIN_Y, MAX_Y);
    var object = {
      author: {
        avatar: getAvatar()
      },

      offer: {
        title: TITLE.splice(getRandomValue(0, TITLE.length), 1),
        address: locationX + ',' + locationY,
        price: getRandomValue(MIN_PRICE, MAX_PRICE),
        type: TYPES[getRandomValue(0, TYPES.length)],
        rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomValue(1, MAX_GUESTS),
        checkin: CHECKS[getRandomValue(0, CHECKS.length)],
        checkout: CHECKS[getRandomValue(0, CHECKS.length)],
        features: getFeatures(),
        description: '',
        photos: []
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    return object;
  };

  var getObjectsArray = function (objectsCount) {
    var objects = [];
    for (var i = 0; i < objectsCount; i++) {
      objects.push(getNewObject());
    }

    return objects;
  };

  window.data = {
    objects: getObjectsArray(OBJECTS_COUNT)
  };
})();
