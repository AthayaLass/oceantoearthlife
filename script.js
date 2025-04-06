document.addEventListener('DOMContentLoaded', () => {
    // Fade in content on load
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    content.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 200);

    // Add floating animation to profiles
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach((profile, index) => {
        profile.style.opacity = '0';
        profile.style.transform = 'translateY(20px)';
        profile.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            profile.style.opacity = '1';
            profile.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });

    // Animate social links
    const socialLinks = document.querySelector('.social-links');
    socialLinks.style.opacity = '0';
    socialLinks.style.transform = 'translateY(20px)';
    socialLinks.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        socialLinks.style.opacity = '1';
        socialLinks.style.transform = 'translateY(0)';
    }, 1200);

    // Add parallax effect to background
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelector('.background-animation').style.transform = 
            `translate(${moveX}px, ${moveY}px)`;
    });
}); 