console.log('admin.js loaded');

let $hidden = $('#data');

$(document).ready(() => {
	$hidden.val(JSON.stringify({removed: [], comment: {}}));
});

$('button.remove').click(function(){
	let $button = $(this);
	let $target = $button.parent().parent();
	let id = $target.children().eq(4).text();
	let data = JSON.parse($hidden.val());

	if(!Array.isArray(data.removed)) data.removed = [];
	// console.log('removed', data.removed);

	if($target.hasClass('removed')){
		// remove id in `removed`
		$target.removeClass('removed');
		data.removed = data.removed.filter(item => item !== id);
	}else{
		// add id to `removed`
		$target.addClass('removed');
		data.removed.push(id);
		data.removed.sort((a, b) => a > b);
	}
	// console.log(data);
	$hidden.val(JSON.stringify(data));
});

$('.edit-comment').click(function(e){
	let $btn = $(this);
	let $target = $btn.parent().parent();
	let $content = $target.children().eq(0);
	let $id = $target.children().eq(4)
	let data = JSON.parse($hidden.val());

	let comment = prompt(`Edit '${$content.text()}', leave blank to delete`, $btn.text().trim() === 'click to edit' ? '' : $btn.text()).trim();
	if(comment === '') $btn.text('click to edit');
	else $btn.text(comment);

	data.comment[$id.text()] = comment;
	$hidden.val(JSON.stringify(data));
	// console.log(data.comment);
})
