// Notice Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Authentication Tab Functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Add click event listeners to auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all forms
            authForms.forEach(form => form.classList.remove('active'));
            // Show target form
            const targetForm = document.getElementById(targetTab + '-form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });

    // Form submission handling
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#login-email').value;
            const password = this.querySelector('#login-password').value;
            
            if (email && password) {
                showNotification('Login successful!', 'success');
                // Here you would typically send the data to your backend
                console.log('Login attempt:', { email, password });
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                firstname: this.querySelector('#signup-firstname').value,
                lastname: this.querySelector('#signup-lastname').value,
                email: this.querySelector('#signup-email').value,
                role: this.querySelector('#signup-role').value,
                password: this.querySelector('#signup-password').value,
                confirmPassword: this.querySelector('#signup-confirm-password').value
            };
            
            if (formData.password !== formData.confirmPassword) {
                showNotification('Passwords do not match.', 'error');
                return;
            }
            
            if (Object.values(formData).every(value => value)) {
                showNotification('Account created successfully!', 'success');
                // Here you would typically send the data to your backend
                console.log('Signup attempt:', formData);
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Microsoft';
            showNotification(`${provider} login coming soon!`, 'success');
        });
    });

    // Notice filtering functionality
    const noticeFilters = document.querySelectorAll('.notice-filter');
    const noticeItems = document.querySelectorAll('.notice-item');

    // Add click event listeners to filter buttons
    noticeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all filters
            noticeFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter notice items
            filterNotices(filterValue);
        });
    });

    // Function to filter notices
    function filterNotices(category) {
        noticeItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Notice subscription functionality
    const subscriptionForm = document.querySelector('.subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription success
                showNotification('Successfully subscribed to notices!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    // Notice item click functionality
    noticeItems.forEach(item => {
        const noticeLink = item.querySelector('.notice-link');
        if (noticeLink) {
            noticeLink.addEventListener('click', function(e) {
                e.preventDefault();
                const noticeTitle = item.querySelector('h3').textContent;
                showNotification(`Opening: ${noticeTitle}`, 'success');
                // Here you would typically navigate to the full notice page
                // For now, we'll just show a notification
            });
        }
    });

    // Archive link functionality
    const archiveLink = document.querySelector('.archive-link');
    if (archiveLink) {
        archiveLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening notice archive...', 'success');
            // Here you would typically navigate to the archive page
        });
    }

    // Priority badge functionality
    const priorityBadges = document.querySelectorAll('.priority');
    priorityBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Notice date hover effects
    const noticeDates = document.querySelectorAll('.notice-date');
    noticeDates.forEach(date => {
        date.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        date.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notice-item {
            transition: all 0.3s ease;
        }
        
        .notice-filter {
            transition: all 0.3s ease;
        }
        
        .notice-filter:hover {
            transform: translateY(-2px);
        }
        
        .notice-filter.active {
            background: var(--gradient-primary);
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
        }
        
        .priority {
            transition: transform 0.3s ease;
        }
        
        .notice-date {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});

// Mobile menu functionality
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
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.display = 'block';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdownMenu.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
