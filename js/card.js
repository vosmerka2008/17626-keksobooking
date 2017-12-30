'use strict';

(function () {
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

  var renderFeaturesList = function (cardElement, features) {
    var featuresUl = cardElement.querySelector('.popup__features');
    var featuresLi = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[i];
      featuresLi.appendChild(newElement);
    }
    featuresUl.appendChild(featuresLi);
  };

  var renderPhotos = function (cardElement, pictures) {
    var picturesUl = cardElement.querySelector('.popup__pictures');
    var picturesLi = picturesUl.querySelector('li');
    picturesUl.removeChild(picturesLi);
    var picturesNewLi = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      var newElement = document.createElement('li');
      var itemImg = document.createElement('img');
      itemImg.src = pictures[i];
      itemImg.setAttribute('style', 'width: 40px; height: 40px;');
      newElement.appendChild(itemImg);
      picturesNewLi.appendChild(newElement);
    }
    picturesUl.appendChild(picturesNewLi);
  };

  window.card = {
    renderMapCard: function (object) {

      var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
      var mapCardElement = mapCardTemplate.cloneNode(true);
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
      renderFeaturesList(mapCardElement, object.offer.features);
      mapCardElementP[4].textContent = object.offer.description;
      renderPhotos(mapCardElement, object.offer.photos);

      var popupClose = mapCardElement.querySelector('.popup__close');
      popupClose.addEventListener('click', window.closeCard);

      return mapCardElement;
    }
  };
})();
