let express = require('express');
let config = require('./config/index.js');
let port = process.env.PORT || config.build.port;

let app = express();

let router = express.Router();

router.get('/',function(req,res,next) {
    req.url = '/index.html';
    next()
});

app.use(router);

var waimaiData = require('./data.json')
var commodity = waimaiData.seller;
var evaluate = waimaiData.goods;
var merchant = waimaiData.ratings;

var getRouter = express.Router();

getRouter.get('/commodity',function(req,res){
    res.json({
      error: 0,
      data:commodity
    })
});
getRouter.get('/evaluate',function(req,res){
    res.json({
      error: 0,
      data:evaluate
    })
});
getRouter.get('/merchant',function(req,res){
    res.json({
      error:0,
      data:merchant
    })
});

app.use('/api',getRouter);
app.use(express.static('./dist'));

module.exports = app.listen(port,function (err) {
    if(err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:'+port+'\n')
});

