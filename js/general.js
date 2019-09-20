/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
;(function($, window, document, undefined) {
	//Genaral Global variables
	//"use strict";
	var $win = $(window);
	var $doc = $(document);
	var $winW = function(){ return $(window).width(); };
	var $winH = function(){ return $(window).height(); };
	var $screensize = function(element){  
			$(element).width($winW()).height($winH());
		};
		
		var screencheck = function(mediasize){
			if (typeof window.matchMedia !== "undefined"){
				var screensize = window.matchMedia("(max-width:"+ mediasize+"px)");
				if( screensize.matches ) {
					return true;
				}else {
					return false;
				}
			} else { // for IE9 and lower browser
				if( $winW() <=  mediasize ) {
					return true;
				}else {
					return false;
				}
			}
		};

		$doc.ready(function() {
		/*--------------------------------------------------------------------------------------------------------------------------------------*/		
		// Remove No-js Class
		$("html").removeClass('no-js').addClass('js');
		
		
		
		/* Get Screen size
		---------------------------------------------------------------------*/
		$win.load(function(){
			$win.on('resize', function(){
				$screensize('your selector');	
			}).resize();	
		});
		
		
		/* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
		$(window).on('resize', function(){
			if (screencheck(767)) {
				if(!$('#menu').length){
					$('#mainmenu').prepend('<a href="#" id="menu" class="menulines-button"><span class="menulines"></span></a>');
				}
			} else {
				$("#menu").remove();
			}
		}).resize();

		
		/* Tab Content box 
		---------------------------------------------------------------------*/
		var tabBlockElement = $('.tab-data');
			$(tabBlockElement).each(function() {
				var $this = $(this),
					tabTrigger = $this.find(".tabnav li"),
					tabContent = $this.find(".tabcontent");
					var textval = [];
					tabTrigger.each(function() {
						textval.push( $(this).text() );
					});	
				$this.find(tabTrigger).first().addClass("active");
				$this.find(tabContent).first().show();

				
				$(tabTrigger).on('click',function () {
					$(tabTrigger).removeClass("active");
					$(this).addClass("active");
					$(tabContent).hide().removeClass('visible');
					var activeTab = $(this).find("a").attr("data-rel");
					$this.find('#' + activeTab).fadeIn('normal').addClass('visible');
								
					return false;
				});
			
				var responsivetabActive =  function(){
				if (screencheck(767)){
					if( !$('.tabMobiletrigger').length ){
						$(tabContent).each(function(index) {
							$(this).before("<h2 class='tabMobiletrigger'>"+textval[index]+"</h2>");	
							$this.find('.tabMobiletrigger:first').addClass("rotate");
						});
						$('.tabMobiletrigger').click('click', function(){
							var tabAcoordianData = $(this).next('.tabcontent');
							if($(tabAcoordianData).is(':visible') ){
								$(this).removeClass('rotate');
								$(tabAcoordianData).slideUp('normal');
								//return false;
							} else {
								$this.find('.tabMobiletrigger').removeClass('rotate');
								$(tabContent).slideUp('normal');
								$(this).addClass('rotate');
								$(tabAcoordianData).not(':animated').slideToggle('normal');
							}
							return false;
						});
					}
						
				} else {
					if( $('.tabMobiletrigger').length ){
						$('.tabMobiletrigger').remove();
						tabTrigger.removeClass("active");
						$this.find(tabTrigger).removeClass("active").first().addClass('active');
						$this.find(tabContent).hide().first().show();				
					}		
				}
			};
			$(window).on('resize', function(){
				if(!$this.hasClass('only-tab')){
					responsivetabActive();
				}
			}).resize();
		});
		$('.body').lockscroll(true,'horizontal');
		

		/* Accordion box JS
		---------------------------------------------------------------------*/
		$('.accordion-databox').each(function() {
			var $accordion = $(this),
				$accordionTrigger = $accordion.find('.accordion-trigger'),
				$accordionDatabox = $accordion.find('.accordion-data');
				
				$accordionTrigger.first().addClass('open');
				$accordionDatabox.first().show();
				
				$accordionTrigger.on('click',function (e) {
					var $this = $(this);
					var $accordionData = $this.next('.accordion-data');
					if( $accordionData.is($accordionDatabox) &&  $accordionData.is(':visible') ){
						$this.removeClass('open');
						$accordionData.slideUp(400);
						e.preventDefault();
					} else {
						$accordionTrigger.removeClass('open');
						$this.addClass('open');
						$accordionDatabox.slideUp(400);
						$accordionData.slideDown(400);
					}
				});
		});

		/*Searchbar click
		---------------------------------------------------------------------*/
		$(document).on('click',".searchbtn", function(){
			$(this).parents(".searchbar").find(".searchblock").toggleClass('searchblockshow');
			return false;
		});
		$(document).on('click touchstart', function(e){
	      if( $(e.target).parent('.searchbar').length === 0 ) {
	        $('.searchbar .searchblockshow').removeClass('searchblockshow');
	      }
	    });
		
		
		/*MatchHeight Js
		-------------------------------------------------------------------------*/
		if($('.servicesinn .cols .col').length){
			$('.servicesinn .cols .col').matchHeight();
		}
		
		/*Mobile menu click
		---------------------------------------------------------------------*/
		$(document).on('click',"#menu", function(){
			$(this).toggleClass('menuopen');
			$(this).next('ul').slideToggle('normal');
			return false;
		});
		
		$("#mainmenu  > ul > li > ul").parent('li').addClass('hasnav');
        $("#mainmenu > ul > li.hasnav").prepend('<span class="navtrigger">+</span>');
        $("#mainmenu li").hover( function(){
            if (!screencheck(1023))
            {
                $(this).addClass('current');
                $(this).find('ul').not(':animated').fadeIn('normal');    
            }
        }, function(){
                if (!screencheck(1023))
                {
                    $(this).removeClass('current');    
                    $(this).find('ul').fadeOut('fast');
                }
        });
		$(".navtrigger").on('click',function () {
            if (screencheck(1023))
            {
                if($(this).parents("li.hasnav").find("ul").is(':hidden')){
                    $(this).addClass('open');
                    
                    $(this).parents("li.hasnav").find("ul").slideDown('normal');
                } else {
                    $(this).removeClass('open');
                    $(this).parents("li.hasnav").find("ul").slideUp('normal');
                }
                return false;
            }
		});
		/*Convert Img to BG
		---------------------------------------------------------------------*/
			if($('.bgimg img')){
				$('.bgimg img').each(function() {
					var imgSrc = $(this).attr('src');
					$(this).parents('.bgimg').css('background-image', 'url('+imgSrc+')');
				});
			}
		/*--------------------------------------------------------------------------------------------------------------------------------------*/	
		
		/* Main Navigation Sticky
         *---------------------------------------------------------------------------------------------------------*/
			var intialtop = $(document).scrollTop();
			var headerheight = $("#header").outerHeight();
			$(window).scroll(function() {
				var afterscrolltop = $(document).scrollTop();
				if( afterscrolltop > headerheight ) {
					$("#header").addClass("navhide");
				} else {
					$("#header").removeClass("navhide");
				}
				if( afterscrolltop > intialtop ) {
					$("#header").removeClass("navshow");
				} else {
					$("#header")
				}
				intialtop = $(document).scrollTop();
			});	+
			

		/* Banner Message JS
         *---------------------------------------------------------------------------------------------------------*/
		$('.banner-bottom .close-btn').click(function(){
			$(this).parents('.banner-bottom').fadeOut('normal');
			$(this).parents('.bannerinner').addClass("msgremove");
			return false;
		})
		
		$('.innerform-block .form-group label').each(function() {
			var paddingWidth = $(this).width();
			$(this).next('input').css('padding-left', paddingWidth + 28 + 'px');
		})

		$('.field-box .custom-select label').each(function() {
			var paddingWidth = $(this).width();
			$(this).next('select').css('padding-left', paddingWidth + 28 + 'px');
		})

		/*Date picker
		---------------------------------------------------------------------*/
		// $( "#datepicker" ).datepicker({ dateFormat: 'dd / mm / yy' }); 		
		/*Custom file input
		---------------------------------------------------------------------*/
		$('.customfileinput').customFileinput({
			buttontext : 'Browse',
			customboxwidth : 234
	  });
	});	

	/* Portfolio slider
	*------------------------------------------*/

	///***** START SLICK WITH PROGRESSBAR****///
	  // Slick Slide Counters
	  var $mainslider = $('.portfolioslider')
			$mainslider.on('init', function(event, slick) {
				$('.sliderprogressbar').append('<div class="slick-counter"><span class="current"></span><div class="slider-progress"><div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"><span class="slider__label sr-only"></div></div><span class="total"></span></div>');
				$('.current').text(slick.currentSlide + "1");
				if(slick.slideCount <= 9){
					$('.total').text("0".concat(slick.slideCount));
				} else {
					$('.total').text(slick.slideCount);
				}
			  })
		  $mainslider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		  		if(nextSlide <= 8){
		  			$('.current').text("0".concat(nextSlide + 1));
		  		} else {
					$('.current').text(nextSlide + 1);
		  		}
		  });
		  // Slick Slider Options
		  $mainslider.slick({
	  		slidesToShow: 3,
			draggable: true,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			infinite: true,
			speed: 700,
			pauseOnHover: true,
			responsive: [{
			    breakpoint: 767,
			    settings: {
			      slidesToShow: 2,
			      slidesToScroll: 1,
			      centerMode: false,
			    }
			  },
				  {
			      breakpoint: 567,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
		    ]
		  });

		   var $mainslidertow = $('.portfolioslider');
			  var $progressBar = $('.progress');
			  var $progressBarLabel = $( '.slider__label' );
			  
			  $mainslidertow.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
			    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
			    
			    $progressBar
			      .css('background-size', calc + '% 100%')
			      .attr('aria-valuenow', calc );
			    
			    $progressBarLabel.text( calc + '% completed' );
			});
	///***** END SLICK WITH PROGRESSBAR****///
	/* Banner Swiper slider
	*------------------------------------------*/

	    var swiper = new Swiper('.swiper-container', {
	    	slidesPerView: 1,
		      spaceBetween: 30,
		      speed: 600,
		      mousewheel: true,
		      parallax: true,
		      keyboard: {
		        enabled: true,
		    },
		  pagination: {
		    el: '.swiper-pagination',
		  },
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			},
		});


/*All function need to define here for use strict mode
----------------------------------------------------------------------------------------------------------------------------------------*/

	
/*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);