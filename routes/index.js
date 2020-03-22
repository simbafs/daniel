const router = require('express').Router();
const auth = require('../setup/auth.js');
const get = require('../setup/sqlite.js')('get');

router.get('/', (req, res, next) => {
	get().then(raw => {
		let data = raw.map(item => item.content);
		res.render('index', {
			data: data.join('、\n'),
			lines: data.length
		});
	})
});

router.get('/json', (req, res, next) => {
	get().then(raw => {
		let data = raw.map(item => item.content);
		res.send(data);
	})
})

router.get('/raw', (req, res, next) => {
	get().then(raw => {
		let data = raw.map(item => item.content);
		res.send(data.join('、<br>'));
	})
})

router.get('/secret', auth, (req, res, next) => {
	res.send('<h1>Hello World</h1>');
});

router.use('/login', require('./login.js'));
router.use('/signup', require('./signup.js'));
router.use('/submit', require('./submit.js'));

module.exports = router;
