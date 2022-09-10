 var app=angular.module("obictrade", ['ngRoute','monospaced.qrcode',"ngStorage","ui.bootstrap", 'ngMap','ngFileUpload',"toastr"])
 .constant('Config', {  
    API:'https://obictrade.com/api/',
    media:'https://storage.googleapis.com/obicstorage/',
    token:"eyJhbGciOiJIUzI1NiJ9.eyJTZWNyZXQiOiJ0cmFkZW9iaWNAZ21haWwuY29tIiwiSXNzdWVyIjoiSXNzdWVyIiwiZXhwIjoxNjUxODUyMjU4LCJpYXQiOjE2NTE4NTIyNTh9.WsvtTMfX4KQJW3wveHc7q5khQQtVCqxQpjJFzjBjR6A",
    flutterwave_pub_key:"FLWPUBK-5a598208fb4adc1b646cef1fe526685f-X"
  })