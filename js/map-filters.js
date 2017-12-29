'use strict';

(function () {
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;

  var prices = {};
  prices = {
    'low': function (price) {
      return price < LOW_PRICE;
    },

    'middle': function (price) {
      return price >= LOW_PRICE && price < MIDDLE_PRICE;
    },

    'high': function (price) {
      return price >= MIDDLE_PRICE;
    }
  };

  var filterType = function (elements, value) {
    var filteredElement = elements.filter(function (element) {
      return value === 'any' || element.offer.type.toString() === value;
    });

    return filteredElement;
  };

  var filterPrice = function (elements, value) {
    var filteredElement = elements.filter(function (element) {

      return value === 'any' || prices[value](element.offer.price);
    });

    return filteredElement;
  };

  var filterRooms = function (elements, value) {
    var filteredElement = elements.filter(function (element) {
      return value === 'any' || element.offer.rooms.toString() === value;
    });

    return filteredElement;
  };

  var filterGuests = function (elements, value) {
    var filteredElement = elements.filter(function (element) {
      return value === 'any' || element.offer.guests.toString() === value;
    });

    return filteredElement;
  };

  var filterFeatures = function (elements, value) {
    var filteredElement = elements.filter(function (element) {
      for (var i = 0; i < value.length; i++) {
        if (element.offer.features.indexOf(value[i]) === -1) {
          return false;
        }
      }

      return true;
    });

    return filteredElement;
  };

  var getValueArrayFromCheckboxes = function (checkboxes) {
    var array = [];
    checkboxes.forEach(function (filter) {
      array.push(filter.value);
    });

    return array;
  };

  var filterElements = function (elements) {
    var checkedFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var features = getValueArrayFromCheckboxes(checkedFeatures);
    var type = document.querySelector('#housing-type').value;
    var price = document.querySelector('#housing-price').value;
    var rooms = document.querySelector('#housing-rooms').value;
    var guests = document.querySelector('#housing-guests').value;

    var filtered = filterType(elements, type);
    filtered = filterPrice(filtered, price);
    filtered = filterRooms(filtered, rooms);
    filtered = filterGuests(filtered, guests);
    filtered = filterFeatures(filtered, features);

    return filtered;
  };

  var filterAndRender = function () {
    window.closeCard();
    var filtered = filterElements(window.data.objects);

    window.pin.renderAllPins(filtered, false);
  };

  var setupFiltersForm = function () {
    var filters = [];
    filters.push(document.querySelector('#housing-type'));
    filters.push(document.querySelector('#housing-price'));
    filters.push(document.querySelector('#housing-rooms'));
    filters.push(document.querySelector('#housing-guests'));
    document.querySelectorAll('.map__filter-set input[type="checkbox"]').forEach(function (input) {
      filters.push(input);
    });

    filters.forEach(function (filter) {
      filter.addEventListener('change', function () {
        window.debounce(filterAndRender, 500);
      });
    });
  };

  setupFiltersForm();
})();
