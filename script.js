document.addEventListener('DOMContentLoaded', function() {

    // --- Header Style on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for All Internal Links ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close mobile menu if open
                if (navUl.classList.contains('active')) {
                    toggleMobileMenu();
                }
                smoothScrollTo(targetSection);
            }
        });
    });

    function smoothScrollTo(element) {
        const headerHeight = 80; // Approximate header height
        const targetPosition = element.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // --- Enhanced Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                alert('Obrigado pelo seu interesse! Entraremos em contato em breve.');
                this.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        clearErrors();
        
        const nameField = { id: 'name', message: 'Por favor, preencha seu nome.' };
        const emailField = { id: 'email', message: 'Por favor, insira um email válido.', validator: isValidEmail };
        
        [nameField, emailField].forEach(fieldInfo => {
            const input = document.getElementById(fieldInfo.id);
            if (!input.value.trim() || (fieldInfo.validator && !fieldInfo.validator(input.value))) {
                showError(input, fieldInfo.message);
                isValid = false;
            }
        });
        return isValid;
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        input.style.borderColor = 'var(--c-error)';
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('#contact-form input').forEach(el => el.style.borderColor = '');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    // --- Mobile Navigation ---
    const navUl = document.querySelector('nav ul');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    function toggleMobileMenu() {
        const isActive = navUl.classList.toggle('active');
        mobileMenuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        body.style.overflow = isActive ? 'hidden' : '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
});
