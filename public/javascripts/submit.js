console.log('submit.js loaded');
$('form').submit((e) => {
	e.preventDefault();
	let $target = $('#content');
	if($target.val()){
		$.post('/submit', {
			content: $target.val()
		}).then(data => {
			if(data.error) return $('.warming').warmingShow(data.error);
			window.location = '/';
		}).catch(console.error);
	}
});
