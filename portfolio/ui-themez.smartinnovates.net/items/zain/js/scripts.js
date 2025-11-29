/*-----------------------------------------------------------------------------------

    Theme Name: Zain
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function() {

    "use strict";

    var wind = $(window);

    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -80            // offset (in px) for fixed top navigation
   });

    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar")

        if(bodyScroll > 100){

            navbar.addClass("nav-scroll");

        }else{

            navbar.removeClass("nav-scroll");
        }
    });

    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navLight = $(".nav-light"),
            logo = $(".nav-light .logo> img");

        if(bodyScroll > 100){

            navLight.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        }else{

            navLight.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });

    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // progress bar
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
        
        // Animate new skill bars in skills section
        $(".skills-section .progress-bar").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });

    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // =====================================
    // ==== Professional Features ====
    // =====================================

    // Dark Mode Toggle
    $('#darkModeToggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        const icon = $(this).find('i');
        if ($('body').hasClass('dark-mode')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
        $('#darkModeToggle i').removeClass('fa-moon').addClass('fa-sun');
    }

    // Back to Top Button
    wind.on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('show');
        } else {
            $('.back-to-top').removeClass('show');
        }
    });

    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // Portfolio item hover effects
    $('.portfolio .item-img').hover(
        function() {
            $(this).find('.item-img-overlay').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        },
        function() {
            $(this).find('.item-img-overlay').css({
                'opacity': '0',
                'transform': 'translateY(10px)'
            });
        }
    );

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Contact Form Submission with Resend.com
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        const $messages = $form.find('.messages');
        const originalText = $submitBtn.find('span').text();
        
        // Show loading state
        $submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...').prop('disabled', true);
        $messages.html('');
        
        // Get form data
        const formData = {
            name: $form.find('input[name="name"]').val(),
            email: $form.find('input[name="email"]').val(),
            subject: $form.find('input[name="subject"]').val(),
            message: $form.find('textarea[name="message"]').val()
        };
        
        // Send to your Vercel API endpoint
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Success
                $messages.html('<div class="alert alert-success">✅ Message sent successfully! I\'ll get back to you soon.</div>');
                $form[0].reset();
            } else {
                // Error
                response.json().then(data => {
                    $messages.html('<div class="alert alert-danger">❌ ' + (data.error || 'There was a problem sending your message. Please email me directly at ebisaachame123@gmail.com') + '</div>');
                }).catch(() => {
                    $messages.html('<div class="alert alert-danger">❌ There was a problem sending your message. Please email me directly at ebisaachame123@gmail.com</div>');
                });
            }
        })
        .catch(error => {
            // Network error
            $messages.html('<div class="alert alert-danger">❌ Network error. Please try again or email me directly at ebisaachame123@gmail.com</div>');
        })
        .finally(() => {
            // Reset button state
            $submitBtn.html('<span>' + originalText + '</span>').prop('disabled', false);
        });
    });

    // Visitor counter (simulated)
    function updateVisitorCounter() {
        let count = localStorage.getItem('visitorCount') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        
        // You can display this count somewhere if needed
        console.log('Visitor count:', count);
    }

    // Initialize visitor counter
    updateVisitorCounter();

    // Add loading animation to images
    $('img').on('load', function() {
        $(this).addClass('loaded');
    }).each(function() {
        if(this.complete) $(this).trigger('load');
    });

    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        $('.skill-item, .services .item, .blog .item, .skill-category').each(function() {
            observer.observe(this);
        });
    }

    // Skills section animation trigger
    function initSkillAnimation() {
        const skillsSection = $('.skills-section');
        const windowHeight = wind.height();
        const scrollTop = wind.scrollTop();
        const skillsOffset = skillsSection.offset().top;
        
        if (scrollTop + windowHeight > skillsOffset + 100) {
            animateSkillBars();
            wind.off('scroll', initSkillAnimation);
        }
    }

    // Animate skill bars
    function animateSkillBars() {
        $('.progress-bar').each(function(index) {
            const $this = $(this);
            const width = $this.attr('data-value');
            
            // Reset width for animation
            $this.css('width', '0%');
            
            // Animate to actual width with delay
            setTimeout(function() {
                $this.animate({
                    width: width
                }, 1500);
            }, index * 200);
        });
    }

    // Initialize skill animation on scroll
    wind.on('scroll', initSkillAnimation);

    // Header typing effect enhancement
    function initTypingEffect() {
        const words = $('.cd-words-wrapper b');
        let currentIndex = 0;
        
        function rotateWords() {
            const currentWord = words.eq(currentIndex);
            const nextIndex = (currentIndex + 1) % words.length;
            const nextWord = words.eq(nextIndex);
            
            currentWord.removeClass('is-visible').addClass('is-hidden');
            nextWord.addClass('is-visible').removeClass('is-hidden');
            
            currentIndex = nextIndex;
            
            setTimeout(rotateWords, 3000);
        }
        
        // Start rotation
        setTimeout(rotateWords, 3000);
    }

    // Service items hover effects
    $('.services .item').hover(
        function() {
            $(this).addClass('hover-active');
        },
        function() {
            $(this).removeClass('hover-active');
        }
    );

    // Blog post interactions
    $('.blog .item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    // Mobile menu enhancements
    $('.navbar-toggler').on('click', function() {
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').removeClass('show');
            $('body').removeClass('menu-open');
        }
    });

    // Parallax effect for header
    function updateParallax() {
        const scrolled = wind.scrollTop();
        $('.header').css('background-position', 'center ' + -(scrolled * 0.5) + 'px');
    }

    wind.on('scroll', updateParallax);

    // Active section highlighting
    function updateActiveSection() {
        const scrollPos = wind.scrollTop() + 100;
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                const sectionId = $(this).attr('id');
                $('.navbar-nav a').removeClass('active');
                $('.navbar-nav a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    wind.on('scroll', updateActiveSection);

});


// === window When Loading === //

$(window).on("load",function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);

    // Add page loaded class
    $('body').addClass('page-loaded');

    // stellar
    wind.stellar();

    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '.width2'
      }
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });

    // Initialize contact form for Resend.com
    function initContactForm() {
        const $contactForm = $('#contact-form');
        
        if ($contactForm.length) {
            // Remove any Formspree action and method attributes
            $contactForm.removeAttr('action').removeAttr('method');
            
            // Remove old validator if exists
            $contactForm.off('submit').validator('destroy');
            
            // Add custom validation styles
            $contactForm.find('input, textarea').on('blur', function() {
                const $this = $(this);
                if ($this.val().trim() === '') {
                    $this.addClass('error');
                } else {
                    $this.removeClass('error');
                }
            });
        }
    }

    // Initialize contact form
    initContactForm();

    // Initialize animations after page load
    setTimeout(function() {
        // Animate elements in viewport
        $('.animate-on-load').each(function(index) {
            var $element = $(this);
            setTimeout(function() {
                $element.addClass('animate-in');
            }, index * 200);
        });
        
        // Initialize skill bars that are already in view
        if ($('.skills-section').length) {
            var skillsSection = $('.skills-section');
            var windowHeight = wind.height();
            var scrollTop = wind.scrollTop();
            var skillsOffset = skillsSection.offset().top;
            
            if (scrollTop + windowHeight > skillsOffset + 100) {
                $('.progress-bar').each(function(index) {
                    var $this = $(this);
                    var width = $this.attr('data-value');
                    
                    setTimeout(function() {
                        $this.animate({
                            width: width
                        }, 1500);
                    }, index * 200);
                });
            }
        }
    }, 500);

    // Performance optimization: Lazy load images
    $('img[data-src]').each(function() {
        var $img = $(this);
        $img.attr('src', $img.data('src'));
        $img.removeAttr('data-src');
    });

    // Initialize tooltips if any
    if ($('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Initialize counters if any
    if ($('.counter').length) {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

});

// Additional utility functions
$(document).ready(function() {
    
    // Debounce function for performance
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        }
    }

    // Check if element is in viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Smooth scroll to element
    function smoothScrollTo(element, duration) {
        var target = $(element);
        var targetPosition = target.offset().top;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition - 80;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scroll to all anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('href');
        if (target === '#') return;
        smoothScrollTo(target, 1000);
    });

});

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            var perfData = window.performance.timing;
            var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            var domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
            console.log('DOM Ready Time: ' + domReadyTime + 'ms');
        }, 0);
    });
}