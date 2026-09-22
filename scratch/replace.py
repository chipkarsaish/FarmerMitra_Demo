import os
import glob

directory = r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo"
patterns = ["html/*.html", "js/*.js", "translations/*.json"]

for pattern in patterns:
    for filepath in glob.glob(os.path.join(directory, pattern)):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'Smart Selling' in content:
                content = content.replace('Smart Selling', 'Transport and Storage')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
        except Exception as e:
            print(e)
print("Done")
