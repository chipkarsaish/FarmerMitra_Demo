// Farmer Sidebar — v2.0 (Premium KisanMitra design)

document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile sidebar toggle ──────────────────────────────────
    const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.farmer-sidebar');

    mobileToggle?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        sidebar?.classList.toggle('mobile-open');
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!sidebar?.contains(e.target) && !mobileToggle?.contains(e.target)) {
                sidebar?.classList.remove('mobile-open');
            }
        }
    });

    // ── User Dropdown toggle ───────────────────────────────────
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

    // ── Populate user info ─────────────────────────────────────
    const currentUserStr = sessionStorage.getItem('currentUser');
    if (currentUserStr) {
        try {
            const currentUser = JSON.parse(currentUserStr);
            const name = currentUser.name || 'Farmer';
            const initials = name.charAt(0).toUpperCase();

            // Header avatar
            const initialsEl = document.getElementById('userInitials');
            if (initialsEl) initialsEl.textContent = initials;

            // Dropdown fields
            const dropInitialsEl = document.getElementById('dropdownInitials');
            const welcomeNameEl  = document.getElementById('welcomeName');
            const dropNameEl     = document.getElementById('dropdownName');
            const dropEmailEl    = document.getElementById('dropdownEmail');

            if (dropInitialsEl) dropInitialsEl.textContent = initials;
            if (welcomeNameEl)  welcomeNameEl.textContent  = name;
            if (dropNameEl)     dropNameEl.textContent     = name;
            if (dropEmailEl)    dropEmailEl.textContent    = currentUser.email || '';

            // ── Sidebar profile card ───────────────────────────
            const avatarEl = document.getElementById('sidebarProfileAvatar');
            const nameEl   = document.getElementById('sidebarProfileName');

            if (avatarEl) avatarEl.textContent = initials;
            if (nameEl)   nameEl.textContent   = name;

        } catch (err) {
            console.error('Error parsing currentUser:', err);
        }
    }

    // ── Logout ────────────────────────────────────────────────
    function performLogout(e) {
        if (e) e.preventDefault();
        sessionStorage.removeItem('currentUser');
        // Navigate relative to current file depth
        const depth = (window.location.pathname.match(/html\//)) ? '../' : '';
        window.location.href = depth + 'website.html';
    }

    const logoutBtn        = document.getElementById('logoutBtn');
    const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
    logoutBtn?.addEventListener('click', performLogout);
    sidebarLogoutBtn?.addEventListener('click', performLogout);

    // ── Mark active nav item by current page ──────────────────
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop();
        if (href && href === currentPage) {
            link.closest('li')?.classList.add('active');
        }
    });
});
