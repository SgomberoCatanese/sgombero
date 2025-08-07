// Blog page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogFilters();
    initializeNewsletterForm();
    initializeLoadMore();
});

// Blog filter functionality
function initializeBlogFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts with animation
            filterPosts(category, postCards);
        });
    });
}

function filterPosts(category, postCards) {
    postCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = category === 'all' || cardCategory === category;
        
        // Add filtering class for smooth transition
        card.classList.add('filtering');
        
        setTimeout(() => {
            if (shouldShow) {
                card.classList.remove('hidden', 'fade-out');
                card.classList.add('fade-in');
            } else {
                card.classList.add('fade-out');
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 250);
            }
        }, index * 50); // Stagger the animation
        
        // Remove filtering class after animation
        setTimeout(() => {
            card.classList.remove('filtering', 'fade-in', 'fade-out');
        }, 500 + index * 50);
    });
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterButton = document.querySelector('.btn-newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                submitNewsletter(email, newsletterButton);
            } else {
                showNotification('Inserisci un indirizzo email valido', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitNewsletter(email, button) {
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        <span>Iscrizione...</span>
    `;
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            <span>Iscritto!</span>
        `;
        
        showNotification('Iscrizione completata con successo!', 'success');
        
        // Reset form
        document.querySelector('.newsletter-input').value = '';
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
    }, 1500);
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreButton = document.querySelector('.btn-load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMorePosts(this);
        });
    }
}

function loadMorePosts(button) {
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        <span>Caricamento...</span>
    `;
    button.disabled = true;
    
    // Simulate loading more posts
    setTimeout(() => {
        // In a real application, you would fetch more posts from an API
        showNotification('Tutti gli articoli sono stati caricati', 'info');
        
        // Hide the button or update it
        button.style.display = 'none';
        
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors.info;
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Search functionality (if needed in the future)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const postCards = document.querySelectorAll('.post-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            postCards.forEach(card => {
                const title = card.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.post-category').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                               excerpt.includes(searchTerm) || 
                               category.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }, 300));
    }
}

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

// Add CSS for animations
const blogStyle = document.createElement('style');
blogStyle.textContent = `
    .notification {
        font-family: 'Inter', sans-serif;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 16px;
            left: 16px;
            max-width: none;
            transform: translateY(-100%);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(blogStyle);

console.log('Blog functionality initialized! 📚');