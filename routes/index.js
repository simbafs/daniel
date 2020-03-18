const router = require('express').Router();
const auth = require('../setup/auth.js');

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Remind Daniel'
	});
});

router.get('/secret', auth, (req, res, next) => {
	res.send('<h1>Hello World</h1>');
});

router.use('/user', require('./user.js'));

module.exports = router;
