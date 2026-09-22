document.addEventListener('DOMContentLoaded', () => {
    const role = document.body.dataset.providerRole;
    const isTransport = role === 'transport';
    const prefix = isTransport ? 'transport' : 'storage';
    const label = isTransport ? 'TRANSPORT WORKSPACE' : 'STORAGE WORKSPACE';
    const profileName = isTransport ? 'Transport Provider' : 'Storage Provider';
    const nav = [
        ['dashboard', 'Dashboard', 'fa-chart-pie'],
        ['service-listing', 'Service Listing', isTransport ? 'fa-truck' : 'fa-warehouse'],
        ['job-matching', 'Job Matching', 'fa-clipboard-list'],
        ['tracking', 'Tracking & Status Updates', 'fa-route'],
        ['profile', 'Profile', 'fa-user']
    ];
    const sidebar = document.getElementById('providerSidebar');
    sidebar.classList.add('provider-sidebar');
    sidebar.innerHTML = `<nav class="sidebar-nav" data-workspace="${label}"><ul>${nav.map(([page, text, icon]) => `<li><a href="${prefix}-${page}.html"><span class="nav-icon"><i class="fa-solid ${icon}"></i></span><span class="nav-text">${text}</span></a></li>`).join('')}</ul></nav><div class="sidebar-footer"><a href="#" class="sidebar-logout-btn" id="sidebarLogoutBtn"><span class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i></span><span class="nav-text">Logout</span></a></div>`;
    const current = window.location.pathname.split('/').pop();
    sidebar.querySelectorAll('.sidebar-nav a').forEach(link => link.parentElement.classList.toggle('active', link.getAttribute('href') === current));
    const toggle = document.querySelector('.mobile-sidebar-toggle');
    toggle?.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); sidebar.classList.toggle('mobile-open'); });
    document.addEventListener('click', event => { if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !toggle?.contains(event.target)) sidebar.classList.remove('mobile-open'); });
    const menu = document.getElementById('userMenuBtn');
    const dropdown = document.getElementById('userDropdown');
    menu?.addEventListener('click', event => { event.stopPropagation(); dropdown?.classList.toggle('active'); });
    document.addEventListener('click', event => { if (!dropdown?.contains(event.target) && !menu?.contains(event.target)) dropdown?.classList.remove('active'); });
    let user = null;
    try { user = JSON.parse(sessionStorage.getItem('currentUser') || 'null'); } catch (_) { user = null; }
    const name = user?.name || profileName;
    const initials = document.getElementById('userInitials');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    if (initials) initials.textContent = name.charAt(0).toUpperCase();
    if (dropdownName) dropdownName.textContent = name;
    if (dropdownEmail) dropdownEmail.textContent = user?.email || 'provider@kisanmitra.in';
    const logout = event => { event.preventDefault(); sessionStorage.removeItem('currentUser'); window.location.href = '../website.html'; };
    document.getElementById('sidebarLogoutBtn')?.addEventListener('click', logout);
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
});
