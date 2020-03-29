function auth(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	debugger;
	let url = `/login?url=${req.originalUrl}`;
    req.flash('warning_msg', '請先登入才能此用');
    res.redirect(url);
}

function admin(req, res, next){
	if(res.locals.isAdmin) return next();
    res.redirect('/');
}

module.exports = {
	auth: auth,
	admin: admin
}
