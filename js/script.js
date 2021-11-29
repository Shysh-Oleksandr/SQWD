// Webp converter
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
	else{
		document.querySelector('body').classList.add('no-webp');
	}
});
// /Webp converter
// ==========================================================================
$(document).ready(function() {
	// Burger menu
	$('.icon-menu').click(function(event) {
		$('.icon-menu,.menu__body').toggleClass('_active');
		$('body').toggleClass('_lock');
	});
	// /Burger menu

	// ==========================================================================
	// Scroll to section
	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			blockId = $this.data('scroll'),
			blockOffset;
		if(blockId == "#header"){
			blockOffset = 0;
		}
		else {
			blockOffset = $(blockId).offset().top;
		}

		if($("#nav").hasClass("_active")) {
			$("#nav_toggle").toggleClass("_active");
			$("#nav").toggleClass("_active");
		}

		$('body').removeClass("_lock");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 500);
	});
	// /Scroll to section

	// Slider 
	$('.intro__content').slick({
		adaptiveHeight: false,
		speed: 1500,
		easing: 'ease',
		infinite: false,
		slidesToShow: 1,
		dots: true,
	    autoplay:true,
	    autoplaySpeed: 22000,
	    fade: true,

	    arrows:false,
	    slidesToScroll: 1,
		appendDots: $('.intro'),
		customPaging : function(slider, i) {
			var thumb = $(slider.$slides[i]).data();
			return '<a>0'+(i+1)+'</a>';
		},
		

	});
	$('.quotes__content').slick({
		arrows: true,
		adaptiveHeight: true,
		variableWidth: false,
		slidesToShow: 1,
		infinite: true,
		speed: 700,
		easing: 'ease',
	});
	// /Slider
});
// ==========================================================================
// Fixed Header 
var intro = $("#intro"),
	header = $("#header"),
	page = $(".page"),
	introH = intro.innerHeight(),
	scrollOffset = $(window).scrollTop();


$(window).on("scroll", function(){
	scrollOffset = $(this).scrollTop() + 5;
	checkScroll(scrollOffset);
});

$(window).resize(function(){
	introH = intro.innerHeight()
	scrollOffset = $(this).scrollTop();
	checkScroll(scrollOffset);
});

function checkScroll (scrollOffset) {
	if (scrollOffset >= introH) {
		header.addClass("fixed");	
		page.addClass("header-fixed");	
	}
	else {
		header.removeClass("fixed");
		page.removeClass("header-fixed");
	}
}


checkScroll(scrollOffset);
// /Fixed Header 

// ==========================================================================
// Scroll active links.
// Cache selectors
var topMenu = $(".menu"),
    topMenuHeight = topMenu.innerHeight(),
    // All list items
    menuItems = $('.menu__body a'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).data("scroll"));
      if (item.length) { return item; }
    });


// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
   .removeClass("_active")
     .filter(function(){
	        return $(this).attr('data-scroll') == "#"+id;
	    }).addClass("_active");
});
// /Scroll active links

// ==========================================================================
// Show all
const showAllBtn = document.querySelector('.works__link-view-more');
const blocksToShow = document.querySelectorAll(".works .hide");

onShowAllClick(showAllBtn);

function onShowAllClick (item) {
	item.addEventListener("click", function(event) {
		event.preventDefault();
		if(!item.classList.contains('_used')) {
			item.classList.add('_used');
		}
		else {
			item.classList.remove('_used');
		}

		blocksToShow.forEach( function(element) {
			if(!element.classList.contains("_active")) {
				element.classList.add("_active");
				element.classList.remove("hide");
				$(item).text("hide");
			}
			else {
				element.classList.remove("_active");
				element.classList.add("hide");
				$(item).text("view more");
			}
		});
	});
}
// /Show all

// ==========================================================================
// Filter links
const filterLinks = $(".works__link");
const filterBox = document.querySelectorAll('.works__item');

filterLinks.on("click", function(event){
	let filterClass = event.target.dataset['f'];	
	filterLinks.removeClass('_active');
	$(this).addClass('_active');

	if(filterClass === 'all') {
		showAllBtn.classList.add('_active');
	}
	else {
		showAllBtn.classList.remove('_active');
	}

	filterBox.forEach( elem => {
		elem.classList.remove('hide');
		if(!elem.classList.contains(filterClass)){
			if(filterClass !== 'all') {
				elem.classList.add('hide');
			}
			else {
				if (Array.from(blocksToShow).includes(elem) && !showAllBtn.classList.contains('_used')) {
					elem.classList.add('hide');
				}
			}
			
		}
	});
	
});
// /Filter links
// ==========================================================================