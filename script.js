// Comuni di Catania
const comuniCatania = [
    'Aci Bonaccorsi', 'Aci Castello', 'Aci Catena', 'Aci Sant\'Antonio', 'Acireale',
    'Adrano', 'Belpasso', 'Biancavilla', 'Bronte', 'Calatabiano', 'Caltagirone',
    'Camporotondo Etneo', 'Castel di Iudica', 'Castiglione di Sicilia', 'Catania',
    'Fiumefreddo di Sicilia', 'Giarre', 'Gravina di Catania', 'Grammichele',
    'Licodia Eubea', 'Linguaglossa', 'Maletto', 'Maniace', 'Mascali', 'Mascalucia',
    'Mazzarrone', 'Militello in Val di Catania', 'Milo', 'Mineo', 'Mirabella Imbaccari',
    'Misterbianco', 'Motta Sant\'Anastasia', 'Nicolosi', 'Palagonia', 'Paterno',
    'Pedara', 'Piedimonte Etneo', 'Ragalna', 'Ramacca', 'Randazzo', 'Riposto',
    'San Cono', 'San Giovanni la Punta', 'San Gregorio di Catania', 'San Michele di Ganzaria',
    'San Pietro Clarenza', 'Sant\'Agata li Battiati', 'Sant\'Alfio', 'Santa Maria di Licodia',
    'Santa Venerina', 'Scordia', 'Trecastagni', 'Tremestieri Etneo', 'Valverde',
    'Viagrande', 'Vizzini', 'Zafferana Etnea'
];

// Utility function to create slug from comune name
function getSlugFromComune(comune) {
    return comune
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/\s+/g, '-')
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u');
}

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const dropdown = document.querySelector('.dropdown');
const dropdownBtn = document.querySelector('.dropdown-btn');
const comuniGrid = document.getElementById('comuni-grid');
const particlesContainer = document.getElementById('particles-container');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeMobileMenu();
    initializeDropdown();
    populateComuni();
    initializeParticles();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeIntersectionObserver();
});

// Header scroll effect
function initializeHeader() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Dropdown functionality
function initializeDropdown() {
    dropdownBtn.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Populate comuni in dropdown
function populateComuni() {
    comuniCatania.forEach((comune, index) => {
        const link = document.createElement('a');
        link.href = `sgombero-${getSlugFromComune(comune)}.html`;
        link.textContent = comune;
        link.style.animationDelay = `${index * 0.02}s`;
        
        // Add click event to close dropdown
        link.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
        
        comuniGrid.appendChild(link);
    });
}

// Particle system
function initializeParticles() {
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 200);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 800);
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .why-us-card, .feature-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for advanced animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.service-features li, .gallery-item, .why-us-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Performance optimizations
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Phone number click tracking (for analytics)
function trackPhoneClick() {
    // Add your analytics tracking code here
    console.log('Phone number clicked');
}

// WhatsApp click tracking (for analytics)
function trackWhatsAppClick() {
    // Add your analytics tracking code here
    console.log('WhatsApp button clicked');
}

// Add event listeners for tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="tel:"]')) {
        trackPhoneClick();
    }
    
    if (e.target.closest('a[href*="wa.me"]')) {
        trackWhatsAppClick();
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/IMG-20250629-WA0025.jpg',
        'assets/IMG-20250629-WA0028.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu and dropdown
    if (e.key === 'Escape') {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        dropdown.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
manageFocus();

console.log('TR Trasporti website initialized successfully! 🚛');