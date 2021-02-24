var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const request = require('request');
var cors = require("cors");

app.use(cors());

// configuration =================

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(express.static('./dist/ScoutBeeUi'));

app.get('/*', function(req,res) {
    if(req.url === '/') {
      res.sendFile(path.join(__dirname,'/dist/ScoutBeeUi/index.html'));
    }
    else if(req.url.includes('search')) {
    request('https://semantic-blog-search.herokuapp.com/search/?search_query='+ req.query.search_query,
        (error, response, body) => {
        console.log(body)
          res.send(body);
        }
      )
    }
    else{
      res.sendFile(path.join(__dirname, '/dist/ScoutBeeUi' + req.url))
    }  
});


const port = process.env.PORT || 4500;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

app.listen(port ,function(){
    console.log("Started on PORT ", port);
})
