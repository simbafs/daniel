const router = require('express').Router();
const { login, register } = require('../setup/sqlite.js');
const passport = require('passport');
const auth = require('../setup/auth.js');

// pages
router.get('/', (req, res, next) => {
	if(res.locals.isAuthenticated) return res.redirect('/');
	else return res.render('login');
})

router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;
