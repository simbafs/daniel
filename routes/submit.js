const router = require('express').Router();
const sqlite = require('../setup/sqlite.js');
const load = sqlite('load');
const get = sqlite('get');

router.get('/', (req, res, next) => {
	get().then((data) => {
		res.render('submit', {
			data: data
		});
	});
});

router.post('/', (req, res, next) => {
	res.send(req.body);
});

module.exports = router;
