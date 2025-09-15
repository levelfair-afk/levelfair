// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-header');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulate form submission
            alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for animation
    const animatedElements = document.querySelectorAll('.card, .case-card, .hero-content, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (for future enhancement)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.background = 'none';
    mobileMenuToggle.style.border = 'none';
    mobileMenuToggle.style.color = 'white';
    mobileMenuToggle.style.fontSize = '1.5rem';
    mobileMenuToggle.style.cursor = 'pointer';
    
    // Add mobile menu functionality for smaller screens
    function checkScreenSize() {
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');
        
        if (window.innerWidth <= 768) {
            if (!nav.contains(mobileMenuToggle)) {
                nav.insertBefore(mobileMenuToggle, navUl);
            }
            mobileMenuToggle.style.display = 'block';
            navUl.style.display = 'none';
            
            mobileMenuToggle.addEventListener('click', function() {
                if (navUl.style.display === 'none') {
                    navUl.style.display = 'flex';
                    navUl.style.flexDirection = 'column';
                    navUl.style.position = 'absolute';
                    navUl.style.top = '100%';
                    navUl.style.left = '0';
                    navUl.style.right = '0';
                    navUl.style.background = 'rgba(102, 126, 234, 0.95)';
                    navUl.style.padding = '1rem';
                    navUl.style.backdropFilter = 'blur(10px)';
                } else {
                    navUl.style.display = 'none';
                }
            });
        } else {
            mobileMenuToggle.style.display = 'none';
            navUl.style.display = 'flex';
            navUl.style.position = 'static';
            navUl.style.background = 'none';
            navUl.style.flexDirection = 'row';
        }
    }
    
    // Check screen size on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
});

