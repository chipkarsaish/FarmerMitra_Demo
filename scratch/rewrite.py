import re
import os

filepath = r"c:\Users\Saish Chipkar\Documents\Project\FarmerMitra_Demo\html\crop-listings.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We will completely replace the <style> tag content and the <main> tag content.

new_style = """
    <style>
        .dashboard-body { background-color: #f4f7f6; font-family: 'Poppins', sans-serif; }
        .dashboard-main { padding: 20px; margin-left: 220px; padding-bottom: 120px; max-width: 1000px; margin-right: auto; }
        
        /* Typography & Globals */
        h1, h2, h3 { font-family: 'Montserrat', sans-serif; }
        .text-green { color: var(--primary-green, #2d5016); }
        .card { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 10px 30px rgba(45,80,22,0.06); border: 1px solid rgba(45,80,22,0.1); margin-bottom: 24px; position: relative; overflow: hidden; }
        .section-badge { display: inline-block; background: #eaf5e4; color: #355e1a; font-size: 0.75rem; font-weight: 800; padding: 6px 12px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .section-title { font-size: 1.4rem; font-weight: 800; color: #1f3b12; margin: 0 0 20px 0; }

        /* Section 1: Crop Identity & Volume */
        .crop-selector { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
        .crop-selector::-webkit-scrollbar { display: none; }
        .crop-card { flex: 0 0 auto; width: 100px; height: 110px; border-radius: 16px; border: 2px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: #ffffff; }
        .crop-card img { width: 48px; height: 48px; object-fit: contain; margin-bottom: 8px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
        .crop-card span { font-weight: 600; font-size: 0.85rem; color: #475569; }
        .crop-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .crop-card.active { border: 3px solid #38a169; background: #f0fdf4; }
        .crop-card.active span { color: #166534; font-weight: 700; }

        .variety-wrapper { margin-top: 20px; }
        .variety-select { width: 100%; appearance: none; padding: 16px 20px; border-radius: 16px; border: 2px solid #e2e8f0; font-size: 1rem; font-weight: 600; color: #1e293b; background: #f8fafc url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 16px center; background-size: 20px; transition: 0.2s; cursor: pointer; }
        .variety-select:focus { outline: none; border-color: #38a169; background-color: #ffffff; box-shadow: 0 0 0 4px rgba(56, 161, 105, 0.1); }

        .quantity-matrix { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; }
        .qty-field { background: #f8fafc; border-radius: 16px; padding: 20px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; }
        .qty-label { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .weight-control { display: flex; align-items: center; justify-content: space-between; }
        .btn-circle { width: 48px; height: 48px; border-radius: 50%; border: none; background: #e2e8f0; color: #334155; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .btn-circle:hover { background: #cbd5e1; transform: scale(1.05); }
        .btn-circle:active { transform: scale(0.95); }
        .weight-value { font-size: 2.5rem; font-weight: 900; color: #0f172a; font-family: 'Montserrat', sans-serif; letter-spacing: -1px; }
        
        .unit-toggle { display: inline-flex; background: #e2e8f0; border-radius: 50px; padding: 4px; margin-top: 16px; width: fit-content; }
        .unit-btn { padding: 6px 16px; border-radius: 50px; border: none; background: transparent; font-size: 0.85rem; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.2s; }
        .unit-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

        .bag-control { display: flex; align-items: center; gap: 12px; }
        .bag-icon { font-size: 2rem; color: #d97706; }
        .bag-input { flex: 1; padding: 12px 16px; border-radius: 12px; border: 2px solid #e2e8f0; font-size: 1.5rem; font-weight: 800; color: #0f172a; text-align: center; }
        .bag-input:focus { outline: none; border-color: #38a169; }

        /* Section 2: Camera Portal */
        .camera-banner { background: linear-gradient(135deg, #1e3a8a, #312e81); border-radius: 20px; padding: 24px; text-align: center; color: white; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 25px rgba(30,58,138,0.2); position: relative; overflow: hidden; border: none; width: 100%; display: block; }
        .camera-banner:hover { transform: translateY(-4px); box-shadow: 0 15px 35px rgba(30,58,138,0.3); }
        .camera-banner::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent); transform: skewX(-20deg); animation: shine 3s infinite; }
        @keyframes shine { 0% { left: -100%; } 20% { left: 200%; } 100% { left: 200%; } }
        .camera-banner i { font-size: 2rem; margin-bottom: 12px; animation: pulseIcon 2s infinite; }
        @keyframes pulseIcon { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
        .camera-banner h3 { font-size: 1.4rem; margin: 0; font-weight: 800; }

        /* Camera Modal */
        .camera-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 1000; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
        .camera-modal.active { display: flex; animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .reticle { width: 300px; height: 300px; border: 2px solid rgba(255,255,255,0.5); position: relative; display: flex; align-items: center; justify-content: center; }
        .reticle::before, .reticle::after { content: ''; position: absolute; width: 40px; height: 40px; border-color: #4ade80; border-style: solid; }
        .reticle::before { top: -2px; left: -2px; border-width: 4px 0 0 4px; }
        .reticle::after { bottom: -2px; right: -2px; border-width: 0 4px 4px 0; }
        .reticle.focus::before, .reticle.focus::after { border-color: #38a169; }
        .guidance-banner { position: absolute; bottom: 80px; background: rgba(30,41,59,0.8); color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,0.1); }
        .screen-flash { position: absolute; inset: 0; background: white; opacity: 0; pointer-events: none; }
        .screen-flash.flash { animation: flashScreen 0.4s ease-out; }
        @keyframes flashScreen { 0% { opacity: 0; } 30% { opacity: 1; } 100% { opacity: 0; } }
        .close-camera { position: absolute; top: 40px; right: 40px; color: white; font-size: 2rem; cursor: pointer; }

        /* Section 3: Scorecard */
        .scorecard-panel { display: none; }
        .scorecard-panel.active { display: block; animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .scorecard-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: center; }
        
        .moisture-container { position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; }
        .moisture-svg { transform: rotate(-90deg); width: 100%; height: 100%; }
        .moisture-circle-bg { fill: none; stroke: #e2e8f0; stroke-width: 12; }
        .moisture-circle-fill { fill: none; stroke: #38a169; stroke-width: 12; stroke-dasharray: 440; stroke-dashoffset: 440; transition: stroke-dashoffset 1.5s ease-out; stroke-linecap: round; }
        .moisture-text { position: absolute; text-align: center; }
        .moisture-val { font-size: 2rem; font-weight: 900; color: #0f172a; line-height: 1; }
        .moisture-lbl { font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; }

        .admixture-bars { display: flex; flex-direction: column; gap: 16px; }
        .bar-row { display: flex; flex-direction: column; gap: 6px; }
        .bar-labels { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #334155; }
        .bar-track { height: 10px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; background: #38a169; width: 0; transition: width 1s ease-out 0.5s; }

        .stamp-ribbon { position: absolute; top: 20px; right: -10px; background: linear-gradient(135deg, #fbbf24, #d97706); color: white; padding: 8px 20px; font-weight: 800; font-size: 0.9rem; transform: rotate(5deg); box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); border-radius: 8px; opacity: 0; transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s; }
        .scorecard-panel.active .stamp-ribbon { opacity: 1; transform: rotate(5deg) scale(1); }
        .scorecard-panel:not(.active) .stamp-ribbon { transform: rotate(5deg) scale(0.5); }

        /* Section 4: Manifest */
        .manifest-panel { display: none; background: linear-gradient(145deg, #f0fdf4, #f8fafc); border-color: #bbf7d0; }
        .manifest-panel.active { display: block; animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both; }
        .lot-badge { background: #dcfce7; border: 2px dashed #22c55e; color: #166534; padding: 12px 20px; border-radius: 12px; font-family: monospace; font-size: 1.2rem; font-weight: 800; text-align: center; margin-bottom: 20px; }
        .review-card { background: white; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .review-card i { color: #38a169; font-size: 1.2rem; }
        .hardware-meta { display: flex; gap: 16px; font-size: 0.75rem; color: #64748b; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 16px; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 6px; }

        /* Section 5: Sticky Action */
        .sticky-bar { position: fixed; bottom: 0; left: 220px; right: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(16px); border-top: 1px solid #e2e8f0; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; z-index: 100; box-shadow: 0 -4px 20px rgba(0,0,0,0.03); transform: translateY(100%); transition: transform 0.4s ease; }
        .sticky-bar.visible { transform: translateY(0); }
        .intent-switch { display: flex; background: #f1f5f9; padding: 4px; border-radius: 12px; }
        .intent-btn { padding: 10px 20px; border: none; background: transparent; font-weight: 700; color: #64748b; border-radius: 8px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; }
        .intent-btn.active { background: white; color: #1e293b; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        
        .master-cta { padding: 16px 40px; border-radius: 16px; border: none; font-size: 1.1rem; font-weight: 800; color: white; background: linear-gradient(135deg, #22c55e, #16a34a); cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); display: flex; align-items: center; gap: 10px; }
        .master-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4); }
        .master-cta.offline { background: linear-gradient(135deg, #64748b, #475569); box-shadow: 0 4px 15px rgba(100, 116, 139, 0.3); }
        .master-cta.loading { pointer-events: none; opacity: 0.8; }
        .master-cta.loading i { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        @media (max-width: 768px) {
            .dashboard-main { margin-left: 0; padding: 16px; padding-bottom: 140px; }
            .quantity-matrix, .scorecard-grid { grid-template-columns: 1fr; }
            .sticky-bar { left: 0; flex-direction: column; gap: 16px; padding: 16px; }
            .intent-switch { width: 100%; }
            .intent-btn { flex: 1; justify-content: center; }
            .master-cta { width: 100%; justify-content: center; }
        }
    </style>
"""

new_main = """
    <main class="dashboard-main">
        
        <!-- Section 1: Crop Identity & Volume -->
        <section class="card" id="section-1">
            <span class="section-badge">01 · Identity & Volume</span>
            <h2 class="section-title">What are you bringing to market?</h2>
            
            <div class="crop-selector" id="cropSelector">
                <!-- Illustrations replaced with emoji avatars for demo, ideally high-def images -->
                <div class="crop-card active" data-crop="Paddy">
                    <span style="font-size: 2.5rem; margin-bottom: 8px;">🌾</span>
                    <span>Paddy</span>
                </div>
                <div class="crop-card" data-crop="Wheat">
                    <span style="font-size: 2.5rem; margin-bottom: 8px;">🍞</span>
                    <span>Wheat</span>
                </div>
                <div class="crop-card" data-crop="Maize">
                    <span style="font-size: 2.5rem; margin-bottom: 8px;">🌽</span>
                    <span>Maize</span>
                </div>
                <div class="crop-card" data-crop="Chickpeas">
                    <span style="font-size: 2.5rem; margin-bottom: 8px;">🫛</span>
                    <span>Chickpeas</span>
                </div>
            </div>

            <div class="variety-wrapper">
                <select class="variety-select" id="varietySelect">
                    <option value="Sona Masuri">Sona Masuri</option>
                    <option value="Basmati">Basmati</option>
                    <option value="Jyothi">Jyothi</option>
                </select>
            </div>

            <div class="quantity-matrix">
                <div class="qty-field">
                    <span class="qty-label">Total Weight</span>
                    <div class="weight-control">
                        <button class="btn-circle" id="btnMinus"><i class="fa-solid fa-minus"></i></button>
                        <span class="weight-value" id="weightVal">5.0</span>
                        <button class="btn-circle" id="btnPlus"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="unit-toggle">
                        <button class="unit-btn active" data-unit="Tons">Tons</button>
                        <button class="unit-btn" data-unit="Quintals">Quintals</button>
                    </div>
                </div>
                
                <div class="qty-field">
                    <span class="qty-label">Bag Count (Optional)</span>
                    <div class="bag-control" style="margin-top: 10px;">
                        <i class="fa-solid fa-sack-dollar bag-icon"></i>
                        <input type="number" class="bag-input" value="100" min="0">
                        <span style="font-weight: 700; color: #64748b; font-size: 1.2rem;">Bags</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2: Camera Portal -->
        <button class="camera-banner" id="btnCamera">
            <i class="fa-solid fa-camera"></i>
            <h3>Tap to Scan Crop Quality</h3>
            <p style="margin-top: 8px; font-size: 0.9rem; opacity: 0.9;">Offline AI analysis of moisture & purity</p>
        </button>

        <!-- Section 3: Pre-Grading Quality Scorecard -->
        <section class="card scorecard-panel" id="scorecardPanel" style="margin-top: 24px;">
            <div class="stamp-ribbon">🏆 Grade A Premium</div>
            <span class="section-badge">02 · Pre-Grading Results</span>
            <h2 class="section-title">Quality Scorecard</h2>
            
            <div class="scorecard-grid">
                <div class="moisture-container">
                    <svg class="moisture-svg" viewBox="0 0 160 160">
                        <circle class="moisture-circle-bg" cx="80" cy="80" r="70"></circle>
                        <circle class="moisture-circle-fill" id="moistureFill" cx="80" cy="80" r="70"></circle>
                    </svg>
                    <div class="moisture-text">
                        <div class="moisture-val">11.8<span style="font-size:1rem">%</span></div>
                        <div class="moisture-lbl">Safe</div>
                    </div>
                </div>
                
                <div class="admixture-bars">
                    <div class="bar-row">
                        <div class="bar-labels"><span>Broken Grains</span><span>1.2%</span></div>
                        <div class="bar-track"><div class="bar-fill" id="barBroken"></div></div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-labels"><span>Chaff & Dust</span><span>0.4%</span></div>
                        <div class="bar-track"><div class="bar-fill" id="barChaff"></div></div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-labels"><span>Discolored</span><span>0.2%</span></div>
                        <div class="bar-track"><div class="bar-fill" id="barDiscolored"></div></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4: Manifest -->
        <section class="card manifest-panel" id="manifestPanel">
            <span class="section-badge">03 · Digital Asset Minted</span>
            <h2 class="section-title">Lot Manifest Summary</h2>
            
            <div class="lot-badge">🆔 Lot ID: #LOT-2026-98321</div>
            
            <div class="review-card">
                <i class="fa-solid fa-file-contract"></i>
                <span id="reviewText">Creating Market Asset: 5.0 Tons of Grade-A Sona Masuri Paddy.</span>
            </div>
            
            <div class="hardware-meta">
                <div class="meta-item"><i class="fa-solid fa-location-dot"></i> Indore, MP</div>
                <div class="meta-item"><i class="fa-solid fa-clock"></i> <span id="timeNow"></span></div>
                <div class="meta-item"><i class="fa-solid fa-microchip"></i> Status: Verified Local Asset</div>
            </div>
        </section>

    </main>

    <!-- Camera Modal -->
    <div class="camera-modal" id="cameraModal">
        <i class="fa-solid fa-xmark close-camera" id="closeCamera"></i>
        <div class="reticle" id="reticle"></div>
        <div class="guidance-banner" id="guidanceBanner">
            <span id="guidanceIcon">🟡</span> <span id="guidanceText">Hold steady... Move to a brighter area.</span>
        </div>
        <div class="screen-flash" id="screenFlash"></div>
    </div>

    <!-- Section 5: Sticky Action Bar -->
    <div class="sticky-bar" id="stickyBar">
        <div class="intent-switch">
            <button class="intent-btn" data-intent="storage">📦 Move to Storage</button>
            <button class="intent-btn active" data-intent="buyers">⚡ Sell to Live Buyers</button>
        </div>
        <button class="master-cta" id="masterCta">
            <i class="fa-solid fa-rocket"></i> <span>Publish Digital Lot</span>
        </button>
    </div>

    <script src="../js/i18n.js"></script>
    <script src="../js/farmer-sidebar.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // State
            let state = {
                crop: 'Paddy',
                variety: 'Sona Masuri',
                weight: 5.0,
                unit: 'Tons',
                intent: 'buyers',
                isOnline: navigator.onLine
            };

            const varieties = {
                'Paddy': ['Sona Masuri', 'Basmati', 'Jyothi'],
                'Wheat': ['Sharbati', 'Lokwan', 'Durum'],
                'Maize': ['Yellow Maize', 'White Maize'],
                'Chickpeas': ['Kabuli', 'Desi']
            };

            // Elements
            const cropCards = document.querySelectorAll('.crop-card');
            const varietySelect = document.getElementById('varietySelect');
            const weightVal = document.getElementById('weightVal');
            const unitBtns = document.querySelectorAll('.unit-btn');
            const reviewText = document.getElementById('reviewText');

            // Crop Selection
            cropCards.forEach(card => {
                card.addEventListener('click', () => {
                    cropCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    state.crop = card.dataset.crop;
                    
                    // Update varieties
                    varietySelect.innerHTML = varieties[state.crop].map(v => `<option value="${v}">${v}</option>`).join('');
                    state.variety = varietySelect.value;
                    if(navigator.vibrate) navigator.vibrate(50);
                    updateReview();
                });
            });

            varietySelect.addEventListener('change', (e) => {
                state.variety = e.target.value;
                updateReview();
            });

            // Weight logic
            document.getElementById('btnMinus').addEventListener('click', () => {
                state.weight = Math.max(0.5, state.weight - 0.5);
                weightVal.textContent = state.weight.toFixed(1);
                updateReview();
            });
            document.getElementById('btnPlus').addEventListener('click', () => {
                state.weight += 0.5;
                weightVal.textContent = state.weight.toFixed(1);
                updateReview();
            });

            unitBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    unitBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    state.unit = btn.dataset.unit;
                    updateReview();
                });
            });

            function updateReview() {
                reviewText.textContent = `Creating Market Asset: ${state.weight.toFixed(1)} ${state.unit} of Grade-A ${state.variety} ${state.crop}.`;
            }

            // Camera Logic
            const btnCamera = document.getElementById('btnCamera');
            const modal = document.getElementById('cameraModal');
            const closeCamera = document.getElementById('closeCamera');
            const gIcon = document.getElementById('guidanceIcon');
            const gText = document.getElementById('guidanceText');
            const reticle = document.getElementById('reticle');
            const flash = document.getElementById('screenFlash');

            btnCamera.addEventListener('click', () => {
                modal.classList.add('active');
                gIcon.textContent = '🟡';
                gText.textContent = 'Hold steady... Move to a brighter area.';
                reticle.classList.remove('focus');

                // Simulate AI focus
                setTimeout(() => {
                    gIcon.textContent = '🟢';
                    gText.textContent = 'Perfect! Analyzing grain surface...';
                    reticle.classList.add('focus');
                }, 1500);

                // Simulate capture
                setTimeout(() => {
                    flash.classList.add('flash');
                    if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
                }, 3000);

                // Close and reveal
                setTimeout(() => {
                    modal.classList.remove('active');
                    btnCamera.style.display = 'none'; // Hide camera button
                    
                    document.getElementById('scorecardPanel').classList.add('active');
                    
                    // Trigger gauge animation
                    setTimeout(() => {
                        // calculate offset for 11.8% (out of maybe 25 max for gauge mapping)
                        // Just an arbitrary visual representation
                        document.getElementById('moistureFill').style.strokeDashoffset = '200';
                        document.getElementById('barBroken').style.width = '12%';
                        document.getElementById('barChaff').style.width = '4%';
                        document.getElementById('barDiscolored').style.width = '2%';
                    }, 100);

                    setTimeout(() => {
                        document.getElementById('manifestPanel').classList.add('active');
                        document.getElementById('stickyBar').classList.add('visible');
                        
                        const now = new Date();
                        document.getElementById('timeNow').textContent = now.toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                        });
                        
                        document.getElementById('manifestPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 1500);

                }, 3300);
            });

            closeCamera.addEventListener('click', () => modal.classList.remove('active'));

            // Intent logic
            const intentBtns = document.querySelectorAll('.intent-btn');
            intentBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    intentBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    state.intent = btn.dataset.intent;
                });
            });

            // Master CTA & Offline State
            const masterCta = document.getElementById('masterCta');
            const ctaIcon = masterCta.querySelector('i');
            const ctaText = masterCta.querySelector('span');

            function updateNetworkState() {
                // Simulate checking connection
                state.isOnline = navigator.onLine;
                if(state.isOnline) {
                    masterCta.classList.remove('offline');
                    ctaIcon.className = 'fa-solid fa-rocket';
                    ctaText.textContent = 'Publish Digital Lot';
                } else {
                    masterCta.classList.add('offline');
                    ctaIcon.className = 'fa-solid fa-cloud-arrow-down';
                    ctaText.textContent = 'Save Offline & Sync';
                }
            }

            window.addEventListener('online', updateNetworkState);
            window.addEventListener('offline', updateNetworkState);
            updateNetworkState();

            masterCta.addEventListener('click', () => {
                masterCta.classList.add('loading');
                ctaIcon.className = 'fa-solid fa-circle-notch';
                
                setTimeout(() => {
                    masterCta.classList.remove('loading');
                    if(state.isOnline) {
                        alert('Success! Lot published to live buyers network.');
                    } else {
                        alert('Saved securely. Will sync when network returns.');
                        updateNetworkState(); // Reset icon
                    }
                }, 1500);
            });

        });
    </script>
</body>
</html>
"""

# Replace <style> to </style>
new_content = re.sub(r'<style>.*?</style>', new_style, content, flags=re.DOTALL)

# Replace <main ... </main> and everything after up to <script src="../js/i18n.js">
# Actually, it's safer to just split by <main class="dashboard-main"> and </body>
part1 = new_content.split('<main class="dashboard-main">')[0]

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(part1 + new_main)

print("Rewrite successful.")
