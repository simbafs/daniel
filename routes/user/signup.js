const router = require('express').Router();
const sqlite = require('../../setup/sqlite.js');
const signup = sqlite('signup');
let User;
setTimeout(() => {
	User = sqlite('User');
	console.log('router/user/signup.js: DB load');
}, 1500);


router.post('/', (req, res, next) => {
	console.log(
		!req.body.username,
		!req.body.password,
		!req.body.realname,
		req.body.password !== req.body['c-password']
	)

	if(!req.body.username) return res.redirect('/user/signup#username');
	if(!req.body.password) return res.redirect('/user/signup#password');
	if(!req.body.realname) return res.redirect('/user/signup#realname');
	if(req.body.password !== req.body['c-password']) return res.redirect('/user/signup#passworderror');

	a = signup(
		req.body.username.toString(),
		req.body.password.toString(),
		req.body.realname.toString()
	)//.then(data => {
	//	res.send(data);	
	//})
	console.log(a);
	res.send(a);
});

module.exports = router;
