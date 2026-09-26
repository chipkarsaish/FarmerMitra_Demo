"""
Patch the sidebar HTML for all farmer-facing pages.
For each page, the script:
  1. Finds the <aside class="farmer-sidebar"> block
  2. Replaces the OLD inner content with the NEW grouped, profiled sidebar
  3. Marks the correct <li> as active based on each page's identity
  4. Preserves the surrounding <aside> tag and all other HTML
"""

import re, os, sys

HTML_DIR = r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html"

# Map page filename -> which data-tour value should be active
ACTIVE_TOUR = {
    "farmer-dashboard.html":     "dashboard",
    "market-intelligence.html":  "market-prices",
    "crop-listings.html":        "my-crops",
    "create-listing.html":       "my-crops",
    "my-lots.html":              "my-lots",
    "buyer-portal-offers.html":  "buyers",
    "buyer-portal-marketplace.html": "buyers",
    "buyer-portal-requirements.html": "buyers",
    "buyer-portal-logistics.html": "buyers",
    "buyer-portal-payments.html": "buyers",
    "buyer-portal-orders.html":  "buyers",
    "transactions.html":         "transactions",
    "transport-optimizer.html":  "smart-selling",
    "farmer-profile.html":       "profile",
    "price-history.html":        "market-prices",
    "price-prediction.html":     "market-prices",
}

def build_sidebar_inner(active_tour: str) -> str:
    def li(tour, href, icon, label, key="", active=""):
        cls = ' class="active"' if tour == active_tour else ""
        i18n = f' data-i18n="{key}"' if key else ""
        return f"""
                <li{cls} data-tour="{tour}">
                    <a href="{href}" aria-label="{label}">
                        <span class="nav-icon"><i class="fa-solid {icon}"></i></span>
                        <span class="nav-text"{i18n}>{label}</span>
                    </a>
                </li>"""

    return f"""
        <!-- Logo / Brand -->
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <div class="brand-logo-icon"><i class="fa-solid fa-leaf"></i></div>
                <div class="brand-text">
                    <span class="brand-agri">Kisan</span><span class="brand-mitra">Mitra</span>
                </div>
            </div>
        </div>

        <!-- Farmer Profile Card -->
        <div class="sidebar-profile-card">
            <div class="sidebar-profile-avatar" id="sidebarProfileAvatar">F</div>
            <div class="sidebar-profile-info">
                <span class="sidebar-profile-name" id="sidebarProfileName">Farmer</span>
                <span class="sidebar-profile-badge">
                    <i class="fa-solid fa-circle-check"></i> Verified Farmer
                </span>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav" aria-label="Farmer navigation">
            <ul>
                <!-- MAIN -->
                <span class="nav-group-label">Main</span>
{li("dashboard",    "farmer-dashboard.html",    "fa-chart-pie",    "Dashboard",        "sidebar.dashboard")}
{li("market-prices","market-intelligence.html", "fa-chart-line",   "Market Prices",    "sidebar.marketIntelligence")}
{li("my-crops",     "crop-listings.html",       "fa-wheat-awn",    "My Crops",         "sidebar.myCrops")}
{li("my-lots",      "my-lots.html",             "fa-layer-group",  "My Lots")}

                <!-- TRADING -->
                <span class="nav-group-label">Trading</span>
{li("buyers",       "buyer-portal-offers.html", "fa-handshake",    "Live Bids",        "sidebar.buyers")}
{li("transactions", "transactions.html",         "fa-receipt",      "Transactions",     "sidebar.transactions")}

                <!-- OPERATIONS -->
                <span class="nav-group-label">Operations</span>
{li("smart-selling","transport-optimizer.html", "fa-truck",        "Transport &amp; Storage", "sidebar.smartSelling")}

                <!-- ACCOUNT -->
                <span class="nav-group-label">Account</span>
{li("profile",      "farmer-profile.html",      "fa-user",         "Profile",          "sidebar.profile")}
            </ul>
        </nav>

        <!-- Sidebar Footer / Logout -->
        <div class="sidebar-footer">
            <a href="#" class="sidebar-logout-btn" id="sidebarLogoutBtn" aria-label="Logout">
                <span class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                <span class="nav-text" data-i18n="dashboard.logout">Logout</span>
            </a>
        </div>
"""

# Regex to match everything INSIDE <aside class="farmer-sidebar"...>...</aside>
ASIDE_PATTERN = re.compile(
    r'(<aside\s[^>]*class="[^"]*farmer-sidebar[^"]*"[^>]*>)(.*?)(</aside>)',
    re.DOTALL | re.IGNORECASE
)

patched = []
skipped = []

for fname in os.listdir(HTML_DIR):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(HTML_DIR, fname)

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if "farmer-sidebar" not in content:
        continue

    # Skip buyer-only pages that happen to import farmer-sidebar.css but aren't farmer nav
    if fname.startswith("buyer-") and fname not in ACTIVE_TOUR:
        skipped.append(fname)
        continue

    active = ACTIVE_TOUR.get(fname, "dashboard")
    new_inner = build_sidebar_inner(active)

    def replacer(m):
        return m.group(1) + new_inner + m.group(3)

    new_content, n = ASIDE_PATTERN.subn(replacer, content)
    if n == 0:
        skipped.append(fname + " (no aside found)")
        continue

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    patched.append(fname)

print("Patched:", len(patched))
for p in patched:
    print("  ✓", p)
if skipped:
    print("\nSkipped:", len(skipped))
    for s in skipped:
        print("  –", s)
