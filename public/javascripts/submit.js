console.log('submit.js loaded');
$('textarea').eq(1).autoResize();
let lastRemove;
let last = $('td').eq(-2).attr('id');
let remove = [];
$('.remove').click(function(){
	let $target = $(this).parent().parent();
	console.log($target);
	if($.cookie("admin")){
		lastRemove = $(this).parent().parent().remove();
	}else if($target.hasClass('addition')){
		$target.children().eq(0).children().val('')
	}else{
		alert('You don\'t have the promission');
	}
});
