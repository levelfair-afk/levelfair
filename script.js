// LevelFair JavaScript
(function($) {
    'use strict';

    // Preloader
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // Mobile Menu Toggle
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
        $('.navbar-collapse').toggleClass('show');
    });

    // Smooth Scrolling for Navigation Links
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                
                // Close mobile menu if open
                $('.navbar-collapse').removeClass('show');
                $('.navbar-toggler').removeClass('active');
            }
        }
    });

    // Navbar Scroll Effect
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Active Menu Item on Scroll
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('.navbar-nav .nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            if (refElement.position() && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav .nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Hero Slider/Carousel (if exists)
    if ($('.hero-carousel').length) {
        $('.hero-carousel').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
        });
    }

    // Services Carousel
    if ($('.services-carousel').length) {
        $('.services-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }

    // Testimonials Carousel
    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 6000,
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    }

    // Counter Animation
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }

    // Scroll to Top Button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    $('.scroll-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Contact Form Handling
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Por favor, insira um email válido.', 'error');
            return;
        }

        // Simulate form submission (replace with actual endpoint)
        $('.submit-btn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
        
        setTimeout(function() {
            showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form[0].reset();
            $('.submit-btn').prop('disabled', false).html('Enviar Mensagem');
        }, 2000);
    });

    // Alert Function
    function showAlert(message, type) {
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var alertHtml = '<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                       message +
                       '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
                       '</div>';
        
        $('#alert-container').html(alertHtml);
        
        setTimeout(function() {
            $('.alert').fadeOut();
        }, 5000);
    }

    // Animate on Scroll
    if ($('.aos-animate').length) {
        $(window).on('scroll', function() {
            $('.aos-animate').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated');
                }
            });
        });
    }

    // Modal Handling
    $('.modal-trigger').on('click', function(e) {
        e.preventDefault();
        var modalId = $(this).data('modal');
        $('#' + modalId).modal('show');
    });

    // FAQ Accordion
    $('.faq-item .faq-header').on('click', function() {
        var faqItem = $(this).parent();
        var faqContent = faqItem.find('.faq-content');
        
        if (faqItem.hasClass('active')) {
            faqItem.removeClass('active');
            faqContent.slideUp();
        } else {
            $('.faq-item').removeClass('active');
            $('.faq-content').slideUp();
            faqItem.addClass('active');
            faqContent.slideDown();
        }
    });

    // Search Functionality
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        var searchTerm = $('#search-input').val();
        
        if (searchTerm.trim() === '') {
            showAlert('Por favor, digite algo para pesquisar.', 'error');
            return;
        }
        
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    });

    // Newsletter Subscription
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        var email = $('#newsletter-email').val();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showAlert('Por favor, insira um email válido.', 'error');
            return;
        }
        
        $('.newsletter-btn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i>');
        
        setTimeout(function() {
            showAlert('Obrigado por se inscrever em nossa newsletter!', 'success');
            $('#newsletter-email').val('');
            $('.newsletter-btn').prop('disabled', false).html('Inscrever-se');
        }, 1500);
    });

    // Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Copy to Clipboard Function
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showAlert('Copiado para a área de transferência!', 'success');
            });
        } else {
            // Fallback for older browsers
            var textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showAlert('Copiado para a área de transferência!', 'success');
        }
    }

    // Initialize Tooltips
    if ($('[data-bs-toggle="tooltip"]').length) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Initialize Popovers
    if ($('[data-bs-toggle="popover"]').length) {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    // Mobile Device Detection
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        $('body').addClass('mobile-device');
    }

    // Page Loading Animation
    $(document).ready(function() {
        $('.page-content').addClass('loaded');
    });

})(jQuery);

// Adjust initial hash position on load to account for sticky header
$(window).on('load', function() {
    var headerH = $('.header').outerHeight() || 80;
    if (window.location.hash) {
        var $t = $(window.location.hash);
        if ($t.length) {
            $('html, body').scrollTop($t.offset().top - headerH);
        }
    }
});

