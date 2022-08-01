(function($){
	jQuery('#menu').slicknav({
		label: '',
		openedSymbol:"",
		closedSymbol:"",
		prependTo:'#menu_holder'
	});
	if($('.text-animation').length > 0) {
    	var i = 0;
        var txt = $('.text-animation').attr('data-text');
        var speed = 70;
        var llength = txt.length;
        window.onload = function typeWriter() {
            if (i < llength) {
                txt += $('.text-animation').append(txt.charAt(i));
                i++;
                setTimeout(typeWriter, speed);
            }
        }
	}
})(jQuery);
jQuery(function() {
	new WOW().init();
});
jQuery(".menu_bar").click(function() { 
	jQuery('.mobile_menu').addClass('mobile_menu_open'); 
	jQuery('.mobile_menu').slideDown('slow'); 
});
jQuery(".menu_close").click(function() { 
	jQuery('.mobile_menu').removeClass('mobile_menu_open'); 
	jQuery('.mobile_menu').slideUp('slow'); 
});

jQuery('.testimonials_carousel').owlCarousel({
	loop:false,
	nav:false,
	margin:0,
	items:4,
	dots:false,
	responsiveClass:true,
	responsive:{
        0:{
            items:1,
			dots:true,
			nav:true,
        },
		768:{
            items:2,
			nav:true,
        },
		991:{
            items:3,
			nav:true,
        },
        1201:{
            items:4,
        }
    }
})

jQuery('.client_logo_carousel').owlCarousel({
	loop:false,
	nav:false,
	margin:70,
	items:5,
	dots:false,
	responsiveClass:true,
	responsive:{
        0:{
            items:2,
			dots:true,
        },
		768:{
            items:3,
        },
		991:{
            items:5,
        }
    }
})			

jQuery( ".toggle_view_item h4" ).click(function(e) {
	if(jQuery(this).hasClass('active')) {
	} else {
		jQuery( ".toggle_view_item h4" ).each(function() {
			if(jQuery(this).hasClass('active')) {
				jQuery(this).toggleClass('active');
				jQuery(this).next('.show_details').slideToggle('hide');
			}
		});
	}
	jQuery(this).toggleClass('active');
	jQuery(this).next('.show_details').slideToggle('slow');
	e.preventDefault();
});