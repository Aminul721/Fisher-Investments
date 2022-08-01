(function($){
	var searchParams = new URLSearchParams(window.location.search);
	var sub_id = searchParams.get('sub_id');
	if($(window).width() < 992) {
		$('.rm-mb').html('');
	} else {
		$('.rm-desk').html('');
	}
	$('.wpcf7 input[name="accept-terms[]"]').val('Ja');
	$('.wpcf7 .valid-phone, .valid-post').attr('pattern', '[0-9]*');
	$('.wpcf7 .valid-phone, .valid-post').attr('onkeypress', 'return isNumberKey(event)');
	$('.wpcf7 input[type="number"][name="huisnummer"]').attr('onkeydown', 'return event.keyCode !== 69');
	$('.wpcf7 input[name="toevoeging"], .wpcf7 .valid-text').attr('onkeypress', 'return /[a-z]/i.test(event.key)');
    document.addEventListener( 'wpcf7submit', function( event ) {
    	event.preventDefault();
		var inputs = event.detail.inputs;
		
		// document reset disable
		$(document).on('reset', '.wpcf7 form', function(e) {
			e.preventDefault();
		});

		$('.wpcf7 input, .wpcf7 select, .wpcf7 textarea').each(function() {
			_this = $(this);
			if(_this.hasClass('wpcf7-validates-as-required')) {
				if(_this.val() != '') {
					_this.parent().addClass('field_valid');
				} else {
					_this.parent().addClass('field_error');
				}
			}

			if(_this.attr('type') == 'checkbox') {
				if(_this.prop('checked')) {
					_this.parent().removeClass('field_error');
				} else {
					_this.parent().addClass('field_error');
				}
			}

			if(_this.attr('type') == 'checkbox' && $('.btn-cc').length > 0) {
		        if($('body .btn-cc').prop('checked')) {
				} else {
		            $('.error').hide(500);
		            if($('input[name="wil_verduurzamen"]').val()) {} else {
    	                $('.checkbox-parent').addClass('field_error');
    	            }
		        }
		    }

			if(_this.attr('type') == 'radio' && $('#male').length > 0) {
				if($('body #male').prop('checked') || $('body #female').prop('checked') || $('.get-mf').val()) {
				} else {
		            $('.error').hide(500);
		            $('.male_female_item').addClass('field_error');
		        }
		    }

		    if(_this.attr('type') == 'radio' && $('.btn-cr').length > 0) {
		        if($('body .btn-cr').prop('checked')) {
				} else {
		            $('.error').hide(500);
		            if($('.Aanhef').val() || $('.exclude-item').val()) {} else {
    	                $('.sale_radio_item').addClass('field_error');
    	            }
		        }
		    }
		    
		    if(_this.attr('type') == 'hidden' && $('.set-multi-val').length > 0) {
		        if($('.set-multi-val').val() != '') {
				} else {
		            $('.error').hide(500);
		            _this.parents('.tp_step_select').addClass('field_error');
		        }
		    }
		});
		
		//error class check
		if(jQuery('.field_error').length > 0) {
		} else {
		    formData = event.detail.inputs;
			var camId = $('#campaign_id').val();
			var BASE_URL = $('.BASE_URL').val();
			formData.push({name: 'sub_id', value: sub_id});
			formData.push({name: 'campaignId', value: camId});  // value of specific campaign in integer.
			formData.push({name: 'tracking_url', value: window.location.toString() });

			console.log(formData);

			jQuery.ajax({
				url:'https://fr.toluna.com/coreg/panelists',
				type:'POST',
				data: {
					SourceId: "50100280",
					CountryID: "2000159",
					email: 'test@gmail.com',
					gender: "male",
					DOB: '2000-10-10',
					FirstName: 'Sharifur',
					LastName: 'Rahman',
					ZipCode: '5611kk',
					Language: "2000239",
				},
				beforeSend: function() {
					$(".form-loader").css("display", "block");
				},
				success: function (result) {
					console.log(result);
					//window.location.href = BASE_URL + "bedankt/?id=" + result;
				},
				complete: function() {
					$(".form-loader").hide();
				}
			});

			jQuery.ajax({
				url:'https://portal.datafanatics.nl/admin/test_function',
				type:'POST',
				data: formData,
				beforeSend: function() {
					$(".form-loader").css("display", "block");
					$('.banner-right-box').addClass('bg_none');
					$('.banner_form_btn,.banner_form_bg').addClass('hide_content_all');
					$('.wpcf7-mail-sent-ok').css('display', 'none !important');
				},
				success: function (result) {
					//console.log(result + " default");
					id = result;
					var _result = result;
					var searchParams = new URLSearchParams(window.location.search);
					var clickid = searchParams.get('clickid');
					if(clickid) {
						jQuery.ajax({
							url:getpostcode.ajaxurl,
							type:'POST',
							data: {
								action: 'pfm_postback_url_convertion_call',
								clickid: clickid,
								txn_id: _result
							},
							success: function (res) {
							   window.location.href = BASE_URL + "bedankt/?id=" + _result;
							}
						});
					} else {
						window.location.href = BASE_URL + "bedankt/?id=" + _result;
					}
				},
				complete: function() {
					$(".form-loader").hide();
				}
			});
		}
	});
	
	$('body').on('change', '.wpcf7 .valid-phone', function() {
		$('.wpcf7-response-output').hide();
		_i = $(this);
	    if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-phone')) {
			str = '';
			langCode 	 = $('.lang_code').val();
			var valcheck = $('#phone_api_mode').val();
			$('.valid-phone').val($(this).val());
    		if($(this).val().length >= 8) {
			    $('.valid-phone').val($(this).val());
			    if($(this).val().match("00000000") || $(this).val().match("12345678") || $(this).val().match("06000000") || $(this).val().match("0612345678") || $(this).val().match("11111111") || $(this).val().match("22222222") ||  $(this).val().match("33333333") ||  $(this).val().match("44444444") || $(this).val().match("55555555") || $(this).val().match("66666666") || $(this).val().match("77777777") || $(this).val().match("88888888") || $(this).val().match("99999999")){
					$(this).parent().addClass('field_error');
                	$(this).parent().removeClass('field_valid');
			    } else {    			    
    			    if(($(this).val().slice(0, 4) == '0031' || $(this).val().slice(0, 4) == '+316' || $(this).val().slice(0, 3) == '316' || $(this).val().slice(0, 2) == '06') &&  langCode == 'en'){
    			    	if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    } else if(($(this).val().slice(0, 5) == '00467' || $(this).val().slice(0, 4) == '+467' || $(this).val().slice(0, 3) == '467' || $(this).val().slice(0, 2) == '07') &&  langCode == 'se') {
        			    if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    } else if(($(this).val().slice(0, 5) == '+4520' || $(this).val().slice(0, 6) == '004520' || $(this).val().slice(0, 2) == '20' || $(this).val().slice(0, 5) == '+4521' || $(this).val().slice(0, 6) == '004521' || $(this).val().slice(0, 2) == '21' || $(this).val().slice(0, 5) == '+4522' || $(this).val().slice(0, 6) == '004522' || $(this).val().slice(0, 2) == '22' || $(this).val().slice(0, 5) == '+4523' || $(this).val().slice(0, 6) == '004523' || $(this).val().slice(0, 2) == '23' || $(this).val().slice(0, 5) == '+4524' || $(this).val().slice(0, 6) == '004524' || $(this).val().slice(0, 2) == '24' || $(this).val().slice(0, 5) == '+4525' || $(this).val().slice(0, 6) == '004525' || $(this).val().slice(0, 2) == '25' || $(this).val().slice(0, 5) == '+4526' || $(this).val().slice(0, 6) == '004526' || $(this).val().slice(0, 2) == '26' || $(this).val().slice(0, 5) == '+4527' || $(this).val().slice(0, 6) == '004527' || $(this).val().slice(0, 2) == '27' || $(this).val().slice(0, 5) == '+4528' || $(this).val().slice(0, 6) == '004528' || $(this).val().slice(0, 2) == '28' || $(this).val().slice(0, 5) == '+4529' || $(this).val().slice(0, 6) == '004529' || $(this).val().slice(0, 2) == '29' || $(this).val().slice(0, 5) == '+4530' || $(this).val().slice(0, 6) == '004530' || $(this).val().slice(0, 2) == '30' || $(this).val().slice(0, 5) == '+4531' || $(this).val().slice(0, 6) == '004531' || $(this).val().slice(0, 2) == '31' || $(this).val().slice(0, 5) == '+4540' || $(this).val().slice(0, 6) == '004540' || $(this).val().slice(0, 2) == '40' || $(this).val().slice(0, 5) == '+4541' || $(this).val().slice(0, 6) == '004541' || $(this).val().slice(0, 2) == '41' || $(this).val().slice(0, 5) == '+4542' || $(this).val().slice(0, 6) == '004542' || $(this).val().slice(0, 2) == '42' || $(this).val().slice(0, 5) == '+4550' || $(this).val().slice(0, 6) == '004550' || $(this).val().slice(0, 2) == '50' || $(this).val().slice(0, 5) == '+4551' || $(this).val().slice(0, 6) == '004551' || $(this).val().slice(0, 2) == '51' || $(this).val().slice(0, 5) == '+4552' || $(this).val().slice(0, 6) == '004552' || $(this).val().slice(0, 2) == '52' || $(this).val().slice(0, 5) == '+4553' || $(this).val().slice(0, 6) == '004553' || $(this).val().slice(0, 2) == '53' || $(this).val().slice(0, 5) == '+4560' || $(this).val().slice(0, 6) == '004560' || $(this).val().slice(0, 2) == '60' || $(this).val().slice(0, 5) == '+4561' || $(this).val().slice(0, 6) == '004561' || $(this).val().slice(0, 2) == '61' || $(this).val().slice(0, 5) == '+4571' || $(this).val().slice(0, 6) == '004571' || $(this).val().slice(0, 2) == '71' || $(this).val().slice(0, 5) == '+4581' || $(this).val().slice(0, 6) == '004581' || $(this).val().slice(0, 2) == '81' || $(this).val().slice(0, 5) == '+4591' || $(this).val().slice(0, 6) == '004591' || $(this).val().slice(0, 2) == '91' || $(this).val().slice(0, 5) == '+4592' || $(this).val().slice(0, 6) == '004592' || $(this).val().slice(0, 2) == '92' || $(this).val().slice(0, 5) == '+4593' || $(this).val().slice(0, 6) == '004593' || $(this).val().slice(0, 2) == '93' || $(this).val().slice(0, 4) == '4911' || $(this).val().slice(0, 8) == '00454911' || $(this).val().slice(0, 7) == '+454911') && langCode == 'dk') {
        			    if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    } 

    			    // Start MMI
    			    //Norway
    			    else if( ( $(this).val().slice(0, 5) == '00479' || $(this).val().slice(0, 4) == '+479' || $(this).val().slice(0, 3) == '479' || $(this).val().slice(0, 3) == '474' || $(this).val().slice(0, 5) == '00474' || $(this).val().slice(0, 4) == '+474' || $(this).val().slice(0, 1) == '4' || $(this).val().slice(0, 1) == '9' || $(this).val().slice(0, 5) == '00477' || $(this).val().slice(0, 4) == '+477' || $(this).val().slice(0, 3) == '477' ) &&  langCode == 'no') {
        			    if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    }
    			    // France
    			    else if( ( $(this).val().slice(0, 5) == '00336' || $(this).val().slice(0, 5) == '00337' || $(this).val().slice(0, 4) == '+336' || $(this).val().slice(0, 4) == '+337' || $(this).val().slice(0, 3) == '336' || $(this).val().slice(0, 3) == '337' || $(this).val().slice(0, 2) == '06' || $(this).val().slice(0, 2) == '07' ) &&  langCode == 'fr') {
        			    if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    }
    			    // Belgium
    			    else if( ( $(this).val().slice(0, 5) == '00324' || $(this).val().slice(0, 4) == '+324' || $(this).val().slice(0, 3) == '324' || $(this).val().slice(0, 2) == '04' ) &&  ( langCode == 'be-fr' || langCode == 'be-nl' ) ) {
        			    if ( valcheck == 'off' ) {
        			    	$(this).parent().removeClass('field_error');
							$(this).parent().addClass('field_valid');
        			    } else {
	        			    isPhoneValid($(this).val(), langCode, valcheck ).then(data => {
	                    		if(data == false) {
	                		        $(this).parent().addClass('field_error');
	                		        $(this).parent().removeClass('field_valid');
	                			} else {
	                			    $(this).parent().removeClass('field_error');
	                				$(this).parent().addClass('field_valid');
	                				$('.valid-phone').val($(this).val());
	                			}
	                        });
	        			}
    			    }

    			    else {
						$(this).parent().addClass('field_error');
						$(this).parent().removeClass('field_valid');
					}
			    }
			} else {
				$(this).parent().addClass('field_error');
				$(this).parent().removeClass('field_valid');
			}
		}
	});
	$('body').on('keyup paste', '.wpcf7 input, .wpcf7 textarea', function() {
		$('.wpcf7-response-output').hide();
		_i = $(this);
		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-postcode')) {
		    var code = _i.val();
			code = $.trim(code);
			code = code.toUpperCase();
			if(code.length <= 6) {
				n1 = code.substring(0,1);
				n2 = code.substring(1,2);
				n3 = code.substring(2,3);
				n4 = code.substring(3,4);
				n5 = code.substring(4,5);
				n6 = code.substring(5,6);
				var alpha = /^[A-Za-z]+$/;
				$('.valid-postcode').val(code);
			    var regex = /^([0-9]{4})+([[a-zA-Z]{2})+$/;
			    if( code.length > 5 && regex.test(code) && $.isNumeric(n1) && $.isNumeric(n2) && $.isNumeric(n3) && $.isNumeric(n4) && n5.match(alpha) && n6.match(alpha) && code.length == 6) {
    			 } else if(!$.isNumeric(n1)) {
			    	$('.valid-postcode').val('');
			    } else if(!$.isNumeric(n2)) {
			    	$('.valid-postcode').val(n1);
			    } else if(!$.isNumeric(n3)) {
			    	$('.valid-postcode').val(n1+n2);
			    } else if(!$.isNumeric(n4)) {
			    	$('.valid-postcode').val(n1+n2+n3);
			    } else if(!n5.match(alpha)) {
			    	$('.valid-postcode').val(n1+n2+n3+n4);
			    } else if(!n6.match(alpha)) {
			    	$('.valid-postcode').val(n1+n2+n3+n4+n5);
			    }
			} else {
				ln6 = code.substring(0,6);
				$('.valid-postcode').val(ln6);
			}
		} 

		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-hr')) {
		    var hr = _i.val();
			hr = hr.toUpperCase();
			n1 = hr.substring(0,1);
		    if(!$.isNumeric(n1)) {
			    $('.valid-hr').val('');
		    }
		} 
	});
	
	$('body').on('change paste', '.wpcf7 input, .wpcf7 textarea', function() {
		$('.wpcf7-response-output').hide();
		_i = $(this);
		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-email')) {
			var email = _i.val();
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(email.length > 4 && regex.test(email)) {
				_i.parent().removeClass('field_error');
				_i.parent().addClass('field_valid');
				$('.valid-email').val(email);
			} else {
				_i.parent().addClass('field_error');
				_i.parent().removeClass('field_valid');
			}
		}

		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('vaild-date')) {
			var date = _i.val();
			if(date.length > 0) {
				$('input[name="geboortedatum"]').val(date);
				_i.parent().removeClass('field_error');
				_i.parent().addClass('field_valid');
				$('.valid-date').val(date);
			} else {
				_i.parent().addClass('field_error');
				_i.parent().removeClass('field_valid');
			}
		}

		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-postcode')) {
		    var code = _i.val();
			code = $.trim(code);
			code = code.toUpperCase();
			if(code.length <= 6) {
				n1 = code.substring(0,1);
				n2 = code.substring(1,2);
				n3 = code.substring(2,3);
				n4 = code.substring(3,4);
				n5 = code.substring(4,5);
				n6 = code.substring(5,6);
				var alpha = /^[A-Za-z]+$/;
				$('.valid-postcode').val(code);
			    var regex = /^([0-9]{4})+([[a-zA-Z]{2})+$/;
			    if( code.length > 5 && regex.test(code) && $.isNumeric(n1) && $.isNumeric(n2) && $.isNumeric(n3) && $.isNumeric(n4) && n5.match(alpha) && n6.match(alpha) && code.length == 6) {
    			    var postcode = code;
    				var huisnummer = $('input[name="huisnummer"]').val();
    				if(postcode != '' && huisnummer != '' && (huisnummer.length > 0 && huisnummer.length <= 3)) {
    				    isPostcodeNrVaild(postcode, huisnummer);
    				}
    				_i.parent().removeClass('field_error');
					_i.parent().addClass('field_valid');
			    } else if(!$.isNumeric(n1)) {
			    	$('.valid-postcode').val('');
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else if(!$.isNumeric(n2)) {
			    	$('.valid-postcode').val(n1);
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else if(!$.isNumeric(n3)) {
			    	$('.valid-postcode').val(n1+n2);
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else if(!$.isNumeric(n4)) {
			    	$('.valid-postcode').val(n1+n2+n3);
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else if(!n5.match(alpha)) {
			    	$('.valid-postcode').val(n1+n2+n3+n4);
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else if(!n6.match(alpha)) {
			    	$('.valid-postcode').val(n1+n2+n3+n4+n5);
			    	_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    } else {
			        _i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
			    }
			} else {
				ln6 = code.substring(0,6);
				$('.valid-postcode').val(ln6);
			}
		} 

		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-hr')) {
		    var hr = _i.val();
			hr = hr.toUpperCase();
		    if(hr.length > 0 && hr.length <=4 ) {
			    $('.valid-hr').val(hr);
				var huisnummer = hr;
				var postcode = $('.valid-postcode').val();
				if( ! jQuery(this).hasClass('no_ajax_check') ) {
					if(postcode != '' && huisnummer != '' && (huisnummer.length > 0 && huisnummer.length <= 4)) {
					    isPostcodeNrVaild(postcode, huisnummer);
					}
				}
				_i.parent().removeClass('field_error');
				_i.parent().addClass('field_valid');
		    } else {
		        _i.parent().addClass('field_error');
				_i.parent().removeClass('field_valid');
		    }
		} 

		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-text')) {
		    var text = _i.val();
			text = cFl(text);
		    var name = _i.attr('name');
			if(text.length > 1 ) {
				_i.parent().removeClass('field_error');
				_i.parent().addClass('field_valid');
				$('input[name="'+name+'"]').val(text);
			} else {
				_i.parent().addClass('field_error');
				_i.parent().removeClass('field_valid');
			}
		}
		
		if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-post')) {
		    var text = _i.val();
		    var name = _i.attr('name');
			var maxLength = _i.attr('maxlength');
			if(text.length == maxLength ) {
				_i.parent().removeClass('field_error');
				_i.parent().addClass('field_valid');
				$('.valid-post').val(text);
			} else {
				_i.parent().addClass('field_error');
				_i.parent().removeClass('field_valid');
			}
		}
	});
	
	$('body').on('change', '.wpcf7 select', function() {
		$('.wpcf7-response-output').hide();
		if($(this).hasClass('wpcf7-validates-as-required')) {
		    $('.select-e-msg').css('display', 'none');
			var _select = $(this);
			var _name = $(this).attr('name');
			if(_select.val() != '') {
			    //gender parent remove field error
			    if($(this).hasClass('get-mf')) {
			        $('.male_female_item').removeClass('field_error');
			    }
			    
			    //radio parent remove field error
			    if($(this).hasClass(_name)) {
			       // console.log(_name);
			        $('.sale_radio_item').removeClass('field_error');
			    }
			    if($(this).hasClass('ex-' + _select.val())) {
			        _select.parent().addClass('field_error');
			        $('.orange_view_button').addClass('pn');
			        $('.select-e-msg').css('display', 'block');
			    } else {
			        _select.parent().removeClass('field_error');
		    	    _select.parent().addClass('field_valid');
		    	    $('.orange_view_button').removeClass('pn');
			    }
			} else {
			    _select.parent().addClass('field_error');
				_select.parent().removeClass('field_valid');
			}
		}
	});
	
	$('body').on('click', '.checkbox_item', function() {
	    var _checkbox = $(this).children().children('input');
	    if( _checkbox.is(':checked')) {
			_checkbox.parent().addClass('field_error');
			$(this).removeClass('make-green');
	        _checkbox.prop('checked', false);
	    } else {
			_checkbox.parent().removeClass('field_error');
			$(this).addClass('make-green');
	       _checkbox.prop('checked', true);
	    }
	});

	$('body').on('click', '#male, #female', function(e) {
	    $('.male_female_item').removeClass('field_error');
	    $('.get-mf').val(e.target.value);
    	$('.get-mf').parent('.tp_step_select').removeClass('field_error');
    	$('.get-mf').parent('.tp_step_select').addClass('field_valid');
	});
	
	$('body').on('click', '.btn-cr', function() {
	    $('.select-e-msg-mb').css('display', 'none');
		checked = $(this).val();
		name = $(this).attr('name');
		var exItem = 'ex-' + name;
		if($(this).hasClass('ex-' + $(this).val())) {
		    $(this).prop('checked', false);
		    $(this).parent('.sale_radio_item').addClass('field_error');
	        $('.orange_view_button').addClass('pn');
	        $('.select-e-msg-mb').css('display', 'block');
		} else {
	        $('.sale_radio_item').removeClass('field_error');
		    $('.orange_view_button').removeClass('pn');
    	    $('.'+name+'>option').each(function(){
    	    	$('.'+name).parent('.tp_step_select').removeClass('field_error');
    	    	$('.'+name).parent('.tp_step_select').addClass('field_valid');
    	    	if($(this).val() == checked) {
    	    		$(this).attr('selected', true);
    	    	}
    	    });
		}
	});

	$('body').on('click', '.btn-cc', function() {
		val = '';
	    $('.checkbox-parent').removeClass('field_error');
	    $('.btn-cc').each(function() {
	    	if($(this).prop('checked')) {
	    		val = val + $(this).val() + ', ';
	    	}
	    });
	    if(val == '') {
	    	$('.checkbox-parent').addClass('field_error');
	    	$('.set-multi-val').val('');
	    } else {
		    setVal = val.slice(0, -1);
		    $('.set-multi-val').val(setVal);
		    $('.set-multi-val').parent('.tp_step_select').removeClass('field_error');
		}
	});
	
	$('body').on('click', '.put-val-input li', function() {
		val = '';
		$('.put-val-input').parents('.tp_step_select').removeClass('field_error');
	    $('.put-val-input li').each(function() {
	    	if($(this).hasClass('selected')) {
	    		val = val + $(this).children().children('.text').text() + ', ';
	    	}
	    });
	    if(val == '') {
	    	$('.put-val-input').parents('.tp_step_select').addClass('field_error');
	    	$('.set-multi-val').val('');
	    } else {
		    setVal = val.slice(0, -1);
		    $('.set-multi-val').val(setVal);
		}
	});

	$("body").on('click', '.btn-step', function() {
		step = parseInt($(this).attr('data-id'));
		step2 = step + 1; _er = []; _inx = 0;
		$('.back_btn').attr('data-step', step);

		//input
		$('.fild-col-step' + step + ' input').each(function() {
			_i = $(this);

			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-postcode')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid') ) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}

			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-hr')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid')) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}
			
			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-post')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid')) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}

			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-text')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid')) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}

			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-email')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid')) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}

			if(_i.hasClass('wpcf7-validates-as-required') && _i.hasClass('valid-phone')) {
				if(_i.val() != '' && _i.parent().hasClass('field_valid')) {
					_i.parent().addClass('field_valid');
					_i.parent().removeClass('field_error');
				} else {
					_i.parent().addClass('field_error');
					_i.parent().removeClass('field_valid');
				}
			}
			_inx++;
		});

		//select
		$('.fild-col-step' + step + ' select').each(function() {
			_s = $(this);

			if(_s.hasClass('wpcf7-validates-as-required') && _s.hasClass('valid-dd')) {
				if(_s.val() != '' && _s.parent().hasClass('field_valid')) {
					_s.parent().addClass('field_valid');
					_s.parent().removeClass('field_error');
				} else {
					_s.parent().addClass('field_error');
					_s.parent().removeClass('field_valid');
				}
			}
			_inx++;
		});

		if($('.fild-col-step' + step + ' #male').length > 0) {
			if($('.fild-col-step' + step + ' #male').prop('checked') || $('.fild-col-step' + step + ' #female').prop('checked')) {
			} else {
	            $('.error').hide(500);
	            $('.male_female_item').addClass('field_error');
	        }
	    }

	    if($('.fild-col-step' + step + ' .btn-cr').length > 0) {
	        if($('.fild-col-step' + step + ' .btn-cr').prop('checked')) {
			} else {
	            $('.error').hide(500);
	            if($('.Aanhef').val() || $('.exclude-item').val()) {} else {
	                $('.sale_radio_item').addClass('field_error');
	            }
	        }
	    }

	    if($('.fild-col-step' + step + ' .btn-cc').length > 0) {
	        if($('.fild-col-step' + step + ' .btn-cc').prop('checked')) {
			} else {
	            $('.error').hide(500);
	            if($('input[name="wil_verduurzamen"]').val()) {} else {
	                $('.checkbox-parent').addClass('field_error');
	            }
	        }
	    }
	    
	    if($('.fild-col-step' + step + ' .checkbox_item input').length > 0) {
	        console.log($('.fild-col-step' + step + ' .checkbox_item input').prop('checked'));
	        if($('.fild-col-step' + step + ' .checkbox_item input').prop('checked')) {
			} else {
	            $('.checkbox_item').children('.wpcf7-list-item').addClass('field_error');
	        }
	    }
	    
	    if($('.fild-col-step' + step + ' .set-multi-val').length > 0) {
	        if($('.fild-col-step' + step + ' .set-multi-val').val() != '') {
			} else {
	            $('.error').hide(500);
	            $('.put-val-input').parents('.tp_step_select').addClass('field_error');
	        }
	    }

		if($('.fild-col-step' + step + ' .field_error').length > 0) {
		} else {
		    $('.step_bcak_btn').css('display', 'block');
			$('.fild-col-step' + step).removeClass('panels_step_active');
			$('.fild-col-step' + step2).addClass('panels_step_active');
			$('.step_col' + step).addClass('step_completed');
			$('.step_col' + step).removeClass('active');
			$('.step_col' + step2).addClass('active');
			jQuery("html, body").stop().animate({ 
				scrollTop: jQuery('#jump-to').offset().top-40
			}, 1500);
		}
    });
    
    //go to back
    $('body').on('click', '.back_btn, .step_completed span', function() {
        var step = $(this).attr('data-step');
        $('.back_btn').attr('data-step', step - 1);
        if(step == 1) {
            $('.step_bcak_btn').css('display', 'none');
        }
        step2 = parseInt(step) + 1;
		step3 = parseInt(step2) + 1;
        $('.fild-col-step' + step).addClass('panels_step_active');
		$('.fild-col-step' + step2).removeClass('panels_step_active');
		$('.fild-col-step' + step3).removeClass('panels_step_active');
		$('.step_col' + step).removeClass('step_completed');
		$('.step_col' + step2).removeClass('step_completed');
		$('.step_col' + step3).removeClass('step_completed');
		$('.step_col' + step).addClass('active');
		$('.step_col' + step2).removeClass('active');
		$('.step_col' + step3).removeClass('active');
		
		if($('#male').prop('checked') || $('#female').prop('checked')) {
		    $('.male_female_item').removeClass('field_error');
		} else {
            $('.error').hide(500);
            $('.male_female_item').addClass('field_error');
        }
    });
})(jQuery);

function isPostcodeNrVaild(postcode, huisnummer) {
    jQuery.ajax({
        type: 'post',
		url: getpostcode.ajaxurl,
		data: {
			action: 		'getpostcode',
			postcode:  	    postcode,
			huisnummer: 	huisnummer
		},
        success: function(response) {
            data = jQuery.parseJSON( response );
            if(data.status == 1) {
                jQuery('.step_tag_info').html('<span><i class="fa ion-checkmark-round"></i> '+data.addr+'</span>');
                jQuery('input[name="woonplaats"]').val(data.stad);
                jQuery('input[name="straat"]').val(data.street);
                jQuery('.valid-hr').parent().removeClass('field_error');
                jQuery('.valid-postcode').parent().removeClass('field_error');
                jQuery('.valid-hr').parent().addClass('field_valid');
                jQuery('.valid-postcode').parent().addClass('field_valid');
            } else {
                jQuery('.step_tag_info').html('<span style="color: red"><i class="fa fa-times"></i> Adres niet gevonden</span>');
                jQuery('.valid-hr').parent().removeClass('field_valid');
                jQuery('.valid-postcode').parent().removeClass('field_valid');
                jQuery('.valid-hr').parent().addClass('field_error');
                jQuery('.valid-postcode').parent().addClass('field_error');
            }
        }
    });
}

async function isPhoneValid(phone, lang, condition) {
    jQuery('.phone-error').hide();
    var res = false;
    await jQuery.ajax({
        type: 'post',
		url: getpostcode.ajaxurl,
		data: {
			action: 'phonevalid',
            phone: phone,
			lang: lang,
			condition: condition,
		},
		beforeSend: function(){
			jQuery('.valid-phone').parent().addClass('phn_ajax_loading');
		    jQuery('.phone-error').css('display', 'none');
		},
        success: function(response) {
            console.log(response);
			phoneErrMsg = jQuery('.phone_err_msg').val();
            jQuery('.phone-error').css('display', 'none');
            if(response.code === 503) {
                res = true;
            } else {
                res = response.is_valid;
            }
            if(response.is_valid === false && response.code !== 503) {
                jQuery('.valid-phone').after('<div class="phone-error"><span>'+phoneErrMsg+'</span></div>').css('display', 'block');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                jQuery('.valid-phone').after('<div class="phone-error"><span>'+phoneErrMsg+'</span></div>').css('display', 'block');
        },
		complete: function() {
			jQuery('.valid-phone').parent().removeClass('phn_ajax_loading');
		}
    });
    return res;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 43 || charCode > 57))
        return false;
    return true;
}

function cFl(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}