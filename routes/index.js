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

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));
router.use('/submit', require('./submit.js'));

module.exports = router;
