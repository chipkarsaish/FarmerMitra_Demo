import glob
import re

replacements = {
    '★★★★★': '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>',
    '★★★★☆': '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>',
    '🌿': '<i class="fa-solid fa-leaf"></i>',
    '🌾': '<i class="fa-solid fa-wheat-awn"></i>',
    '✅': '<i class="fa-solid fa-circle-check"></i>',
    '✓': '<i class="fa-solid fa-check"></i>',
    '📊': '<i class="fa-solid fa-chart-pie"></i>',
    '📍': '<i class="fa-solid fa-location-dot"></i>',
    '★': '<i class="fa-solid fa-star"></i>',
    '🤝': '<i class="fa-solid fa-handshake"></i>',
    '👨': '<i class="fa-solid fa-user"></i>',
    '☰': '<i class="fa-solid fa-bars"></i>',
    '❮': '<i class="fa-solid fa-chevron-left"></i>',
    '✨': '<i class="fa-solid fa-wand-magic-sparkles"></i>',
    '⚠': '<i class="fa-solid fa-triangle-exclamation"></i>',
    '🤖': '<i class="fa-solid fa-robot"></i>',
    '📦': '<i class="fa-solid fa-box"></i>',
    '💰': '<i class="fa-solid fa-sack-dollar"></i>',
    '🛍': '<i class="fa-solid fa-bag-shopping"></i>',
    '🚺': '<i class="fa-solid fa-person-dress"></i>',
    '➕': '<i class="fa-solid fa-plus"></i>',
    '🚚': '<i class="fa-solid fa-truck"></i>',
    '👤': '<i class="fa-solid fa-user"></i>',
    '📷': '<i class="fa-solid fa-camera"></i>',
    '📋': '<i class="fa-solid fa-clipboard-list"></i>',
    '💳': '<i class="fa-solid fa-credit-card"></i>',
    '🌱': '<i class="fa-solid fa-seedling"></i>',
    '📈': '<i class="fa-solid fa-chart-line"></i>',
    '💡': '<i class="fa-solid fa-lightbulb"></i>',
    '📝': '<i class="fa-solid fa-file-signature"></i>',
    '📸': '<i class="fa-solid fa-camera"></i>',
    '👋': '<i class="fa-solid fa-hand"></i>',
    '⚡': '<i class="fa-solid fa-bolt"></i>',
    '✏': '<i class="fa-solid fa-pencil"></i>',
    '🌽': '<i class="fa-solid fa-seedling"></i>',
    '🥬': '<i class="fa-solid fa-leaf"></i>',
    '🗺': '<i class="fa-solid fa-map"></i>',
    '🌍': '<i class="fa-solid fa-earth-americas"></i>',
    '🧰': '<i class="fa-solid fa-toolbox"></i>',
    '🎉': '<i class="fa-solid fa-gift"></i>',
    '📄': '<i class="fa-solid fa-file"></i>',
    '🏦': '<i class="fa-solid fa-building-columns"></i>',
    '📑': '<i class="fa-solid fa-file-lines"></i>',
    '🚪': '<i class="fa-solid fa-right-from-bracket"></i>',
    '🔍': '<i class="fa-solid fa-magnifying-glass"></i>',
    '👔': '<i class="fa-solid fa-user-tie"></i>'
}

files = glob.glob('html/**/*.html', recursive=True)
files.extend(glob.glob('index.html'))
files.extend(glob.glob('js/**/*.js', recursive=True))

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    # Sort keys by length to replace longer strings first (e.g. 5 stars before 1 star)
    for old in sorted(replacements.keys(), key=len, reverse=True):
        if old in content:
            content = content.replace(old, replacements[old])
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
