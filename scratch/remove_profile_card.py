"""
Remove the sidebar-profile-card block from all farmer HTML pages.
"""
import re, os

HTML_DIR = r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html"

# Match the profile card div and everything inside it
CARD_PATTERN = re.compile(
    r'\s*<!-- Farmer Profile Card -->\s*<div class="sidebar-profile-card">.*?</div>\s*</div>',
    re.DOTALL
)

patched = []
for fname in os.listdir(HTML_DIR):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(HTML_DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if "sidebar-profile-card" not in content:
        continue

    new_content, n = CARD_PATTERN.subn("", content)
    if n > 0:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        patched.append(fname)

print("Removed profile card from", len(patched), "pages:")
for p in patched:
    print(" -", p)
