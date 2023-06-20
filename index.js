var express = require('express');
var cors = require('cors');
var multer  = require('multer');
var fs = require('fs');
require('dotenv').config()

var app = express();

var upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/get-file-info', upload.single('datafile'), function (req, res, next) {
  var fl = req.file;
  
  return res.send({ "name": fl.originalname, "size": fl.size});
});

app.get('/', function (req, res) {
  fs.readFile('input-form.html', function (err, data) {
      if(err !== null) console.log("ERROR Uploading");
      
      res.writeHead(200, {
          'Content-Type': 'text/html',
              'Content-Length': data.length
      });
      res.write(data);
      res.end();
  });    
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
