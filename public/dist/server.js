import express from 'express';
import path from 'path';
var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) { return res.sendFile(path.join(__dirname + '/../index.html')); });
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
