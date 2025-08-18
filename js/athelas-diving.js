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
    
    // Improved language detection
    let lang = 'en';
    
    // Try to detect language from URL path
    const path = window.location.pathname;
    if (path.includes('/fr/')) {
        lang = 'fr';
    } else if (path.includes('/it/')) {
        lang = 'it';
    } else if (path.includes('/de/')) {
        lang = 'de';
    } else if (path.includes('/en/')) {
        lang = 'en';
    } else {
        // Fallback to document language or default to English
        lang = document.documentElement.lang || 'en';
    }

    const serviceData_en = {
        'dive-courses': {
            title: 'Professional Diving Education',
            description: 'Comprehensive diving courses designed to take you from complete beginner to professional level. Personalized training with individual attention.',
            pricing: [
                {
                    title: 'Open Water Diver',
                    icon: 'fas fa-star',
                    description: 'Full entry-level certification. 5 pool sessions, 4 open water dives, eLearning.',
                    price: 'CHF 650.–'
                },
                {
                    title: 'Advanced Adventure Diver',
                    icon: 'fas fa-star',
                    description: '5 adventure dives (e.g., deep, navigation, night), gear rental optional.',
                    price: 'CHF 450.–'
                },
                {
                    title: 'Rescue Diver',
                    icon: 'fas fa-crown',
                    description: 'Safety, stress management, rescue techniques, 2 days, incl. scenarios.',
                    price: 'CHF 700.–'
                },
                {
                    title: 'Dive Master',
                    icon: 'fas fa-crown',
                    description: 'Leadership-level course. Includes theory, pool work, internships.',
                    price: 'CHF 1,200.– to 1,800.–'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Dive Courses Inquiry'
        },
        'diving-initiation': {
            title: 'Diving Initiation',
            description: 'Perfect introduction to scuba diving for beginners. Experience the underwater world safely with professional guidance.',
            pricing: [
                {
                    title: 'Diving Initiation',
                    icon: 'fas fa-star',
                    description: 'Perfect introduction to scuba diving for beginners. Experience the underwater world safely with professional guidance.',
                    price: 'CHF 150.– per person'
                }
            ],
            features: [
                'Professional instruction',
                'All equipment provided',
                'Safety briefing',
                'Pool session',
                'Open water experience'
            ],
            buttonText: 'Book Your Initiation',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Diving Initiation Booking'
        },
        'guided-tours': {
            title: 'Expert-Guided Underwater Adventures',
            description: 'Discover the most beautiful underwater locations with personalized guidance. Perfect for certified divers who want to explore new sites safely and learn about local marine life.',
            pricing: [
                {
                    title: 'Guided Tours',
                    icon: 'fas fa-map-marked-alt',
                    description: 'Customized guided diving tours. Pricing depends on location, duration, and group size.',
                    price: 'On Request'
                }
            ],
            features: [
                'Professional guide',
                'Equipment rental',
                'Marine life identification',
                'Safety briefing',
                'Underwater photography tips'
            ],
            buttonText: 'Request Quote',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Guided Tour Quote Request'
        },
        'underwater-work-ecology': {
            title: 'Aquatic Ecology & Underwater Work',
            description: 'Marine science education and professional underwater services. From comprehensive ecology courses covering species identification, research techniques, and environmental conservation to technical diving solutions.',
            pricing: [
                {
                    title: 'Underwater Work Services',
                    icon: 'fas fa-hard-hat',
                    description: 'Professional underwater services including equipment setup, environmental surveillance, and technical diving solutions.',
                    price: 'On Request'
                },
                {
                    title: 'Group Ecology Courses',
                    icon: 'fas fa-users',
                    description: 'Customizable courses for groups. Pricing varies based on course length and content.',
                    price: 'CHF 100.– to 250.– per person'
                },
                {
                    title: 'Individual Ecology Courses',
                    icon: 'fas fa-user',
                    description: 'Personalized ecology courses tailored to individual needs and interests.',
                    price: 'Contact me'
                }
            ],
            features: [
                'Technical diving certification',
                'Safety protocols',
                'Environmental compliance',
                '20 hours of classroom instruction',
                '10 practical diving sessions',
                'Research equipment provided',
                'Course materials and certification',
                'Field trip to marine research station'
            ],
            buttonText: 'Contact for Details',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Underwater Work & Ecology Inquiry'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Mindfulness Session Booking'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Photography Session Booking'
        }
    };
    
    const serviceData_fr = {
        'dive-courses': {
            title: 'Formation Professionnelle de Plongée',
            description: 'Cours de plongée complets de débutant à professionnel. Formation personnalisée avec attention individuelle.',
            pricing: [
                { title: 'Plongeur Open Water', icon: 'fas fa-star', description: 'Certification de base. 5 sessions en piscine, 4 plongées en eau libre, eLearning.', price: 'CHF 650.–' },
                { title: 'Plongeur Advanced Adventure', icon: 'fas fa-star', description: '5 plongées d\'aventure (profonde, navigation, nuit), location d\'équipement optionnelle.', price: 'CHF 450.–' },
                { title: 'Plongeur Rescue', icon: 'fas fa-crown', description: 'Sécurité, gestion du stress, techniques de sauvetage, 2 jours, scénarios inclus.', price: 'CHF 700.–' },
                { title: 'Divemaster', icon: 'fas fa-crown', description: 'Cours de leadership. Théorie, piscine, stage.', price: 'CHF 1,200.– à 1,800.–' }
            ],
            features: [
                'Instruction professionnelle',
                'Équipement complet fourni',
                'Matériaux de certification',
                'Attention individuelle',
                'Planning flexible'
            ],
            buttonText: 'Contactez-nous pour les détails',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Demande de Formation Sub'
        },
        'diving-initiation': {
            title: 'Initiation à la Plongée',
            description: 'Introduction parfaite à la plongée sous-marine pour les débutants. Découvrez le monde sous-marin en toute sécurité avec un guide professionnel.',
            pricing: [
                { title: 'Initiation à la Plongée', icon: 'fas fa-star', description: 'Introduction parfaite à la plongée sous-marine pour les débutants. Découvrez le monde sous-marin en toute sécurité avec un guide professionnel.', price: 'CHF 150.– par personne' }
            ],
            features: [
                'Instruction professionnelle',
                'Équipement complet fourni',
                'Briefing de sécurité',
                'Session en piscine',
                'Expérience en eau libre'
            ],
            buttonText: 'Réservez votre initiation',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Réservation Initiation Plongée'
        },
        'guided-tours': {
            title: 'Aventures Sous-Marines Guidées',
            description: 'Découvrez les sites sous-marins les plus beaux avec une guilde experte. Parfait pour les plongeurs certifiés qui souhaitent explorer de nouveaux sites en toute sécurité et découvrir la faune locale.',
            pricing: [
                { title: 'Tours Guidés', icon: 'fas fa-map-marked-alt', description: 'Tours de plongée guidés personnalisés. Le prix dépend de l\'emplacement, de la durée et de la taille du groupe.', price: 'Sur demande' }
            ],
            features: [
                'Guide professionnel',
                'Location d\'équipement',
                'Identification de la faune marine',
                'Briefing de sécurité',
                'Conseils en photographie sous-marine'
            ],
            buttonText: 'Réservez votre tour',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Réservation de Tour Guidé'
        },
        'underwater-work-ecology': {
            title: 'Écologie Aquatique & Travaux Sous-Marins',
            description: 'Formation en sciences marines et services sous-marins professionnels. Des cours complets d\'écologie couvrant l\'identification des espèces, les techniques de recherche et la conservation environnementale aux solutions de plongée technique.',
            pricing: [
                { title: 'Services de Travaux Sous-Marins', icon: 'fas fa-hard-hat', description: 'Services sous-marins professionnels incluant la configuration d\'équipement, la surveillance environnementale et les solutions de plongée technique.', price: 'Sur demande' },
                { title: 'Cours d\'Écologie de Groupe', icon: 'fas fa-users', description: 'Cours personnalisables pour les groupes. Le prix varie selon la durée et le contenu du cours.', price: 'CHF 100.– à 250.– par personne' },
                { title: 'Cours d\'Écologie Individuels', icon: 'fas fa-user', description: 'Cours d\'écologie personnalisés adaptés aux besoins et intérêts individuels.', price: 'Contactez-moi' }
            ],
            features: [
                'Certification technique',
                'Protocoles de sécurité',
                'Conformité environnementale',
                '20 heures de théorie',
                '10 plongées pratiques',
                'Équipement de recherche fourni',
                'Matériaux et certification',
                'Excursion à la station marine'
            ],
            buttonText: 'Contactez-nous pour les détails',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Demande Travaux Sous-Marins & Écologie'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Réservation de Session Mindfulness'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Réservation de Session de Photographie'
        }
    };

    const serviceData_it = {
        'dive-courses': {
            title: 'Formazione Subacquea Professionale',
            description: 'Corsi di immersione completi dal principiante al livello professionale. Formazione personalizzata con attenzione individuale.',
            pricing: [
                { title: 'Subacqueo Open Water', icon: 'fas fa-star', description: 'Certificazione base. 5 sessioni in piscina, 4 immersioni in acque libere, eLearning.', price: 'CHF 650.–' },
                { title: 'Subacqueo Advanced Adventure', icon: 'fas fa-star', description: '5 immersioni avventura (profonda, navigazione, notturna, ecc.), noleggio attrezzatura opzionale.', price: 'CHF 450.–' },
                { title: 'Subacqueo Rescue', icon: 'fas fa-crown', description: 'Sicurezza, gestione dello stress, tecniche di salvataggio, 2 giorni, scenari inclusi.', price: 'CHF 700.–' },
                { title: 'Divemaster', icon: 'fas fa-crown', description: 'Corso di leadership. Teoria, piscina, tirocinio.', price: 'CHF 1,200.– a 1,800.–' }
            ],
            features: [
                'Istruttore professionale',
                'Tutta l’attrezzatura fornita',
                'Materiali di certificazione',
                'Attenzione individuale',
                'Orari flessibili'
            ],
            buttonText: 'Contattaci per dettagli',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Richiesta Corso Sub'
        },
        'diving-initiation': {
            title: 'Iniziazione Subacquea',
            description: 'Introduzione perfetta alla subacquea per principianti. Vivi l\'esperienza del mondo sottomarino in sicurezza con una guida professionale.',
            pricing: [
                { title: 'Iniziazione Subacquea', icon: 'fas fa-star', description: 'Introduzione perfetta alla subacquea per principianti. Vivi l\'esperienza del mondo sottomarino in sicurezza con una guida professionale.', price: 'CHF 150.– per persona' }
            ],
            features: [
                'Istruttore professionale',
                'Tutta l\'attrezzatura fornita',
                'Briefing di sicurezza',
                'Sessione in piscina',
                'Esperienza in acque libere'
            ],
            buttonText: 'Prenota la tua iniziazione',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Prenotazione Iniziazione Subacquea'
        },
        'guided-tours': {
            title: 'Avventure Subacquee Guidate',
            description: 'Scopri i siti subacquei più belli con una guida esperta. Perfetto per sub certificati che vogliono esplorare nuovi luoghi in sicurezza e conoscere la fauna locale.',
            pricing: [
                { title: 'Tour Guidati', icon: 'fas fa-map-marked-alt', description: 'Tour di immersione guidati personalizzati. Il prezzo dipende dalla posizione, dalla durata e dalla dimensione del gruppo.', price: 'Su richiesta' }
            ],
            features: [
                'Guida professionale',
                'Noleggio attrezzatura',
                'Identificazione fauna marina',
                'Briefing sicurezza',
                'Consigli fotografia subacquea'
            ],
            buttonText: 'Prenota il tuo tour',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Prenotazione Tour Guidato'
        },
        'underwater-work-ecology': {
            title: 'Ecologia Acquatica & Lavori Subacquei',
            description: 'Formazione in scienze marine e servizi subacquei professionali. Dai corsi completi di ecologia che coprono l\'identificazione delle specie, le tecniche di ricerca e la conservazione ambientale alle soluzioni di immersione tecnica.',
            pricing: [
                { title: 'Servizi di Lavoro Subacqueo', icon: 'fas fa-hard-hat', description: 'Servizi subacquei professionali inclusi configurazione attrezzature, sorveglianza ambientale e soluzioni di immersione tecnica.', price: 'Su richiesta' },
                { title: 'Corsi di Ecologia di Gruppo', icon: 'fas fa-users', description: 'Corsi personalizzabili per gruppi. Il prezzo varia in base alla durata e al contenuto del corso.', price: 'CHF 100.– a 250.– per persona' },
                { title: 'Corsi di Ecologia Individuali', icon: 'fas fa-user', description: 'Corsi di ecologia personalizzati adattati alle esigenze e agli interessi individuali.', price: 'Contattami' }
            ],
            features: [
                'Certificazione tecnica',
                'Protocolli di sicurezza',
                'Rispetto ambientale',
                '20 ore di teoria',
                '10 immersioni pratiche',
                'Attrezzatura di ricerca fornita',
                'Materiali e certificazione',
                'Uscita presso stazione marina'
            ],
            buttonText: 'Contattaci per dettagli',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Richiesta Lavori Subacquei & Ecologia'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Prenotazione Sessione Mindfulness'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Prenotazione Sessione Foto'
        }
    };

    const serviceData_de = {
        'dive-courses': {
            title: 'Professionelle Tauchausbildung',
            description: 'Umfassende Tauchkurse vom Anfänger bis zum Profi. Individuelle Betreuung und persönliche Ausbildung.',
            pricing: [
                { title: 'Open Water Taucher', icon: 'fas fa-star', description: 'Einstiegszertifikat. 5 Pool-Sessions, 4 Freiwassertauchgänge, eLearning.', price: 'CHF 650.–' },
                { title: 'Advanced Adventure Taucher', icon: 'fas fa-star', description: '5 Abenteuertauchgänge (z.B. Tiefe, Navigation, Nacht), Ausrüstungsverleih optional.', price: 'CHF 450.–' },
                { title: 'Rescue Taucher', icon: 'fas fa-crown', description: 'Sicherheit, Stressmanagement, Rettungstechniken, 2 Tage, inkl. Szenarien.', price: 'CHF 700.–' },
                { title: 'Divemaster', icon: 'fas fa-crown', description: 'Führungskurs. Theorie, Pool, Praktikum.', price: 'CHF 1,200.– bis 1,800.–' }
            ],
            features: [
                'Professionelle Anleitung',
                'Komplette Ausrüstung inklusive',
                'Zertifizierungsmaterialien',
                'Individuelle Betreuung',
                'Flexible Terminplanung'
            ],
            buttonText: 'Kontakt für Details',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Anfrage Tauchkurs'
        },
        'diving-initiation': {
            title: 'Tauch-Initiation',
            description: 'Perfekte Einführung ins Tauchen für Anfänger. Erlebe die Unterwasserwelt sicher mit professioneller Anleitung.',
            pricing: [
                { title: 'Tauch-Initiation', icon: 'fas fa-star', description: 'Perfekte Einführung ins Tauchen für Anfänger. Erlebe die Unterwasserwelt sicher mit professioneller Anleitung.', price: 'CHF 150.– pro Person' }
            ],
            features: [
                'Professionelle Anleitung',
                'Komplette Ausrüstung inklusive',
                'Sicherheitsbriefing',
                'Pool-Session',
                'Freiwassererfahrung'
            ],
            buttonText: 'Initiation buchen',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Buchung Tauch-Initiation'
        },
        'guided-tours': {
            title: 'Geführte Unterwasser-Abenteuer',
            description: 'Entdecke die schönsten Unterwasserorte mit persönlicher Führung. Perfekt für zertifizierte Taucher, die neue Plätze sicher erkunden und die lokale Fauna kennenlernen möchten.',
            pricing: [
                { title: 'Geführte Touren', icon: 'fas fa-map-marked-alt', description: 'Personalisierte geführte Tauchtouren. Preis hängt von Standort, Dauer und Gruppengröße ab.', price: 'Auf Anfrage' }
            ],
            features: [
                'Professioneller Guide',
                'Ausrüstungsverleih',
                'Bestimmung der Meeresfauna',
                'Sicherheitsbriefing',
                'Tipps zur Unterwasserfotografie'
            ],
            buttonText: 'Tour buchen',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Buchung Geführte Tour'
        },
        'underwater-work-ecology': {
            title: 'Aquatische Ökologie & Unterwasserarbeiten',
            description: 'Meereswissenschaftsausbildung und professionelle Unterwasser-Dienstleistungen. Von umfassenden Ökologiekursen, die Artenidentifikation, Forschungstechniken und Umweltschutz abdecken, bis hin zu technischen Tauchlösungen.',
            pricing: [
                { title: 'Unterwasser-Arbeitsdienste', icon: 'fas fa-hard-hat', description: 'Professionelle Unterwasser-Dienstleistungen einschließlich Ausrüstungseinrichtung, Umweltüberwachung und technische Tauchlösungen.', price: 'Auf Anfrage' },
                { title: 'Ökologie-Gruppenkurse', icon: 'fas fa-users', description: 'Anpassbare Kurse für Gruppen. Preis variiert je nach Kursdauer und -inhalt.', price: 'CHF 100.– bis 250.– pro Person' },
                { title: 'Ökologie-Einzelkurse', icon: 'fas fa-user', description: 'Personalisierte Ökologiekurse, die auf individuelle Bedürfnisse und Interessen zugeschnitten sind.', price: 'Kontaktiere mich' }
            ],
            features: [
                'Technische Zertifizierung',
                'Sicherheitsprotokolle',
                'Umweltkonformität',
                '20 Stunden Theorie',
                '10 Praxistauchgänge',
                'Forschungsausrüstung gestellt',
                'Kursmaterial & Zertifikat',
                'Exkursion zur Meeresstation'
            ],
            buttonText: 'Kontakt für Details',
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Anfrage Aquatische Ökologie & Unterwasserarbeiten'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Buchung Mindfulness Session'
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
            buttonAction: 'mailto:athelas-diving@oceantoearth.life?subject=Buchung Fotosession'
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