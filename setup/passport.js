module.exports = (app, passport) => {
	const session = require('express-session');
	const LocalStrategy = require('passport-local').Strategy;
	const login = require('./sqlite.js')('login');
	let DB;
	setTimeout(() => {
		DB = require('./sqlite.js')('DB');
		console.log('setup/sqlite.js: DB load')
	}, 1000);

	require('dotenv').config();

	app.use(session({
		secret: process.env.DB_SECRET,
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user.id);	
	});

	passport.deserializeUser((id, done) => {
		DB.run(`SELECT * FROM User WHERE id = '${id}'`)
			.then((user) => {
				if(user.error) done(user, null);
				else done(null, user);
			})
			.catch(console.error);
	});

	passport.use(new LocalStrategy((username, password, done) => {
		login(username, password)
			.then(data => {
				if(data.status == 200) done(null, data);
				else if(data.status == 500) done(data);
				else done(null, false, data.error);
			})
			.catch(console.error);
	}));

	return passport;
}
