// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll behavior
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Language detection and redirection
function detectAndRedirectLanguage() {
    // Check if user has already made a language choice
    if (localStorage.getItem('userLanguageChoice')) {
        return;
    }

    // Get user's preferred languages
    const userLanguage = navigator.language || navigator.userLanguage;
    const languageCode = userLanguage.split('-')[0]; // Get primary language code
    
    // Check if we're already on the correct language version
    const currentPath = window.location.pathname;
    const currentLang = currentPath.split('/')[1]; // Get current language from URL
    
    // If we're not on the correct language version and it's a supported language
    if (currentLang !== languageCode && ['en', 'fr', 'it', 'de'].includes(languageCode)) {
        const currentPage = currentPath.split('/').pop();
        window.location.href = `/${languageCode}/${currentPage}`;
    }
}

// Language selector function
function changeLanguage(lang) {
    // Store the user's language choice
    localStorage.setItem('userLanguageChoice', lang);
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    window.location.href = `/${lang}/${currentPage}`;
}

// Services Modal Functions
function openServicesModal() {
    const modal = document.getElementById('servicesModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeServicesModal() {
    const modal = document.getElementById('servicesModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Flip card function for services
function flipCard(card) {
    // Prevent rapid clicking that could cause lag
    if (card.classList.contains('flipping')) {
        return;
    }
    
    // Flip back any other flipped cards first
    const allCards = document.querySelectorAll('.flip-card');
    allCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('flipped')) {
            otherCard.classList.remove('flipped');
        }
    });
    
    card.classList.add('flipping');
    card.classList.toggle('flipped');
    
    // Remove flipping class after animation completes
    setTimeout(() => {
        card.classList.remove('flipping');
    }, 400);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('servicesModal');
    const floatingServices = document.querySelector('.floating-services');
    
    if (modal.classList.contains('active') && 
        !modal.contains(event.target) && 
        !floatingServices.contains(event.target)) {
        closeServicesModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServicesModal();
    }
});

// Mobile menu functions
function toggleMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    burgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    burgerMenu.classList.remove('active');
    mobileNav.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!burgerMenu.contains(event.target) && !mobileNav.contains(event.target)) {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Run language detection
    detectAndRedirectLanguage();
    
    // Add scroll effect to floating services
    const floatingServices = document.querySelector('.floating-services');
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            floatingServices.style.transform = 'translateY(-2px)';
            isScrolling = true;
        }
        
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            floatingServices.style.transform = '';
            isScrolling = false;
        }, 150);
    });
    
    // Add hover effect to service items in modal
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Add smooth reveal animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.mindfulness-section, .about-section, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}); 