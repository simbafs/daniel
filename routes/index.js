const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Remind Daniel'
	});
});

router.use('/user', require('./user.js'));

module.exports = router;
