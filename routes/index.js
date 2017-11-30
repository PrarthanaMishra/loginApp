var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
//  if(req.cookies && req.cookies.jwt){
//     return res.redirect('/profile');
//   }
  // res.render('form',{users: false});
  return res.redirect('/profileList');
  
});

module.exports = router;
