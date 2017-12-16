'use strict';

(function () {
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

  window.card = {
    renderMapCard: function (object) {

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
    }
  };


    var renderCardFragment = function () {
      var cardFragment = document.createDocumentFragment();

      for (var i = 0; i < window.data.objects.length; i++) {
        cardFragment.appendChild(window.card.renderMapCard(window.data.objects[i]));
      }

      return cardFragment;
    };

  map.appendChild(renderCardFragment());
})();
