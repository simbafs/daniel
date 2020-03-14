//(async () => {
	const router = require('express').Router();
	const passport = require('passport');
	const LocalStrategy = require('passport-local').Strategy;
	const sqlite = require('sqlite-async');
	
	const User = sqlite.open('../db/user.db')
		.then((db) => {
			Url.run(`CREATE if not exists TABLE User (
				username STRING,
				password STRING
			)`);
		})
		.catch(console.error);
	
	router.get('/', (req, res, next) => {
		console.log('/login');
		res.render('login', {
			status: 'login'
		});
	});
	
	/*
	passport.use(new LocalStrategy((username, password) => {
		
	}));
	*/

	router.get('/auth', (req, res, next) => {
		console.log('/login/auth');
		res.render('login', {
			status: 'fail'
		});
	});
	
	module.exports = router;
//})();
