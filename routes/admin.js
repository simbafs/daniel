const router = require('express').Router();
const auth = require('../setup/auth.js');
const sqlite = require('../setup/sqlite.js');
const get = sqlite('get');
const load = sqlite('load');

router.get('/',/* auth,*/ (req, res, next) => {
	get().then(data => {
		res.render('admin', {
			data: data
		});
	});
});

router.post('/',/* auth,*/ (req, res, next) => {
	let deletedIndex = JSON.parse(req.body.deleted);
	get().then(data => {
		let deletedId = data
			.filter((item, index) => deletedIndex.includes(index))
			.map(item => `'${item.id}'`)
			.join(', ')
		res.send(deletedId);
	});

});

module.exports = router;
