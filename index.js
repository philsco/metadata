var express = require('express')
var fs = require('fs')
var path = require('path')
var multer  = require('multer')
var app = express()

var upload = multer({ dest: 'pub/uploads/' });

app.set('view engine', 'jade');
app.set('views', './pub/views');

app.post('/upload', upload.single('fileup'), function (req, res, next) {
        res.render("confirm", {filesize: "File size: "+req.file.size+" bytes"});
        next();
    }, function (req, res) {
//        var files = fs.readdir(path.resolve('pub/uploads/'))
//        console.log(fs.readdir(path.resolve('pub/uploads/')))
//        console.log(fs.readdir(path.resolve(__dirname, 'pub/uploads')))
        fs.unlink(path.resolve(req.file.path), function (err) {
            if (err){
                console.log('Error encountered while removing the file');
            } else {
                console.log('file deleted');
            }
        })
    }
);

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/*', function (req, res) {
  res.render('index');
});

  var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});