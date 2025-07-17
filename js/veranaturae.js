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

// Name Modal Functions
function openNameModal() {
    const modal = document.getElementById('nameModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeNameModal() {
    const modal = document.getElementById('nameModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Service Modal System
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = document.getElementById('modalClose');
    
    const serviceData = {
        'en': {
            'coaching': {
                title: '1:1 Mindfulness Coaching',
                description: 'Step into a more balanced life with personal guidance. Whether you\'re new to mindfulness or deepening an existing practice, my individual coaching sessions are designed around your unique goals and life rhythm. Together, we\'ll cultivate presence, resilience, and self-awareness - one mindful breath at a time.',
                pricing: [
                    {
                        title: 'Individual Session',
                        icon: 'fas fa-user',
                        description: '1-hour personalized mindfulness session',
                        price: 'CHF 70'
                    },
                    {
                        title: '4-Session Package',
                        icon: 'fas fa-calendar-check',
                        description: '4 sessions of 1 hour each',
                        price: 'CHF 280'
                    },
                    {
                        title: '8-Session Package',
                        icon: 'fas fa-star',
                        description: '8 sessions of 1 hour each',
                        price: 'CHF 480'
                    }
                ],
                features: [
                    'Personalized approach',
                    '30 min discovery session included',
                    'Follow-up support',
                    'Flexible scheduling',
                    'Progress tracking'
                ],
                buttonText: 'Book Your Session',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=1:1 Coaching Inquiry'
            },
            'retreat': {
                title: 'Mindfulness Retreats',
                description: 'Escape the noise and reconnect with yourself. Join one of my small-group mindfulness retreats in the tranquil surroundings of Bern. These weekend or multi-day retreats offer space for deep rest, guided meditation, mindful movement, and time in nature, so you return refreshed and inspired.',
                pricing: [
                    {
                        title: 'Group Retreat (2 people)',
                        icon: 'fas fa-users',
                        description: 'Shared retreat experience for 2 people',
                        price: 'CHF 250 per person'
                    },
                    {
                        title: 'Private Retreat (1 person)',
                        icon: 'fas fa-user-friends',
                        description: 'Individual retreat experience',
                        price: 'CHF 300 per person'
                    }
                ],
                features: [
                    'Vegetarian meals included',
                    'Comfortable accommodation',
                    'Guided meditation sessions',
                    'Mindful movement classes',
                    'Nature walks and activities'
                ],
                buttonText: 'Book Your Retreat',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Retreat Booking'
            },
            'work': {
                title: 'Mindfulness at Work',
                description: 'Boost your team\'s well-being, focus, and collaboration. My tailored mindfulness workshops and corporate sessions bring clarity and calm into the workplace. Help your team reduce stress, manage change, and enhance emotional intelligence, right at the heart of your organization.',
                pricing: [
                    {
                        title: 'Workshop (2 hours)',
                        icon: 'fas fa-chalkboard-teacher',
                        description: '2-hour workshop for up to 15 people',
                        price: 'CHF 400'
                    },
                    {
                        title: 'Program (8 sessions)',
                        icon: 'fas fa-calendar-alt',
                        description: '8 sessions of 1 hour each for up to 10 people',
                        price: 'CHF 2,500'
                    }
                ],
                features: [
                    'Tailored to your organization',
                    'Stress reduction techniques',
                    'Team building exercises',
                    'Leadership development',
                    'Ongoing support'
                ],
                buttonText: 'Contact for Details',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Workplace Mindfulness'
            },
            'yoga': {
                title: 'Yoga and Breathwork',
                description: 'Slow down, soften, and breathe. Yoga and breathwork are powerful allies on the path to mindfulness. In these sessions, we combine gentle, conscious movement with guided breathing techniques to help you release stress, calm the mind, and return to your inner center.',
                pricing: [
                    {
                        title: 'Private Session',
                        icon: 'fas fa-user',
                        description: '1-hour private yoga and breathwork session',
                        price: 'CHF 40'
                    },
                    {
                        title: 'Group Session',
                        icon: 'fas fa-users',
                        description: '1-hour group session for up to 10 people',
                        price: 'CHF 25 per person'
                    }
                ],
                features: [
                    'Gentle movement',
                    'Breathing techniques',
                    'Stress relief',
                    'Mind-body connection',
                    'All levels welcome'
                ],
                buttonText: 'Book Your Session',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Yoga Session'
            },
            'underwater': {
                title: 'Underwater Mindfulness',
                description: 'Experience mindfulness in a unique underwater environment. Connect with the serene underwater world while practicing mindfulness techniques. This innovative approach combines the calming effects of water with traditional mindfulness practices, creating a truly immersive and transformative experience.',
                pricing: [
                    {
                        title: 'Underwater Session',
                        icon: 'fas fa-water',
                        description: 'Guided underwater mindfulness experience',
                        price: 'Contact for Pricing'
                    }
                ],
                features: [
                    'Collaboration with Athelas Diving',
                    'Unique underwater environment',
                    'Professional diving guidance',
                    'Mindfulness instruction',
                    'Safety equipment provided'
                ],
                buttonText: 'Contact for Details',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Underwater Mindfulness'
            },
            'ayurveda': {
                title: 'Ayurveda Wellness',
                description: 'Discover the ancient wisdom of Ayurvedic healing. Coming soon! Explore the holistic approach to wellness through Ayurveda, the traditional Indian system of medicine. Learn about your unique constitution and how to balance mind, body, and spirit through natural practices and lifestyle adjustments.',
                pricing: [
                    {
                        title: 'Ayurveda Consultation',
                        icon: 'fas fa-leaf',
                        description: 'Personalized wellness consultation',
                        price: 'Coming Soon'
                    }
                ],
                features: [
                    'Constitution assessment',
                    'Lifestyle recommendations',
                    'Natural healing practices',
                    'Holistic wellness approach',
                    'Ongoing support'
                ],
                buttonText: 'Stay Updated',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Ayurveda Interest'
            }
        },
        'fr': {
            'coaching': {
                title: 'Coaching Pleine Conscience 1:1',
                description: 'Accédez à une vie plus équilibrée avec un accompagnement personnalisé. Que vous soyez nouveau dans la pleine conscience ou que vous approfondissiez une pratique existante, mes sessions de coaching individuelles sont conçues autour de vos objectifs uniques et du rythme de votre vie. Ensemble, nous cultiverons la présence, la résilience et la conscience de soi - une respiration consciente à la fois.',
                pricing: [
                    {
                        title: 'Séance Individuelle',
                        icon: 'fas fa-user',
                        description: 'Séance de pleine conscience personnalisée d\'1 heure',
                        price: 'CHF 70'
                    },
                    {
                        title: 'Parcours 4 Séances',
                        icon: 'fas fa-calendar-check',
                        description: '4 séances d\'1 heure chacune',
                        price: 'CHF 280'
                    },
                    {
                        title: 'Parcours 8 Séances',
                        icon: 'fas fa-star',
                        description: '8 séances d\'1 heure chacune',
                        price: 'CHF 480'
                    }
                ],
                features: [
                    'Approche personnalisée',
                    'Séance de découverte de 30 min incluse',
                    'Suivi et soutien',
                    'Planification flexible',
                    'Suivi des progrès'
                ],
                buttonText: 'Réserver Votre Séance',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Demande Coaching 1:1'
            },
            'retreat': {
                title: 'Retraites de Pleine Conscience',
                description: 'Échappez au bruit et reconnectez-vous avec vous-même. Rejoignez l\'une de mes retraites de pleine conscience en petit groupe dans les environs paisibles de Berne. Ces retraites de week-end ou de plusieurs jours offrent un espace pour un repos profond, la méditation guidée, le mouvement conscient et du temps dans la nature, afin que vous reveniez rafraîchi et inspiré.',
                pricing: [
                    {
                        title: 'Retraite Groupe (2 personnes)',
                        icon: 'fas fa-users',
                        description: 'Expérience de retraite partagée pour 2 personnes',
                        price: 'CHF 250 par personne'
                    },
                    {
                        title: 'Retraite Privée (1 personne)',
                        icon: 'fas fa-user-friends',
                        description: 'Expérience de retraite individuelle',
                        price: 'CHF 300 par personne'
                    }
                ],
                features: [
                    'Repas végétariens inclus',
                    'Hébergement confortable',
                    'Sessions de méditation guidée',
                    'Cours de mouvement conscient',
                    'Promenades et activités dans la nature'
                ],
                buttonText: 'Réserver Votre Retraite',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Réservation Retraite'
            },
            'work': {
                title: 'Pleine Conscience au Travail',
                description: 'Améliorez le bien-être, la concentration et la collaboration de votre équipe. Mes ateliers de pleine conscience personnalisés et mes sessions d\'entreprise apportent clarté et calme sur le lieu de travail. Aidez votre équipe à réduire le stress, gérer le changement et améliorer l\'intelligence émotionnelle, directement au cœur de votre organisation.',
                pricing: [
                    {
                        title: 'Atelier (2 heures)',
                        icon: 'fas fa-chalkboard-teacher',
                        description: 'Atelier de 2 heures pour jusqu\'à 15 personnes',
                        price: 'CHF 400'
                    },
                    {
                        title: 'Programme (8 séances)',
                        icon: 'fas fa-calendar-alt',
                        description: '8 séances d\'1 heure chacune pour jusqu\'à 10 personnes',
                        price: 'CHF 2,500'
                    }
                ],
                features: [
                    'Adapté à votre organisation',
                    'Techniques de réduction du stress',
                    'Exercices de cohésion d\'équipe',
                    'Développement du leadership',
                    'Soutien continu'
                ],
                buttonText: 'Contact pour Détails',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Pleine Conscience en Entreprise'
            },
            'yoga': {
                title: 'Yoga et Respiration',
                description: 'Ralentissez, adoucissez et respirez. Le yoga et la respiration sont de puissants alliés sur le chemin de la pleine conscience. Dans ces sessions, nous combinons un mouvement conscient et doux avec des techniques de respiration guidées pour vous aider à libérer le stress, calmer l\'esprit et revenir à votre centre intérieur.',
                pricing: [
                    {
                        title: 'Séance Privée',
                        icon: 'fas fa-user',
                        description: 'Séance privée de yoga et respiration d\'1 heure',
                        price: 'CHF 40'
                    },
                    {
                        title: 'Séance Groupe',
                        icon: 'fas fa-users',
                        description: 'Séance de groupe d\'1 heure pour jusqu\'à 10 personnes',
                        price: 'CHF 25 par personne'
                    }
                ],
                features: [
                    'Mouvement doux',
                    'Techniques de respiration',
                    'Soulagement du stress',
                    'Connexion corps-esprit',
                    'Tous niveaux bienvenus'
                ],
                buttonText: 'Réserver Votre Séance',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Séance Yoga'
            },
            'underwater': {
                title: 'Pleine Conscience Sous-Marine',
                description: 'Expérimentez la pleine conscience dans un environnement sous-marin unique. Connectez-vous avec le monde sous-marin serein tout en pratiquant des techniques de pleine conscience. Cette approche innovante combine les effets apaisants de l\'eau avec les pratiques traditionnelles de pleine conscience, créant une expérience véritablement immersive et transformative.',
                pricing: [
                    {
                        title: 'Séance Sous-Marine',
                        icon: 'fas fa-water',
                        description: 'Expérience de pleine conscience sous-marine guidée',
                        price: 'Contact pour Tarifs'
                    }
                ],
                features: [
                    'Collaboration avec Athelas Diving',
                    'Environnement sous-marin unique',
                    'Guidance de plongée professionnelle',
                    'Instruction en pleine conscience',
                    'Équipement de sécurité fourni'
                ],
                buttonText: 'Contact pour Détails',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Pleine Conscience Sous-Marine'
            },
            'ayurveda': {
                title: 'Bien-être Ayurveda',
                description: 'Découvrez la sagesse ancienne de la guérison ayurvédique. Bientôt disponible ! Explorez l\'approche holistique du bien-être à travers l\'Ayurveda, le système traditionnel indien de médecine. Apprenez votre constitution unique et comment équilibrer l\'esprit, le corps et l\'âme grâce à des pratiques naturelles et des ajustements de mode de vie.',
                pricing: [
                    {
                        title: 'Consultation Ayurveda',
                        icon: 'fas fa-leaf',
                        description: 'Consultation de bien-être personnalisée',
                        price: 'Bientôt Disponible'
                    }
                ],
                features: [
                    'Évaluation de la constitution',
                    'Recommandations de mode de vie',
                    'Pratiques de guérison naturelle',
                    'Approche holistique du bien-être',
                    'Soutien continu'
                ],
                buttonText: 'Rester Informé',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Intérêt Ayurveda'
            }
        },
        'it': {
            'coaching': {
                title: 'Coaching Consapevolezza 1:1',
                description: 'Accedi a una vita più equilibrata con una guida personalizzata. Che tu sia nuovo alla mindfulness o che stia approfondendo una pratica esistente, le mie sessioni di coaching individuali sono progettate intorno ai tuoi obiettivi unici e al ritmo della tua vita. Insieme, coltiveremo presenza, resilienza e consapevolezza di sé - un respiro consapevole alla volta.',
                pricing: [
                    {
                        title: 'Sessione Individuale',
                        icon: 'fas fa-user',
                        description: 'Sessione di mindfulness personalizzata di 1 ora',
                        price: 'CHF 70'
                    },
                    {
                        title: 'Percorso 4 Sessioni',
                        icon: 'fas fa-calendar-check',
                        description: '4 sessioni di 1 ora ciascuna',
                        price: 'CHF 280'
                    },
                    {
                        title: 'Percorso 8 Sessioni',
                        icon: 'fas fa-star',
                        description: '8 sessioni di 1 ora ciascuna',
                        price: 'CHF 480'
                    }
                ],
                features: [
                    'Approccio personalizzato',
                    'Sessione di scoperta di 30 min inclusa',
                    'Supporto e follow-up',
                    'Pianificazione flessibile',
                    'Monitoraggio dei progressi'
                ],
                buttonText: 'Prenota la Tua Sessione',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Richiesta Coaching 1:1'
            },
            'retreat': {
                title: 'Ritiri di Consapevolezza',
                description: 'Fuggi dal rumore e riconnettiti con te stesso. Unisciti a uno dei miei ritiri di mindfulness in piccoli gruppi negli ambienti tranquilli di Berna. Questi ritiri di fine settimana o di più giorni offrono spazio per un riposo profondo, sessioni di meditazione guidata, movimento consapevole e tempo nella natura, così torni rinfrescato e ispirato.',
                pricing: [
                    {
                        title: 'Ritiro Gruppo (2 persone)',
                        icon: 'fas fa-users',
                        description: 'Esperienza di ritiro condivisa per 2 persone',
                        price: 'CHF 250 per persona'
                    },
                    {
                        title: 'Ritiro Privato (1 persona)',
                        icon: 'fas fa-user-friends',
                        description: 'Esperienza di ritiro individuale',
                        price: 'CHF 300 per persona'
                    }
                ],
                features: [
                    'Pasti vegetariani inclusi',
                    'Alloggio confortevole',
                    'Sessioni di meditazione guidata',
                    'Classi di movimento consapevole',
                    'Passeggiate e attività nella natura'
                ],
                buttonText: 'Prenota il Tuo Ritiro',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Prenotazione Ritiro'
            },
            'work': {
                title: 'Mindfulness al Lavoro',
                description: 'Migliora il benessere, la concentrazione e la collaborazione del tuo team. I miei workshop di mindfulness personalizzati e le sessioni aziendali portano chiarezza e calma sul posto di lavoro. Aiuta il tuo team a ridurre lo stress, gestire il cambiamento e migliorare l\'intelligenza emotiva, direttamente nel cuore della tua organizzazione.',
                pricing: [
                    {
                        title: 'Workshop (2 ore)',
                        icon: 'fas fa-chalkboard-teacher',
                        description: 'Workshop di 2 ore per fino a 15 persone',
                        price: 'CHF 400'
                    },
                    {
                        title: 'Programma (8 sessioni)',
                        icon: 'fas fa-calendar-alt',
                        description: '8 sessioni di 1 ora ciascuna per fino a 10 persone',
                        price: 'CHF 2,500'
                    }
                ],
                features: [
                    'Adattato alla tua organizzazione',
                    'Tecniche di riduzione dello stress',
                    'Esercizi di team building',
                    'Sviluppo della leadership',
                    'Supporto continuo'
                ],
                buttonText: 'Contatto per Dettagli',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Mindfulness in Azienda'
            },
            'yoga': {
                title: 'Yoga e Respirazione',
                description: 'Rallenta, ammorbidisci e respira. Lo yoga e la respirazione sono potenti alleati sul percorso della mindfulness. In queste sessioni, combiniamo movimento consapevole e gentile con tecniche di respirazione guidate per aiutarti a rilasciare lo stress, calmare la mente e tornare al tuo centro interiore.',
                pricing: [
                    {
                        title: 'Sessione Privata',
                        icon: 'fas fa-user',
                        description: 'Sessione privata di yoga e respirazione di 1 ora',
                        price: 'CHF 40'
                    },
                    {
                        title: 'Sessione Gruppo',
                        icon: 'fas fa-users',
                        description: 'Sessione di gruppo di 1 ora per fino a 10 persone',
                        price: 'CHF 25 per persona'
                    }
                ],
                features: [
                    'Movimento gentile',
                    'Tecniche di respirazione',
                    'Sollievo dallo stress',
                    'Connessione mente-corpo',
                    'Tutti i livelli benvenuti'
                ],
                buttonText: 'Prenota la Tua Sessione',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Sessione Yoga'
            },
            'underwater': {
                title: 'Mindfulness Subacquea',
                description: 'Sperimenta la mindfulness in un ambiente subacqueo unico. Connettiti con il sereno mondo subacqueo mentre pratichi tecniche di mindfulness. Questo approccio innovativo combina gli effetti calmanti dell\'acqua con le pratiche tradizionali di mindfulness, creando un\'esperienza veramente immersiva e trasformativa.',
                pricing: [
                    {
                        title: 'Sessione Subacquea',
                        icon: 'fas fa-water',
                        description: 'Esperienza di mindfulness subacquea guidata',
                        price: 'Contatto per Prezzi'
                    }
                ],
                features: [
                    'Collaborazione con Athelas Diving',
                    'Ambiente subacqueo unico',
                    'Guidance subacquea professionale',
                    'Istruzione mindfulness',
                    'Attrezzatura di sicurezza fornita'
                ],
                buttonText: 'Contatto per Dettagli',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Mindfulness Subacquea'
            },
            'ayurveda': {
                title: 'Benessere Ayurveda',
                description: 'Scopri l\'antica saggezza della guarigione ayurvedica. Prossimamente! Esplora l\'approccio olistico al benessere attraverso l\'Ayurveda, il sistema tradizionale indiano di medicina. Impara la tua costituzione unica e come bilanciare mente, corpo e spirito attraverso pratiche naturali e aggiustamenti dello stile di vita.',
                pricing: [
                    {
                        title: 'Consultazione Ayurveda',
                        icon: 'fas fa-leaf',
                        description: 'Consultazione benessere personalizzata',
                        price: 'Prossimamente'
                    }
                ],
                features: [
                    'Valutazione della costituzione',
                    'Raccomandazioni di stile di vita',
                    'Pratiche di guarigione naturale',
                    'Approccio olistico al benessere',
                    'Supporto continuo'
                ],
                buttonText: 'Rimani Aggiornato',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Interesse Ayurveda'
            }
        },
        'de': {
            'coaching': {
                title: '1:1 Achtsamkeits-Coaching',
                description: 'Betreten Sie ein ausgewogeneres Leben mit persönlicher Begleitung. Ob Sie neu in der Achtsamkeit sind oder eine bestehende Praxis vertiefen, meine individuellen Coaching-Sitzungen sind auf Ihre einzigartigen Ziele und den Rhythmus Ihres Lebens zugeschnitten. Gemeinsam kultivieren wir Präsenz, Widerstandsfähigkeit und Selbstbewusstsein - einen achtsamen Atemzug nach dem anderen.',
                pricing: [
                    {
                        title: 'Einzelsitzung',
                        icon: 'fas fa-user',
                        description: '1-stündige personalisierte Achtsamkeitssitzung',
                        price: 'CHF 70'
                    },
                    {
                        title: '4-Sitzungen Paket',
                        icon: 'fas fa-calendar-check',
                        description: '4 Sitzungen à 1 Stunde',
                        price: 'CHF 280'
                    },
                    {
                        title: '8-Sitzungen Paket',
                        icon: 'fas fa-star',
                        description: '8 Sitzungen à 1 Stunde',
                        price: 'CHF 480'
                    }
                ],
                features: [
                    'Personalisierter Ansatz',
                    '30 Min Kennenlern-Sitzung inklusive',
                    'Follow-up Unterstützung',
                    'Flexible Terminplanung',
                    'Fortschrittsverfolgung'
                ],
                buttonText: 'Ihre Sitzung Buchen',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=1:1 Coaching Anfrage'
            },
            'retreat': {
                title: 'Achtsamkeits-Retreats',
                description: 'Entfliehen Sie dem Lärm und verbinden Sie sich wieder mit sich selbst. Schließen Sie sich einem meiner Achtsamkeits-Retreats in kleinen Gruppen in der friedlichen Umgebung von Bern an. Diese Wochenend- oder mehrtägigen Retreats bieten Raum für tiefe Erholung, geführte Meditation, achtsame Bewegung und Zeit in der Natur, damit Sie erfrischt und inspirierte zurückkehren.',
                pricing: [
                    {
                        title: 'Gruppen-Retreat (2 Personen)',
                        icon: 'fas fa-users',
                        description: 'Geteilte Retreat-Erfahrung für 2 Personen',
                        price: 'CHF 250 pro Person'
                    },
                    {
                        title: 'Privat-Retreat (1 Person)',
                        icon: 'fas fa-user-friends',
                        description: 'Individuelle Retreat-Erfahrung',
                        price: 'CHF 300 pro Person'
                    }
                ],
                features: [
                    'Vegetarische Mahlzeiten inklusive',
                    'Komfortable Unterkunft',
                    'Geführte Meditationssitzungen',
                    'Achtsame Bewegungsklassen',
                    'Naturwanderungen und Aktivitäten'
                ],
                buttonText: 'Ihr Retreat Buchen',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Retreat Buchung'
            },
            'work': {
                title: 'Achtsamkeit bei der Arbeit',
                description: 'Steigern Sie das Wohlbefinden, die Konzentration und die Zusammenarbeit Ihres Teams. Meine maßgeschneiderten Achtsamkeits-Workshops und Unternehmenssitzungen bringen Klarheit und Ruhe an den Arbeitsplatz. Helfen Sie Ihrem Team, Stress zu reduzieren, Veränderungen zu bewältigen und die emotionale Intelligenz zu verbessern, direkt im Herzen Ihrer Organisation.',
                pricing: [
                    {
                        title: 'Workshop (2 Stunden)',
                        icon: 'fas fa-chalkboard-teacher',
                        description: '2-stündiger Workshop für bis zu 15 Personen',
                        price: 'CHF 400'
                    },
                    {
                        title: 'Programm (8 Sitzungen)',
                        icon: 'fas fa-calendar-alt',
                        description: '8 Sitzungen à 1 Stunde für bis zu 10 Personen',
                        price: 'CHF 2,500'
                    }
                ],
                features: [
                    'Auf Ihre Organisation zugeschnitten',
                    'Stressreduktionstechniken',
                    'Teambuilding-Übungen',
                    'Führungsentwicklung',
                    'Laufende Unterstützung'
                ],
                buttonText: 'Kontakt für Details',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Achtsamkeit am Arbeitsplatz'
            },
            'yoga': {
                title: 'Yoga und Atemarbeit',
                description: 'Verlangsamen Sie, werden Sie weicher und atmen Sie. Yoga und Atemarbeit sind mächtige Verbündete auf dem Weg zur Achtsamkeit. In diesen Sitzungen kombinieren wir sanfte, bewusste Bewegung mit geführten Atemtechniken, um Ihnen zu helfen, Stress abzubauen, den Geist zu beruhigen und zu Ihrem inneren Zentrum zurückzukehren.',
                pricing: [
                    {
                        title: 'Private Sitzung',
                        icon: 'fas fa-user',
                        description: '1-stündige private Yoga- und Atemarbeitssitzung',
                        price: 'CHF 40'
                    },
                    {
                        title: 'Gruppensitzung',
                        icon: 'fas fa-users',
                        description: '1-stündige Gruppensitzung für bis zu 10 Personen',
                        price: 'CHF 25 pro Person'
                    }
                ],
                features: [
                    'Sanfte Bewegung',
                    'Atemtechniken',
                    'Stressabbau',
                    'Körper-Geist-Verbindung',
                    'Alle Levels willkommen'
                ],
                buttonText: 'Ihre Sitzung Buchen',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Yoga Sitzung'
            },
            'underwater': {
                title: 'Unterwasser-Achtsamkeit',
                description: 'Erleben Sie Achtsamkeit in einer einzigartigen Unterwasserumgebung. Verbinden Sie sich mit der friedlichen Unterwasserwelt, während Sie Achtsamkeitstechniken praktizieren. Dieser innovative Ansatz kombiniert die beruhigenden Effekte des Wassers mit traditionellen Achtsamkeitspraktiken und schafft eine wirklich immersive und transformative Erfahrung.',
                pricing: [
                    {
                        title: 'Unterwasser-Sitzung',
                        icon: 'fas fa-water',
                        description: 'Geführte Unterwasser-Achtsamkeitserfahrung',
                        price: 'Kontakt für Preise'
                    }
                ],
                features: [
                    'Zusammenarbeit mit Athelas Diving',
                    'Einzigartige Unterwasserumgebung',
                    'Professionelle Tauchführung',
                    'Achtsamkeitsanweisung',
                    'Sicherheitsausrüstung bereitgestellt'
                ],
                buttonText: 'Kontakt für Details',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Unterwasser-Achtsamkeit'
            },
            'ayurveda': {
                title: 'Ayurveda-Wohlbefinden',
                description: 'Entdecken Sie die alte Weisheit der ayurvedischen Heilung. Demnächst verfügbar! Erkunden Sie den ganzheitlichen Ansatz zum Wohlbefinden durch Ayurveda, das traditionelle indische Medizinsystem. Lernen Sie Ihre einzigartige Konstitution kennen und wie Sie Geist, Körper und Seele durch natürliche Praktiken und Lebensstilanpassungen ausbalancieren können.',
                pricing: [
                    {
                        title: 'Ayurveda-Beratung',
                        icon: 'fas fa-leaf',
                        description: 'Personalisierte Wohlbefinden-Beratung',
                        price: 'Demnächst Verfügbar'
                    }
                ],
                features: [
                    'Konstitutionsbewertung',
                    'Lebensstil-Empfehlungen',
                    'Natürliche Heilpraktiken',
                    'Ganzheitlicher Wohlbefinden-Ansatz',
                    'Laufende Unterstützung'
                ],
                buttonText: 'Aktualisiert Bleiben',
                buttonAction: 'mailto:veronica@oceantoearth.life?subject=Ayurveda Interesse'
            }
        }
    };
    
    // Function to generate modal content
    function generateModalContent(serviceType) {
        // Get current language from localStorage or detect from URL
        let currentLang = localStorage.getItem('userLanguageChoice');
        if (!currentLang) {
            // Detect language from URL path
            const path = window.location.pathname;
            const langMatch = path.match(/\/([a-z]{2})\//);
            currentLang = langMatch ? langMatch[1] : 'en';
        }
        
        // Fallback to English if language not found
        if (!serviceData[currentLang]) {
            currentLang = 'en';
        }
        
        const data = serviceData[currentLang][serviceType];
        if (!data) return '';
        
        // Define service-specific background colors (matching original flip card colors)
        const serviceColors = {
            'coaching': 'linear-gradient(135deg, #a8c0ff 0%, #b8a9c9 100%)',
            'retreat': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'work': 'linear-gradient(135deg, #e8f4f8 0%, #d1e7dd 100%)',
            'yoga': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'underwater': 'linear-gradient(135deg, #a8c0ff 0%, #b8a9c9 100%)',
            'ayurveda': 'linear-gradient(135deg, #ffd1ff 0%, #fad0c4 100%)'
        };
        
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
        
        // Language-specific "What's Included" text
        const includedText = {
            'en': 'What\'s Included:',
            'fr': 'Ce qui est inclus :',
            'it': 'Cosa è incluso:',
            'de': 'Was ist inbegriffen:'
        };
        
        return `
            <div class="modal-content-wrapper" style="background: ${serviceColors[serviceType] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-description">${data.description}</p>
                
                <div class="modal-content-grid">
                    <div class="modal-pricing">
                        ${pricingHTML}
                    </div>
                    
                    <div class="modal-features">
                        <h5>${includedText[currentLang] || 'What\'s Included:'}</h5>
                        <ul>
                            ${featuresHTML}
                        </ul>
                    </div>
                </div>
                
                <div class="modal-cta">
                    <button class="btn-primary" onclick="window.location.href='${data.buttonAction}'">${data.buttonText}</button>
                </div>
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

// Close name modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('nameModal');
    const floatingServices = document.querySelector('.floating-services');
    
    if (modal.classList.contains('active') && 
        !modal.contains(event.target) && 
        !floatingServices.contains(event.target)) {
        closeNameModal();
    }
});

// Close name modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeNameModal();
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