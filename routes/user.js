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
	res.render('login');
})

router.get('/signup', (req, res, next) => {
	res.render('signup');
});

router.get('/secret', auth, (req, res, next) => {
	res.send('Hello');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/user/login',
	failureFlash: true
}));
// login
/*
router.post('/login', (req, res, next) => {
	if(!req.body.username || !req.body.password) return res.send({
		error: 'Something Error, please reload the page.'
	});

	login(req.body.username, req.body.password)
		.then((user) => {
			res.send(user);
		})
		.catch(console.error);
});
*/

module.exports = router;
