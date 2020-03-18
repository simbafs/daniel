$('#login').click(() => {
	location = '/user/login';
});

$('form').submit((e) => {
	e.preventDefault();
	if($('#password').val() !== $('#c-password').val()){
		$('.warming').warmingShow('password not match');
		return;
	}
	$.post('/user/signup', {
		username: $('#username').val(),
		password: $('#password').val(),
		'c-password': $('#c-password').val(),
		realname: $('#realname').val()
	}).then(data => {
		if(data.status !== 200) return $('.warming').warmingShow(data.error);
		else window.location.assign('/user/login');
	}).catch(console.error);
});
