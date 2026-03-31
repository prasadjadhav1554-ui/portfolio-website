/**
 * Prasad Jadhav - Portfolio Website JavaScript
 * Modern, interactive portfolio with animations and effects
 */

// ========================================
// DOM ELEMENTS
// ========================================
const preloader = document.getElementById('preloader');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const scrollProgress = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const particlesContainer = document.getElementById('particles');

// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        initTypingAnimation();
        initParticles();
    }, 1500);
});

// ========================================
// CUSTOM CURSOR
// ========================================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const ease = 0.2;
    const followerEase = 0.1;
    
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    followerX += (mouseX - followerX) * followerEase;
    followerY += (mouseY - followerY) * followerEase;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .education-card, .cert-card, .timeline-content');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ========================================
// TYPING ANIMATION
// ========================================
const typingTexts = [
    'Python Developer',
    'Java Developer',
    'Web Developer',
    'Software Developer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function initTypingAnimation() {
    type();
}

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
}

// ========================================
// PARTICLES BACKGROUND
// ========================================
function initParticles() {
    particlesJS('particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#667fff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#667fff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// BACK TO TOP BUTTON
// ========================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when in view
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target.querySelector('.stat-number'));
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.fade-in, .skill-card, .stat-item, .project-card, .education-card, .cert-card, .timeline-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ========================================
// VANILLA TILT INITIALIZATION
// ========================================
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
        transition: true
    });
}

// ========================================
// EMAILJS CONFIGURATION
// ========================================
// IMPORTANT: Replace these with your actual EmailJS credentials
// Get them from: https://dashboard.emailjs.com/
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // e.g., 'user_xxxxxxxxxxxxx'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g., 'service_xxxxxxxxxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xxxxxxxxxxxxx'

// Initialize EmailJS
(function() {
    // Only initialize if public key is set
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const formGroups = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    // Clear previous errors
    formGroups.forEach(group => group.classList.remove('error'));
    
    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim().length < 2) {
        showError(name, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (subject.value.trim().length < 3) {
        showError(subject, 'Please enter a subject (at least 3 characters)');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim().length < 10) {
        showError(message, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    if (isValid) {
        // Check if EmailJS is configured
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Show demo success message if not configured
            showNotification('Demo Mode: Form submitted successfully! Configure EmailJS to send real emails.', 'success');
            contactForm.reset();
            return;
        }
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: name.value.trim(),
            from_email: email.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim(),
            to_email: 'prasadjadhav1554@gmail.com'
        };
        
        // Send email via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again or email me directly.', 'error');
            })
            .finally(function() {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide notification after 5 seconds
                setTimeout(() => {
                    hideNotification();
                }, 5000);
            });
    }
});

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Message sent successfully! I'll get back to you soon.</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #06d6a0, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(6, 214, 160, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 4.5s;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
}

function hideSuccessMessage() {
    const notification = document.querySelector('.success-notification');
    if (notification) {
        notification.remove();
    }
}

// ========================================
// NOTIFICATION SYSTEM (for EmailJS)
// ========================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    hideNotification();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const bgColor = type === 'success' 
        ? 'linear-gradient(135deg, #06d6a0, #059669)' 
        : 'linear-gradient(135deg, #ef4444, #dc2626)';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        max-width: 400px;
    `;
    
    // Add animation styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }
}

// ========================================
// PARALLAX EFFECT ON HERO SECTION
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// SKILL CARDS STAGGERED ANIMATION
// ========================================
document.querySelectorAll('.skills-category').forEach((category, index) => {
    const cards = category.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
});

// ========================================
// PROJECT CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// EDUCATION CARDS ANIMATION
// ========================================
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ========================================
// CERTIFICATION CARDS ANIMATION
// ========================================
document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ========================================
// TEXT REVEAL ANIMATION
// ========================================
const revealTexts = document.querySelectorAll('.section-title, .section-subtitle');
revealTexts.forEach(text => {
    text.style.opacity = '0';
    text.style.transform = 'translateY(20px)';
    text.style.transition = 'all 0.6s ease';
});

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

revealTexts.forEach(text => textObserver.observe(text));

// ========================================
// RANDOM PARTICLE FLOATING (Fallback if particles.js fails)
// ========================================
if (typeof particlesJS === 'undefined') {
    console.log('Particles.js not loaded, using fallback animation');
    
    // Create simple floating dots
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(102, 127, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(dot);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'L' to toggle theme
    if (e.key === 'l' && !e.ctrlKey && !e.metaKey) {
        themeToggle.click();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    highlightNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize all animations
    console.log('Portfolio initialized successfully!');
});

// ========================================
// PRINT FUNCTIONALITY
// ========================================
window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    document.querySelectorAll('.section').forEach(section => {
        section.style.pageBreakInside = 'avoid';
    });
});

// ========================================
// ERROR HANDLING
// ========================================
window.onerror = function(message, source, lineno, colno, error) {
    console.log('Portfolio Error:', message, 'Line:', lineno);
    return true;
};

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #667fff;');
console.log('%cWelcome to Prasad Jadhav\'s Portfolio', 'font-size: 16px; color: #8b5cf6;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'font-size: 14px; color: #06d6a0;');
console.log('%cFeel free to reach out: prasadjadhav1554@gmail.com', 'font-size: 12px; color: #a0a0b8;');