import re

with open(r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html\my-lots.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the language switcher with correct html
new_html = '''<div class="language-switcher">
                    <button class="lang-btn active" data-lang="en">English</button>
                    <button class="lang-btn" data-lang="mr">मराठी</button>
                </div>'''

content = re.sub(r'<div class="language-switcher"><button class="lang-btn active">English</button><button class="lang-btn">[^<]*</button></div>', new_html, content)

with open(r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html\my-lots.html", "w", encoding="utf-8") as f:
    f.write(content)
print("Done!")
