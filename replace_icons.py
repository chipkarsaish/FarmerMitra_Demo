import os
import glob

replacements = {
    '>📊<': '><i class="fa-solid fa-chart-pie"></i><',
    '>📈<': '><i class="fa-solid fa-chart-line"></i><',
    '>🌾<': '><i class="fa-solid fa-wheat-awn"></i><',
    '>🤝<': '><i class="fa-solid fa-handshake"></i><',
    '>🚚<': '><i class="fa-solid fa-truck"></i><',
    '>📦<': '><i class="fa-solid fa-box"></i><',
    '>👤<': '><i class="fa-solid fa-user"></i><',
    '>🚪<': '><i class="fa-solid fa-right-from-bracket"></i><'
}

files = glob.glob('html/**/*.html', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old, new in replacements.items():
        if old in content:
            content = content.replace(old, new)
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
