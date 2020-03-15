$('#login').click(() => {
	location = '/user/login';
});

$('form').submit((e) => {
	if($('#password').val() !== $('#c-password').val()){
		e.preventDefault();
	}
});
