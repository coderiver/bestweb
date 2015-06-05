head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	// function scrollFixedElements() {
	//     var scroll_left = $(this).scrollLeft();
	//     $(".fixed-element").css({
	//         left: -scroll_left
	//     });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//     scrollFixedElements()
	// });

	$(document).click(function() {
		$(".js-select").removeClass("is-active");
		$(".js-select-list").slideUp(100);
	});
	
	// select list
	$("body").on("click",".js-select",function(event) {
		event.stopPropagation();
	});
	$("body").on("click",".js-select-text",function(event) {
		var select = $(this).parents(".js-select");
		if (select.hasClass("is-active")) {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(100);
		}
		else {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(100);
			select.toggleClass("is-active").find(".js-select-list").slideToggle(100);
		}
	
	});

	$("body").on("click",".js-select-list li",function() {
		var val = $(this).attr("data-val");
		var text = $(this).text();
		var select = $(this).parents(".js-select");
		var selectList = $(this).parents(".js-select-list");
		select.find(".js-select-text").text(text);
		select.find("option").removeAttr("selected");
		select.find('option[value="'+val+'"]').attr("selected", "selected");
		selectList.find("li").removeClass("is-active");
		$(this).addClass("is-active");
		select.removeClass("is-active");
		selectList.slideUp(100);
		return false;
		
	});

	//success
	$('.js-close').on('click', function() {
		$('.js-success').removeClass('is-active');
	});
	$('.js-success').each(function() {
		$('body').on('click', function() {
			$('.js-success').removeClass('is-active');
		});
		$('.popup').on('click', function(event) {
			event.stopPropagation();
		});
	});
	//nav
	$('.js-nav-btn').on('click', function() {
		$('.js-nav').toggleClass('is-active');
		return false;
	});
	$('.js-nav').each(function() {
		$('body').on('click', function() {
			$('.js-nav').removeClass('is-active');
		});
		$(this).on('click', function(event) {
			event.stopPropagation();
		});
	});
	// scrollTop
	 $(".js-nav-link").click(function (){
		var page = $(this).attr("href");
		$('.js-nav').removeClass('is-active');
		$('html, body').animate({
			scrollTop: $(page).offset().top - 0
		}, 600);
		return false;
	});
	function scrollHeader() {
	    if ($('.js-block').length) {
	      $('.js-block').each(function() {
	      	var navHeight = $('.header__bottom').outerHeight();
	        if ($(window).scrollTop() >= $(this).offset().top) {
	          var id = $(this).attr("id");
	          $(".js-nav-link").removeClass("is-active");
	          $("[href='#"+id+"']").addClass("is-active");
	        }	       
	      });
	    }
	  }
	scrollHeader();
	$(window).scroll(function() {
		scrollHeader();
	});

	//validate
	var form_validate = $('.js-validate');

		if (form_validate.length) {

		form_validate.each(function () {

			var form_this = $(this);
			$.validate({
				form : form_this,
				validateOnBlur : false,
				borderColorOnError : false,
				scrollToTopOnError : false,

			onSuccess : function() {
				$('.js-success').addClass('is-active');
		 		// ajaxSubmit(form_this);
				return false;
		   }
	   	});

	  	});

	 };
	 $('.js-reset').on('click', function(){

	  	$('.js-validate').trigger('reset');
	  	$('.js-success').removeClass('is-active');
	  });
});