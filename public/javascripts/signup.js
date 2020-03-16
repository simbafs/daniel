$('#login').click(() => {
	location = '/user/login';
});

$('form').submit((e) => {
	if($('#password').val() !== $('#c-password').val()){
		$('.warming').warmingShow('password not match');
		e.preventDefault();
	}
});
