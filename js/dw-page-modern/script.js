var onanimate = false;

jQuery(function($){
	// var screenHeight = $(document).outerHeight();
	// var navHeight = $('#nav').outerHeight();
	// var colophonHeight = $('#colophon').outerHeight();
	// var mainHeight = screenHeight - navHeight - colophonHeight;
	// $('#main').css({
	// 	'min-height': mainHeight
	// });

	// Scroll to top button
	var scrollTimeout;

	var lang = $('html').attr('lang');
	
	$('a.scroll-top').click(function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
	});

	$(window).scroll(function(){
		clearTimeout(scrollTimeout);
		if($(window).scrollTop()>400){
			scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()},100);
		}
		else{
			scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()},100);	
	}
	});
	
	//Initial ScrollSpy, Carousel, Images grayscale
	$('.nav-collapse').scrollspy();
	$('.carousel').carousel({interval:false});
	
	// Scroll to section onclick to menu
	
	$('#nav .nav a').click(function(e){
		e.preventDefault();
		var des = $(this).attr('href');
		goToSectionID(des);
	})

	//Fix dropdown bootstrap
	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
				.on('touchstart.dropdown', '.dropdown-submenu', function (e) {e.preventDefault();});
	if( 'ontouchstart' in document.documentElement ) {
		var clickable = null;
		$('#access .menu-item').each(function(){
			var $this = $(this);

			if( $this.find('ul.sub-menu').length > 0 ) {

				$this.find('a:first').unbind('click').bind('touchstart',function(event){
					if( clickable != this ) {
						clickable = this;
						event.preventDefault();
					} else {
						clickable = null;
					}
				});
			}
		});
	}


	//Trigger change url on scroll
	$('.nav-collapse').on('activate',function(e){
		if(onanimate) return;
		
		if(history.pushState) {
		    history.pushState(null, null, $('.nav-collapse .active a').attr('href'));
		}
		else {
			//var currenttop = $(window).scrollTop();
		  //  location.hash = $('.nav-collapse .active a').attr('href');
		  //$(window).scrollTop(currenttop);
		}
		
	})

	// Carousel Slider spy
	$('.carousel').on('slid',function(e){
		var t = $(this),
			item = t.find('.carousel-inner .active'),
			idx =	t.find('.carousel-inner .item').index(item);
		t.find('.carousel-nav > ul li').removeClass('active')
		t.find('.carousel-nav > ul li:eq('+idx+')').addClass('active')
	})

	// Generate slider pagination 
	
	$('.carousel').each(function(){
		var t = $(this);
		t.find('.carousel-nav > ul li').live('click',function(e){
			e.preventDefault();
			var idx = t.find('.carousel-nav > ul li').index($(this));
			t.carousel(idx);
		});
	}) 

	$('.carousel').each(function(){
		var t = $(this),
			nav = t.find('.carousel-nav > ul');
		t.find('.carousel-inner .item').each(function(i,j){
			var clss = (i==0)?'active':'';
			nav.append('<li class="img-circle '+clss+'"><a class="img-circle" href="#'+i+'"><span></span></a></li> ');
		});
	});

	$('.arrow-down, .next-section').on('click',function(event){
		event.preventDefault();
		var des = '#'+$(this).closest('.section').next().attr('id');
		goToSectionID(des);
	});

	$('.gotosection').on('click',function(event){
		var des = $(this).attr('href');
		goToSectionID(des);
	}); 

	$('.team .personal').hover(
		function(){
			$(this).find('.img_wrapper .img_grayscale').stop().animate({opacity:1},200);

		},function(){
			$(this).find('.img_wrapper .img_grayscale').stop().animate({opacity:0},200);
		}
	);

	// tumblr
	function setupTumblr (results) {

		var posts = results.posts;
		var html = '';

		for (var i = 0; i < posts.length; i++) {
			var post = posts[i];
			if (post.type !== 'regular') {
				continue;
			}
			
			// format date
			var date = new Date(post['unix-timestamp'] * 1000);
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var year = date.getFullYear();

			// format text
			var body = post['regular-body'];
			// trim html tags
			var div = document.createElement("div");
			div.innerHTML = body;
			var text = div.textContent || div.innerText || "";
			// keep only beginning of text
			var nbChars = (lang === 'ja') ? 200 : 400;
			text = text.substring(0, nbChars);
			text += '...';

			var msInMonth = 1000 * 60 * 60 * 24 * 30;

			html += '<div class="post">';
			html += '<div class="post-header">';
			html += '<div class="post-date"><div class="post-year">' + year + '</div><div class="post-day">' + month + '.' + day + '</div></div>';
			if (Date.now() - date < msInMonth) {
				html += '<div class="post-new"></div>';
			}
			html += '</div>';
			html += '<div class="post-title"><a target="blank" href="' + post.url + '">' + post['regular-title'] + '</a></div>';
			html += '<div class="post-body">' + text + '<a class="more-link" target="blank" href="' + post.url + '">More</a></div>';
			html += '</div>';
		}

		$('#tumblr-posts')
			.html(html)
			.slick({
			arrows: false,
			dots: true,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 979,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 599,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	}

	
	var tumblrId = (lang === 'ja') ? 'wizcorpnews' : 'wizcorp';

	$.ajax({
		type: 'GET',
		url: 'http://' + tumblrId + '.tumblr.com/api/read/json',
		dataType: 'jsonp',
		success: function(data){
			setupTumblr(data);
		}
	});

	// photos

	var albumsLoaded = 0;
	
	function setupPhotos (data, options) {
		var options = options || {};
		var photos = data.photoset.photo;
		var html = '';
		var i = 0;
		for (; i < photos.length; i++) {
			var photo = photos[i];
			if (i % 2 === 0) {
				html += '<div class="column">';
			}
			var photoUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg';
			var largeUrl = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg';
			html += '<a href="' + largeUrl + '" class="image" style="background-image:url(' + photoUrl + ');"></a>';
			if (i % 2 === 1) {
				html += '</div>';
			}
		}
		if (i % 2 === 1) {
			html += '</div>';
		}

		var $album = $('#album');

		$album.find('.loadingNotice').remove();

		if (options.first) {
			$album.prepend(html);
		} else {
			$album.append(html);
		}
		albumsLoaded++;

		if (albumsLoaded === 2) {
			$album.slick({
				arrows: false,
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				autoplay: true,
				pauseOnHover : false,
				autoplaySpeed: 3000,
				responsive: [
					{
						breakpoint: 979,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 599,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});

			$album.magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: { enabled: true },
				callbacks: {
					open: function() {
						$album.slick('slickPause');
					},
					close: function() {
						$album.slick('slickPlay');
					}
				}
			});
		}
	};
	
	var api_key = '5e1dd98c9147c89cb9d18a90ff2da4f4';
	var photosetfirst_id = '72157656300999409';
	var photoset_id = '72157656591236901';
	var user_id = '134386578@N04';

	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key=' + api_key + '&user_id=' + user_id + '&photoset_id=' + photosetfirst_id + '&jsoncallback=?', function(data){
		setupPhotos(data, { first: true });
	});

	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&format=json&api_key=' + api_key + '&user_id=' + user_id + '&photoset_id=' + photoset_id + '&jsoncallback=?', function(data){
		setupPhotos(data, { first: false });
	});
	
	

	/**
	 * Responsive Iframe 
	 */
	function responsiveIframe() {
	 // Fix responsive iframe
	$('iframe').each(function(){
	  var iwidth = $(this).width();
	  var iheight = $(this).height();
	  var iparent_width = $(this).parent().width();
	  var irate = iparent_width/iwidth;
	  var inew_height = Math.round(iheight*irate);
	  $(this).css({
	    'width': iparent_width,
	    'height' : inew_height, 
	  });
	});
	}

	responsiveIframe();

	$(window).resize(function(){
		responsiveIframe();
	});
});

/**
 * Scroll to section
 * @param  string des HTML identity of section block
 * @return void
 */
function goToSectionID(des){
	if (des === "../" || des === "ja/") {
		window.location = window.location.origin + window.location.pathname + des;
		return;
	}

	var os = (history.pushState)?51:0;
	os = (jQuery(window).width()>800)?os:0;

	var pos = (jQuery(des).length>0 )?jQuery(des).offset().top-os:0;
	onanimate = true;
	jQuery('html,body').animate({scrollTop:pos},1000,function(){
		if(history.pushState){
			history.pushState(null,null,des);
		}else		window.location.hash = des;
		jQuery(window).scrollTop(pos);
		onanimate=false
	});
}


