
// ========== VARIABLE DECLARATIONS ==========
const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');
const navLinks = document.querySelectorAll('.nav-container a');
const contactForm = document.querySelector('.contact-form form');
const galleryItems = document.querySelectorAll('.gallery-item');
const testimonials = document.querySelectorAll('.testimonial');

// ========== CONDITIONALS ==========
// Check if device is mobile and adjust behavior accordingly
const isMobileDevice = window.innerWidth <= 768;

// ========== CUSTOM FUNCTIONS ==========
// Function 1: Toggle mobile navigation
function toggleNavigation() {
    navContainer.classList.toggle('active');
    
    // Change hamburger icon based on menu state
    const menuIcon = hamburger.querySelector('i');
    if (navContainer.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Function 2: Validate contact form
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Reset error states
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would submit the form here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
}

// Helper function for form validation errors
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--accent)';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    errorElement.style.display = 'block';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

// ========== LOOPS ==========
// Loop 1: Add click event listeners to all navigation links
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
        // Close mobile menu when a link is clicked
        if (isMobileDevice) {
            toggleNavigation();
        }
        
        // Smooth scrolling
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Loop 2: Add hover effects to gallery items with delay
galleryItems.forEach((item, index) => {
    // Add a slight delay to the hover effect based on index
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ========== DOM INTERACTIONS ==========
// Interaction 1: Toggle mobile navigation
hamburger.addEventListener('click', toggleNavigation);

// Interaction 2: Form submission handling
contactForm.addEventListener('submit', validateForm);

// Interaction 3: Add animation to testimonials on scroll
function checkTestimonials() {
    testimonials.forEach((testimonial, index) => {
        const testimonialPosition = testimonial.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (testimonialPosition < screenPosition) {
            testimonial.style.opacity = '1';
            testimonial.style.transform = 'translateY(0)';
        }
    });
}

// Initialize testimonial animation styles
testimonials.forEach(testimonial => {
    testimonial.style.opacity = '0';
    testimonial.style.transform = 'translateY(50px)';
    testimonial.style.transition = 'all 0.8s ease';
});

// Check testimonials on load and scroll
window.addEventListener('load', checkTestimonials);
window.addEventListener('scroll', checkTestimonials);

// Additional functionality: Change header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 35, 126, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--primary)';
        header.style.backdropFilter = 'none';
    }
});

// Additional functionality: Current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});
