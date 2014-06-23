(function (jQuery) {
	'use strict';

	jQuery(function ($) {

		$(function () {
			$('#main-slider.carousel').carousel({
				interval: 10000,
				pause: false
			});
		});

		//smooth scroll
		$('.navbar-nav > li').click(function (event) {
			event.preventDefault();
			var target = $(this).find('>a').prop('hash');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 500);
		});

		//scrollspy
		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh')
		})

		//Isotope
		$(window).load(function () {
			var $portfolio = $('.portfolio-items'),
				$portfolio_selectors = $('.portfolio-filter >li>a');
			$portfolio.isotope({
				itemSelector: 'li',
				layoutMode: 'fitRows'
			});
			$portfolio_selectors.on('click', function () {
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		});
	});

}).call(this, this.jQuery);