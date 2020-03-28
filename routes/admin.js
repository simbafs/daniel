const router = require('express').Router();
const { auth, admin } = require('../setup/auth.js');
const { get, load, remove } = require('../setup/sqlite.js');

router.get('/', auth, admin, (req, res, next) => res.render('admin'));

router.get('/record', auth, admin, (req, res, next) => {
	get().then(data => {
		res.render('admin/record', {
			data: data
		});
	});
});

router.post('/record', auth, admin, (req, res, next) => {
	let removedIndex = JSON.parse(req.body.removed);
	get().then(data => {
		let removedId = data
			.filter((item, index) => removedIndex.includes(index))
			.map(item => `'${item.id}'`)
			.join(', ');
		remove(removedId);
		res.redirect('/admin/record');
	});

});

router.get('/user', auth, admin, (req, res, next) => {
	get('User').then(data => {
	//	res.send(data);
		res.render('admin/user', { data: data });
	});
});

router.post('/user', auth, admin, (req, res, next) => {
	let removedUID = JSON.parse(req.body.removed);
	get('User').then(data => {
		let removedId = data
			.filter((item, index) => removedUID.includes(index))
			.map(item => `'${item.id}'`)
			.join(', ');
		remove(removedId, 'User');
		res.redirect('/admin/user');
	});

});

module.exports = router;
