const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('submit');
});

module.exports = router;
