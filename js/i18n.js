// i18n.js - Google Translate Integration for FarmerMitra
// Automatically translates the entire portal (Farmer & Buyer side) using Google Translate widget.

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
    }

    init() {
        // The landing page can retain Google's Marathi cookie even after English
        // is selected. Clear it before the widget initializes.
        if (location.pathname.endsWith('/website.html') && this.currentLang === 'en') {
            this.clearGoogleTranslateCookie();
        }

        // Always inject Google Translate script to handle translations based on cookie
        this.injectGoogleTranslate();
        this.updateLanguageSwitcher();
    }

    clearGoogleTranslateCookie() {
        const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        document.cookie = `googtrans=; ${expires} path=/;`;
        if (location.hostname) {
            document.cookie = `googtrans=; ${expires} domain=${location.hostname}; path=/;`;
        }
    }

    injectGoogleTranslate() {
        // Create hidden container for the widget
        const container = document.createElement('div');
        container.id = 'google_translate_element';
        container.style.display = 'none';
        document.body.appendChild(container);

        // Define the global callback required by Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,mr,hi',
                autoDisplay: false
            }, 'google_translate_element');
        };

        // Inject the Google Translate script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
        
        // Hide all Google Translate UI elements (banners, tooltips, highlights)
        const style = document.createElement('style');
        style.innerHTML = `
            .goog-te-banner-frame { display: none !important; }
            body { top: 0px !important; }
            .goog-tooltip { display: none !important; }
            .goog-tooltip:hover { display: none !important; }
            .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
            #goog-gt-tt { display: none !important; }
            body > .skiptranslate { display: none !important; }
        `;
        document.head.appendChild(style);
    }

    changeLanguage(lang) {
        if (lang === this.currentLang) {
            if (location.pathname.endsWith('/website.html') && lang === 'en') {
                this.clearGoogleTranslateCookie();
                window.location.reload();
            }
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        localStorage.setItem('farmer-language', lang); // for backwards compatibility
        
        // We use cookies and reload for a clean 100% translation without dealing with iframe hacks.
        if (lang === 'en') {
            this.clearGoogleTranslateCookie();
        } else {
            document.cookie = "googtrans=/en/" + lang + "; path=/;";
            document.cookie = "googtrans=/en/" + lang + "; domain=" + location.hostname + "; path=/;";
        }
        
        // Reload to apply the translation natively across the entire page
        window.location.reload();
    }

    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === this.currentLang) {
                btn.classList.add('active');
                // Support for Tailwind styled buttons (like in website.html)
                btn.classList.add('bg-farmer-green-600', 'text-white');
                btn.classList.remove('text-gray-600', 'hover:bg-farmer-green-50', 'hover:text-farmer-green-600');
            } else {
                btn.classList.remove('active');
                // Support for Tailwind styled buttons (like in website.html)
                btn.classList.remove('bg-farmer-green-600', 'text-white');
                btn.classList.add('text-gray-600', 'hover:bg-farmer-green-50', 'hover:text-farmer-green-600');
            }
        });
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();

    // Setup language switcher event listeners across all pages
    // Find all language switchers first (for dynamically fixing missing data-langs)
    document.querySelectorAll('.language-switcher, .flex.items-center.gap-1').forEach(sw => {
        const buttons = [...sw.querySelectorAll('.lang-btn')];
        buttons.forEach((b, i) => {
            if (!b.hasAttribute('data-lang')) {
                b.setAttribute('data-lang', i ? 'mr' : 'en');
            }
        });
    });

    // Attach click listeners directly to all lang-btn elements
    document.querySelectorAll('.lang-btn').forEach(b => {
        const lang = b.getAttribute('data-lang');
        
        // Fix gibberish text caused by encoding issues in the HTML
        if (lang === 'mr') b.textContent = 'मराठी';
        if (lang === 'en') b.textContent = 'English';
        if (lang === 'hi') b.textContent = 'हिंदी';
        
        b.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            i18n.changeLanguage(lang);
        });
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
