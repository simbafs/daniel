module.exports = (app) => {
	const session = require('express-session');
	const passport = require('passport');
	require('dotenv').config();
	app.use(session({
		secret: process.env.DB_SECRET,
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
}
