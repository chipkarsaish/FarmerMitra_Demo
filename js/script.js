// Modal and Authentication State Management
let currentAuthMode = 'login'; // 'login' or 'register'
let selectedRole = null; // 'farmer', 'buyer', or 'buyer'

// DOM Elements
const modal = document.getElementById('authModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Buttons
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const heroRegisterBtn = document.getElementById('heroRegisterBtn');
const heroLearnBtn = document.getElementById('heroLearnBtn');

// Auth Steps
const roleSelection = document.getElementById('roleSelection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Role Cards
const roleCards = document.querySelectorAll('.role-card');

// Back Buttons
const backToRoleFromLogin = document.getElementById('backToRoleFromLogin');
const backToRoleFromRegister = document.getElementById('backToRoleFromRegister');

// Switch Links
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

// Role-specific fields
const farmerFields = document.getElementById('farmerFields');
const buyerFields = document.getElementById('buyerFields');

// Role text displays
const loginRoleText = document.getElementById('loginRoleText');
const registerRoleText = document.getElementById('registerRoleText');

// Event Listeners - Open Modal
loginBtn.addEventListener('click', () => openModal('login'));
registerBtn.addEventListener('click', () => openModal('register'));
heroRegisterBtn.addEventListener('click', () => openModal('register'));

// Learn More - Scroll to features
heroLearnBtn.addEventListener('click', () => {
    const featuresSection = document.querySelector('section.py-16');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Event Listeners - Close Modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Event Listeners - Role Selection
roleCards.forEach(card => {
    card.addEventListener('click', () => {
        selectedRole = card.dataset.role;
        showAuthForm();
    });
});

// Event Listeners - Back Buttons
backToRoleFromLogin.addEventListener('click', showRoleSelection);
backToRoleFromRegister.addEventListener('click', showRoleSelection);

// Event Listeners - Switch Between Login/Register
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    currentAuthMode = 'register';
    showRoleSelection();
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    currentAuthMode = 'login';
    showRoleSelection();
});

// Event Listeners - Form Submissions
document.querySelector('#loginForm form').addEventListener('submit', handleLogin);
document.getElementById('registrationForm').addEventListener('submit', handleRegister);

// Functions
function openModal(mode) {
    currentAuthMode = mode;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    showRoleSelection();
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
    resetModal();
}

function resetModal() {
    selectedRole = null;
    hideAllSteps();
    roleSelection.classList.remove('hidden');
}

function hideAllSteps() {
    roleSelection.classList.add('hidden');
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
}

function showRoleSelection() {
    hideAllSteps();
    roleSelection.classList.remove('hidden');
}

function showAuthForm() {
    hideAllSteps();

    // Capitalize role name for display
    const roleDisplayName = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);

    if (currentAuthMode === 'login') {
        loginForm.classList.remove('hidden');
        loginRoleText.textContent = roleDisplayName;
    } else {
        registerForm.classList.remove('hidden');
        registerRoleText.textContent = roleDisplayName;
        showRoleSpecificFields();
    }
}

function showRoleSpecificFields() {
    // Hide all role-specific fields first
    farmerFields.classList.add('hidden');
    buyerFields.classList.add('hidden');

    // Show relevant fields based on selected role
    if (selectedRole === 'farmer') {
        farmerFields.classList.remove('hidden');
    } else if (selectedRole === 'buyer') {
        buyerFields.classList.remove('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // TODO: Implement actual login logic
    console.log('Login attempt:', {
        role: selectedRole,
        email,
        password,
        rememberMe
    });

    // Store user data in sessionStorage (demo)
    const userData = {
        role: selectedRole,
        email: email,
        name: email.split('@')[0], // Use email prefix as name for demo
        loginTime: new Date().toISOString()
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userData));

    // Redirect based on role
    if (selectedRole === 'farmer') {
        window.location.href = './html/farmer-dashboard.html';
    } else if (selectedRole === 'buyer') {
        // Redirect to buyer dashboard
        window.location.href = './html/buyer-dashboard.html';
    }
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Validate terms agreement
    if (!agreeTerms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }

    // Collect role-specific data
    let roleSpecificData = {};

    if (selectedRole === 'farmer') {
        roleSpecificData = {
            farmLocation: document.getElementById('farmLocation').value,
            farmSize: document.getElementById('farmSize').value,
            cropsGrown: document.getElementById('cropsGrown').value
        };
    } else if (selectedRole === 'buyer') {
        roleSpecificData = {
            department: document.getElementById('department').value
        };
    }


    // TODO: Implement actual registration logic
    console.log('Registration attempt:', {
        role: selectedRole,
        name,
        email,
        phone,
        password,
        ...roleSpecificData
    });

    // Store user data in sessionStorage (demo)
    const userData = {
        role: selectedRole,
        name: name,
        email: email,
        phone: phone,
        registrationTime: new Date().toISOString(),
        ...roleSpecificData
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userData));

    // Redirect based on role
    if (selectedRole === 'farmer') {
        window.location.href = './html/farmer-dashboard.html';
    } else if (selectedRole === 'buyer') {
        window.location.href = './html/buyer-dashboard.html';

    }
}


// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.remove('shadow-sm');
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.add('shadow-sm');
    }

    lastScroll = currentScroll;
});
