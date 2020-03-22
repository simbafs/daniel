const router = require('express').Router();
const sqlite = require('../setup/sqlite.js');
const load = sqlite('load');

router.get('/', (req, res, next) => {
	res.render('submit');
	/*
	get().then((data) => {
		res.render('submit', {
			data: data
		});
	});
	*/
});

router.post('/', (req, res, next) => {
	/*
	if(!req.isAuthenticated()) return res.send({
		error: 'You have to login'
	});
	*/
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
