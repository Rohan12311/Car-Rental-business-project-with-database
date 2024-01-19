var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel = require("./users");
const carModel = require("./car");
const formModel = require("./form")
const upload = require('./multer');

const localStratgy = require('passport-local');
passport.use(new localStratgy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', {footer: false});
});
router.get('/form', function(req, res) {
  res.render('form', {footer: false});
});

router.get('/feed',isLoggedIn, async function(req, res) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  .populate("Car");
  console.log(user);
  res.render("feed",{user});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/formData', isLoggedIn ,async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user})
  const form = await formModel.create({
  fullname:req.body.fullname,
  email:req.body.email,
  address:req.body.address,
  pan:req.body.pan,
  license:req.body.license,
  user:user._id,
  });
  user.form.push(form._id);
  await user.save();
 res.redirect("feed");
});
router.post('/upload', isLoggedIn ,upload.single("file") ,async function(req, res,next){
  if(!req.file){
    return res.status(404).send('no files were uploded');
  }
  const user = await userModel.findOne({username: req.session.passport.user})
  const car = await carModel.create({
    imageText:req.body.filecaption,
    image: req.file.filename,
    user:user._id
  });
  user.Car.push(car._id);
  await user.save();
 res.redirect("profile");
});

router.get('/profile',isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  .populate("Car");
  console.log(user);
  res.render("profile",{user});
});


router.post('/register', function (req, res) {
  let userdata = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  });
  userModel.register(userdata, req.body.password)
    .then(function (registeredowner) {
      passport.authenticate('local')(req, res, function () {
        res.redirect("profile");
    });
  })
});
router.post('/login',passport.authenticate('local',{
  successRedirect:"/profile",
  failureRedirect:'/login'
}),function(req,res){});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
