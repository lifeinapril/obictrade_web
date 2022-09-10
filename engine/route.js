app.config(function($routeProvider,$httpProvider,$locationProvider,Config) {
   
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common.obickey = Config.token;

    
    $routeProvider.when('/', {
        templateUrl: 'templates/shop.html',
        controller:"Home"
    });

    
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller:"Home"
    });

    $routeProvider.when('/rates', {
        templateUrl: 'templates/rates.html',
        controller:"Home"
    });

    $routeProvider.when('/affiliate_terms', {
        templateUrl: 'templates/affiliate_terms.html',
        controller:"Home"
    });

    $routeProvider.when('/terms', {
        templateUrl: 'templates/terms.html',
        controller:"Home"
    });


    
    $routeProvider.when('/antimoney', {
        templateUrl: 'templates/antimoney.html',
        controller:"Home"
    });


    $routeProvider.when('/privacy', {
        templateUrl: 'templates/privacy.html'
    });


    
    $routeProvider.when('/verify_phone', {
        templateUrl: 'templates/user/verify_number.html',
        controller:"user"
    });
    
    $routeProvider.when('/faq', {
        templateUrl: 'templates/faq.html',
        controller:"Home"
    });

    $routeProvider.when('/code', {
        templateUrl: 'templates/user/code.html',
        controller:"Auth"
    });

    
    
    $routeProvider.when('/change_number', {
        templateUrl: 'templates/user/change_number.html'
    });


   
    $routeProvider.when('/bitcoin', {
        templateUrl: 'templates/bitcoin.html',
        controller:"Home"
    });

    
   
    $routeProvider.when('/giftcards', {
        templateUrl: 'templates/giftcards.html',
        controller:"Home"
    });
   
    $routeProvider.when('/company', {
        templateUrl: 'templates/company.html',
        controller:"Home"
    });
      
    $routeProvider.when('/career', {
        templateUrl: 'templates/career.html',
        controller:'Auth'
});
 
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller:'Auth'
});


$routeProvider.when('/user/contactus', {
    templateUrl: 'templates/contactus.html'
});
    
$routeProvider.when('/reset', {
    templateUrl: 'templates/reset.html',
    controller:"Auth"
});


  
$routeProvider.when('/reset/:reset_token', {
templateUrl: 'templates/reset_password.html',
controller: 'Auth'
});



  
$routeProvider.when('/verify/:token', {
    templateUrl: 'templates/verified.html',
    controller: 'Auth'
    });
    

$routeProvider.when('/signin', {
    templateUrl: 'templates/signin.html',
    controller: 'Auth'
});


   
   
$routeProvider.when('/welcome', {
    templateUrl: 'templates/welcome.html',
    controller:'Auth'
});

   
   
   
$routeProvider.when('/verify_email', {
    templateUrl: 'templates/verify_email.html',
    controller:'user'
});

   
   
$routeProvider.when('/add_account', {
    templateUrl: 'templates/user/add_account.html',
    controller:'user'
});

   
$routeProvider.when('/thankyou', {
    templateUrl: 'templates/thankyou.html'
})



// $routeProvider.when('/user/dashboard', {
//     templateUrl: 'templates/user/dashboard.html',
//     controller:'user'
// });



// $routeProvider.when('/user/products', {
//     templateUrl: 'templates/user/products.html',
//     controller:'user'
// });


// $routeProvider.when('/user/wallet', {
//     templateUrl: 'templates/user/wallet.html',
//     controller:'user'
// });

// $routeProvider.when('/user/transactions', {
//     templateUrl: 'templates/user/transactions.html',
//     controller:'user'
// });


// $routeProvider.when('/user/settings', {
//     templateUrl: 'templates/user/settings.html',
//     controller:'user'
// })
    
  .otherwise({ 
    redirectTo: '/' 
  }); 
    
  $locationProvider
  .html5Mode(true);
    
   
    
     });
    