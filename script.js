// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const placementNumbers = entry.target.querySelectorAll('.placement-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            
            placementNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe statistics and placement sections
document.addEventListener('DOMContentLoaded', function() {
    const statisticsSection = document.querySelector('.statistics');
    const placementSection = document.querySelector('.placement-stats');
    
    if (statisticsSection) {
        observer.observe(statisticsSection);
    }
    
    if (placementSection) {
        observer.observe(placementSection);
    }
});

// Notice Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const noticeFilters = document.querySelectorAll('.notice-filter');
    const noticeItems = document.querySelectorAll('.notice-item');
    
    noticeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            noticeFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const category = this.getAttribute('data-filter');
            
            noticeItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add fade-in animation for notice items
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dropdown Menu Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        });
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    
    if (searchBox && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            // You can implement actual search functionality here
            alert(`Searching for: ${searchTerm}`);
            searchBox.value = '';
        }
    }
});

// Add CSS for scrolled header
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 20px;
        gap: 15px;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Enhanced Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add staggered animation to elements
    const animatedElements = document.querySelectorAll('.stat-item, .placement-item, .dept-card, .campus-item, .about-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add CSS for enhanced animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero {
        animation: fadeInUp 1.2s ease-out;
    }
    
    .floating-shapes .shape {
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .stat-item, .placement-item, .dept-card, .campus-item, .about-card {
        animation: fadeInUp 0.8s ease-out;
        animation-fill-mode: both;
    }
    
    .hero-stats .hero-stat {
        animation: slideInLeft 0.8s ease-out;
        animation-fill-mode: both;
    }
    
    .hero-stats .hero-stat:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .hero-stats .hero-stat:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    .about-content .about-text {
        animation: slideInLeft 1s ease-out;
    }
    
    .about-content .about-image {
        animation: slideInRight 1s ease-out;
        animation-delay: 0.3s;
    }
    
    .dept-card {
        animation: fadeInUp 0.8s ease-out;
        animation-fill-mode: both;
    }
    
    .dept-card:nth-child(1) { animation-delay: 0.1s; }
    .dept-card:nth-child(2) { animation-delay: 0.2s; }
    .dept-card:nth-child(3) { animation-delay: 0.3s; }
    .dept-card:nth-child(4) { animation-delay: 0.4s; }
    
    .placement-item:nth-child(1) { animation-delay: 0.1s; }
    .placement-item:nth-child(2) { animation-delay: 0.2s; }
    .placement-item:nth-child(3) { animation-delay: 0.3s; }
    .placement-item:nth-child(4) { animation-delay: 0.4s; }
    
    /* Hover effects */
    .dept-card:hover .card-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .dept-card:hover .card-icon i {
        transform: scale(1.2);
    }
    
    .about-card:hover .card-icon {
        transform: scale(1.1);
    }
    
    /* Smooth transitions */
    .card-icon, .card-icon i {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(enhancedStyle);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Enhanced counter animation with easing
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}
