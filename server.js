var express    = require("express");
var app        = express();
var port = process.env.PORT || 8000;
app.use(express.static("./"));
app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
// Start Server
app.listen(port, function () {
    console.log( "Website Express server running");
});