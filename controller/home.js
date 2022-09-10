app.controller('Home',function($scope,Config,$rootScope,$timeout,$location,$localStorage,users,toastr,Assets) {
    $scope.API_MEDIA=Config.media;
   
 
  if($localStorage.user){
    $scope.user=$localStorage.user;
  }
    

  if($localStorage.user){
    $timeout(function () {
    $location.path("/user/dashboard");
    },2000);
}

   

$scope.go_register=function(){
  $location.path("/register");
}
$scope.go_dashboard=function(){
  $location.path("/user/dashboard");
}
  $scope.go_reset=function(){
    $location.path("/reset");
  }



  $scope.mailing_list= function (data){
    users.mailing_list(data).success(function(Data){
        if (Data.status==true) {      
            toastr.success(Data.message,"Successful!"); 
        }else{
            $scope.error=Data.message;
            toastr.error(Data.message,"Oops!");
        }
    }).error(function(){
    toastr.error("network error","Oops!");
    });

}


$rootScope.selling_btc_converter=function(btc){
  $rootScope.btc_value=btc;
  var y=btc;
  $rootScope.selling_btc_naira(y,function(data){
      $rootScope.naira_value=data.naira || 0;
  });
}


$rootScope.selling_naira_converter=function(naira){
  console.log(naira);
  $rootScope.naira_value=naira;
  $rootScope.selling_btc_naira(1,function(data){
      $rootScope.btc_value=(((naira*(1/data.naira)).toFixed(8))) || 0;
  });
}


    });
    
    
    