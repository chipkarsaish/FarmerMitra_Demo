import glob
import re
from collections import Counter

def get_emojis():
    emoji_pattern = re.compile(
        "["
        "\U0001f600-\U0001f64f"
        "\U0001f300-\U0001f5ff"
        "\U0001f680-\U0001f6ff"
        "\U0001f1e0-\U0001f1ff"
        "\u2600-\u26ff"
        "\u2700-\u27bf"
        "\U0001f900-\U0001f9ff"
        "\U0001fa70-\U0001faff"
        "]+", flags=re.UNICODE)
    
    files = glob.glob('html/**/*.html', recursive=True)
    files.extend(glob.glob('index.html'))
    all_emojis = Counter()
    
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            for match in emoji_pattern.finditer(content):
                e = match.group()
                all_emojis[e] += 1
    
    with open('emojis.txt', 'w', encoding='utf-8') as f:
        for e, count in all_emojis.most_common():
            f.write(f'{e}: {count}\n')
            
get_emojis()
