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
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var objects = [];
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCardElement = mapCardTemplate.cloneNode(true);
var mapCard = document.querySelector('.map');
var ESC = 27;
var ENTER = 13;

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//map.classList.remove('map--faded');

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
  mapPinElement.classList.add('hidden');

  return mapPinElement;
};

var renderPinFragment = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    pinFragment.appendChild(renderMapPin(objects[i]));
  }

  return pinFragment;
};

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

var renderCardFragment = function () {
  var cardFragment = document.createDocumentFragment();

  for (var i = 0; i < objects.length; i++) {
    cardFragment.appendChild(renderMapCard(objects[i]));
  }

  return cardFragment;
};
mapPins.appendChild(renderPinFragment());
mapCard.appendChild(renderCardFragment());

//события

var pinMain = map.querySelector('.map__pin--main'); // главный маркер
var popupClose = map.querySelector('.popup__close'); // крестик
var pins = map.querySelectorAll('.map__pin');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC) {
    closeCard();
  }
}

popupClose.addEventListener('click', function() {
  closeCard();
})

var form = document.querySelector('.notice__form');
var cardPopup = map.querySelector('.map__card');
cardPopup.classList.add('hidden');

function openMap() {
  for (var i = 1; i < pins.length; i++) {
    pins[i].classList.remove('hidden');
  }

  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
};

function showCard(i) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMapCard(objects[i]));
  return fragment;
};

function openCard(index, lastIndex) {
  pinsImg[index].parentNode.classList.add('map__pin--active');
  mapPins.appendChild(showCard(index - 1));
  cardPopup.classList.remove('hidden');
  if (lastIndex !== -1) {
    pinsImg[lastIndex].parentNode.classList.remove('map__pin--active');
  }
  document.addEventListener('keydown', onPopupEscPress);
};

function closeCard() {
  cardPopup.classList.add('hidden');
  if (prevIndex !== -1) {
  pinsImg[prevIndex].parentNode.classList.remove('map__pin--active');
  }
  prevIndex = -1;
};

pinMain.addEventListener('mouseup', function () {
  openMap();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    openMap();
  }
});

var pinsImg = map.querySelectorAll('.map__pin img');
var prevIndex = -1;

document.body.addEventListener('click', function (evt) {
  for (var i = 0; i < pinsImg.length; i++) {
    if (!pinsImg[i].parentNode.classList.contains('map__pin--main') && evt.target === pinsImg[i]) {
      openCard(i, prevIndex);
      prevIndex = i;
    }

    if (!pinsImg[i].parentNode.classList.contains('map__pin--active') && evt.target === pinsImg[i]) {
      closeCard();
    }
  }
});

document.body.addEventListener('keydown', function (evt) {
  for (var i = 0; i < pinsImg.length; i++) {
    if (!pinsImg[i].parentNode.classList.contains('map__pin--main') && evt.target === pinsImg[i].parentNode && evt.keyCode === ENTER) {
    openCard(i, prevIndex);
    prevIndex = i;
    }
  }
});
