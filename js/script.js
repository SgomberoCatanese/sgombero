// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeMobileMenu();
    initializeDropdown();
    initializeParticles();
    initializeSmoothScrolling();
    initializeComuni();
    console.log('Website initialized successfully! 🚀');
});

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById('header');
    
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
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle active class on menu
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-phone-btn');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Dropdown functionality
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdown && dropdownBtn && dropdownMenu) {
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
}

// Floating particles effect
function initializeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2px and 6px
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random animation duration between 6s and 12s
            const duration = Math.random() * 6 + 6;
            particle.style.animationDuration = duration + 's';
            
            // Random delay
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, (duration + 2) * 1000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 300);
        
        // Create initial particles
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Populate comuni dropdown
function initializeComuni() {
    const comuniGrid = document.getElementById('comuni-grid');
    
    if (comuniGrid) {
        const comuni = [
            'Catania', 'Acireale', 'Adrano', 'Belpasso', 'Biancavilla',
            'Bronte', 'Caltagirone', 'Giarre', 'Gravina di Catania', 'Mascalucia',
            'Misterbianco', 'Paternò', 'Randazzo', 'Riposto', 'San Giovanni la Punta',
            'San Pietro Clarenza', 'Sant\'Agata li Battiati', 'Tremestieri Etneo',
            'Aci Castello', 'Aci Catena', 'Aci Sant\'Antonio', 'Aci Bonaccorsi',
            'Nicolosi', 'Pedara', 'Trecastagni', 'Viagrande', 'Zafferana Etnea'
        ];
        
        comuni.forEach(comune => {
            const link = document.createElement('a');
            link.href = `#servizi`;
            link.textContent = comune;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Close dropdown
                document.querySelector('.dropdown').classList.remove('active');
                // Scroll to services
                const servicesSection = document.getElementById('servizi');
                if (servicesSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = servicesSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
            comuniGrid.appendChild(link);
        });
    }
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .why-us-card, .feature-card');
    animateElements.forEach(el => observer.observe(el));
}

// Phone number click tracking (for analytics)
function trackPhoneClick() {
    // You can add analytics tracking here
    console.log('Phone number clicked');
}

// WhatsApp click tracking (for analytics)
function trackWhatsAppClick() {
    // You can add analytics tracking here
    console.log('WhatsApp clicked');
}

// Add click tracking to phone and WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    phoneButtons.forEach(btn => {
        btn.addEventListener('click', trackPhoneClick);
    });
    
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', trackWhatsAppClick);
    });
});

// Utility function for debouncing
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024) {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

console.log('Script loaded successfully! 📱💻');