import re

with open(r'c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\auth.html', 'r', encoding='utf-8') as f:
    content = f.read()

left_panel_login_link = """            <!-- Already have account - shown only on Register -->
            <div id="leftPanelLoginLink" class="hidden text-center mt-1">
                <p class="text-gray-500 text-sm">Already have an account?</p>
                <a href="#" id="leftPanelShowLoginBtn"
                    class="text-farmer-green-600 font-bold text-base mt-1 inline-block hover:underline">Login Now</a>
            </div>"""

left_panel_new = left_panel_login_link + """

            <!-- Don't have account - shown only on Login -->
            <div id="leftPanelRegisterLink" class="text-center mt-1">
                <p class="text-gray-500 text-sm">Don't have an account?</p>
                <a href="#" id="leftPanelShowRegisterBtn"
                    class="text-farmer-green-600 font-bold text-base mt-1 inline-block hover:underline">Sign Up Now</a>
            </div>"""

if 'id="leftPanelRegisterLink"' not in content:
    content = content.replace(left_panel_login_link, left_panel_new)

right_panel_text = """                    <div class="text-center mt-6">
                        <p class="text-gray-600 text-sm">Don't have an account? <br><a href="#" id="showRegisterBtn"
                                class="text-farmer-green-600 font-semibold text-base mt-1 inline-block hover:underline">Sign
                                Up Now</a></p>
                    </div>"""
content = content.replace(right_panel_text, "")

js_logic_old = """                // Toggle logic
                const leftPanelLoginLink = document.getElementById('leftPanelLoginLink');
                function toggleForm(type) {"""
js_logic_new = """                // Toggle logic
                const leftPanelLoginLink = document.getElementById('leftPanelLoginLink');
                const leftPanelRegisterLink = document.getElementById('leftPanelRegisterLink');
                function toggleForm(type) {"""
content = content.replace(js_logic_old, js_logic_new)

js_toggle_1_old = """                        if (leftPanelLoginLink) leftPanelLoginLink.classList.remove('hidden');
                    } else {"""
js_toggle_1_new = """                        if (leftPanelLoginLink) leftPanelLoginLink.classList.remove('hidden');
                        if (leftPanelRegisterLink) leftPanelRegisterLink.classList.add('hidden');
                    } else {"""
content = content.replace(js_toggle_1_old, js_toggle_1_new)

js_toggle_2_old = """                        if (leftPanelLoginLink) leftPanelLoginLink.classList.add('hidden');
                    }
                }"""
js_toggle_2_new = """                        if (leftPanelLoginLink) leftPanelLoginLink.classList.add('hidden');
                        if (leftPanelRegisterLink) leftPanelRegisterLink.classList.remove('hidden');
                    }
                }"""
content = content.replace(js_toggle_2_old, js_toggle_2_new)

js_event_old = """                showRegisterBtn.addEventListener('click', (e) => {"""
js_event_new = """                const leftPanelShowRegisterBtn = document.getElementById('leftPanelShowRegisterBtn');
                if (leftPanelShowRegisterBtn) {
                    leftPanelShowRegisterBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        toggleForm('register');
                        window.history.replaceState(null, null, '?action=register');
                    });
                }
                
                if(showRegisterBtn) showRegisterBtn.addEventListener('click', (e) => {"""
content = content.replace(js_event_old, js_event_new)

with open(r'c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\auth.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
