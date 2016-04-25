var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
//var fs = require('fs');
app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname+ '-' + Date.now()+'.png')
    }
});


app.use(bodyParser.urlencoded({ extended: false,
     parameterLimit: 10000,
     limit: 1024 * 1024 * 10}));

app.use(bodyParser.json({ extended: false,
     parameterLimit: 10000,
     limit: 1024 * 1024 * 10}));

app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app.use(express.static(__dirname + ''));

/*app.post('/fileUpload',function(req,res){
	
 upload(req, res, function (err) {
    if (err) {
      throw err;
    }else{
	    console.log(req.file);
	    // Everything went fine
	    res.send('done');
    }
    
  })
});*/

var upload = multer({ storage: storage });
app.post('/fileUpload', upload.single('file'),function(req,res){
	response = {
		success:true,
		filename:req.file.filename,
		code:200
	};
	res.json(response);
});
app.listen(8080)

