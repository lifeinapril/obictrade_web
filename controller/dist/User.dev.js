"use strict";

app.controller('user', function ($scope, $location, users, Upload, $rootScope, $localStorage, toastr, $window, $timeout, Assets) {
  $scope.API_MEDIA = media;
  $scope.error = "";
  $scope.$watch('dropfilter', function (value) {
    console.log(value);
  });
  Assets.all().success(function (Data) {
    if (Data.status == true) {
      $scope.assets = Data.data;
    }
  });

  $scope.checkin = function () {
    if ($localStorage.user) {
      window.history.back();
    }
  };

  $scope.banks = ["Access Bank Nigeria Plc", "Citibank Nigeria Limited", "Diamond Bank Nigeria Plc", "EcoBank Nigeria Plc", "Enterprise Bank", "Fidelity Bank Plc", "First Bank Nigeria Ltd", "First City Monument Bank Plc", "Guaranty Trust Bank Plc", "Heritage Banking Company Ltd", "Keystone Bank", "MainStreet Bank", "Skye Bank Plc", "Stanbic - IBTC Bank Plc", "Standard Chartered Bank Nigeria Ltd", "Sterling Bank Plc", "SunTrust Bank Nigeria Limited", "Union Bank Of Nigeria Plc", "United Bank For Africa Plc", "Unity Bank Plc", "Wema Bank Plc", "Zenith Bank Plc"];

  if ($localStorage.user) {
    $scope.user = $localStorage.user;
    users.all_transactions($scope.user.o_id).success(function (Data) {
      if (Data.status == true) {
        $scope.transactions = Data.data;
      }
    });
    users.info($localStorage.user.o_id).success(function (Data) {
      $scope.user = Data.data;
    });

    if ($scope.user.bank_account) {
      if ($scope.user.bank_account) {
        if (!$scope.user.bank_account.bank || $scope.user.bank_account.bank == "") {
          $scope.user.bank_account.bank = $scope.banks[0];
        }
      }
    }
  } else {
    $timeout(function () {
      $location.path("/");
    }, 2000);
  }

  $scope.update_profile = function (user) {
    users.update(user).success(function (Data) {
      if (Data.status == true) {
        toastr.success(Data.message, "Success!");
        $timeout(function () {
          window.location.reload();
        }, 1000);
      }
    });
  };

  $scope.update_profile2 = function (user) {
    users.update(user).success(function (Data) {
      if (Data.status == true) {
        toastr.success(Data.message, "Success!");
        $timeout(function () {
          window.location.href = "/user/dashboard";
        }, 1000);
      }
    });
  };

  $scope.update_password = function (pass) {
    var data = {
      _id: $scope.user._id,
      old_password: pass.old,
      password: pass["new"]
    };
    users.change_password(data).success(function (Data) {
      if (Data.status == true) {
        toastr.success(Data.message, "Success!");
        $timeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        toastr.error(Data.message, "Error!");
      }
    }).error(function () {
      toastr.error("there is a connection error", "Network Error");
    });
  };

  $scope.logout = function () {
    localStorage.removeItem('user');
    $rootScope.user = "";
    $localStorage.user = "";
    $localStorage.user = "";
    $window.localStorage.clear();
    $timeout(function () {
      $location.path("/");
    }, 2000);
  };

  $scope.total_card = function (cards) {
    var total = 0;

    if (cards) {
      for (var i = 0; i < cards.length; i++) {
        var sub = cards[i].amount * cards[i].quantity;
        total = total + sub;
      }
    }

    return total;
  };

  $scope.select_asset = function (asset) {
    $scope.selected_asset = asset;
    $scope.selected_asset.cards = [];
    var card = {
      amount: 0,
      quantity: 1
    };
    $scope.selected_asset.cards.push(card);
  };

  $scope.add_card = function () {
    var card = {
      amount: 0,
      quantity: 1
    };
    $scope.selected_asset.cards.push(card);
  };

  $scope.remove_card = function (card) {
    var index = $scope.selected_asset.cards.indexOf(card);
    $scope.selected_asset.cards.splice(index, 1);
  };

  $scope.select_transaction = function (transaction) {
    $rootScope.selected_transaction = transaction;
  };

  $scope.quantity_minus = function () {
    this.card.quantity--;
  };

  $scope.quantity_plus = function () {
    this.card.quantity++;
  };

  $scope.photo_up = function (f) {
    $scope.files = f;
  };

  $scope.dropfilter = "";

  $scope.filter_status = function (s) {
    console.log(s);

    if (s) {
      $scope.dropfilter = s;
    } else {
      $scope.dropfilter = "";
    }
  };

  $scope.sell_asset = function (asset) {
    asset.o_id = $localStorage.user.o_id;
    var formData = new FormData();
    $rootScope.show_loader = true;
    formData.append('files', $scope.files);
    Upload.upload({
      url: API + "sell_asset",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: asset
    }).then(function (resp) {
      $rootScope.show_loader = false;

      if (resp.data.status == true) {
        toastr.success(resp.data.message, "Success!");
        $timeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        toastr.error(resp.data.message, "Oops!");
      }
    });
  };
});