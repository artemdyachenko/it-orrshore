$(document).ready(function() {

	var $vent = $({});


	// TOP FORM ANIMATE
	$('.top-menu-form-find').bind('click', function(event) {
		if ($('.top-menu-form-find').hasClass('disabled')) {
			event.preventDefault();
			$(this).removeClass('disabled');
			$('.top-menu-form-field').animate({
				opacity: 1,
				width: 160},
				100, function() {
				$(this).focus();
			});
		}
	});

	// PAGE INFORMATION ANCHOR ANIMATE
	$('.question-link').bind("click", function(e){
      	var anchor = $(this);
      	var showBlock = $(anchor.attr('href'));
      	$('.answer').css('display', 'none');
      	showBlock.css('display', 'block');
      	showBlock.nextAll().slice(0, 1).css('display', 'block');
      	showBlock.nextAll().slice(0, 2).css('display', 'block');
      	$('html, body').stop().animate({
         	scrollTop: $(anchor.attr('href')).offset().top - 250
      	}, 1000);
      	e.preventDefault();
	});

	// OFFSORE TEXT SLIDER
	var $slick = $('.offshore-info-text-links'),
		$slickItems = $('[data-open-block]', $slick);

	$slick.slick({
		infinite: true,
		slidesToShow: 7,
		slidesToScroll: 1,
		responsive: [
		{
	      breakpoint: 920,
	      settings: {
	        slidesToShow: 6
	      }
	    },
	    {
	      breakpoint: 800,
	      settings: {
	        slidesToShow: 4
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2
	      }
	    },
	    {
	      breakpoint: 360,
	      settings: {
	        slidesToShow: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});

	$vent.on('setSliderBlock', function(e, blockId){
		var index = 0,
			$slickItem = $('.slick-slide:not(.slick-cloned)', $slick)
				.find('[data-open-block="' + blockId + '"]');

		$.each($slickItems, function(i){
			if (this.getAttribute('data-open-block') === blockId) {
				index = i;
				return false;
			}
 		});
		$slick.slick('slickGoTo', index);
		$slickItem.trigger('click');
	});



	// OFFSORE TEXT ROTATE
	var openBlockLink = $('.offshore-text-show');
	openBlockLink.on('click', function(event) {
		event.preventDefault();
		openBlockLink.removeClass('active');
		$(this).addClass('active');
		$('.offshore-info-text-box').removeClass('active');
		var currentBlockId = $(this).attr('data-open-block');
		var currentBlock = $('#'+currentBlockId);
		currentBlock.addClass('active');

	});

	// FORM STYLER
	$('input, select').styler();
	$('.banks-switcher').styler('destroy');
	var switcherEl = $('.banks-switcher').switcher();

	// BANKS TABLE SWIRCHER
	$(document).on('click', '.switcher', function(event) {
		event.preventDefault();
		$('.banks-container-tables').find('.banks-table').toggleClass('active');
	});
	$(document).on('click', '#banks-presence-checkbox-styler', function(event) {
		event.preventDefault();
		if ($(this).hasClass('checked')) {
			$('.no-presence').hide('fast');
		} else {
			$('.no-presence').show('fast');
		}
	});

	// ANIMATE BLOCKS
	$('.animate-left').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInLeft',
		offset: 100
	});
	$('.animate-right').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInRight',
		offset: 100
	});
	$('.prices-item').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInUp',
		offset: 100
	});
	$('.banks-item').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInRight',
		offset: 100
	});
	$('.reviews-item').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated slideInUp',
		offset: 100
	});





//	mover to element plugin
	$.moveToElement = function (e, id, position) {
		e && e.preventDefault();
		var $el, $link;

		if (typeof position === 'undefined') {
			if (typeof id === 'undefined') {
				$link = $(e.currentTarget);
				id = $link.attr('href').split('#')[1];
			}
			$el = $('#' + id + ', [name="' + id + '"]');
			if ($el.length) {
				position = $el.offset().top;
			}
		}
		$('html, body').animate({scrollTop:(position || 0) + 'px'}, 500);
	};




	// offshore map
	var $ofMap = $('#offshore-map'),
		$range = $("#range-slider"),
		$links = $('.offshores_map_marker', $ofMap),
		$windows = $('.window', '#offshore-windows'),
		params = $range.data('values'),
		filterItems = function(from, to){
			$.each($links, function(i, item){
				var cost = parseInt(item.getAttribute('data-cost'));
				if (cost >= from && cost <= to) {
					item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
			});
		},
		$openedWindow;

	$range.ionRangeSlider({
	    type: "double",
	    grid: true,
		grid_num: 10,
	    keyboard: true,
		onChange: function (data) {
			filterItems(data.from, data.to);
			closeWindow();
			$links.removeClass('active');
		}
	});


	$ofMap
		.on('click', function(e){
			closeWindow();
			$links.removeClass('active');
		})
		.on('mouseover', '.offshores_map_marker', clickMapMarker);//mouseover

	$windows
		.on('click', function(e){ e.stopPropagation(); })
		.on('click', '[data-open-block]', showBlockArticle);

	function clickMapMarker(e) {
		var $link = $(e.currentTarget);
			id = $link.attr('href');

		$links.removeClass('active');
		$link.addClass('active');
		showWindow(id.replace('#!', ''));
		return false;
	}
	function showBlockArticle(e) {
		var $link = $(e.currentTarget),
//				href = $link.attr('href'),
				blockId = $link.attr('data-open-block');
			$vent.trigger('setSliderBlock', blockId);
			$.moveToElement(e);
			return false;
	}
	function closeWindow() {
		if ($openedWindow) {
			$openedWindow.css('display', 'none');
			$openedWindow = undefined;
		}
	}
	function showWindow (id) {
		var $newWindow = $('.window[data-place="' + id + '"]');
		if (!$openedWindow || $openedWindow[0] !== $newWindow[0]) {
			closeWindow();
			$openedWindow = $newWindow;
			$openedWindow.fadeIn('300');
		}
	}

	// sticky header
	if ($(window).innerWidth() > 620) {
		$(document).scroll(function(event) {
			if ( $(this).scrollTop() >53 ) {
				$('.header').css({
					position: 'fixed',
					top: '0',
					width: '100%',
					background: 'rgba(10, 10, 12, 0.9)'
				});
			} else {
				$('.header').css({
					position: 'relative',
					background: 'rgba(10, 10, 12, 1)'
				});
			}
		});
	};

	// arrow to top
	$(document).scroll(function(event) {
		if ( $(this).scrollTop() >1000 ) {
			$('.link-to-up').fadeIn('fast');
		} else {
			$('.link-to-up').fadeOut('fast');
		}
	});

	$(document).on('click', '.link-to-up', function(event) {
		event.preventDefault();
		$('html, body').stop().animate({
         	scrollTop: 0
      	}, 700);
	});

	$('.promo-slider ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: false,
        responsive: true,
        scroll: {
            fx: 'crossfade', duration: 800,
            items: 1,
            onBefore    : function() {
                $('.video-bg video').get(0).play();
            }
        },
        items: {
            height: 'variable',
            visible: 1
        },
        prev: {
            button: '.promo-slider .arr-l'
        },
        next: {
            button: '.promo-slider .arr-r'
        },
        pagination: '.promo-slider .nav',
        onCreate: function(){
            $('#video1').get(0).play();
        }

    });

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) || userAgent.match( /Android/i )  || userAgent.match( /IEMobile/i )   || userAgent.match( /BlackBerry/i ) ) {
        $('.video-bg video').remove();
        $('.item1').removeClass('video-bg');
    };

	$('#phone').keypress(function(key) {
		if(key.charCode < 48 || key.charCode > 57) return false;
	});

 	/* $('#name').keypress(function(key) {
		if((key.charCode < 97 || key.charCode > 122) && (key.charCode < 65 || key.charCode > 90) && (key.charCode != 45)) return false;
	}); */

	//offshores_map_marker
	$('.offshores_map_marker').click(function(){
	  //return false
	});

	if ($(window).innerWidth() < 620) {
		$('.company-address').appendTo('.footer-map');
	};

});










   function AjaxFormRequest(result_id,form_id,url) {
                jQuery.ajax({
                    url:     url, //Адрес подгружаемой страницы
                    type:     "POST", //Тип запроса
                    dataType: "html", //Тип данных
                    data: jQuery("#"+form_id).serialize(),
                    success: function(response) { //Если все нормально
                    document.getElementById(result_id).innerHTML = response;
                },
                error: function(response) { //Если ошибка
                document.getElementById(result_id).innerHTML = "Ошибка при отправке формы";
                }
             });
        }
    function showContent(link) {

        var cont = document.getElementById('contentBody');
        var loading = document.getElementById('loading');

        cont.innerHTML = loading.innerHTML;

        var http = createRequestObject();
        if( http )
        {
            http.open('get', link);
            http.onreadystatechange = function ()
            {
                if(http.readyState == 4)
                {
                    cont.innerHTML = http.responseText;
					$('#contentBody .txt').jScrollPane({mouseWheelSpeed: 1});
                }
            }
            http.send(null);
        }
        else
        {
            document.location = link;
        }
    }
    function showContentabout(link,idcontent,load) {

        var cont = document.getElementById(idcontent);
        var loading = document.getElementById(load);

        cont.innerHTML = loading.innerHTML;

        var http = createRequestObject();
        if( http )
        {
            http.open('get', link);
            http.onreadystatechange = function ()
            {
                if(http.readyState == 4)
                {
                    cont.innerHTML = http.responseText;
					$('#victories .list').jScrollPane({mouseWheelSpeed: 1});
					$('#statistics .list').jScrollPane({mouseWheelSpeed: 1});
					$('#about .txt').jScrollPane({mouseWheelSpeed: 15});
						if($("#newscript").length) {
						$("#newscript").remove();
					}
					sc=document.createElement("SCRIPT");
					sc.id="newscript";
					document.body.appendChild(sc);

					$('#newscript').html($('script',http.responseText).html());
                }
            }
            http.send(null);
        }
        else
        {
            document.location = link;
        }
    }
    // создание ajax объекта
    function createRequestObject()
    {
        try { return new XMLHttpRequest() }
        catch(e)
        {
            try { return new ActiveXObject('Msxml2.XMLHTTP') }
            catch(e)
            {
                try { return new ActiveXObject('Microsoft.XMLHTTP') }
                catch(e) { return null; }
            }
        }
    }
