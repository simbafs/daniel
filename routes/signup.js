const router = require('express').Router();
const sqlite = require('../setup/sqlite.js');
const signup = sqlite('signup');
let DB;
setTimeout(() => {
	DB = sqlite('DB');
	console.log('router/user/signup.js: DB load');
}, 1500);

router.get('/', (req, res, next) => {
	if(res.locals.isAuthenticated) return res.redirect('/');
	else return res.render('signup');
});

router.post('/', async (req, res, next) => {
	let error = [];
	if(!req.body.username) error.push('username empty');
	if(!req.body.password) error.push('password empty');
	if(!req.body['c-password']) error.push('confirm password empty');
	if(!req.body.realname) error.push('realname empty');
	if(req.body.password !== req.body['c-password']) error.push('password confirm fail');
	if(error.length > 0) return res.send(error);

	user = await signup(
		req.body.username.toString(),
		req.body.password.toString(),
		req.body.realname.toString()
	);
	console.log(user);
	if(user.error) return res.send(user);
	else return res.send({
		status: 200
	});
});

module.exports = router;
