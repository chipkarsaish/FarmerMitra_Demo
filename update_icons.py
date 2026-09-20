import os
import glob

html_files = glob.glob(r'c:\Users\Saish Chipkar\Documents\Project\FarmerMitra\html\*.html')
replacement = """
                <a href="#" style="margin-right: 15px; color: var(--primary-green); font-size: 1.2rem; display: flex; align-items: center; text-decoration: none;" title="click for demo">
                    <i class="fa-solid fa-circle-question"></i>
                </a>
                <!-- Language Switcher -->"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<!-- Language Switcher -->' in content and 'fa-circle-question' not in content:
        new_content = content.replace('                <!-- Language Switcher -->', replacement)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
