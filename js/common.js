head.ready(function() {
	//select

	//popups
	$('.js-add').on('click', function() {
		$('.js-add-pop').addClass('js-open');
		$('.form__box').addClass('js-close');
		return false;
	});
	$('.js-follow').on('click', function() {
		$('.js-follow-pop').addClass('js-open');
		$('.form__box').addClass('js-close');
		return false;
	});
	$('.js-transfer').on('click', function() {
		$('.steps-first').addClass('js-open');
		$('.form__box').addClass('js-close');
		return false;
	});
	$('.js-send').on('click', function() {
		$('.js-send-pop').addClass('js-open');
		$('.js-add-pop').removeClass('js-open');
		$('.form__box').addClass('js-close');
		return false;
	});
	//tabs
	$('.steps__list li a').click(function(event) {
		/* Act on the event */
		attr = $(this).attr('href');
		$('#steps-first,#steps-second,#steps-third,#steps-fourth,#steps-fifth').removeClass('js-open');
		$(' '+attr).addClass('js-open');
		return false;
	});
	$('.js-next-step').click(function(event) {
		/* Act on the event */
		attr = $(this).attr('href');
		$('#steps-first,#steps-second,#steps-third,#steps-fourth,#steps-fifth').removeClass('js-open');
		$(' '+attr).addClass('js-open');
		return false;
	});
	$('.close').on('click', function() {
		$('.popup').removeClass('js-open');
		$('.steps').removeClass('js-open');
		$('.form__box').removeClass('js-close');
		return false;
	});
	$(document).ready(function() {
	    $(document).click(function() {
	        $(".js-select-list").hide();
	        $(".js-select").removeClass("is-active");
	    });
	    function selectList() {
	        var select = $(".js-select");
	        var select_list = $(".js-select-list");
	        $("body").on("click", ".js-select", function(event){
	            if ($(this).hasClass("is-active")) {
	                select.removeClass("is-active");
	                select_list.hide();
	            }
	            else {
	                select.removeClass("is-active");
	                select_list.hide();
	                $(this).find(".js-select-list").show();
	                $(this).addClass("is-active");
	            }
	            event.stopPropagation();
	        });
	        $("body").on("click", ".js-select-list li", function(event){
	            var id = $(this).attr("data-id");
	            var text = $(this).text();
	            $(this).parents(".js-select").find(".js-select-text").text(text);
	            $(this).parents(".js-select").find(".js-select-input").val(id);
	            $(this).parent().hide();
	            $(this).parents(".js-select").removeClass("is-active");
	            event.stopPropagation();
	        });
	    }  
	    
	    selectList();
	    $("body").on("click", ".js-select", function(event){
	        event.stopPropagation();
	    });
	    
	});
	//lang
	$('.lang__ru').on('click', function() {
		if ($('.lang__eng').hasClass('is-close')) {
			$('.lang__eng').removeClass('is-close');
		}
		else {
			$('.lang__eng').addClass('is-close');
			$(this).removeClass('is-close');
		};
		$('.lang').toggleClass('is-active');
		return false;
	});
	$('.lang__eng').on('click', function() {
		if ($('.lang__eng').hasClass('is-close')) {
			$('.lang__ru').addClass('is-close');
		}
		else {
			$('.lang__ru').addClass('is-close');
		};
		$('.lang').toggleClass('is-active');
		return false;
	});
	//tabs
	$('.form__tab').click(function(event) {
		/* Act on the event */
		$('.form__tab').removeClass('is-active');
		$(this).addClass('is-active');
		attr = $(this).attr('href');
		$('#transfer,#follow,#add').removeClass('is-active');
		$(' '+attr).addClass('is-active');
		return false;
	});
	//input mask
	$('.input__phone').inputmask("+9 (999) 999999999"); //mask with dynamic syntax 
	$('.input__card').inputmask("9999 9999 9999 9999"); 
	//
	$(function() {
	  var spinner = $( ".input__spinner" ).spinner({ min: 0, max: 100});
	
	  $( "#disable" ).click(function() {
	    if ( spinner.spinner( "option", "disabled" ) ) {
	      spinner.spinner( "enable" );
	    } else {
	      spinner.spinner( "disable" );
	    }
	  });
	  $( "#destroy" ).click(function() {
	    if ( spinner.spinner( "instance" ) ) {
	      spinner.spinner( "destroy" );
	    } else {
	      spinner.spinner();
	    }
	  });
	  $( "#getvalue" ).click(function() {
	    alert( spinner.spinner( "value" ) );
	  });
	  $( "#setvalue" ).click(function() {
	    spinner.spinner( "value", 5 );
	  });
	
	  $( "button" ).button();
	});
	//NAVIGATION
	$('.nav-mob').on('click', function() {
		$('.nav').toggleClass('is-active');
	});
	//btn-next
	$('.head-next').click(function() {
		$('html, body').animate({scrollTop: $('.transfers').offset().top}, 400);
		return false;
	});
	$('.transfers-next').click(function() {
		$('html, body').animate({scrollTop: $('.partners').offset().top}, 400);
		return false;
	});
	$('.partners-next').click(function() {
		$('html, body').animate({scrollTop: $('.news').offset().top}, 400);
		return false;
	});
	$('.btn-up').click(function() {
		$('html, body').animate({scrollTop: $('html').offset().top}, 700);
		return false;
	});
});