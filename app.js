const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const admin = require('./db/admin.json');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
require('./setup/passport.js')(app, passport);
require('./setup/sqlite.js').init();


// Use flash middleware: all requests will have a req.flash()
app.use(flash())

// keep req.user in res.local that can be used in view
app.use((req, res, next) => {
	res.locals.user = req.user;
	// check if already authenticated
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.isAdmin = !!(req.user && admin.includes(req.user.id));
	if(res.locals.isAuthenticated){
		res.cookie('admin', 'true');
	}else{
		res.clearCookie('admin');
	}
	next();
})

app.use('/', require('./routes/index.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
