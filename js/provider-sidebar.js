// provider-sidebar.js — Premium KisanMitra sidebar for Transport & Storage workspace

document.addEventListener('DOMContentLoaded', () => {
    const role = document.body.dataset.providerRole;
    const isTransport = role === 'transport';
    const prefix = isTransport ? 'transport' : 'storage';

    const navItems = [
        { page: 'dashboard',       label: 'Dashboard',                icon: 'fa-chart-pie' },
        { page: 'service-listing', label: 'Service Listing',          icon: isTransport ? 'fa-truck' : 'fa-warehouse' },
        { page: 'job-matching',    label: 'Job Matching',             icon: 'fa-clipboard-list' },
        { page: 'tracking',        label: 'Tracking & Status',        icon: 'fa-route' },
        { page: 'profile',         label: 'Profile',                  icon: 'fa-user' },
    ];

    const buildNav = () => navItems.map(({ page, label, icon }) =>
        `<li><a href="${prefix}-${page}.html" aria-label="${label}">
            <span class="nav-icon"><i class="fa-solid ${icon}"></i></span>
            <span class="nav-text">${label}</span>
        </a></li>`
    ).join('');

    const sidebar = document.getElementById('providerSidebar');
    sidebar.classList.add('provider-sidebar');
    sidebar.innerHTML = `
        <!-- Navigation -->
        <nav class="sidebar-nav" aria-label="${isTransport ? 'Transport' : 'Storage'} navigation">
            <ul>
                <span class="nav-group-label">${isTransport ? 'Transport' : 'Storage'} Workspace</span>
                ${buildNav()}
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

    // Highlight active link
    const current = window.location.pathname.split('/').pop();
    sidebar.querySelectorAll('.sidebar-nav a').forEach(link =>
        link.closest('li')?.classList.toggle('active', link.getAttribute('href') === current)
    );

    // Mobile toggle
    const toggle = document.querySelector('.mobile-sidebar-toggle');
    toggle?.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); sidebar.classList.toggle('mobile-open'); });
    document.addEventListener('click', e => {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !toggle?.contains(e.target))
            sidebar.classList.remove('mobile-open');
    });

    // User menu toggle
    const menu = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    menu?.addEventListener('click', e => { e.stopPropagation(); dropdown?.classList.toggle('active'); });
    document.addEventListener('click', e => {
        if (!dropdown?.contains(e.target) && !menu?.contains(e.target)) dropdown?.classList.remove('active');
    });

    // Populate user info
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('currentUser') || 'null'); } catch (_) {}
    const name = user?.name || (isTransport ? 'Transport Provider' : 'Storage Provider');
    const initialsEl = document.getElementById('userInitials');
    const dropdownNameEl = document.getElementById('dropdownName');
    const dropdownEmailEl = document.getElementById('dropdownEmail');
    if (initialsEl) initialsEl.textContent = name.charAt(0).toUpperCase();
    if (dropdownNameEl) dropdownNameEl.textContent = name;
    if (dropdownEmailEl) dropdownEmailEl.textContent = user?.email || 'provider@kisanmitra.in';

    // Logout
    const logout = e => { e.preventDefault(); sessionStorage.removeItem('currentUser'); window.location.href = '../website.html'; };
    document.getElementById('sidebarLogoutBtn')?.addEventListener('click', logout);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
});
