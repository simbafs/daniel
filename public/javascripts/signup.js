$('#login').click(() => {
	location = '/login';
});

$('form').submit((e) => {
	e.preventDefault();
	if($('#password').val() !== $('#c-password').val()){
		$('.warming').warmingShow('password not match');
		return;
	}
	$.post('/signup', {
		username: $('#username').val(),
		password: $('#password').val(),
		'c-password': $('#c-password').val(),
		realname: $('#realname').val()
	}).then(data => {
		if(data.status !== 200) return $('.warming').warmingShow(data.error);
		else window.location.assign('/login');
	}).catch(console.error);
});
