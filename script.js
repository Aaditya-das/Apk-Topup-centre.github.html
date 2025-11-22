// Format NPR currency
function formatNPR(amount) {
    const numAmount = parseFloat(amount);
    return `रू ${numAmount.toLocaleString('en-NP')}`;
}

// Package selection functionality
const packageCards = document.querySelectorAll('.package-card');
const selectedPackageInput = document.getElementById('selectedPackage');
const selectedPriceInput = document.getElementById('selectedPrice');
const summaryPackage = document.getElementById('summaryPackage');
const summaryPrice = document.getElementById('summaryPrice');
const summaryTotal = document.getElementById('summaryTotal');

packageCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selected class from all cards
        packageCards.forEach(c => c.classList.remove('selected'));

        // Add selected class to clicked card
        this.classList.add('selected');

        // Get package details
        const packageAmount = this.getAttribute('data-package');
        const packagePrice = this.getAttribute('data-price');

        // Update hidden inputs
        selectedPackageInput.value = packageAmount;
        selectedPriceInput.value = packagePrice;

        // Update order summary
        summaryPackage.textContent = `${packageAmount} Diamonds`;
        const formattedPrice = formatNPR(packagePrice);
        summaryPrice.textContent = formattedPrice;
        summaryTotal.textContent = formattedPrice;

        // Add animation
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.3s ease-out';
        }, 10);
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Form validation and submission
const topupForm = document.getElementById('topupForm');
const modal = document.getElementById('successModal');
const closeModalBtn = document.querySelector('.close');

topupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate Player ID
    const playerId = document.getElementById('playerId').value.trim();
    if (!playerId) {
        alert('Please enter your Player ID');
        return;
    }

    // Validate package selection
    if (!selectedPackageInput.value) {
        alert('Please select a diamond package');
        return;
    }

    // Validate payment method
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate processing
    const submitButton = document.querySelector('.submit-button');
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success modal
        modal.style.display = 'block';

        // Reset form
        topupForm.reset();
        packageCards.forEach(c => c.classList.remove('selected'));
        summaryPackage.textContent = 'Not selected';
        summaryPrice.textContent = 'रू 0';
        summaryTotal.textContent = 'रू 0';
        selectedPackageInput.value = '';
        selectedPriceInput.value = '';

        // Reset button
        submitButton.textContent = 'Complete Purchase';
        submitButton.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Modal close functionality
closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Input validation for Player ID (only numbers)
const playerIdInput = document.getElementById('playerId');
playerIdInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// Add loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

// Add visual feedback for form inputs
const formInputs = document.querySelectorAll('input, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add hover effects to package cards
packageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('selected')) {
            this.style.borderColor = '#667eea';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('selected')) {
            this.style.borderColor = 'transparent';
        }
    });
});

// Real-time form validation feedback
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = '#ff6b6b';
        if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
            const error = document.createElement('small');
            error.className = 'error-message';
            error.style.color = '#ff6b6b';
            error.textContent = 'Please enter a valid email address';
            this.parentElement.appendChild(error);
        }
    } else {
        this.style.borderColor = '#e0e0e0';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
});

emailInput.addEventListener('input', function() {
    if (isValidEmail(this.value)) {
        this.style.borderColor = '#4caf50';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
});

// Player ID validation feedback
playerIdInput.addEventListener('blur', function() {
    if (this.value && this.value.length < 6) {
        this.style.borderColor = '#ff6b6b';
        if (!this.nextElementSibling || this.nextElementSibling.tagName !== 'SMALL' || !this.nextElementSibling.classList.contains('error-message')) {
            const existingSmall = this.nextElementSibling;
            const error = document.createElement('small');
            error.className = 'error-message';
            error.style.color = '#ff6b6b';
            error.textContent = 'Player ID should be at least 6 digits';
            if (existingSmall && existingSmall.tagName === 'SMALL') {
                existingSmall.insertAdjacentElement('afterend', error);
            } else {
                this.parentElement.appendChild(error);
            }
        }
    } else if (this.value && this.value.length >= 6) {
        this.style.borderColor = '#4caf50';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add "Back to Top" functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

console.log('Free Fire Top-Up Website Loaded Successfully! 🔥💎');
