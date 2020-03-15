const router = require('express').Router();
const login = require('../setup/sqlite.js')('login');
const register = require('../setup/sqlite.js')('login');

// pages
router.get('/', (req, res, next) => {
	res.redirect('/user/login');
});

router.get('/login', (req, res, next) => {
	res.render('user.ejs', {
		status: 'login',
		error: 'test'
	});
});

// login
router.post('/login', (req, res, next) => {
	
});

module.exports = router;
