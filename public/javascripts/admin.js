console.log('admin.js loaded');

let $hidden = $('#deleted');

$(document).ready(() => {
	$hidden.val('');
});

$('button.delete').click(function(){
	let $button = $(this);
	let $target = $button.parent().parent();
	let deleted = JSON.parse($hidden.val() || '[]');
	let id = parseInt($target.attr('id'));
	
	if(!Array.isArray(deleted)) deleted = [];
	console.log('deleted', deleted);

	if($target.hasClass('deleted')){
		// remove id in `deleted`
		$target.removeClass('deleted');
		deleted = deleted.filter(item => item !== id);
	}else{
		// add id to `deleted`
		$target.addClass('deleted');
		deleted.push(id);
		deleted.sort((a, b) => a > b);
	}
	$hidden.val(JSON.stringify(deleted));
});
