const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('submit', {
		now: 'kjsdadslkasd'
	});
});

router.post('/', (req, res, next) => {
	res.send(req.body);
});

module.exports = router;
