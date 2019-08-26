var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
// var fileUpload = require('express-fileupload'); 27-08-2019

var Type = require('./type-model');
var User = require('./user-model');
var Product = require('./product-model');
var Review = require('./review-model');



//setup database connection
var connectionString = 'mongodb://project-admin:shop12345@cluster0-shard-00-00-4afto.mongodb.net:27017,cluster0-shard-00-01-4afto.mongodb.net:27017,cluster0-shard-00-02-4afto.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));


//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(fileUpload());

app.use(logger('dev'));


//setup routes
var router = express.Router();

router.get('/testing', (req, res) => {
  res.send('<h1>Testing is working</h1>')
})

router.get('/products', (req, res) => {

	Product.find()
	.then((products) => {
	    return res.json(products);
	});
})

router.get('/products/:id', (req, res) => {

	Product.findOne({id:req.params.id})
	.populate('type')
	.populate('reviews')
	.then((product) => {
	    return res.json(product);
	});
})





app.use('/api', router);

// launch our backend into a port
const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));