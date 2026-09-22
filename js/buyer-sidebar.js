document.addEventListener('DOMContentLoaded', () => {
    const sidebarHtml = `
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <div class="brand-logo-icon"><i class="fa-solid fa-leaf"></i></div>
                <div class="brand-text">
                    <span class="brand-agri">Kisan</span><span class="brand-mitra">Mitra</span>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
            <ul id="buyer-nav-list" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
                <li class="nav-item"><a href="buyer-dashboard.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-chart-pie"></i></span><span class="nav-text">Dashboard</span></a></li>
                <li class="nav-item"><a href="buyer-demand-posting.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-clipboard-list"></i></span><span class="nav-text">Post Demand</span></a></li>
                <li class="nav-item"><a href="buyer-sourcing.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-magnifying-glass"></i></span><span class="nav-text">Find Produce</span></a></li>
                <li class="nav-item"><a href="buyer-bidding.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-gavel"></i></span><span class="nav-text">Offers &amp; Bids</span></a></li>
                <li class="nav-item"><a href="buyer-verification.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-clipboard-check"></i></span><span class="nav-text">Verify Delivery</span></a></li>
                <li class="nav-item"><a href="buyer-settlement.html" class="nav-link category-link"><span class="nav-icon"><i class="fa-solid fa-wallet"></i></span><span class="nav-text">Settlement</span></a></li>
            </ul>
        </nav>
        <div class="sidebar-footer">
            <a href="#" class="sidebar-logout-btn" id="sidebarLogoutBtn">
                <span class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                <span class="nav-text">Logout</span>
            </a>
        </div>
    `;

    document.getElementById('buyerSidebar').innerHTML = sidebarHtml;

    // Highlight active link based on current path
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.sidebar-nav a.category-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
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

    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    userMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown?.classList.toggle('active');
    });
    
    // Logout
    const performLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = '../website.html';
    };
    
    document.getElementById('logoutBtn')?.addEventListener('click', performLogout);
    document.getElementById('sidebarLogoutBtn')?.addEventListener('click', performLogout);
});
