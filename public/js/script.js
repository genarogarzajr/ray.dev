jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

jQuery(function ($) {
    'use strict';
	
    resizeHome();
	
	PreLoadImg(); 
	
	// scroll to
	$('body').find('.btn').bind('click', 'touchstart', function (event) {
	    event.preventDefault();
	    var to = $($(this).attr('href')).offset().top - 70;
	    $('body, html').stop().scrollTo(to, 500, { easing: 'easeInOutQuint' });
	});

    //control posició scroll
	function scroll(posscroll) {
	    var ap, height = $(window).height(),
            minzonacentro = posscroll,
            maxzonacentro = height + posscroll;
	    if (posscroll > 50) { $('#menuf').addClass('f') } else { $('#menuf').removeClass('f') };
	    $('#menur').addClass('ocult');
	    //$('#background').css('background-position-y', -(posscroll * 0.1) + 'px');

	    $('.ap').each(function () {
            var posicio_h2 = (parseInt($(this).offset().top + $(this).height() / 4));
            if (posicio_h2 > minzonacentro && posicio_h2 < maxzonacentro) {
	            ap = $(this).attr('id');
	            console.log('activar: ' + ap);
	            $('#menuf .current').removeClass('current');
	            $('#menuf .btn[href$="' + ap + '"]').addClass('current');
	            $('#'+ ap + ' .wellcome').addClass('dawn')
				switch (ap) {
	                case 'servicios': $('#menuf .btn[href$="intro"]').addClass('current'); break;
	                case 'extras': $('#menuf .btn[href$="soluciones"]').addClass('current'); break;
	            }
	        }

	    });
	}
	
	
	function PreLoadImg(){
		$('*[data-iurl]').each(function(){
			var a=$(this);
			if(($.browser.webkit?$('body').scrollTop():$('html').scrollTop())>=(a.offset().top-$(window).height()-300)){
				a.is("img")?a.attr("src",a.attr("data-iurl")):a.css("background-image","url("+a.attr("data-iurl")+")")
				a.hide();
				a.fadeIn("slow");
				a.removeAttr("data-iurl");
			}
		});
	}

	function parallax(parallaxpos) {
		if(!Modernizr.touch){
			$('#badge h1').css({
		        'margin-top': (parallaxpos/4) + "px",
		        'opacity': 1 - (parallaxpos/300)
		    });
		    $('#badge h2').css({
		        'margin-top': (parallaxpos/3) + 10 + "px",
		        'opacity': 1 - (parallaxpos/300)
		    });
			$('#c1').css({
		        'opacity': 1 - (parallaxpos/250)
		    });
			$('#logo-mini').css({
		        'opacity': 1 - (parallaxpos/30)
		    });
		};
	}
	
	$(window).scroll(function () {
		PreLoadImg(); 
	    parallax($(window).scrollTop());
	    scroll($(window).scrollTop());
	});

	/*$('body').bind('touchmove', function (e) {
		var t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	    (t.pageY % 25 == 0) && scroll(t.pageY)
	});*/

    //change tipos
	$('.tipo').bind('click', function () {
	    var tipo = $(this).data('tipo');
	    var image = $('#visor img.' + tipo);
	    $('#visor img.a').removeClass('a enter');
	        image.addClass('a enter');
	    //});
	    $('.tipo .active').removeClass('active');
	    $(this).children('h3').toggleClass('active');
	});
	
	$('.burguer').bind('click touch', function(){
	    $('#menur').toggleClass('ocult');
	});
	
	// Reload on resize
	$(window).bind('resize', function () {
		resizeHome();
	});
    
	$('.enter, .dawn').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	    $(this).removeClass('delay1 delay2 delay3 delay4 delay5 delay6 delay7 delay8 enter dawn');
    });
		
	$('input[type=text], textarea').click( function(){ $(this).focus(); });
	
	//video controls
	$('.play').click(function() { 
		if ($('#video').hasClass('paused')) {
			$('#video').removeClass('paused');
			$('#video').get(0).play();
			$('#video').addClass('playing');
			$('.controls .play').addClass('pause'); 
		} else { 
			$('#video').removeClass('playing');
			$('#video')[0].pause(); 
			$('#video').addClass('paused'); 
			$('.controls .play').removeClass('pause'); 
		}
		$('.controls').css('margin-top',31);
	});
	
	$('.mute').click(function() { 
		if ($('#video').hasClass('sound')) {
			$('#video').removeClass('sound');
			$('#video').prop('muted', true);
			$('#video').addClass('muted');
			$(this).addClass('sound'); 
		} else { 
			$('video').removeClass('muted');
			$('#video').prop('muted', false);
			$('video').addClass('sound'); 
			$(this).removeClass('sound'); 
		}
	});
	
	$('.fullscreen').click(function() { 
		var elem = document.getElementById('video');
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
		  elem.webkitRequestFullscreen();
		}
	});
	
	
	// ON LOAD
	$(window).load(function () {
	    show();
	});
	
	
    /*ROTATE WORDS
	var words = ['negocio', 'trabajo', 'sitio', 'tienda', 'galería', 'portfolio', 'blog'],
	i = 0,
	o = $('#home p span');
	setInterval(function () {
	    i++;
	    o.fadeOut(500, function () {
	        $(this).text(words[(i)]);
	    }).fadeIn(500);
	    if (i % 5 === 0) {
	        i = 0;
	    }
	}, 1500);*/
	
	/* Placeholders for IE */
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
			  input.val('');
			}
		  })
		});
	}
	
	if ($('html').hasClass('no-cssanimations')) { 
		$('.wellcome, .dawn').css({'opacity':'1'});
	};

    // lean Modal
	$('a[data-rel*=modal]').click(function () {
	    var demo = $(this).data('demo');
	    $('#demoviewer img').attr('src', 'i/demos/s' + demo + '.jpg');
	});

	$('a[data-rel*=modal]').leanModal({ top : 50, overlay : 0.8, closeButton: '.modal_close' });
	
	/* Ajax Form */
	var options = { target: '#alert' }; 
	$('#contactForm').ajaxForm(options); 
	$.fn.clearForm = function() {
	  return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
		  return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea')
		  this.value = '';
		else if (type == 'checkbox' || type == 'radio')
		  this.checked = false;
		else if (tag == 'select')
		  this.selectedIndex = -1;
	  });
	};
});

function show() {
    $('.loading').fadeOut('fast');

    /*random background*/
    $.fn.smartBackgroundImage = function(url){
	    var t = this;
	    $('<img />')
          .attr('src', url)
          .load(function(){ 
              t.each(function(){ 
                  $(this)
                      .css('backgroundImage', 'url(' + url + ')')
                      .animate({ 'opacity': '1' }, 1000);
              });
          });
	    return this;
	}
    var images = ['1.gif','2.gif','3.gif','4.gif','9.gif','10.gif'];
    $('#background').smartBackgroundImage('i/cinema' + images[Math.floor(Math.random() * images.length)]);
};
function resizeHome() {
    $('#home, #hello').css({ 'height': $(window).height() });
    $('.bottom-btns').css({ 'top': $(window).height() - 150, 'display': 'block' });
    //$('#hello img').css({ 'margin': '-' + $('#hello img').height() / 2 + 'px 0 0 -' + $('#hello img').width() / 2 + 'px' });
    $('#badge').css({ 'margin-left': '-' + $('#badge').width() / 2 + 'px' });
    //$('#video').css({ 'width': $(window).width() });
    
    /*resize video
	var sxsw={full_bleed:function(e,t,n,r){var i=n;var s=r;var o=s/i;n=e;r=e*o;if(r<t){r=t;n=r/o}	return{width:n,height:r}}};jQuery(document).ready(function(e){function t(){var t=Math.round(e(window).height());var n=Math.round(e(window).width());var r=e(".fill");r.each(function(){var r=e(this).height();var i=e(this).width();var s=sxsw.full_bleed(n,t,i,r);e(this).width(s.width).height(s.height).css("margin-left",(n-s.width)/2).css("margin-top",(t-s.height)/2)})}t();e(window).resize(function(){t()})})*/
};

Share = {
    facebook: function (purl, ptitle, pimg, text) {
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(ptitle);
        url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(purl);
        url += '&p[images][0]=' + encodeURIComponent(pimg);
        Share.popup(url);
    },
    twitter: function (purl, ptitle) {
        url = 'http://twitter.com/share?';
        url += 'text=' + encodeURIComponent(ptitle);
        url += '&url=' + encodeURIComponent(purl);
        url += '&counturl=' + encodeURIComponent(purl);
        Share.popup(url);
    },
    popup: function (url) {
        window.open(url, '', 'toolbar=0,status=0,width=626, height=436');
    }
};