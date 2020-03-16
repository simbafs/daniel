(($) => {
	$('.warming').css('display', 'flex').hide();
	$.fn.warmingShow = function(msg, time = 400){
		this
			.children()
				.eq(0).text(msg).end()
			.end()
			.slideDown();
		return this;
	}
	$.fn.warmingHide = function(time = 400){
		this
			.children()
				.eq(0).text('').end()
			.end()
			.slideUp();
		return this;
	}
})(jQuery);
