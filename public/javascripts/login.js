console.log('login.js loaded');
$('.warming').css('display', 'flex').hide();
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
				$('.warming-msg')
					.children()
						.eq(0).text(data.error).end()
					.end()
					.parent().slideDown()
			}
		})
		.catch(console.error);
	e.preventDefault();
});
*/
