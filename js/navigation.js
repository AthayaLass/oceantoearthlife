let lastScrollTop = 0;
const header = document.querySelector('.main-nav');
const scrollThreshold = 50; // Minimum scroll amount before header changes

// Initialize header to be big by default
header.classList.add('scrolled-up');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        // Scrolling down past threshold
        header.classList.remove('scrolled-up');
        header.classList.add('scrolled-down');
    } else {
        // At the top of the page
        header.classList.remove('scrolled-down');
        header.classList.add('scrolled-up');
    }
    
    lastScrollTop = scrollTop;
}); 