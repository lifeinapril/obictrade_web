
app.run(function($rootScope,Config,$timeout,$sce,$location,$window,BTC,$localStorage,$http,Assets,toastr,users){
    
  
    $rootScope.media=Config.media;
    $rootScope.hdt==true;
    $rootScope.show_balance=function(){
      $rootScope.hdt=true;
    }
    $rootScope.wallet_naira_value=0;








    $rootScope.hide_balance=function(){
    $rootScope.hdt=false;
    }
    $rootScope.logout= function (){
      localStorage.removeItem('user');
      $rootScope.user="";
      $localStorage.user="";
      $localStorage.user="";
      $window.localStorage.clear();
      $timeout(function () {
      $location.path("/");
      },2000);
    }
    

    $rootScope.team=[
      {
        photo:"images/members/1.jpg",
        first_name:"Chidiebere",
        last_name:"Obiorah",
        role:"CEO & Founder"
      },
      {
        photo:"images/members/2.jpg",
        first_name:"Chibuzor",
        last_name:"Nwandim",
        role:"Business Manager"
      },
      {
        photo:"images/members/3.jpg",
        first_name:"Youngly",
        last_name:"Hannah",
        role:"Customer Support"
      }
    ];

    $rootScope.faqs=[
      {
        topic:"How Do I Verify My Email?",
        answers:[
            "This is a one-time process to ensure that the email provided during registration is correct because every important update concerning your account and transactions will be sent the email address",
            "To complete every registration process, log in to your email, a verification link must have been sent there. If you don’t find it in your inbox, check the spam folder",
            "Click the verification link in the email and you are good to go",
            "However, if you did not receive any verification email, Kindly go ahead and login with username and password you used in the Signup Process"
        ]
      },
      {
        topic:"How Can I Reset My Password?",
        answers:[
            "Resetting your account password can be done in the following ways",
            "While logged in to your account, if on mobile, click on the hamburger icon at the top left side of the screen and select settings",
            "Under settings, select 'Password', input your old password and new password. Then click Save",
            "While logged out of your account and have forgotten your password, select “Forgot Password”. Enter your email address on the field provided and click 'Submit' An email will be sent to you, open the email and follow the prompt to reset your account password"
        ]
      },
      {
        topic:"Which Is Better to Trade on? Mobile App or Website",
        answers:[
          "The essence of the Obic Mobile App is to give our customers easier and faster access to Crypto and Gift card trading. However, both the mobile app and website offer exactly the same service, it’s basically a matter of preference for our users"
        ]
      },
      {
        topic:"How to Sell Gift Cards On The Website?",
        answers:[
          "Input your email address in the available field on homepage and Click on the 'Trade' button next to it",
          "Click on “Sell Gift Cards” (the gift cards icon)",
          "Select the brand of card you want to sell",
          "Select the card country (this could be determined by the currency of the gift card)",
          "Select the Card type (this could be “physical” or “ecode”)",
          "Input the value of the card",
          "The total payable amount will be displayed according to the current rate",
          "Attach your gift card pictures and receipt (if trade requires receipt), you can upload up to 10 pictures at a time",
          "Click on the “CONFIRM & PROCEED"
        ]
      },
      {
        topic:"How To Sell Bitcoin On The Website?",
        answers:[
          "Login to your account using your email and password",
          "From the sidebar or navigation drawer, select 'Wallet'",
          "Under the card belonging to BTC, select 'Sell BTC'",
          "In the modal that appears, fill in the details and select the target currency you want to sell your BTC to and you will get the equivalent in that currency",
          "Sell BTC",
          "Transaction is complete"
          ]
      },
      {
        topic:"Why Is My Trade Rejected?",
        answers:[
          "Invalid Gift card details",
          "An already redeemed or used gift card",
          "Your gift card was not properly activated",
          "Your gift card is not clear enough",
          "Your gift card code is wrong",
          "You submitted an empty trade",
          "You uploaded the wrong picture",
          "You submitted the wrong trade",
          "You uploaded an unacceptable receipt (For cards that require a receipt)",
          "When any of these is the case, such trade will be rejected and cannot proceed unless rectified."
          ]
      },
      {
        topic:"Why can't I withdraw more than $1,000 ?",
        answers:[
          "You need to update your KYC level up to at least level 4 (BVN Validation)"  ]
      },
      {
        topic:"What is KYC ?",
        answers:[
          "In order to meet regulatory standards and to aid in crime prevention and detection, ObicTrade has taken steps to ensure proper customer identification through its Customer Due Diligence and Know Your Customer (KYC) procedure.",
          "The KYC levels with withdrawal and currency transfer limitations are as follows;",
          "Email verification: By attaining this level 1 verification, you'll be able to withdraw only ₦1,000 in one day. You'll also be able to transfer only $100 in one day",
          "Bank account details: By attaining this level 2 verification, you will also be able to withdraw ₦100,000 in one day",
          "Transaction Pin: This level ensures you provide a 4 digit secret pin to carry out all your transactions. This however still limits your daily withdrawal to ₦1,000",
          "Bank Verification Number (BVN): This level verification increases your daily withdrawal limit to ₦2,000,000 while your single transaction limit becomes ₦500,000. You can therefore withdraw ₦500,000 up to four times in one day. Furthermore, it increases your currency limit to $1000",
          "Identification card details: This level 5 verification increases your daily withdrawal limit to ₦10,000,000 while your single transaction limit becomes ₦2,000,000. You can also withdraw an equivalent of 2 million Naira 5 times in one day. This increases your daily currency transfer limit to $5000 in one day",
          "Picture Upload: By attaining this level 6 verification, you'll be able to withdraw ₦50,000,000 in one day, while your single transaction limit remains ₦2,000,000. This increases your daily currency transfer limit to $5000 in one day",
          "Proof of address: This level 7 verification increases your daily withdrawal limit to ₦50,000,000 while your single transaction limit increases to ₦5,000,000. And this also increases your daily transfer limit to $20,000"
         ]
      },
      {
        topic:"How Long Does It Take to Trade A Gift Card?",
        answers:[
          "With the system, which takes between 5 - 10mins to complete",
          "With an agent, which take between 10 - 15mins to complete",
          "However, some gift cards like Apple Store, Walmart, Nordstrom, Sephora e.t.c take more time than others.",
          "Average time will always be stated in trade terms but be rest assured we attend to all transactions as fast as we can"
        ]
      },
      {
        topic:"What Is The Difference Between eCode, Physical Cards And Printable Vouchers?",
        answers:[
          "Physical gift cards are actual physical (plastic) cards that are purchased directly from a physical store. Physical gift cards are safest and will fetch you the best money return",
          "Ecodes are digital gift card codes purchased online and mostly sent to the buyer’s email address. Ecodes are not as safe as physical gift cards thereby the money value is always lower."
        ]
      },
      {
        topic:"How Do I Get Paid?",
        answers:[
          "Trade proceeds are sent to bank traders’ bank accounts after confirmation of digital assets. The payment process is straightforward",
          "For customers that trade with the system, after successful validation of the digital asset, the trade proceeds is sent to the customer naira wallet",
          "If you experience any delay, our support team is always available to help"
        ]
      },
      {
        topic:"What Value Should I Put In the 'Amount' Field?",
        answers:[
          "You are to input the $ (USD) amount of bitcoins or USDT you sent",
          "Note that only the amount received in our wallet will be acknowledged and you shall be credited accordingly based on the current rate"
        ]
      },
      {
        topic:"How many hours does it take before BTC will reflect?",
        answers:[
          "As soon as it is confirmed on the blockchain/Etherium network"
        ]
      },
      {
        topic:"How many hours does it take before my money will reflect in my naira wallet?",
        answers:[
          "Instantly if you are sending from the same bank with the same account, you registered on the app or web, but it will take 48 to 72hours if the name is different."
        ]
      },
      {
        topic:"Why was #50 deducted from my money?",
        answers:[
          "₦25 is deducted from your money for BVN Validation"
        ]
      },
      {
        topic:"Where does ObicTrade get its Prices from?",
        answers:[
          "There is no global price for Cryptocurrencies",
          "Prices are effectively determined by forces of demand and supply: the buyers who want a certain currency and the sellers who have that currency"
        ]
      },
      {
        topic:"What are the charges on sending and receiving crypto?",
        answers:[
          "ObicTrade charges for sending crypto currencies, while to receive crypto we don't charge fees."
        ]
      },{
        topic:"What is the maximum amount of BTC or USDT I can buy?",
        answers:[
          "There is no maximum BTC or USDT value you can buy or sell."
        ]
      },{
        topic:"Can I buy BTC or USDT from ObicTrade and transfer to another wallet?",
        answers:[
          "Yes you can. With Obic Wallet, you can send and receive BTC from anyone."
        ]
      },{
        topic:"How can I get my BTC or USDT Hash (Transaction ID) ?",
        answers:[
          "You can get your Hash (Transaction ID) by checking your BTC or USDT transaction details",
          "The Hash is a long code that comprises of unique numbers and letters that can be used to track the status of your cypto transaction"
        ]
      },{
        topic:"Reasons for delayed BTC or USDT Confirmations?",
        answers:[
          "Ensure you use a high sending fee when sending from a BTC or USDT platform for instant confirmation.",
          "Our BTC and USDT platforms provide a near-instant confirmation on your Obic BTC or USDT Wallet"
        ]
      },{
        topic:"How long does it take to reverse failed withdrawals from Naira Wallet?",
        answers:[
          "Reversal is automatic but if an issue occurs during the process, it will take 2-3 working days before the fund is reversed to your Naira Wallet."
        ]
      }
    ]





$rootScope.selling_btc_naira=function(bitcoin,callback){
  BTC.sell_rate(bitcoin).success(function(Data){
    console.log("sell rate:");
    console.log(Data);
    var data={
      btc:bitcoin,
      naira:Data.data,
      usd:Data.data/$rootScope.usd_naira.sell_rates
    }
    callback(data);
});
};



$rootScope.buying_btc_naira=function(bitcoin,callback){
  BTC.buy_rate(bitcoin).success(function(Data){
    console.log("buy rate:");
    console.log(Data);
    var data={
      btc:bitcoin,
      naira:Data.data,
      usd:Data.data/$rootScope.usd_naira.buy_rates
    }
    callback(data);
});
};
    
    
$rootScope.send_code=function(){
  $rootScope.show_loader=true;   
  users.send_code($rootScope.user.o_id).success(function(Data){
  $rootScope.show_loader=false;   
      if(Data.status==true){
     window.location.href="/code";
      }else{
          toastr.success(Data.message,"Oops!"); 
      }
  });
}
      
    $rootScope.change_card_type=function(type){
      $rootScope.selected_asset.card_type=type;
      $rootScope.selected_asset.rates=$rootScope.currency.sell;
      if(type=="Debit Card Reciept"){
          $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.15);
      }if(type=="E-Code"){
          $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.15);
      }if(type=="Large Card"){
          $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.20);
      }
     }


$rootScope.refresh_profile=function(){
  if($rootScope.user){
    console.log("profile:");
    console.log($rootScope.user);
    users.info($rootScope.user.o_id).success(function(Data){
      console.log("fetched user data:::::::");
      $rootScope.user=Data.data;
      $rootScope.bitcoin_wallet_transactions=Data.data.bitcoin_wallet.transactions;
      $rootScope.naira_wallet_transactions=Data.data.naira_wallet.transactions;
      $rootScope.naira_wallet_balance=Data.data.naira_wallet.balance;
      $rootScope.bitcoin_wallet_balance=Data.data.bitcoin_wallet.balance;
      if($rootScope.user.bitcoin_wallet.address){
      users.btc_balance($rootScope.user.o_id).success(function(Data2){
        if($rootScope.user.bitcoin_wallet.balance){
        $rootScope.bitcoin_wallet_balance=Data2.data;
        BTC.sell_rate($rootScope.bitcoin_wallet_balance).success(function(Data){
          console.log("Naira value:"+Data.data);
          $rootScope.wallet_naira_value=Data.data;
        });
        }
      }).error(function(err){
        console.log("error!!!");
        console.log(err);
      }); 
      }
    }).error(function(err){
      console.log("error!!!");
      console.log(err);
    }); 
  }else{
    console.log("no profile");
  }
}

BTC.rates().success(function(Data){
  $rootScope.usd_naira=Data.data;
});


BTC.sell_rate(1).success(function(Data){
  $rootScope.selling_btc_ng=Data.data;
});


BTC.buy_rate(1).success(function(Data){
  $rootScope.buying_btc_ng=Data.data;
});


BTC.fee().success(function(Data){
  $rootScope.btc_fee=Data.data;
});


   





    
  //   $rootScope.change_currency=function(currency){
  //     $rootScope.currency=currency;
  //     $rootScope.selected_asset.currency=currency.name;
  //     $rootScope.selected_asset.rates=currency.sell;
  //     $rootScope.selected_asset.symbol=currency.symbol;
  // }



  $rootScope.countries=[
      {
      name:"Nigeria",
      format:"+234"
      },
      {
      name:"United States",
      format:"+1"
      },
      {
      name:"United Kingdom",
      format:"+44"
      },
      {
      name:"Ghana",
      format:"+233"
      },
      {
      name:"South Africa",
      format:"+27"
      },
      {
      name:"Kenya",
      format:"+254"
      },
      {
      name:"India",
      format:"+91"
      },
      {
      name:"China",
      format:"+86"
      },
      {
      name:"Japan",
      format:"+81"
      }
];


  $rootScope.change_currency=function(currency){
    $rootScope.selected_currency=currency;
    $rootScope.user.in_currency=currency;
    users.update($rootScope.user);
    $rootScope.refresh_profile();
    }
    


    if($localStorage.user){
      $rootScope.user=$localStorage.user;
    $rootScope.onramper_link=$sce.trustAsResourceUrl("https://widget.onramper.com?wallets=BTC:"+$rootScope.user.bitcoin_wallet.address+"&apiKey=pk_prod_8rLwlcuVX5di4NrQIM6NY1Gh6lOOmo7Ru5C44cbDO9s0&onlyCryptos=BTC&isAddressEditable=false");

    
    if(!$rootScope.user.phone_format){        
      $rootScope.user.phone_format="+234";
      }
    };
    







$rootScope.update_phone=function(user){
  $rootScope.show_loader=true;  
  if(user.phone.charAt(0)=='0')
  {
   user.phone =user.phone.substring(1);
  }    
  users.update_phone(user).success(function(Data){
      $rootScope.show_loader=false;      
      console.log(Data);
      if(Data.status==true){
     window.location.href="/verify_phone";
      }else{
          toastr.error(Data.message,"Oops!"); 
      }
  });
}




$rootScope.verify_phone=function(code){
  var data={
      o_id:$rootScope.user.o_id,
      code:code
  };
  $rootScope.show_loader=true;   
  users.verify_phone(data).success(function(Data){
  $rootScope.show_loader=false; 
      if(Data.status==true){  
          $localStorage.user=Data.data;               
          $rootScope.user=Data.data;   
       toastr.success(Data.message,"Success!"); 
      $timeout(function () {
          window.location.href="/user/dashboard";
      }, 1000);
      }else{
          toastr.success(Data.message,"Oops!"); 
      }
  });
}



    $rootScope.total_card=function(cards){
      var total=0;
      if(cards){
          for(var i=0;i < cards.length;i++){
             if(cards[i].total){
              var sub=cards[i].total;
              total=total + sub;
             }
          }
      }
      return total;
  }

    $rootScope.add_card=function(amount,quantity,custom){
      var card={
          amount:amount,
          quantity:quantity,
          total:0,
          custom:custom,
          sub_total:function(){
              var rates=$rootScope.selected_asset.rates;
              if($rootScope.selected_asset.currency=="USD"){
                  var amt=this.amount;
                  if(amt > 50){
                      rates=rates - (rates * 0.05);
                  }
              }
              var total=(this.amount * rates) * this.quantity;
              this.total=total;
              return total;
          }
      };
      $rootScope.selected_asset.cards.push(card);
      };

      
    $rootScope.update_phone=function(user){
      $rootScope.show_loader=true;
      users.update_phone(user).success(function(Data){
        $rootScope.show_loader=false;
          if(Data.status==true){
            $localStorage.user=Data.data;               
            $rootScope.user=Data.data;    
         window.location.href="/verify_phone";
          }else{
              toastr.success(Data.message,"Oops!"); 
          }
      });
  }

      $rootScope.remove_card=function(card){
          var index=$rootScope.selected_asset.cards.indexOf(card);
          $rootScope.selected_asset.cards.splice(index,1);
          };
      
    $rootScope.check_rates=function(asset){
      $rootScope.selected_asset=asset;
      $rootScope.selected_asset.cards=[];
      if(!$rootScope.selected_asset.card_types || $rootScope.selected_asset.card_types.length < 1){
          $rootScope.selected_asset.card_types=[
              "Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"
          ];
      }
      $rootScope.selected_asset.card_type=$rootScope.selected_asset.card_types[0];
      $rootScope.add_card(50,0,true);
      $rootScope.add_card(100,0,true);
      $rootScope.add_card(200,0,true);
          if(!$rootScope.selected_asset.currencies  || $rootScope.selected_asset.currencies.length < 1){
          $rootScope.selected_asset.currencies=[
              {
                  "name":"USD",
                  "symbol":"$",
                  "sell":$rootScope.selected_asset.rates || 0,
                  "buy":$rootScope.selected_asset.rates || 0
              }
          ]
      }; 
      var currency = $rootScope.selected_asset.currencies[0];    
      $rootScope.selected_asset.currency=currency.name;
         $rootScope.selected_asset.rates=currency.sell;
         $rootScope.selected_asset.symbol=currency.symbol;
      $rootScope.currency=$rootScope.selected_asset.currencies[0];
 
    }





    
    $rootScope.select_asset=function(asset){ 
      $rootScope.check_rates(asset);
    }


    
    Assets.all().success(function(Data){
      if(Data.status==true){
          $rootScope.assets=Data.data;      
          $rootScope.select_asset($rootScope.assets[0]);

          var btc_rate=1;
          
          $rootScope.assets.forEach(function(asset) {
            if(asset.name=="BTC" || asset.name=="Btc" || asset.name=="btc" || asset.name=="bitcoin" || asset.name=="Bitcoin"){
              btc_rate=asset.rates;
              console.log('yes!');
            }
        });
        $rootScope.ng_btc_rates=$rootScope.btc_rates * btc_rate;
           
      }
    });


    $http.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(function(response) {
      $rootScope.btc_rates=response.data.bpi.USD.rate_float;
      }, function(x) {
          // Request error
      });

    $rootScope.banner_position=0;
    
    $window.onscroll = function () {
    $rootScope.banner_position=window.pageYOffset;
    };

  $rootScope.$watch(function(){
    return $rootScope.banner_position;
  }, function (n,o){
  },true);
  

//   angular.element($window).bind("scroll", function() {
//     if (this.pageYOffset >= 100) {

//     }
// });
    
$rootScope.estimate_value=function(card){
    var value=0;
    var sub_total=card.amount * card.quantity;
    var total=$rootScope.selected_asset.rates * sub_total;
    if(card.amount > 50){
        value=total - (0.15 * total);
    }else{
        value=total;
    }
    this.card.total=value;
    return value;
}




});