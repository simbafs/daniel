const router = require('express').Router();
const login = require('../setup/sqlite.js')('login');
const register = require('../setup/sqlite.js')('login');

// pages
router.get('/', (req, res, next) => {
	res.redirect('/user/login');
});

router.get('/login', (req, res, next) => {
	res.render('user', {
		status: 'login'
	});
});

// login
router.post('/login', (req, res, next) => {
	if(!req.body.username || !req.body.password) return res.send({
		error: 'Something Error, please reload the page.'
	});

	login(req.body.username, req.body.password)
		.then((user) => {
			if(!user) return res.send({
				error: 'Username or password error.'
			});
		})
		.catch(console.error);
});

module.exports = router;
