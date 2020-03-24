console.log('admin.js loaded');
let $hidden = $('#deleted');
console.log($hidden);
$('button.delete').click(function(){
	let $button = $(this);
	let $target = $button.parent().parent();
	console.log($target.attr('id'));
	if($target.hasClass('deleted')){
		$target.removeClass('deleted');
		$hidden.val($hidden.val().replace(`<${$target.attr('id')}>`, ''));
	}else{
		$target.addClass('deleted');
		$hidden.val($hidden.val().concat(`<${$target.attr('id')}>`));
	}
});
