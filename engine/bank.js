function txref(){
	var t =Math.random() * 36;
	var token="OBIC-"+t+"AX"+Math.random();
	return token;
  }

function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }




app.factory('Assets',function($http,Config){
	return  { 
	all: function(){
		return $http.get(Config.API+ "admin/all_assets");
	 },
	 single: function(id){
	   return $http.get(Config.API+"users/single_asset/"+ id);
	 },
	trade: function(asset){
	   return $http.post(Config.API+"users/trade_asset",asset);
	 }
  }          
  });
  


  app.factory('Transaction',function($http,Config){
	return  {
		update: function(data){
		return $http.post(Config.API + "users/update_transaction",data);
		}
	}
  });





  app.factory('Banks',function($http,Config){
	return  {
	all:function(){
		return $http.get(Config.API + "users/all_banks");
	}
}
  });

  app.factory('BTC',function($http,Config){
	return  {
  	create_wallet: function(id){
	return $http.get(Config.API + "users/btc/create_wallet/"+id);
	},
	balance: function(id){
	return $http.get(Config.API + "users/btc/balance/"+id);
	},
	sell_rate: function(amount){
	return $http.get(Config.API + "users/btc/sell_rate/"+amount);
	},
	buy_rate: function(amount){
	return $http.get(Config.API + "users/btc/buy_rate/"+amount);
	},
	sell: function(data){
	return $http.post(Config.API + "users/btc/sell",data);
	},
	buy: function(data){
	return $http.post(Config.API + "users/btc/buy",data);
	},
	send: function(data){
	return $http.post(Config.API + "users/btc/send",data);
	},
	fee: function(){
	return $http.get(Config.API + "users/btc/fee");
	},
	rates: function(){
	return $http.get(Config.API + "users/btc/rates");
	}
}
});

app.factory('users',function($http,Config){
return  {
all_transactions:function(id){
return $http.get(Config.API + "users/transactions/"+id);
},
info: function(id){
return $http.get(Config.API + "users/info/"+id);
},
btc_balance: function(id){
return $http.get(Config.API + "users/btc/balance/"+id);
},
update: function(data){
return $http.post(Config.API + "users/update_profile",data);
},
update_phone: function(data){
return $http.post(Config.API + "users/update_phone",data);
},
verify_phone: function(data){
return $http.post(Config.API + "users/verify_phone",data);
},
verify_bank: function(data){
return $http.post(Config.API + "users/verify_bank",data);
},
send_code: function(data){
	return $http.get(Config.API + "users/send_code/"+data);
	},
login: function(data){
	return $http.post(Config.API + "users/login",data);
} ,
register: function(data){
	return $http.post(Config.API + "users/register",data);
},
reset: function(data){
	return $http.get(Config.API + "users/user_reset/"+data);
},
mailing_list: function(data){
	return $http.get(Config.API + "users/mailing_list/"+data);
},
token: function(data){
	return $http.get(Config.API + "users/user_tokener/"+data);
},
verify: function(data){
	return $http.get(Config.API + "users/verify_user/"+data);
},
verify_email: function(data){
	return $http.post(Config.API + "users/verify_email",data);
},
reset_password: function(data){
	return $http.post(Config.API + "users/update_password/",data);
},
change_password:function(data){
	return $http.post(Config.API + "users/change_password",data);
},
fund:function(data){
	return $http.post(Config.API + "users/fund",data);
},
widthdraw:function(data){
	return $http.post(Config.API + "users/widthdraw",data);
}
		}
});








