 app.controller('user', function($scope,Config, $location,Banks,BTC, users,Transaction, Upload,$rootScope ,$localStorage , toastr ,$window, $timeout,Assets) {
    $scope.media=Config.media;
   
    $scope.show_btc=false;
    $scope.show_usd=true;



    $rootScope.refresh_profile();
     
    $scope.error="";
   $scope.$watch('dropfilter', function(value) {
    console.log(value);
});



$rootScope.close_banner=function(){
    console.log("clicked!");
$("#myNavbar").collapse('toggle');
};


$rootScope.int=function(x){
   return parseFloat(x);
};


Banks.all().success(function(Data){
    if(Data.status==true){
        $rootScope.banks=Data.data;
        console.log("banks:");
        console.log(Data.data);
    }else{
        
        console.log("failed banks:");
        console.log(Data.data);
    }
});

      
  Assets.all().success(function(Data){
    if(Data.status==true){
        $scope.assets=Data.data;
        $scope.assets.forEach(function(asset) {
            if(asset.rates){
                
            }
        });
    }
});

  $scope.checkin = function(){
    if($localStorage.user){
        window.history.back();
    }
  };
  



  
//   $scope.banks=[
//     "Access Bank Nigeria Plc",
//     "Citibank Nigeria Limited",
//     "Diamond Bank Nigeria Plc",
//     "EcoBank Nigeria Plc",
//     "Enterprise Bank",
//     "Fidelity Bank Plc",
//     "First Bank Nigeria Ltd",
//     "First City Monument Bank Plc",
//     "Guaranty Trust Bank Plc",
//     "Heritage Banking Company Ltd",
//     "Keystone Bank",
//     "MainStreet Bank",
//     "Skye Bank Plc",
//     "Stanbic - IBTC Bank Plc",
//     "Standard Chartered Bank Nigeria Ltd",
//     "Sterling Bank Plc",
//     "SunTrust Bank Nigeria Limited",
//     "Union Bank Of Nigeria Plc",
//     "United Bank For Africa Plc",
//     "Unity Bank Plc",
//     "Wema Bank Plc",
//     "Zenith Bank Plc"
//     ];


    


  if($localStorage.user){
        $scope.user=$localStorage.user;

        users.all_transactions($scope.user.o_id).success(function(Data){ 
            if(Data.status==true){
            $scope.transactions=Data.data;
            }
        });
        users.info($localStorage.user.o_id).success(function(Data){
            $scope.user=Data.data;
        });
        
  
    if($scope.user.bank_account){
        if($scope.user.bank_account){
      if(!$scope.user.bank_account.bank || $scope.user.bank_account.bank==""){
        $scope.user.bank_account.bank=$scope.banks[0];
      }
        }
    }
    }else{
        $timeout(function () {
        $location.path("/");
        },2000);
    }





    if($rootScope.user){
          if($rootScope.user.in_currency){
            $rootScope.selected_currency=$rootScope.user.in_currency;
          }else{
            $rootScope.selected_currency=="usd";
            $rootScope.change_currency($rootScope.selected_currency);
          }
      };
      

    if(!$rootScope.user.phone_verified){
        $timeout(function () {
        $location.path("/verify_phone");
        },2000);
    }



    

    $scope.update_profile=function(user){
        $rootScope.show_loader=true;      
        users.update(user).success(function(Data){   
    $rootScope.show_loader=false;      
            if(Data.status==true){
                toastr.success(Data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 1000);
            }
        });
    }

    $scope.verify_bank_account=function(user){
        $rootScope.verifying=true;
        var data={
            account_number:user.bank_account.account_number,
            code:user.bank_account.bank.Code
        }
        users.verify_bank(data).success(function(Data){
            $rootScope.verifying=false;      
            if(Data.status==true){
                console.log("verified:\n");
                console.log(Data);
                $scope.verification=Data.data.data.data;
                $rootScope.user.bank_verified=true;
                $rootScope.user.bank_account.bank=$scope.verification.bank;
                $rootScope.user.bank_account.bank_code=$scope.verification.bank.Code;
                $rootScope.user.bank_account.account_name=$scope.verification.accountname;
                $rootScope.user.bank_account.bank_name=$scope.verification.bank.Name;
            }else{
                $rootScope.user.bank_verified=false;
                $scope.verification=null;  
                console.log("no verification....") 
            }
        });
    }
    
   $scope.widthdraw=function(amount,bank){
    $rootScope.show_loader=true;  
    var bankcharge=50;    
    var data={
        amount:amount+bankcharge,
        bank:bank,
        o_id:$rootScope.user.o_id
    }
    users.widthdraw(data).success(function(Data){
        $rootScope.show_loader=false;      
        if(Data.status==true){
            toastr.success(Data.message,"Successful!"); 
            $rootScope.refresh_profile();
            $timeout(function () {
                window.location.reload();
            }, 2000);
        }else{
            toastr.error(Data.message,"Oops!"); 
            $scope.error=Data.message;
        }
    }).error(function(){
        $rootScope.show_loader=false;  
        toastr.error("Network Error please try again later","Error!");
        $scope.error="Network Error please try again later";
      });
   }





   $scope.verification_level=function(){
       var level=0;
       if($rootScope.user.bank_verified){
           level=level+1;
       }
       if($rootScope.user.email_verified){
           level=level+1;
       }
       if($rootScope.user.phone_verified){
           level=level+1;
       }
        return level;
   };



   $scope.verify_email= function (email){
    $rootScope.show_loader=true;    
    var data={
        o_id:$rootScope.user.o_id,
        email:email
    }
    users.verify_email(data).success(function(Data){
        $rootScope.show_loader=false; 
        if (Data.status==true) {       
            $location.path("/verify_email");
        }else{
            toastr.error(Data.message,"Oops!"); 
        }
    }).error(function(){
        $rootScope.show_loader=false; 
    });

}






   $scope.fund_wallet=function(amount){
    var charge=100+(amount * 0.0145);
    var amt=amount + charge;
        FlutterwaveCheckout({
          public_key: Config.flutterwave_pub_key,
          tx_ref: txref(),
          amount: amt,
          currency: "NGN",
          country: "NG",
          payment_options: "card, mobilemoneyghana, ussd",
          customer: {
            email: $rootScope.user.email,
            phone_number: $rootScope.user.phone,
            name: $rootScope.user.first_name + " "+ $rootScope.user.last_name,
          },
          callback: function (data) {
             if(data.status=="successful"){
                 var Obic_data={
                    transaction_id:data.flw_ref,
                    o_id:$rootScope.user.o_id,
                    amount:amount
                 }
                 users.fund(Obic_data).success(function(Data){
                    if(Data.status==true){
                        toastr.success(Data.message,"Successful!"); 
                        $rootScope.refresh_profile();
                        $timeout(function () {
                            window.location.reload();
                        }, 2000);
                    }else{
                        toastr.error(Data.message,"Oops!"); 
                        $scope.error=Data.message;
                    }
                });
                 }else{
                    toastr.error(data.message,"Oops!"); 
                    $scope.error=data.message;
                 }
          },
          onclose: function(data) {
              if(data.status=="successful"){
            var Obic_data={
               transaction_id:data.flw_ref,
               o_id:$rootScope.user.o_id,
               amount:amount
            }
            users.fund(Obic_data).success(function(Data){
               if(Data.status==true){
                   toastr.success(Data.message,"Successful!"); 
                   $rootScope.refresh_profile();
                   $timeout(function () {
                       window.location.reload();
                   }, 2000);
               }else{
                   toastr.error(Data.message,"Oops!"); 
                   $scope.error=Data.message;
               }
           });
            }else{
               toastr.error(data.message,"Oops!"); 
               $scope.error=data.message;
            }
          },
          customizations: {
            title: "ObicTrade",
            description: "Fund Your Wallet",
            logo: "https://drive.obictrade.com/storage/logo.png",
          },
        });
      }



    

    $scope.update_profile2=function(user){
        users.update(user).success(function(Data){
            if(Data.status==true){
                toastr.success(Data.message,"Success!"); 
            $timeout(function () {
                window.location.href="/user/dashboard";
            }, 1000);
            }
        });
    }



    $scope.create_btc_wallet=function(){
        $rootScope.show_loader=true;  
        if($rootScope.user){
            BTC.create_wallet($rootScope.user.o_id).success(function(Data){
                $rootScope.show_loader=false;  
                if(Data.status==true){
                    toastr.success(Data.message,"Success!"); 
                $timeout(function () {
                    window.location.reload();
                }, 1000);
                }
            });
        }else{
            $rootScope.show_loader=false; 
                toastr.error("Please relogin to gain access","Error!"); 
        }
    }
  

    $scope.change_password=function(user){
        $rootScope.show_loader=true;      
        var data={
            o_id:$scope.user.o_id,
            old_password:user.old_password,
            password:user.password
        }
        users.change_password(data).success(function(Data){
            $rootScope.show_loader=false;      
            if(Data.status==true){
                toastr.success(Data.message,"Success!"); 
            $timeout(function () {
                window.location.reload();
            }, 1000);
            }else{
                toastr.error(Data.message,"Error!");
            }
        }).error(function(){
            $rootScope.show_loader=false;  
            toastr.error("there is a connection error","Network Error");
        });
    }







    


    $scope.select_transaction=function(transaction){
        $rootScope.selected_transaction=transaction;
        for(var i=0;i < $rootScope.selected_transaction.cards.length;i++){
            var card=$rootScope.selected_transaction.cards[i];
            if(!card.total){
                $rootScope.selected_transaction.cards[i].total=(card.amount * $scope.selected_transaction.rates) * card.quantity || 0;
            }
        }
        };
        
        $scope.quantity_minus=function(){
            this.card.quantity--;
        };
        $scope.quantity_plus=function(){
            this.card.quantity++;
        };

    $scope.photo_up=function(f){
        $scope.files=f;
    };

    $scope.dropfilter="";
    
$scope.filter_status=function(s){
    console.log(s);
    if(s){
        $scope.dropfilter=s;
    }else{
        $scope.dropfilter="";
    }
}


$scope.update_transaction=function(transaction){
    Transaction.update(transaction).success(function(Data){
        });
};




$rootScope.selling_usd_converter=function(usd){
    console.log(usd);
    $rootScope.usd_value=parseFloat(usd) || 0;
    $rootScope.naira_value=parseFloat(usd)*parseFloat($rootScope.usd_naira.sell_rates) || 0;
    $rootScope.selling_btc_naira(1,function(data){
        $rootScope.btc_value=parseFloat((($rootScope.naira_value*(1/data.naira)).toFixed(8))) || 0;
    });
}


$rootScope.selling_btc_converter=function(btc){
    console.log(btc);
    $rootScope.btc_value=parseFloat(btc);
    var y=parseFloat(btc);
    $rootScope.selling_btc_naira(y,function(data){
        console.log(data);
        $rootScope.naira_value=data.naira || 0;
        $rootScope.usd_value=data.usd || 0;
    });
}


$rootScope.selling_naira_converter=function(naira){
    console.log(naira);
    $rootScope.naira_value=naira || 0;
    $rootScope.selling_btc_naira(1,function(data){
        $rootScope.btc_value=parseFloat(((naira*(1/data.naira)).toFixed(8))) || 0;
        $rootScope.usd_value=naira/$rootScope.usd_naira.sell_rates || 0;
    });
}





$rootScope.buying_usd_converter=function(usd){
    console.log(usd);
    $rootScope.usd_value=parseFloat(usd) || 0;
    $rootScope.naira_value=parseFloat(usd)*parseFloat($rootScope.usd_naira.buy_rates) || 0;
    $rootScope.buying_btc_naira(1,function(data){
        $rootScope.btc_value=parseFloat((($rootScope.naira_value*(1/data.naira)).toFixed(8))) || 0;
    });
}



$rootScope.buying_btc_converter=function(btc){
    console.log(btc);
    $rootScope.btc_value=parseFloat(btc) || 0;
    var y=parseFloat(btc);
    $rootScope.buying_btc_naira(y,function(data){
        console.log(data);
        $rootScope.naira_value=data.naira || 0;
        $rootScope.usd_value=data.usd || 0;
    });
}


$rootScope.buying_naira_converter=function(naira){
    console.log(naira);
    $rootScope.naira_value=naira || 0;
    $rootScope.buying_btc_naira(1,function(data){
        $rootScope.btc_value=parseFloat(((naira*(1/data.naira)).toFixed(8))) || 0;
        $rootScope.usd_value=naira/$rootScope.usd_naira.buy_rates || 0;
    });
}


$scope.show_btc_input=function(){
    $scope.show_btc=true;
    $scope.show_usd=false;
}
$scope.show_naira_input=function(){
    $scope.show_btc=false;
    $scope.show_usd=false;
}

$scope.show_usd_input=function(){
    $scope.show_usd=true;
    $scope.show_btc=false;
}


$rootScope.sell_btc=function(btc){
    $rootScope.show_loader=true;  
    var data={
        o_id:$rootScope.user.o_id,
        amount:btc,
        naira_value:$rootScope.naira_value
    };
    console.log(data);
    BTC.sell(data).success(function(Data){
        $rootScope.show_loader=false;      
        if(Data.status==true){
            toastr.success(Data.message,"Success!"); 
        $timeout(function () {
            window.location.reload();
        }, 1000);
        }else{
            toastr.error(Data.message,"Error!");
            $scope.error=Data.message;
        }
      }).error(function(){
        $rootScope.show_loader=false;  
        toastr.error("Network Error please try again later","Error!");
        $scope.error="Network Error please try again later";
      });     
}
        





$rootScope.buy_btc=function(btc){
    $rootScope.show_loader=true;  
    var data={
        o_id:$rootScope.user.o_id,
        amount:btc,
        naira_value:$rootScope.naira_value
    };
    console.log(data);
    BTC.buy(data).success(function(Data){
        $rootScope.show_loader=false;      
        if(Data.status==true){
            toastr.success(Data.message,"Success!"); 
        $timeout(function () {
            window.location.reload();
        }, 1000);
        }else{
            toastr.error(Data.message,"Error!");
            $scope.error=Data.message;
        }
      }).error(function(){
        $rootScope.show_loader=false;  
        toastr.error("Network Error please try again later","Error!");
        $scope.error="Network Error please try again later";
      });     
}
        



$rootScope.send_btc=function(btc,address){
    $rootScope.show_loader=true;  
    var data={
        o_id:$rootScope.user.o_id,
        address:address,
        amount:btc,
        naira_value:$rootScope.naira_value
    };   
    console.log(data);
    BTC.send(data).success(function(Data){
        $rootScope.show_loader=false;      
        if(Data.status==true){
            toastr.success(Data.message,"Success!"); 
        $timeout(function () {
            window.location.reload();
        }, 1000);
        }else{
            toastr.error(Data.message,"Error!");
            $scope.error=Data.message;
        }
      }).error(function(){
        $rootScope.show_loader=false;  
        toastr.error("Network Error please try again later","Error!");
        $scope.error="Network Error please try again later";
      });   
}
        

$scope.max_btc=function(){
    $rootScope.selling_btc_converter($rootScope.user.bitcoin_wallet.balance);
}

$scope.max_btc2=function(){
    $rootScope.selling_btc_converter($rootScope.user.bitcoin_wallet.balance-$rootScope.btc_fee);
}



$scope.max_naira=function(){
    $rootScope.amount=$rootScope.naira_wallet_balance-50;
    $rootScope.selling_naira_converter($rootScope.amount);
}


$scope.remove_bank=function(){
    $scope.user.bank_account.removed=true;
}
        
        $scope.sell_asset=function(asset){
                asset.o_id=$localStorage.user.o_id;
                var formData = new FormData();
                $rootScope.show_loader=true;
                formData.append('files',$scope.files);
                        Upload.upload({
                          url: Config.API+"sell_asset",
                          headers: {'Content-Type' : 'multipart/form-data'},
                          data: asset
                        }).then(function(resp) {
                                if(resp.data.status==true){
                                        var dc={
                                                transaction_id:resp.data.data,
                                                cards:[]
                                            };                           
                                        if(asset.cards){
                                        for(var i=0;i < asset.cards.length;i++){
                                            if(asset.cards[i].quantity > 0){    
                                                    var gc={
                                                        amount:asset.cards[i].amount,
                                                        quantity:asset.cards[i].quantity,
                                                        total:asset.cards[i].total
                                                    }
                                                    dc.cards.push(gc);
                                            }
                                            }
                                        }
                                        console.log("updating trx:");
                                        console.log(dc);
                                    Transaction.update(dc).success(function(Data){
                                        $rootScope.show_loader=false;
                                        toastr.success(resp.data.message,"Success!");   
                                            window.location.href="/user/transactions";
                                        $timeout(function () {
                                            window.location.reload();
                                            }, 2000);
                                    });
                                }else{
                                toastr.error(resp.data.message,"Oops!");
                                $scope.error=Data.message;
                                }
                      });
        };
        
        
        






    });
    
    