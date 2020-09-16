const router = require('express').Router();
const { auth, admin } = require('../setup/auth.js');
const { get, load, remove, DB } = require('../setup/sqlite.js');

router.get('/', auth, (req, res, next) => res.render('admin'));

router.get('/record', auth, (req, res, next) => {
	get().then(data => {
		if(!res.locals.isAdmin){
			data = data.filter(i => i.author === res.locals.user.username);
		}
		res.render('admin/record', {
			data: data
		});
	}).catch(console.error);
});

router.post('/record', auth, (req, res, next) => {
	let data = JSON.parse(req.body.data);
	let db = DB();

	// remove
	let removedId = data.removed;
	remove(removedId)
	// comment
		.then(() => {
			db.prepare('UPDATE Record SET comment = ? WHERE id = ?;')
				.then(sta => {
					for(let i in data.comment){
						sta.run(data.comment[i], i);
					}
					sta.finalize();
				});
		})
		.then(() => {
			res.redirect('/admin/record');
		})
		.catch(e => {
			console.log(e);
			res.render('error', {
				message: 'Something error',
				error: {
					stack: '',
					status: 400
				}
			});
		});
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
