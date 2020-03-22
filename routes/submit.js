const router = require('express').Router();
const sqlite = require('../setup/sqlite.js');
const load = sqlite('load');
const auth = require('../setup/auth.js');

router.get('/', auth, (req, res, next) => {
	res.render('submit');
});

router.post('/', (req, res, next) => {
	if(!req.isAuthenticated()) return res.send({
		error: 'You have to login'
	});
	let author = req.user.username;
	let data = req.body.content
		.split('\n')
		.filter(item => item.length > 0)
		.map(item => {return {
			content: item,
			author: author
		}});
	return load(data)
		.then(() => res.send(data))
		.catch(() => res.send({
			error: 'Server error'
		}));
});

module.exports = router;
