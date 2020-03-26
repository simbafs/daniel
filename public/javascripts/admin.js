console.log('admin.js loaded');

let $hidden = $('#removed');

$(document).ready(() => {
	$hidden.val('');
});

$('button.remove').click(function(){
	let $button = $(this);
	let $target = $button.parent().parent();
	let removed = JSON.parse($hidden.val() || '[]');
	let id = parseInt($target.attr('id'));
	
	if(!Array.isArray(removed)) removed = [];
	console.log('removed', removed);

	if($target.hasClass('removed')){
		// remove id in `removed`
		$target.removeClass('removed');
		removed = removed.filter(item => item !== id);
	}else{
		// add id to `removed`
		$target.addClass('removed');
		removed.push(id);
		removed.sort((a, b) => a > b);
	}
	$hidden.val(JSON.stringify(removed));
});
