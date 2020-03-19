const router = require('express').Router();
const login = require('../setup/sqlite.js')('login');
const register = require('../setup/sqlite.js')('login');
const passport = require('passport');
const auth = require('../setup/auth.js');

// pages
router.get('/', (req, res, next) => {
	res.redirect('/user/login');
});

router.get('/login', (req, res, next) => {
	if(res.locals.isAuthenticated) return res.redirect('/');
	else return res.render('login');
})

router.get('/signup', (req, res, next) => {
	if(res.locals.isAuthenticated) return res.redirect('/');
	else return res.render('signup');
});

router.use('/signup', require('./user/signup.js'));

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/user/login',
	failureFlash: true
}));

module.exports = router;
