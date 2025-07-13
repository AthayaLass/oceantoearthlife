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
    
    const lang = document.documentElement.lang || 'en';

    const serviceData_en = {
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
    
    const serviceData_fr = {
        'dive-courses': {
            title: 'Formation Professionnelle de Plongée',
            description: 'Cours de plongée complets de débutant à professionnel. Formation personnalisée avec attention individuelle.',
            pricing: [
                { title: 'Battesimo Subacqueo (DSD)', icon: 'fas fa-star', description: '1 session en piscine + 1 plongée en eau libre. Ausrüstung inklusive. Idéal pour débutants.', price: 'CHF 180.–' },
                { title: 'Open Water Diver', icon: 'fas fa-star', description: 'Certification de base. 5 sessions en piscine, 4 plongées en eau libre, eLearning.', price: 'CHF 790.–' },
                { title: 'Advanced Adventure Diver', icon: 'fas fa-star', description: '5 plongées d\'aventure (profonde, navigation, nuit), location d\'équipement optionnelle.', price: 'CHF 590.–' },
                { title: 'Rescue Diver', icon: 'fas fa-crown', description: 'Sécurité, gestion du stress, techniques de sauvetage, 2 jours, scénarios inclus.', price: 'CHF 590.–' },
                { title: 'Dive Master', icon: 'fas fa-crown', description: 'Cours de leadership. Théorie, piscine, stage.', price: 'CHF 1,290.–' }
            ],
            features: [
                'Instruction professionnelle',
                'Équipement complet fourni',
                'Matériaux de certification',
                'Attention individuelle',
                'Planning flexible'
            ],
            buttonText: 'Contactez-nous pour les détails',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Demande de Formation Sub'
        },
        'guided-tours': {
            title: 'Aventures Sous-Marines Guidées',
            description: 'Découvrez les sites sous-marins les plus beaux avec une guilde experte. Parfait pour les plongeurs certifiés qui souhaitent explorer de nouveaux sites en toute sécurité et découvrir la faune locale.',
            pricing: [
                { title: '1 Plongée (Demi-Journée)', icon: 'fas fa-sun', description: '1 plongée guidée dans un lac local. Bombola et poids inclus.', price: 'CHF 90.–' },
                { title: '2 Plongées (Journée Complexe)', icon: 'fas fa-calendar-day', description: '2 plongées guidées, pause avec collation. Bombola & poids inclus.', price: 'CHF 160.–' },
                { title: 'Plongée de Nuit', icon: 'fas fa-moon', description: '1 plongée de nuit avec torche incluse. Certificat avancé requis.', price: 'CHF 110.–' },
                { title: 'Pack Week-End (4 Plongées)', icon: 'fas fa-calendar-week', description: '2 plongées/jour le week-end (samedi & dimanche). Équipement extra.', price: 'CHF 290.–' },
                { title: 'Plongée Privée (1:1)', icon: 'fas fa-user-friends', description: 'Session de plongée privée – horaire et site à votre choix.', price: 'CHF 150.–' }
            ],
            features: [
                'Guide professionnel',
                'Location d\'équipement',
                'Identification de la faune marine',
                'Briefing de sécurité',
                'Conseils en photographie sous-marine'
            ],
            buttonText: 'Réservez votre tour',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Réservation de Tour Guidé'
        },
        'underwater-work': {
            title: 'Services Sous-Marins Professionnels',
            description: 'Services spécialisés pour des projets commerciaux et environnementaux. Expertise technique pour des interventions sous-marines sûres et efficaces.',
            pricing: [
                { title: 'Inspection & Surveillance', icon: 'fas fa-eye', description: 'Inspections visuelles, documentation vidéo/photo, évaluations structurales.', price: 'à partir de CHF 150.–/heure' },
                { title: 'Assistance en Construction Sous-Marine', icon: 'fas fa-hard-hat', description: 'Assistance pour la construction, soudure, perçage, ancrage, bétonnage.', price: 'à partir de CHF 180.–/heure' },
                { title: 'Installation d\'Équipement', icon: 'fas fa-tools', description: 'Bouées, capteurs, pompes, tuyaux, systèmes sous-marins.', price: 'à partir de CHF 160.–/heure' },
                { title: 'Travaux d\'Ancrage', icon: 'fas fa-anchor', description: 'Installation, maintenance ou suppression de systèmes d\'ancrage, chaînes, etc.', price: 'à partir de CHF 140.–/heure' },
                { title: 'Recherche & Récupération', icon: 'fas fa-search', description: 'Objets perdus, outils, bateaux, véhicules, preuves, etc.', price: 'à partir de CHF 180.–/heure' },
                { title: 'Appel d\'Urgence', icon: 'fas fa-exclamation-triangle', description: 'Déploiement rapide pour des tâches urgentes (service 24/7).', price: 'à partir de CHF 250.– forfait + heure' }
            ],
            features: [
                'Certification technique',
                'Protocoles de sécurité',
                'Conformité environnementale',
                'Rapports détaillés',
                'Assurance incluse'
            ],
            buttonText: 'Demandez un devis',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Demande de Devis Travaux Sous-Marins'
        },
        'ecology-course': {
            title: 'Cours de Sciences Marines',
            description: 'Cours complet qui combine l\'apprentissage théorique avec la recherche sous-marine pratique. Idéal pour les étudiants, les chercheurs et les passionnés de conservation marine.',
            pricing: [
                { title: 'Cours d\'Introduction 1 Jour', icon: 'fas fa-microscope', description: 'Session théorique + 1 plongée guidée. Formation sur l\'identification & techniques.', price: 'CHF 220.–' },
                { title: 'Cours Complet 2 Jours', icon: 'fas fa-fish', description: 'Théorie approfondie + 2 plongées guidées sur l\'identification et les relevés.', price: 'CHF 380.–' },
                { title: 'Atelier de Groupe (3+ personnes)', icon: 'fas fa-users', description: 'Session personnalisable pour les écoles, clubs ou organisations.', price: 'à partir de CHF 150.–/personne' }
            ],
            features: [
                '20 heures de théorie',
                '10 plongées pratiques',
                'Équipement de recherche fourni',
                'Matériaux et certification',
                'Excursion à la station marine'
            ],
            buttonText: 'Inscrivez-vous maintenant',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Inscription Cours d\'Ecologie'
        },
        'mindfulness': {
            title: 'Méditation & Bien-Être Sous-Marin',
            description: 'Transformez votre expérience de plongée en une expérience spirituelle profonde. Nos sessions combinent les bienfaits thérapeutiques de l\'eau avec des techniques de méditation anciennes.',
            pricing: [
                { title: 'Session Individuelle', icon: 'fas fa-om', description: 'Expérience personnalisée de mindfulness sous-marin', price: 'Sur demande' },
                { title: 'Session de Groupe', icon: 'fas fa-spa', description: 'Expérience de méditation partagée avec d\'autres', price: 'Sur demande' },
                { title: 'Programme de Retraite', icon: 'fas fa-users', description: 'Expérience de retraite prolongée', price: 'Sur demande' }
            ],
            features: [
                'Réduction du stress',
                'Conscience de l\'inspiration',
                'Connexion profonde avec la nature',
                'Clarté mentale',
                'Guidance professionnelle'
            ],
            buttonText: 'Demandez un devis',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Réservation de Session Mindfulness'
        },
        'photography': {
            title: 'Photographie Sous-Marine Professionnelle',
            description: 'Conservez vos souvenirs de plongée avec des photos professionnelles de haute qualité.',
            pricing: [
                { title: 'Pack de Base', icon: 'fas fa-camera', description: '30 minutes, 10 photos retouchées', price: 'Sur demande' },
                { title: 'Pack Standard', icon: 'fas fa-camera-retro', description: '1 heure, 25 photos retouchées', price: 'Sur demande' },
                { title: 'Pack Premium', icon: 'fas fa-film', description: '2 heures, 50 photos + vidéo', price: 'Sur demande' }
            ],
            features: [
                'Équipement professionnel',
                'Images haute résolution',
                'Retouche professionnelle',
                'Livraison digitale',
                'Fichiers prêts pour l\'impression'
            ],
            buttonText: 'Demandez un devis',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Réservation de Session de Photographie'
        }
    };

    const serviceData_it = {
        'dive-courses': {
            title: 'Formazione Subacquea Professionale',
            description: 'Corsi di immersione completi dal principiante al livello professionale. Formazione personalizzata con attenzione individuale.',
            pricing: [
                { title: 'Battesimo Subacqueo (DSD)', icon: 'fas fa-star', description: '1 sessione in piscina + 1 immersione in acque libere. Attrezzatura inclusa. Ideale per iniziare.', price: 'CHF 180.–' },
                { title: 'Open Water Diver', icon: 'fas fa-star', description: 'Certificazione base. 5 sessioni in piscina, 4 immersioni in acque libere, eLearning.', price: 'CHF 790.–' },
                { title: 'Advanced Adventure Diver', icon: 'fas fa-star', description: '5 immersioni avventura (profonda, navigazione, notturna, ecc.), noleggio attrezzatura opzionale.', price: 'CHF 590.–' },
                { title: 'Rescue Diver', icon: 'fas fa-crown', description: 'Sicurezza, gestione dello stress, tecniche di salvataggio, 2 giorni, scenari inclusi.', price: 'CHF 590.–' },
                { title: 'Dive Master', icon: 'fas fa-crown', description: 'Corso di leadership. Teoria, piscina, tirocinio.', price: 'CHF 1,290.–' }
            ],
            features: [
                'Istruttore professionale',
                'Tutta l’attrezzatura fornita',
                'Materiali di certificazione',
                'Attenzione individuale',
                'Orari flessibili'
            ],
            buttonText: 'Contattaci per dettagli',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Richiesta Corso Sub'
        },
        'guided-tours': {
            title: 'Avventure Subacquee Guidate',
            description: 'Scopri i siti subacquei più belli con una guida esperta. Perfetto per sub certificati che vogliono esplorare nuovi luoghi in sicurezza e conoscere la fauna locale.',
            pricing: [
                { title: '1 Immersione (Mezza giornata)', icon: 'fas fa-sun', description: '1 immersione guidata in lago locale. Bombola e pesi inclusi.', price: 'CHF 90.–' },
                { title: '2 Immersioni (Giornata intera)', icon: 'fas fa-calendar-day', description: '2 immersioni guidate, pausa con snack. Bombola & pesi inclusi.', price: 'CHF 160.–' },
                { title: 'Immersione Notturna', icon: 'fas fa-moon', description: '1 immersione notturna con torcia inclusa. Richiesta certificazione avanzata.', price: 'CHF 110.–' },
                { title: 'Pacchetto Weekend (4 immersioni)', icon: 'fas fa-calendar-week', description: '2 immersioni/giorno nel weekend (sabato & domenica). Attrezzatura extra.', price: 'CHF 290.–' },
                { title: 'Immersione Privata (1:1)', icon: 'fas fa-user-friends', description: 'Sessione privata – orario e sito a tua scelta.', price: 'CHF 150.–' }
            ],
            features: [
                'Guida professionale',
                'Noleggio attrezzatura',
                'Identificazione fauna marina',
                'Briefing sicurezza',
                'Consigli fotografia subacquea'
            ],
            buttonText: 'Prenota il tuo tour',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Prenotazione Tour Guidato'
        },
        'underwater-work': {
            title: 'Servizi Subacquei Professionali',
            description: 'Servizi specializzati per progetti commerciali e ambientali. Esperienza tecnica per interventi subacquei sicuri ed efficienti.',
            pricing: [
                { title: 'Ispezione & Monitoraggio', icon: 'fas fa-eye', description: 'Ispezioni visive, documentazione video/foto, valutazioni strutturali.', price: 'da CHF 150.–/ora' },
                { title: 'Assistenza Costruzioni Subacquee', icon: 'fas fa-hard-hat', description: 'Supporto per costruzioni, saldature, perforazioni, ancoraggi, cemento.', price: 'da CHF 180.–/ora' },
                { title: 'Installazione Attrezzature', icon: 'fas fa-tools', description: 'Boette, sensori, pompe, tubazioni, sistemi subacquei.', price: 'da CHF 160.–/ora' },
                { title: 'Lavori di Ancoraggio', icon: 'fas fa-anchor', description: 'Installazione, manutenzione o rimozione di sistemi di ancoraggio, catene, ecc.', price: 'da CHF 140.–/ora' },
                { title: 'Ricerca & Recupero', icon: 'fas fa-search', description: 'Oggetti smarriti, attrezzi, barche, veicoli, prove, ecc.', price: 'da CHF 180.–/ora' },
                { title: 'Intervento d’Emergenza', icon: 'fas fa-exclamation-triangle', description: 'Intervento rapido per compiti urgenti (servizio 24/7).', price: 'da CHF 250.– forfait + orario' }
            ],
            features: [
                'Certificazione tecnica',
                'Protocolli di sicurezza',
                'Rispetto ambientale',
                'Report dettagliati',
                'Assicurazione inclusa'
            ],
            buttonText: 'Richiedi un preventivo',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Preventivo Lavori Subacquei'
        },
        'ecology-course': {
            title: 'Corso di Scienze Marine',
            description: 'Corso completo che unisce teoria e ricerca subacquea pratica. Ideale per studenti, ricercatori e appassionati di conservazione marina.',
            pricing: [
                { title: 'Corso Introduttivo 1 giorno', icon: 'fas fa-microscope', description: 'Sessione teorica + 1 immersione guidata. Formazione su identificazione & tecniche.', price: 'CHF 220.–' },
                { title: 'Corso Completo 2 giorni', icon: 'fas fa-fish', description: 'Teoria approfondita + 2 immersioni guidate su identificazione e rilievi.', price: 'CHF 380.–' },
                { title: 'Workshop di Gruppo (3+ persone)', icon: 'fas fa-users', description: 'Sessione personalizzata per scuole, club o organizzazioni.', price: 'da CHF 150.–/persona' }
            ],
            features: [
                '20 ore di teoria',
                '10 immersioni pratiche',
                'Attrezzatura di ricerca fornita',
                'Materiali e certificazione',
                'Uscita presso stazione marina'
            ],
            buttonText: 'Iscriviti ora',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Iscrizione Corso Ecologia'
        },
        'mindfulness': {
            title: 'Meditazione & Benessere Subacqueo',
            description: 'Trasforma la tua esperienza subacquea in un viaggio spirituale profondo. Le nostre sessioni uniscono i benefici terapeutici dell’acqua con antiche tecniche di meditazione.',
            pricing: [
                { title: 'Sessione Individuale', icon: 'fas fa-om', description: 'Esperienza personalizzata di mindfulness subacquea', price: 'Su richiesta' },
                { title: 'Sessione di Gruppo', icon: 'fas fa-spa', description: 'Meditazione condivisa con altri partecipanti', price: 'Su richiesta' },
                { title: 'Programma Retreat', icon: 'fas fa-users', description: 'Esperienza di retreat prolungata', price: 'Su richiesta' }
            ],
            features: [
                'Riduzione dello stress',
                'Consapevolezza del respiro',
                'Connessione profonda con la natura',
                'Chiarezza mentale',
                'Guida professionale'
            ],
            buttonText: 'Richiedi un preventivo',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Prenotazione Sessione Mindfulness'
        },
        'photography': {
            title: 'Fotografia Subacquea Professionale',
            description: 'Conserva i tuoi ricordi subacquei con fotografie professionali di alta qualità.',
            pricing: [
                { title: 'Pacchetto Base', icon: 'fas fa-camera', description: '30 minuti, 10 foto ritoccate', price: 'Su richiesta' },
                { title: 'Pacchetto Standard', icon: 'fas fa-camera-retro', description: '1 ora, 25 foto ritoccate', price: 'Su richiesta' },
                { title: 'Pacchetto Premium', icon: 'fas fa-film', description: '2 ore, 50 foto + video', price: 'Su richiesta' }
            ],
            features: [
                'Attrezzatura professionale',
                'Immagini ad alta risoluzione',
                'Ritocco professionale',
                'Consegna digitale',
                'File pronti per la stampa'
            ],
            buttonText: 'Richiedi un preventivo',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Prenotazione Sessione Foto'
        }
    };

    const serviceData_de = {
        'dive-courses': {
            title: 'Professionelle Tauchausbildung',
            description: 'Umfassende Tauchkurse vom Anfänger bis zum Profi. Individuelle Betreuung und persönliche Ausbildung.',
            pricing: [
                { title: 'Schnuppertauchen (DSD)', icon: 'fas fa-star', description: '1 Pool-Session + 1 Freiwassertauchgang. Ausrüstung inklusive. Ideal für Einsteiger.', price: 'CHF 180.–' },
                { title: 'Open Water Diver', icon: 'fas fa-star', description: 'Einstiegszertifikat. 5 Pool-Sessions, 4 Freiwassertauchgänge, eLearning.', price: 'CHF 790.–' },
                { title: 'Advanced Adventure Diver', icon: 'fas fa-star', description: '5 Abenteuertauchgänge (z.B. Tiefe, Navigation, Nacht), Ausrüstungsverleih optional.', price: 'CHF 590.–' },
                { title: 'Rescue Diver', icon: 'fas fa-crown', description: 'Sicherheit, Stressmanagement, Rettungstechniken, 2 Tage, inkl. Szenarien.', price: 'CHF 590.–' },
                { title: 'Dive Master', icon: 'fas fa-crown', description: 'Führungskurs. Theorie, Pool, Praktikum.', price: 'CHF 1,290.–' }
            ],
            features: [
                'Professionelle Anleitung',
                'Komplette Ausrüstung inklusive',
                'Zertifizierungsmaterialien',
                'Individuelle Betreuung',
                'Flexible Terminplanung'
            ],
            buttonText: 'Kontakt für Details',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Anfrage Tauchkurs'
        },
        'guided-tours': {
            title: 'Geführte Unterwasser-Abenteuer',
            description: 'Entdecke die schönsten Unterwasserorte mit persönlicher Führung. Perfekt für zertifizierte Taucher, die neue Plätze sicher erkunden und die lokale Fauna kennenlernen möchten.',
            pricing: [
                { title: '1 Tauchgang (Halber Tag)', icon: 'fas fa-sun', description: '1 geführter Tauchgang im lokalen See. Flasche und Blei inklusive.', price: 'CHF 90.–' },
                { title: '2 Tauchgänge (Ganzer Tag)', icon: 'fas fa-calendar-day', description: '2 geführte Tauchgänge, Pause mit Snack. Flasche & Blei inklusive.', price: 'CHF 160.–' },
                { title: 'Nachttauchgang', icon: 'fas fa-moon', description: '1 Nachttauchgang mit Lampe inklusive. Fortgeschrittenenzertifikat erforderlich.', price: 'CHF 110.–' },
                { title: 'Wochenendpaket (4 Tauchgänge)', icon: 'fas fa-calendar-week', description: '2 Tauchgänge/Tag am Wochenende (Sa & So). Ausrüstung extra.', price: 'CHF 290.–' },
                { title: 'Privater Tauchgang (1:1)', icon: 'fas fa-user-friends', description: 'Vollständig private Führung – Termin und Ort nach Wahl.', price: 'CHF 150.–' }
            ],
            features: [
                'Professioneller Guide',
                'Ausrüstungsverleih',
                'Bestimmung der Meeresfauna',
                'Sicherheitsbriefing',
                'Tipps zur Unterwasserfotografie'
            ],
            buttonText: 'Tour buchen',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Buchung Geführte Tour'
        },
        'underwater-work': {
            title: 'Professionelle Unterwasser-Dienstleistungen',
            description: 'Spezialisierte Unterwasserarbeiten für gewerbliche und Umweltprojekte. Technische Expertise für sichere und effiziente Einsätze.',
            pricing: [
                { title: 'Inspektion & Überwachung', icon: 'fas fa-eye', description: 'Visuelle Inspektionen, Video-/Fotodokumentation, Strukturbeurteilungen.', price: 'ab CHF 150.–/Stunde' },
                { title: 'Unterstützung bei Unterwasserbau', icon: 'fas fa-hard-hat', description: 'Unterstützung bei Bau, Schweißen, Bohren, Anker setzen, Betonieren.', price: 'ab CHF 180.–/Stunde' },
                { title: 'Ausrüstungsinstallation', icon: 'fas fa-tools', description: 'Bojen, Sensoren, Pumpen, Rohrleitungen, Unterwassersysteme.', price: 'ab CHF 160.–/Stunde' },
                { title: 'Mooring & Ankerarbeiten', icon: 'fas fa-anchor', description: 'Installation, Wartung oder Entfernung von Ankersystemen, Ketten, etc.', price: 'ab CHF 140.–/Stunde' },
                { title: 'Such- & Bergungsaktionen', icon: 'fas fa-search', description: 'Verlorene Gegenstände, Werkzeuge, Boote, Fahrzeuge, Beweismittel, etc.', price: 'ab CHF 180.–/Stunde' },
                { title: 'Notfalleinsatz', icon: 'fas fa-exclamation-triangle', description: 'Schneller Einsatz für dringende Aufgaben (24/7 Service).', price: 'ab CHF 250.– pauschal + stündlich' }
            ],
            features: [
                'Technische Zertifizierung',
                'Sicherheitsprotokolle',
                'Umweltkonformität',
                'Detaillierte Berichte',
                'Versicherung inklusive'
            ],
            buttonText: 'Angebot anfordern',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Angebot Unterwasserarbeiten'
        },
        'ecology-course': {
            title: 'Meereswissenschaftlicher Kurs',
            description: 'Umfassender Kurs mit Theorie und praktischer Unterwasserforschung. Ideal für Studierende, Forscher und Naturschutzbegeisterte.',
            pricing: [
                { title: '1-Tages-Introkurs', icon: 'fas fa-microscope', description: 'Theorie + 1 geführter Ökologie-Tauchgang. Bestimmung & Techniken.', price: 'CHF 220.–' },
                { title: '2-Tages-Kurs', icon: 'fas fa-fish', description: 'Vertiefte Theorie + 2 geführte Tauchgänge zu Bestimmung und Erhebung.', price: 'CHF 380.–' },
                { title: 'Gruppenworkshop (ab 3 Pers.)', icon: 'fas fa-users', description: 'Individuelle Session für Schulen, Vereine oder Organisationen.', price: 'ab CHF 150.–/Person' }
            ],
            features: [
                '20 Stunden Theorie',
                '10 Praxistauchgänge',
                'Forschungsausrüstung gestellt',
                'Kursmaterial & Zertifikat',
                'Exkursion zur Meeresstation'
            ],
            buttonText: 'Jetzt anmelden',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Anmeldung Ökologiekurs'
        },
        'mindfulness': {
            title: 'Unterwasser-Meditation & Wellness',
            description: 'Verwandle dein Taucherlebnis in eine tiefgehende spirituelle Reise. Unsere Sessions verbinden die therapeutische Wirkung des Wassers mit alten Meditationstechniken.',
            pricing: [
                { title: 'Einzelsession', icon: 'fas fa-om', description: 'Individuelles Unterwasser-Mindfulness-Erlebnis', price: 'Auf Anfrage' },
                { title: 'Gruppensession', icon: 'fas fa-spa', description: 'Geteilte Meditationserfahrung mit anderen', price: 'Auf Anfrage' },
                { title: 'Retreat-Programm', icon: 'fas fa-users', description: 'Verlängertes Retreat-Erlebnis', price: 'Auf Anfrage' }
            ],
            features: [
                'Stressreduktion',
                'Atembewusstsein',
                'Tiefe Naturverbundenheit',
                'Mentale Klarheit',
                'Professionelle Anleitung'
            ],
            buttonText: 'Preis anfragen',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Buchung Mindfulness Session'
        },
        'photography': {
            title: 'Professionelle Unterwasserfotografie',
            description: 'Bewahre deine Unterwassererinnerungen mit hochwertigen Profi-Fotos.',
            pricing: [
                { title: 'Basis-Paket', icon: 'fas fa-camera', description: '30 Minuten, 10 bearbeitete Fotos', price: 'Auf Anfrage' },
                { title: 'Standard-Paket', icon: 'fas fa-camera-retro', description: '1 Stunde, 25 bearbeitete Fotos', price: 'Auf Anfrage' },
                { title: 'Premium-Paket', icon: 'fas fa-film', description: '2 Stunden, 50 Fotos + Video', price: 'Auf Anfrage' }
            ],
            features: [
                'Professionelle Ausrüstung',
                'Hochauflösende Bilder',
                'Professionelle Bearbeitung',
                'Digitale Lieferung',
                'Druckfertige Dateien'
            ],
            buttonText: 'Preis anfragen',
            buttonAction: 'mailto:contact@athelas-diving.com?subject=Buchung Fotosession'
        }
    };

    let serviceData = serviceData_en;
    if (lang === 'fr') serviceData = serviceData_fr;
    if (lang === 'it') serviceData = serviceData_it;
    if (lang === 'de') serviceData = serviceData_de;
    
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