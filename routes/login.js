const router = require('express').Router();
const { login, register } = require('../setup/sqlite.js');
const passport = require('passport');
const { auth } = require('../setup/auth.js');

// pages
router.get('/', (req, res, next) => {
	if(res.locals.isAuthenticated) return res.redirect('/');
	else return res.render('login', {
		url: req.query.url || '/'
	});
})

router.post('/', (req, res, next) => {
	console.log(req.body.url);
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.redirect('/login');
		req.logIn(user, err => {
			if (err) return next(err);
			return res.redirect(req.body.url || '/');
		});
	})(req, res, next);
});

router.post('/t', (req, res, next) => {
	res.send(req.query);
})

module.exports = router;
