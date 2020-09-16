const router = require('express').Router();
const { load } = require('../setup/sqlite.js');
const { auth } = require('../setup/auth.js');

router.get('/', auth, (req, res, next) => {
	res.render('submit');
});

router.post('/', (req, res, next) => {
	// if(!req.isAuthenticated()) return res.send({
	//     error: 'You have to login'
	// });
	let author = req.user.username;
	let data = req.body.content
		.split('\n')
		.filter(item => item.length > 0)
		.map(item => {
			item = item.split('//').map(i => i.trim(i));
			return {
				content: item[0],
				comment: item[1] || '',
				author: author
			};
		})
		.filter(item => {
			console.log(item);
			return item.content !== ''
		});
	return load(data)
		.then(() => res.send(data))
		.catch(e => {
			console.error(e);
			res.send({
				error: 'Server error'
			})
		});
});

module.exports = router;
