'use strict';

(function () {
  var ESC = 27;
  var ENTER = 13;
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);

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

  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelectorAll('.map__pin');

  var popupClose = map.querySelector('.popup__close');
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC) {
      window.pin.closeCard();
    }
  }

  popupClose.addEventListener('click', window.pin.closeCard);

  var form = document.querySelector('.notice__form');
  var cardPopup = map.querySelector('.map__card');
  cardPopup.classList.add('hidden');

  function openMap() {
    for (var i = 1; i < pins.length; i++) {
      pins[i].classList.remove('hidden');
    }

    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
  }

  document.addEventListener('keydown', onPopupEscPress);

  pinMain.addEventListener('mouseup', openMap);

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      openMap();
    }
  });
})();
