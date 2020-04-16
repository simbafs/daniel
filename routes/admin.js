const router = require('express').Router();
const { auth, admin } = require('../setup/auth.js');
const { get, load, remove } = require('../setup/sqlite.js');

router.get('/', auth, admin, (req, res, next) => res.render('admin'));

router.get('/record', auth, admin, (req, res, next) => {
	get().then(data => {
		res.render('admin/record', {
			data: data
		});
	}).catch(console.error);
});

router.post('/record', auth, admin, (req, res, next) => {
	let removedIndex = JSON.parse(req.body.removed);
	get().then(data => {
		let removedId = data
			.filter((item, index) => removedIndex.includes(index))
			.map(item => item.id)
		remove(removedId).then(() => {
			res.redirect('/admin/record');
		})
	}).catch(console.error);

});

router.get('/user', auth, admin, (req, res, next) => {
	get('User').then(data => {
		res.render('admin/user', { data: data });
	});
});

router.post('/user', auth, admin, (req, res, next) => {
	let removedUID = JSON.parse(req.body.removed);
	get('User').then(data => {
		let removedId = data
			.filter((item, index) => removedUID.includes(index))
			.map(item => item.id)
		remove(removedId, 'User').then(() => {
			res.redirect('/admin/user');
		});
	}).catch(console.error);

});

module.exports = router;
