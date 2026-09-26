// buyer-sidebar.js — Premium KisanMitra sidebar for Buyer workspace

document.addEventListener('DOMContentLoaded', () => {
    const sidebarHtml = `
        <!-- Navigation -->
        <nav class="sidebar-nav" aria-label="Buyer navigation">
            <ul id="buyer-nav-list">
                <span class="nav-group-label">Main</span>
                <li><a href="buyer-dashboard.html" aria-label="Dashboard">
                    <span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span>
                    <span class="nav-text">Dashboard</span>
                </a></li>

                <span class="nav-group-label">Sourcing</span>
                <li><a href="buyer-demand-posting.html" aria-label="Post Demand">
                    <span class="nav-icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span class="nav-text">Post Demand</span>
                </a></li>
                <li><a href="buyer-sourcing.html" aria-label="Find Produce">
                    <span class="nav-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <span class="nav-text">Find Produce</span>
                </a></li>
                <li><a href="buyer-bidding.html" aria-label="Offers and Bids">
                    <span class="nav-icon"><i class="fa-solid fa-gavel"></i></span>
                    <span class="nav-text">Offers &amp; Bids</span>
                </a></li>

                <span class="nav-group-label">Orders</span>
                <li><a href="buyer-verification.html" aria-label="Verify Delivery">
                    <span class="nav-icon"><i class="fa-solid fa-clipboard-check"></i></span>
                    <span class="nav-text">Verify Delivery</span>
                </a></li>
                <li><a href="buyer-settlement.html" aria-label="Settlement">
                    <span class="nav-icon"><i class="fa-solid fa-wallet"></i></span>
                    <span class="nav-text">Settlement</span>
                </a></li>

                <span class="nav-group-label">Account</span>
                <li><a href="buyer-profile.html" aria-label="Profile">
                    <span class="nav-icon"><i class="fa-solid fa-user"></i></span>
                    <span class="nav-text">Profile</span>
                </a></li>
            </ul>
        </nav>

        <!-- Footer / Logout -->
        <div class="sidebar-footer">
            <a href="#" class="sidebar-logout-btn" id="sidebarLogoutBtn" aria-label="Logout">
                <span class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                <span class="nav-text">Logout</span>
            </a>
        </div>
    `;

    document.getElementById('buyerSidebar').innerHTML = sidebarHtml;

    // Highlight active link based on current path
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.closest('li')?.classList.add('active');
        }
    });

    // Mobile toggle
    const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
    const sidebar = document.querySelector('.farmer-sidebar');
    mobileToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sidebar?.classList.toggle('mobile-open');
    });
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sidebar?.contains(e.target) && !mobileToggle?.contains(e.target)) {
            sidebar?.classList.remove('mobile-open');
        }
    });

    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    userMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown?.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!userDropdown?.contains(e.target) && !userMenuBtn?.contains(e.target)) {
            userDropdown?.classList.remove('active');
        }
    });

    // Populate user info
    try {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
        if (user) {
            const initials = user.name?.charAt(0).toUpperCase() || 'B';
            const el = document.getElementById('userInitials');
            if (el) el.textContent = initials;
        }
    } catch (_) {}

    // Logout
    const performLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = '../website.html';
    };
    document.getElementById('logoutBtn')?.addEventListener('click', performLogout);
    document.getElementById('sidebarLogoutBtn')?.addEventListener('click', performLogout);
});
