import glob

html_files = glob.glob(r'c:\Users\Saish Chipkar\Documents\Project\FarmerMitra\html\*.html')
replacement = """
                <a href="#" style="margin-right: 15px; color: var(--primary-green); font-size: 1.2rem; display: flex; align-items: center; text-decoration: none;" title="click for demo">
                    <i class="fa-solid fa-circle-question"></i>
                </a>
                <div class="user-menu">"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # If the file doesn't already have the question mark icon
    if 'fa-circle-question' not in content:
        if '<div class="user-menu">' in content:
            new_content = content.replace('<div class="user-menu">', replacement)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
