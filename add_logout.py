import glob

files = glob.glob('html/**/*.html', recursive=True)

footer_html = """        <!-- Sidebar Footer / Logout -->
        <div class="sidebar-footer">
            <a href="index.html" class="sidebar-logout-btn" id="sidebarLogoutBtn">
                <span class="nav-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                <span class="nav-text" data-i18n="dashboard.logout">Logout</span>
            </a>
            <div class="nav-flyout">
                <span class="flyout-title" data-i18n="dashboard.logout">Logout</span>
                <span class="flyout-desc">Log out of account</span>
            </div>
        </div>
    </aside>"""

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False
    
    # First, let's fix any existing 'Sign Out' to 'Logout' inside the sidebar-footer
    if '<div class="sidebar-footer">' in content:
        if '>Sign Out<' in content:
            content = content.replace('>Sign Out<', '>Logout<')
            modified = True
            
    # If the file has a sidebar but no sidebar-footer, append it before </aside>
    if 'class="farmer-sidebar"' in content and '<div class="sidebar-footer">' not in content:
        # replace the last </nav> \s+ </aside> with the new footer
        import re
        content, count = re.subn(r'</nav>\s*</aside>', '</nav>\n' + footer_html, content)
        if count > 0:
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
