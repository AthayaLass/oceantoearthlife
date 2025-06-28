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
        
        // Close mobile menu after clicking a link
        const navMenu = document.getElementById('navMenu');
        const burgerMenu = document.getElementById('burgerMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });
});

// Burger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu on window resize (if switching from mobile to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
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
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add animation to service cards when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Service Modal System
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = document.getElementById('modalClose');
    
    // Service data for modal content
    const serviceData = {
        'dive-courses': {
            title: 'Professional Diving Education',
            description: 'Comprehensive diving courses designed to take you from complete beginner to professional level. Personalized training with individual attention.',
            pricing: [
                {
                    title: 'Discover Scuba Diving (DSD)',
                    icon: 'fas fa-star',
                    description: '1 pool session + 1 open water dive. Full gear included. Ideal first experience.',
                    price: 'CHF 180.–'
                },
                {
                    title: 'Open Water Diver',
                    icon: 'fas fa-star',
                    description: 'Full entry-level certification. 5 pool sessions, 4 open water dives, eLearning.',
                    price: 'CHF 790.–'
                },
                {
                    title: 'Advanced Adventure Diver',
                    icon: 'fas fa-star',
                    description: '5 adventure dives (e.g., deep, navigation, night), gear rental optional.',
                    price: 'CHF 590.–'
                },
                {
                    title: 'Rescue Diver',
                    icon: 'fas fa-crown',
                    description: 'Safety, stress management, rescue techniques, 2 days, incl. scenarios.',
                    price: 'CHF 590.–'
                },
                {
                    title: 'Dive Master',
                    icon: 'fas fa-crown',
                    description: 'Leadership-level course. Includes theory, pool work, internships.',
                    price: 'CHF 1,290.–'
                }
            ],
            features: [
                'Professional instruction',
                'All equipment provided',
                'Certification materials',
                'Individual attention',
                'Flexible scheduling'
            ],
            buttonText: 'Contact for Details',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Dive Courses Inquiry'
        },
        'guided-tours': {
            title: 'Expert-Guided Underwater Adventures',
            description: 'Discover the most beautiful underwater locations with personalized guidance. Perfect for certified divers who want to explore new sites safely and learn about local marine life.',
            pricing: [
                {
                    title: '1 Dive (Half Day)',
                    icon: 'fas fa-sun',
                    description: '1 guided dive at a local lake. Includes weights and tank.',
                    price: 'CHF 90.–'
                },
                {
                    title: '2 Dives (Full Day)',
                    icon: 'fas fa-calendar-day',
                    description: '2 guided dives, surface interval with snacks. Tank & weights incl.',
                    price: 'CHF 160.–'
                },
                {
                    title: 'Night Dive',
                    icon: 'fas fa-moon',
                    description: '1 night dive with torch included. Requires advanced certification.',
                    price: 'CHF 110.–'
                },
                {
                    title: 'Weekend Package (4 Dives)',
                    icon: 'fas fa-calendar-week',
                    description: '2 dives/day over a weekend (Sat & Sun). Equipment extra.',
                    price: 'CHF 290.–'
                },
                {
                    title: 'Private Dive (1:1)',
                    icon: 'fas fa-user-friends',
                    description: 'Fully private guiding session – schedule and site of your choice.',
                    price: 'CHF 150.–'
                }
            ],
            features: [
                'Professional guide',
                'Equipment rental',
                'Marine life identification',
                'Safety briefing',
                'Underwater photography tips'
            ],
            buttonText: 'Book Your Tour',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Guided Tour Booking'
        },
        'underwater-work': {
            title: 'Professional Underwater Services',
            description: 'Specialized underwater work services for commercial and environmental projects. Technical diving expertise ensures safe and efficient completion of underwater tasks.',
            pricing: [
                {
                    title: 'Site Inspection & Monitoring',
                    icon: 'fas fa-eye',
                    description: 'Visual inspections, video/photo documentation, structural assessments.',
                    price: 'from CHF 150.–/hour'
                },
                {
                    title: 'Underwater Construction Assistance',
                    icon: 'fas fa-hard-hat',
                    description: 'Support for construction, welding, drilling, anchor placement, concrete.',
                    price: 'from CHF 180.–/hour'
                },
                {
                    title: 'Equipment Installation',
                    icon: 'fas fa-tools',
                    description: 'Buoys, sensors, pumps, piping, underwater systems.',
                    price: 'from CHF 160.–/hour'
                },
                {
                    title: 'Mooring & Anchor Work',
                    icon: 'fas fa-anchor',
                    description: 'Installation, maintenance or removal of mooring systems, chains, etc.',
                    price: 'from CHF 140.–/hour'
                },
                {
                    title: 'Search & Recovery Operations',
                    icon: 'fas fa-search',
                    description: 'Lost objects, tools, boats, vehicles, evidence, etc.',
                    price: 'from CHF 180.–/hour'
                },
                {
                    title: 'Emergency Call-Out',
                    icon: 'fas fa-exclamation-triangle',
                    description: 'Fast deployment for urgent underwater tasks (24/7 service).',
                    price: 'from CHF 250.– flat + hourly'
                }
            ],
            features: [
                'Technical diving certification',
                'Safety protocols',
                'Environmental compliance',
                'Detailed reporting',
                'Insurance coverage'
            ],
            buttonText: 'Request Quote',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Underwater Work Quote Request'
        },
        'ecology-course': {
            title: 'Marine Science Education',
            description: 'Comprehensive course combining classroom learning with hands-on underwater research. Perfect for students, researchers, and anyone passionate about marine conservation.',
            pricing: [
                {
                    title: '1-Day Intro Course',
                    icon: 'fas fa-microscope',
                    description: 'Theory session + 1 guided ecology dive. Includes ID training & techniques.',
                    price: 'CHF 220.–'
                },
                {
                    title: '2-Day Full Course',
                    icon: 'fas fa-fish',
                    description: 'In-depth theory + 2 guided dives focusing on species ID and survey skills.',
                    price: 'CHF 380.–'
                },
                {
                    title: 'Custom Group Workshop (3+ pax)',
                    icon: 'fas fa-users',
                    description: 'Customizable session for schools, clubs or organizations.',
                    price: 'from CHF 150.–/person'
                }
            ],
            features: [
                '20 hours of classroom instruction',
                '10 practical diving sessions',
                'Research equipment provided',
                'Course materials and certification',
                'Field trip to marine research station'
            ],
            buttonText: 'Enroll Now',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Ecology Course Enrollment'
        },
        'mindfulness': {
            title: 'Underwater Meditation & Wellness',
            description: 'Transform your diving experience into a profound spiritual journey. Our mindfulness sessions combine the therapeutic benefits of water with ancient meditation techniques.',
            pricing: [
                {
                    title: 'Individual Session',
                    icon: 'fas fa-om',
                    description: 'Personalized underwater mindfulness experience',
                    price: 'On Request'
                },
                {
                    title: 'Group Session',
                    icon: 'fas fa-spa',
                    description: 'Shared meditation experience with others',
                    price: 'On Request'
                },
                {
                    title: 'Retreat Program',
                    icon: 'fas fa-users',
                    description: 'Extended mindfulness retreat experience',
                    price: 'On Request'
                }
            ],
            features: [
                'Stress reduction and relaxation',
                'Enhanced breathing awareness',
                'Deep connection with nature',
                'Improved mental clarity',
                'Professional meditation guidance'
            ],
            buttonText: 'Contact for Pricing',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Mindfulness Session Booking'
        },
        'photography': {
            title: 'Professional Underwater Photography',
            description: 'Preserve your underwater memories with stunning professional photography. Our expert photographers capture the beauty of marine life and your diving adventures.',
            pricing: [
                {
                    title: 'Basic Package',
                    icon: 'fas fa-camera',
                    description: '30 minutes session, 10 edited photos',
                    price: 'On Request'
                },
                {
                    title: 'Standard Package',
                    icon: 'fas fa-camera-retro',
                    description: '1 hour session, 25 edited photos',
                    price: 'On Request'
                },
                {
                    title: 'Premium Package',
                    icon: 'fas fa-film',
                    description: '2 hour session, 50 edited photos + video',
                    price: 'On Request'
                }
            ],
            features: [
                'Professional equipment',
                'High-resolution images',
                'Professional editing',
                'Digital delivery',
                'Print-ready files'
            ],
            buttonText: 'Contact for Pricing',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Photography Session Booking'
        }
    };
    
    // Function to generate modal content
    function generateModalContent(serviceType) {
        const data = serviceData[serviceType];
        if (!data) return '';
        
        const pricingHTML = data.pricing.map(item => `
            <div class="pricing-item">
                <h5><i class="${item.icon}"></i> ${item.title}</h5>
                <p>${item.description}</p>
                <span class="price">${item.price}</span>
            </div>
        `).join('');
        
        const featuresHTML = data.features.map(feature => `
            <li><i class="fas fa-check"></i> ${feature}</li>
        `).join('');
        
        return `
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-description">${data.description}</p>
            
            <div class="modal-pricing">
                ${pricingHTML}
            </div>
            
            <div class="modal-features">
                <h5>What's Included:</h5>
                <ul>
                    ${featuresHTML}
                </ul>
            </div>
            
            <div class="modal-cta">
                <button class="btn-primary" onclick="window.location.href='${data.buttonAction}'">${data.buttonText}</button>
            </div>
        `;
    }
    
    // Open modal function
    function openModal(serviceType) {
        modalBody.innerHTML = generateModalContent(serviceType);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners for service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const serviceType = this.dataset.service;
            openModal(serviceType);
        });
    });
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Add ethereal floating animation to service cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('floating');
    });
}

// Add floating animation class to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .service-card.floating {
        animation: floating 6s ease-in-out infinite;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, var(--main), var(--accent));
        color: var(--white);
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(2, 20, 21.6, 0.2);
    }
    
    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(2, 20, 21.6, 0.3);
    }
    
    .btn-primary:hover::before {
        left: 100%;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
`;
document.head.appendChild(style);

// Initialize floating animation
document.addEventListener('DOMContentLoaded', addFloatingAnimation);