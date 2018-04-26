var express = require('express');
var app = express();
var path = require('path');

var static = path.join(__dirname, 'static');

app.use(express.static(static));

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });

app.listen(8080);