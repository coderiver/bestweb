head.ready(function() {
	//select
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
	            $(this).parents(".js-select").find(".js-select-text").addClass("is-active");
	            event.stopPropagation();
	        });
	    }  
	    
	    selectList();
	    $("body").on("click", ".js-select", function(event){
	        event.stopPropagation();
	    });
	    
	});
	//input mask
	$('.input_phone').inputmask("+9 (999) 999999999"); //mask with dynamic syntax 
	$('.input_card').inputmask("9999 9999 9999 9999"); 
	//spinner
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

	  var day = $( ".input_day" ).spinner({ min: 01, max: 31 });
	  var day = $( ".input_year" ).spinner({ min: 2014, max: 9999})
	});
	//nav
	$('.nav_btn').on('click', function(event) {
		$('nav').toggleClass('is-open');
		$(this).toggleClass('is-active');
	});
});