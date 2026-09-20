import glob
import re

# 1. Remove dropdown-header from all HTML files
files = glob.glob('html/**/*.html', recursive=True)
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the entire dropdown-header block safely
    pattern = r'<div class="dropdown-header">[\s\S]*?</div>\s*</div>\s*<a href="farmer-profile\.html"'
    # Wait, the closing of dropdown-header:
    # <div class="dropdown-header">
    #     <div class="user-avatar-small">...</div>
    #     <div class="user-info">...</div>
    # </div>
    # So we want to replace from <div class="dropdown-header"> up to just before <a href="farmer-profile.html"
    pattern = r'<div class="dropdown-header">.*?</div>\s*</div>\s*(?=<a href="farmer-profile\.html")'
    
    # Better yet, since we know its structure exactly:
    pattern2 = r'<div class="dropdown-header">\s*<div class="user-avatar-small">.*?</div>\s*<div class="user-info">.*?</div>\s*</div>'
    
    new_content, count = re.subn(pattern2, '', content, flags=re.DOTALL)
    if count > 0:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed dropdown-header from {file}")

# 2. Update styles.css
styles_path = 'css/styles.css'
with open(styles_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Add overflow-y: scroll to body
if 'overflow-y: scroll;' not in css:
    css = css.replace('overflow-x: hidden;', 'overflow-x: hidden;\n    overflow-y: scroll;')

# Add robust rules to .user-avatar
avatar_fix = """
.user-avatar span {
    font-size: 1.2rem !important;
    line-height: 1 !important;
}"""
if '.user-avatar span' not in css:
    css += avatar_fix

if 'flex-shrink: 0;' not in css.split('.user-avatar {')[1].split('}')[0]:
    css = css.replace('.user-avatar {\n', '.user-avatar {\n    flex-shrink: 0;\n    line-height: 1 !important;\n')
    
with open(styles_path, 'w', encoding='utf-8') as f:
    f.write(css)
print("Updated styles.css")

# 3. Update index.html
index_path = 'index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    idx = f.read()
if '<body class="' in idx and 'overflow-y-scroll' not in idx:
    idx = idx.replace('<body class="', '<body class="overflow-y-scroll ')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(idx)
    print("Updated index.html")
