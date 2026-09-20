import json
import os

# Define new values
translations = {
    'en.json': {
        'buyer': 'Buyer',
        'buyerDesc': 'Connect with farmers and purchase crops'
    },
    'hi.json': {
        'buyer': 'खरीदार',
        'buyerDesc': 'किसानों से जुड़ें और फसलें खरीदें'
    },
    'mr.json': {
        'buyer': 'खरेदीदार',
        'buyerDesc': 'शेतकऱ्यांशी संपर्क साधा आणि पिके खरेदी करा'
    }
}

for filename, trans in translations.items():
    filepath = os.path.join('translations', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    if 'auth' in data:
        if 'admin' in data['auth']:
            del data['auth']['admin']
        if 'adminDesc' in data['auth']:
            del data['auth']['adminDesc']
            
        data['auth']['buyer'] = trans['buyer']
        data['auth']['buyerDesc'] = trans['buyerDesc']
        
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
        
print("Updated translation files successfully.")
