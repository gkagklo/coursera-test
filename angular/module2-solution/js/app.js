(function () {
  'use strict';
  
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .controller('AddItemsController', AddItemsController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .service('HelpersService', HelpersService);

  AddItemsController.$inject = ['ShoppingListCheckOffService'];
  function AddItemsController(ShoppingListCheckOffService) {
      var adder = this;

      adder.name = "";
      adder.quantity = "";

      adder.addItem = function () {
          if (adder.name !== "" && adder.quantity !== "") {
              ShoppingListCheckOffService.addItemToBuy(adder.name, adder.quantity);
              adder.name = "";
              adder.quantity = "";
          }
      }
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService', 'HelpersService'];
  function ToBuyController(ShoppingListCheckOffService, HelpersService) {
      var toBuy = this;

      toBuy.isEmpty = function () {
        return HelpersService.isEmptyArray(toBuy.getItems());
      };

      toBuy.getItems = function() {
          return ShoppingListCheckOffService.getItemsToBuy();
      };

      toBuy.setBought = function (itemIndex) {
        return ShoppingListCheckOffService.setBought(itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'HelpersService'];
  function AlreadyBoughtController(ShoppingListCheckOffService, HelpersService) {
      var alreadyBought = this;

      alreadyBought.isEmpty = function () {
        return HelpersService.isEmptyArray(alreadyBought.getItems());
      };

      alreadyBought.getItems = function() {
          return ShoppingListCheckOffService.getAlreadyBoughtItems();
      };

  }
  

  
  
  function ShoppingListCheckOffService() {

    var service = this;

    service.itemsToBuy = [
      {
          name: "Sweet Cookies",
          quantity: 10
      },
      {
          name: "Extra Sweet Cookies",
          quantity: 20
      },
      {
          name: "White Chocolate Cookies",
          quantity: 30
      },
      {
          name: "Dark Chocolate Cookies",
          quantity: 40
      },
      {
          name: "Coffee Cookies",
          quantity: 50
      }
  ];

  service.boughtItems =[];
 

    service.addItemToBuy = function (name, quantity) {
      service.itemsToBuy.push({
          name: name,
          quantity: quantity
      });
    };

    service.getItemsToBuy = function () {
      return service.itemsToBuy;
    };

    service.setBought = function(itemsToBuyIndex) {
        service.boughtItems.push(service.itemsToBuy[itemsToBuyIndex]);
        service.itemsToBuy.splice(itemsToBuyIndex, 1);
    };

    service.getAlreadyBoughtItems = function () {
        return service.boughtItems;
    };

  }

  function HelpersService() {
    var service = this;

    service.isEmptyArray = function(array) {
        return array.length === 0;
    }
}

  
  })();
  