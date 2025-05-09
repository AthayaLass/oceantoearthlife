document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Amount of pixels to scroll before shrinking header

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('shrunk');
            document.body.classList.add('header-shrunk');
        } else {
            header.classList.remove('shrunk');
            document.body.classList.remove('header-shrunk');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
}); 