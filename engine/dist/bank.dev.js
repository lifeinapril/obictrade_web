"use strict";

var s1 = "https://api.obictrade.com/";
var s2 = "http://localhost:9000/";
var s3 = "https://18.219.5.150/";
var API = s1 + "v1/users/";
var API2 = s1 + "v1/admin/";
var media = s1;
app.factory('Assets', function ($http) {
  return {
    all: function all() {
      return $http.get(API2 + "all_assets");
    },
    single: function single(id) {
      return $http.get(API + "single_asset/" + id);
    },
    trade: function trade(asset) {
      return $http.post(API + "trade_asset", asset);
    }
  };
});
app.factory('users', function ($http) {
  return {
    all_transactions: function all_transactions(id) {
      return $http.get(API + "transactions/" + id);
    },
    info: function info(id) {
      return $http.get(API + "info/" + id);
    },
    update: function update(data) {
      return $http.post(API + "update_profile", data);
    },
    login: function login(data) {
      return $http.post(API + "login", data);
    },
    register: function register(data) {
      return $http.post(API + "register", data);
    },
    reset: function reset(data) {
      return $http.get(API + "user_reset/" + data);
    },
    mailing_list: function mailing_list(data) {
      return $http.get(API + "mailing_list/" + data);
    },
    token: function token(data) {
      return $http.get(API + "user_tokener/" + data);
    },
    reset_password: function reset_password(data) {
      return $http.post(API + "update_password/", data);
    },
    change_password: function change_password(data) {
      return $http.post(API + "change_password", data);
    }
  };
});