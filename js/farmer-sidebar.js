// Farmer Sidebar - Static always-expanded, no toggle needed

document.addEventListener('DOMContentLoaded', function () {
    // Mobile sidebar toggle (for small screens only)
    const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.farmer-sidebar');

    mobileToggle?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sidebar?.classList.toggle('mobile-open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!sidebar?.contains(e.target) && !mobileToggle?.contains(e.target)) {
                sidebar?.classList.remove('mobile-open');
            }
        }
    });

    // User Dropdown toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    userMenuBtn?.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown?.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!userDropdown?.contains(e.target) && !userMenuBtn?.contains(e.target)) {
            userDropdown?.classList.remove('active');
        }
    });

    // Populate user info from sessionStorage
    const currentUserStr = sessionStorage.getItem('currentUser');
    if (currentUserStr) {
        try {
            const currentUser = JSON.parse(currentUserStr);
            const initials = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'F';
            const initialsEl = document.getElementById('userInitials');
            const dropInitialsEl = document.getElementById('dropdownInitials');
            const welcomeNameEl = document.getElementById('welcomeName');
            const dropNameEl = document.getElementById('dropdownName');
            const dropEmailEl = document.getElementById('dropdownEmail');

            if (initialsEl) initialsEl.textContent = initials;
            if (dropInitialsEl) dropInitialsEl.textContent = initials;
            if (welcomeNameEl) welcomeNameEl.textContent = currentUser.name;
            if (dropNameEl) dropNameEl.textContent = currentUser.name;
            if (dropEmailEl) dropEmailEl.textContent = currentUser.email || '';
        } catch (e) {
            console.error('Error parsing currentUser data:', e);
        }
    }

    // Logout functionality
    function performLogout(e) {
        if (e) e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = '../website.html';
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
    logoutBtn?.addEventListener('click', performLogout);
    sidebarLogoutBtn?.addEventListener('click', performLogout);
});
