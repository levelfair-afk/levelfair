document.addEventListener('DOMContentLoaded', function() {

    // --- Header Style on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Navigation Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        body.classList.toggle('nav-open');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // --- Smooth Scrolling & Menu Closing ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // If mobile menu is open, close it
            if (body.classList.contains('nav-open')) {
                toggleMobileMenu();
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Header height offset
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                alert('Obrigado! Sua demonstração foi solicitada com sucesso.');
                this.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const errorSpan = contactForm.querySelector('.error-message');
        errorSpan.textContent = ''; // Clear previous errors

        const name = document.getElementById('name');
        const email = document.getElementById('email');

        if (!name.value.trim() || !email.value.trim()) {
            errorSpan.textContent = 'Por favor, preencha todos os campos.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            errorSpan.textContent = 'Por favor, insira um email válido.';
            isValid = false;
        }
        
        return isValid;
    }

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
    
    // --- Parallax on Hero Section ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aurora = document.querySelector('.aurora-background');
        if (aurora) {
            aurora.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

});
