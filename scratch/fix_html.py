import os
import re

html_dir = r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html"

switcher_html = '''<div class="language-switcher">
                        <button class="lang-btn active" data-lang="en">English</button>
                        <button class="lang-btn" data-lang="mr">मराठी</button>
                    </div>'''

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # 1. Add i18n.js if missing
    if 'i18n.js' not in content:
        # try to insert before </body>
        if '</body>' in content:
            content = content.replace('</body>', '<script src="../js/i18n.js"></script>\n</body>')
            modified = True
        else:
            content += '\n<script src="../js/i18n.js"></script>'
            modified = True
            
    # 2. Add language-switcher.css if missing and language-switcher exists or we are adding it
    if 'language-switcher.css' not in content and ('language-switcher' in content or 'header-actions' in content):
        if '</head>' in content:
            content = content.replace('</head>', '<link rel="stylesheet" href="../css/language-switcher.css">\n</head>')
            modified = True

    # 3. Add language switcher in header-actions if missing
    if 'header-actions' in content and 'language-switcher' not in content:
        # Find <div class="header-actions">
        match = re.search(r'(<div[^>]*class="[^"]*header-actions[^"]*"[^>]*>)', content)
        if match:
            tag = match.group(1)
            content = content.replace(tag, tag + '\n' + switcher_html)
            modified = True

    # 4. Remove farmer-language.js if present
    if 'farmer-language.js' in content:
        content = re.sub(r'<script\s+src="\.\./js/farmer-language\.js"></script>', '', content)
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {os.path.basename(filepath)}")

for root, _, files in os.walk(html_dir):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))

# also do for root index
fix_file(r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\index.html")
print("Done")
