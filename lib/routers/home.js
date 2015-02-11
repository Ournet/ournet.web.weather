var express = require('express'),
  route = express.Router();

//google

route.get('/', function(req, res, next) {
  //res.locals.baseUrl = '/';
  return res.render('home/index');
});

route.get('/:uname', function(req, res, next) {
  res.locals.site.title = req.params.uname.toUpperCase() + ' | Ticsta';
  res.render('home/site', {
    website: {
      uname: req.params.uname.toLowerCase()
    }
  });
});

exports = module.exports = route;
