module.exports = (req, res, next) => {
	console.log(req.flag);
	if (req.isAuthenticated()) {
		return next();
	}
    req.flash('warning_msg', '請先登入才能此用');
    res.redirect('/login');
}
