


app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '').toLowerCase().trim().replace(/[^a-zA-Z ]/g, "");
    };
  }]);


  app.filter('phone_format', [function() {
    return function(string) {    
  var s = string;
  while(s.charAt(0) === '0')
  {
   s = s.substring(1);
  }
  return s;
};
  }]);

  
app.filter('round', function () {
    /* Use this $filter to round Numbers UP, DOWN and to his nearest neighbour.
       You can also use multiples */

    /* Usage Examples:
        - Round Nearest: {{ 4.4 | round }} // result is 4
        - Round Up: {{ 4.4 | round:'':'up' }} // result is 5
        - Round Down: {{ 4.6 | round:'':'down' }} // result is 4
        ** Multiples
        - Round by multiples of 10 {{ 5 | round:10 }} // result is 10
        - Round UP by multiples of 10 {{ 4 | round:10:'up' }} // result is 10
        - Round DOWN by multiples of 10 {{ 6 | round:10:'down' }} // result is 0
    */
    return function (value, mult, dir) {
        dir = dir || 'nearest';
        mult = mult || 1;
        value = !value ? 0 : Number(value);
        if (dir === 'up') {
            return Math.ceil(value / mult) * mult;
        } else if (dir === 'down') {
            return Math.floor(value / mult) * mult;
        } else {
            return Math.round(value / mult) * mult;
        }
    };
});













app.filter('unique', function() {
    return function(collection, keyname) {
       var output = [], 
           keys = [];
 
       angular.forEach(collection, function(item) {
           var key = item[keyname];
           if(keys.indexOf(key) === -1) {
               keys.push(key);
               output.push(item);
           }
       });
 
       return output;
    };
 });
 
 
  app.filter('split', function() {
         return function(input, splitChar, splitIndex) {
             return input.split(splitChar)[splitIndex];
         }
     });
 
 
 app.filter('regex', function() {
   return function(input, field, regex) {
     var patt = new RegExp(regex);
     var out = [];
     for (var i = 0; i < input.length; i++) {
       if (patt.test(input[i][field]))
         out.push(input[i]);
     }
     return out;
   };
 });
 
 
 
 app.filter('searchfilter', function() {
   return function(input, term) {
     var regex = new RegExp(term || '', 'i');
     var obj = {};
     angular.forEach(input, function(v, i){
       if(regex.test(v + '')){
         obj[i]=v;
       }
     });
     return obj;
   };
 });
 
 app.filter('capitalize', function() {
     return function(input) {
       return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
     }
   })
 
 app.filter('range', function() {
   return function(input, min, max) {
     min = parseInt(min); 
     max = parseInt(max);
     for (var i=min; i<max; i++)
       input.push(i);
     return input;
   };
 });
 
 

 app.filter('currency', function(){
  return function(input){
      if(isNaN(input)){
        return input;
      } else {
        var symbol = ' ₦ ';
          input=Math.round(input * 100) / 100;
          return symbol + thousands_separators(input);
        }
      };
});



app.filter('hidden', function(){
  return function(input){
      if(input || input=='true'){
        return input;
      } else {
        return '******'
        }
      };
});


