const passport = require("passport");
const validator = require("validator");
// drop in user model here
const User = require("../models/User");
const bcrypt = require('bcrypt')

// loads main login page
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/feed");
  }
  res.render("login", {
    title: "Login",
  });
}
// main login
exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  if (validationErrors.length) {
    //if there are errors the errors will be flashed and they will be redirected to the login page
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  //normalizes email formatting
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  //uses passport to ensure passwords match
  passport.authenticate('user-local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/feed')
    })
  })(req, res, next)
}

//main logout
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}
//renders signup page or home page depending if user is logged in or not
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/feed')
  }
  res.render('signup', {
    title: 'Create Account'
  })
}
//checks that signup information is valid, and creates a new User with the info
exports.postSignup = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  if(!req.body.tags) validationErrors.push({msg: 'Please select at least one topic'})
  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('../signup')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    tags: req.body.tags,
  })
  
  User.findOne({$or: [
    {email: req.body.email},
    {userName: req.body.userName}
  ]}, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' })
      return res.redirect('../signup')
    }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/feed')
      })
    })
  })
}
