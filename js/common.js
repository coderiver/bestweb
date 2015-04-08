head.ready(function()
{
	//select
	$(document).ready(function()
	{
        //input mask
        $.extend($.inputmask.defaults, {
            'autoUnmask': true
        });

        //$('.mb_amount').inputmask("decimal", {
        //    groupSeparator: " ",
        //    digits: 0,
        //    autoGroup: true,
        //    rightAlign: false,
        //});

        $('.mb_phone').inputmask('+9{11,14}', {
            onUnMask: function(maskedValue, unmaskedValue) {
                return '+' + unmaskedValue;
            }
        });

        $('.mb_phone_ru').inputmask("+7 (999) 999 9999", {
            onUnMask: function(maskedValue, unmaskedValue) {
                return '+7' + unmaskedValue;
            }
        });

        $('.mb_card_number').inputmask("9999 9999 9999 9999");

        $('.mb_date').inputmask({
            mask: "1.2.y",
            placeholder: "ДД.ММ.ГГГГ",
            leapday: "29.02.",
            separator: '.',
            alias: "dd/mm/yyyy"
        });

        $(".mb_address").suggestions({
            serviceUrl: "https://dadata.ru/api/v2",
            token: "8799b46a84b5e9746a84235ba02fe11364c5fa7b",
            type: "ADDRESS"
        });

        $(".mb_fio").suggestions({
            serviceUrl: "https://dadata.ru/api/v2",
            token: "8799b46a84b5e9746a84235ba02fe11364c5fa7b",
            type: "NAME"
        });

        initJSLists();

	});

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
	  var year = $( ".input_year" ).spinner({ min: 2014, max: 9999})
	});

	//nav
	$('.nav_btn').on('click', function(event) {
		$('.nav').toggleClass('is-open');
		$(this).toggleClass('is-active');
	});

	//validation
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			var re = new RegExp(regexp);
			return this.optional(element) || re.test(value);
		},
		"Данные не соответствуют шаблону"
	);
});

function initPaymentForm(selector, validation_rules, validation_messages)
{
	return initForm(selector, validation_rules, validation_messages, function(form)
	{
		var $form = $(form);
		var amount = $form.find('input[name=amount]').val();
		var $submit_btn = $form.find(":submit");
		$submit_btn.attr('disabled', 'disabled');
		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action') || $form.data('action'),
			data: $form.serialize(),
			dataType: 'json'
		}).success(function (json)
		{
			ga('ec:setAction', 'purchase', {
                'step': 3,
                'id': json.data.id,
                'revenue': json.data.total
            });
            ga('send', 'event', 'Ecommerce', 'purchase');
            var payment_url = json.data.card.payment_page_url;
            countdown('#ipsp_popup', function () {
                window.location.href = payment_url;
            });
		}).fail(function (jqXHR)
		{
            ga('send', 'event', 'failure', 'create_payment_failure', amount);
            var json = jqXHR.responseJSON;
            if(500 == json.meta.code)
            {
                $('.error_popup').show();
            }
            else
            {
                var messages = json.meta.error_message;
                showFormErrors($submit_btn, $form, messages);
            }
            $submit_btn.removeAttr('disabled');
		});
		return false;
	});
}

function showErrorPopup()
{
    $('.popup-container').hide();
    $('.error_popup').show();
}

function hideErrorPopup()
{
    $('.error_popup').hide();
}

function initForm(selector, validation_rules, validation_messages, submit_callback)
{
	var $form = $(selector);

    $form.find(':input').change(function() {
        ga('ec:setAction', 'checkout', { 'step': 2 });
        ga('send', 'event', 'Ecommerce', 'checkout');
    });

	return $form.validate({
		onfocusout: false,
		showErrors: function (errorMap) {
			showJqueryValidatorErrors($form, errorMap);
		},
		rules: validation_rules,
		messages: validation_messages,
		submitHandler: submit_callback
	});
}

function countdown(popup_selector, callback)
{
	$(popup_selector).show();
    setTimeout(function() {
        $(popup_selector).hide();
        return callback();
    }, 1000);
}

function showJqueryValidatorErrors($form, errorMap)
{
	$form.find(':input').each(function (i) {
		var $input = $(this);
		var property_name = $input.attr('name');
		var $wrap = $input.parent();
		var $msgbox = $wrap.find('.input-error');

		if(undefined == property_name)
			return;

		if (errorMap.hasOwnProperty(property_name)) {
			$msgbox.html(errorMap[property_name]);
			$wrap.addClass('error');
		}
		else {
			$msgbox.html('');
			$wrap.removeClass('error');
		}

        ga('send', 'event', {
            'eventCategory': 'Payment',
            'eventAction': 'ValidationError',
            'eventLabel': $form.data('action') + ':' + property_name
        });
	});
}

function showFormErrors($submit_btn, $form, messages)
{
	$submit_btn.removeAttr('disabled');
	if(messages instanceof Array)
	{
		$.each(messages, function (field, message) {
			var $el = $('*[name="' + field + '"]');
			$el.addClass('error');
		});
	}
	else
	{
		$form.find('.form-error').html(messages);
	}
}

function initJSLists()
{
    $(document).click(function()
    {
        $(".js-select-list").hide();
        $(".js-select").removeClass("is-active");
    });

    function selectList()
    {
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
            $(this).parents(".js-select").find(".js-select-input").trigger('change');
            event.stopPropagation();
        });
    }

    function combinedSelectList()
    {
        $("body").on("click", ".js-combined-select .js-select-list li", function(event)
        {
            var $combined_el = $(this).parents(".js-combined-select");
            var value = $combined_el.find('.js-select input[type=hidden]')
                .map(function() {
                    return $(this).val();
                }).toArray().join('');

            $combined_el.find('.js-combined-select-input').val(value);
            event.stopPropagation();
        });
    }

    selectList();
    combinedSelectList();
    $("body").on("click", ".js-select", function(event) {
        event.stopPropagation();
    });
}


