app.controller('Auth', function($routeParams,Config,$timeout,$rootScope,$scope,$location,Upload, users,toastr, $rootScope ,$localStorage) {
    
   $scope.error="";

   $rootScope.show_loader=false;




   if($routeParams.token){
    users.verify($routeParams.token).success(function(Data){
    if (Data.status==true) {      
        $scope.user=Data.data; 
        $localStorage.user=Data.data;
                }else{
                    $scope.error=Data.message;
                    toastr.error(Data.message,"Oops!"); 
                    $timeout(function () { 
                        $location.path("/");
                    }, 2000);
                }
    }).error(function(){
        toastr.error("network error","Oops!");
        });
        }


    
    $scope.login=function(data){
        $rootScope.show_loader=true;
        $('#tlogin').modal('hide'); 
        users.login(data).success(function(Data){
            $rootScope.show_loader=false; 
            if (Data.status==true) {
                $localStorage.user=Data.data;               
                $rootScope.user=Data.data;          
                $scope.user=Data.data;
                $location.path("/user/dashboard");
            }else{
                toastr.error("failed!",Data.message);
                $scope.error=Data.message;
            }
        }).error(function(){
            $rootScope.show_loader=false; 
        });
    
    }





    
    $scope.register= function (data){
        $rootScope.show_loader=true;        
        $rootScope.new_user=data;
        users.register(data).success(function(Data){
            $rootScope.show_loader=false; 
            if (Data.status==true) {       
                $location.path("/welcome");
            }else{
                $scope.error=Data.message;
            }
        }).error(function(){
            $rootScope.show_loader=false; 
        });
    
    }
    
    

    $scope.doc_up=function(f){
        $scope.files=f;
    };

    
    
    
    $scope.get_job= function(data){
        $rootScope.show_loader=true;
        var formData = new FormData();
        formData.append('files',$scope.files);
                Upload.upload({
                  url: Config.API+"job",
                  headers: {'Content-Type' : 'multipart/form-data'},
                  data: data
                }).then(function(resp) {
                        $rootScope.show_loader=false;
                        if(resp.data.status==true){
                        $timeout(function () { 
                            $location.path("/thankyou");
                        }, 2000);
                        }else{
                        toastr.error(resp.data.message,"Oops!");
                        }
              });
    
    }
    
    
    
    $scope.reset= function (data){
        users.reset(data).success(function(Data){
            if (Data.status==true) {      
                toastr.success(Data.message,"Successful!"); 
                $timeout(function () { 
                    $location.path("/");
                }, 2000);
            }else{
                $scope.error=Data.message;
                toastr.error(Data.message,"Oops!");
            }
        }).error(function(){
        toastr.error("network error","Oops!");
        });
    
    }
    
    
    


    if($routeParams.reset_token){
        users.token($routeParams.reset_token).success(function(Data){
        if (Data.status==true) {      
            $scope.reset_user=Data.data;
                    }else{
                        $scope.error=Data.message;
                        toastr.error(Data.message,"Oops!"); 
                        $timeout(function () { 
                            $location.path("/");
                        }, 2000);
                    }
        }).error(function(){
            toastr.error("network error","Oops!");
            });
            }

    
$scope.reset_password=function(data){
    $rootScope.show_loader=true;        
    if(data.password || data.r_password){
        if(data.password==data.r_password){
        var data={
            o_id:$scope.reset_user.o_id,
            password:data.password
        };
        users.reset_password(data).success(function(Data){
            if(Data.status==true){           
    $rootScope.show_loader=false;                
    $scope.user=$scope.reset_user;
    $localStorage.user=$scope.reset_user;
                toastr.success(Data.message,"Success");
          $timeout(function () {
                        window.location.href="/";
                      }, 2000);
            }else{ 
                $rootScope.show_loader=false;  
                toastr.error(Data.message,"Error");
            }
    });
    }else{
        $rootScope.show_loader=false;  
        $scope.error="the passwords you provided don't match.";
        toastr.error($scope.error,"Error");
    }
}else{
    $rootScope.show_loader=false;  
    $scope.error="Please a password.";
    toastr.error($scope.error,"Error");
}
}








    });
    
    