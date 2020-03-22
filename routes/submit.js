const router = require('express').Router();
const sqlite = require('../setup/sqlite.js');
const load = sqlite('load');
const get = sqlite('get');

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
	if(!req.isAuthenticated()) res.
	res.send({
		...req.body,
		author: Object.keys(req)
	});
});

module.exports = router;
