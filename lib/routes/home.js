var express = require('express'),
  route = express.Router(),
  places = require('ournet.data.places');

//google

route.get('/id/:id', function(req, res, next) {
  var date = Date.now();
  places.access.getPlace(req.params.id).then(function(place) {
    console.log('got place in ', (Date.now() - date) + ' ms');
    res.send(place);
  });
  //res.locals.baseUrl = '/';
  //return res.render('home/index');
});

route.get('/oldid/:id', function(req, res, next) {
  var date = Date.now();
  places.access.getOldId(req.params.id).then(function(id) {
    console.log('got id in ', (Date.now() - date) + ' ms');
    res.redirect(302, '/id/' + id.geonameid);
  });
  //res.locals.baseUrl = '/';
  //return res.render('home/index');
});

// route.get('/:uname', function(req, res, next) {
//   res.locals.site.title = req.params.uname.toUpperCase() + ' | Ticsta';
//   res.render('home/site', {
//     website: {
//       uname: req.params.uname.toLowerCase()
//     }
//   });
// });

exports = module.exports = route;
