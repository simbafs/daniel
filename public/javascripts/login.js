console.log('login.js loaded');
$('.warming').css('display', 'flex').hide();
$('#signup').click(()=> {
	location = '/signup';
});
/*
$('form').submit((e) => {
	let username = $('#username');
	let password = $('#password');
	$.post('/user/login', {
		username: username.val(),
		password: password.val()
	})
		.then((data) => {
			console.log(data);
			if(data.error){
			}
		})
		.catch(console.error);
	e.preventDefault();
});
*/
