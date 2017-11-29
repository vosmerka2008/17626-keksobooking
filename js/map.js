'use strict';

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
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getAvatar = function () {
  var avatarRandomIndex = getRandomValue(0, AVATAR.length);
  var avatarIndex = AVATAR.splice(avatarRandomIndex, 1);

  return 'img/avatars/user' + avatarIndex + '.png';
};

var getFeatures = function () {
  var features = FEATURES.slice();
  var randomFeaturesLength = getRandomValue(1, features.length);
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

var objects = getObjectsArray(OBJECTS_COUNT);

var renderMapPin = function (mapPin) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.style.left = (mapPin.location.x + PIN_WIDTH / 2) + 'px';
  mapPinElement.style.top = (mapPin.location.y + PIN_HEIGHT) + 'px';

  return mapPinElement;
};

var mapPins = document.querySelector('.map__pins');

var renderPinFragment = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    pinFragment.appendChild(renderMapPin(objects[i]));
  }

  return pinFragment;
};
mapPins.appendChild(renderPinFragment());

var generateRoomsGuests = function (rooms, guests) {
  var roomsCount;
  if (rooms > 4) {
    roomsCount = 'комнат';
  } else {
    roomsCount = rooms === 1 ? ' комната' : ' комнаты';
  }

  var guestsCount = guests === 1 ? ' гостя' : ' гостей';

  return rooms + roomsCount + ' для ' + guests + guestsCount;
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCardElement = mapCardTemplate.cloneNode(true);

var renderFeaturesList = function (features) {
  var featuresUl = mapCardElement.querySelector('.popup__features');
  var featuresLi = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    featuresLi.appendChild(newElement);
  }
  featuresUl.appendChild(featuresLi);
};

var renderMapCard = function (object) {
  var mapCardElementP = mapCardElement.querySelectorAll('p');

  mapCardElement.querySelector('.popup__avatar').src = object.author.avatar;
  mapCardElement.querySelector('h3').textContent = object.offer.title;
  mapCardElement.querySelector('small').textContent = object.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = object.offer.price + ' \u20BD/ночь';

  if (object.offer.type === 'flat') {
    mapCardElement.querySelector('h4').textContent = 'Квартира';
  } else if (object.offer.type === 'house') {
    mapCardElement.querySelector('h4').textContent = 'Дом';
  } else {
    mapCardElement.querySelector('h4').textContent = 'Бунгало';
  }

  mapCardElementP[2].textContent = generateRoomsGuests(object.offer.rooms, object.offer.guests);
  mapCardElementP[3].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  mapCardElement.querySelector('.popup__features').textContent = '';
  renderFeaturesList(object.offer.features);
  mapCardElementP[4].textContent = object.offer.description;

  return mapCardElement;
};

var mapCard = document.querySelector('.map');

var renderCardFragment = function () {
  var cardFragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    cardFragment.appendChild(renderMapCard(objects[i]));
  }

  return cardFragment;
};
mapCard.appendChild(renderCardFragment());
