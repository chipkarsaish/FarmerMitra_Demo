/* js/walkthrough.js */
document.addEventListener('DOMContentLoaded', () => {
    // Walkthrough Steps Definition
    const tourSteps = [
        {
            target: '[data-tour="dashboard"]',
            title: 'Dashboard',
            desc: 'View a quick summary of your crops, prices, buyer requests, and earnings.'
        },
        {
            target: '[data-tour="market-prices"]',
            title: 'Market Prices',
            desc: 'Check the latest prices of crops in different markets.'
        },
        {
            target: '[data-tour="my-crops"]',
            title: 'My Crops',
            desc: 'Manage your crops and view all your active crop listings.'
        },
        {
            target: '[data-tour="buyers"]',
            title: 'Buyers',
            desc: 'View interested buyers and connect with them.'
        },
        {
            target: '[data-tour="smart-selling"]',
            title: 'Transport & Storage',
            desc: 'Get smart suggestions to help you decide when and where to sell your crops.'
        },
        {
            target: '[data-tour="transactions"]',
            title: 'Transactions',
            desc: 'Track your payments and completed crop sales.'
        },
        {
            target: '[data-tour="profile"]',
            title: 'Profile',
            desc: 'View and manage your account information.'
        },
        {
            target: '[data-tour="create-listing"]',
            title: 'Sell Your Crop',
            desc: 'Click here to create a new crop listing and connect with potential buyers.'
        },
        {
            target: '[data-tour="buyer-requests"]',
            title: 'Buyer Requests',
            desc: 'Check requests from buyers who are interested in purchasing your crops.'
        },
        {
            target: '[data-tour="price-trend"]',
            title: 'Market Price Trends',
            desc: 'View crop price trends and forecasts to make better selling decisions.'
        }
    ];

    let currentStepIndex = 0;
    let isTourActive = false;
    let currentSynthesis = null;

    // DOM Elements to inject
    const overlay = document.createElement('div');
    overlay.id = 'walkthrough-overlay';
    document.body.appendChild(overlay);

    const arrow = document.createElement('i');
    arrow.className = 'fa-solid fa-arrow-right walkthrough-arrow';
    document.body.appendChild(arrow);

    const tooltip = document.createElement('div');
    tooltip.id = 'walkthrough-tooltip';
    document.body.appendChild(tooltip);

    // Trigger button
    const startTourBtn = document.getElementById('start-tour-btn');
    if (startTourBtn) {
        startTourBtn.addEventListener('click', (e) => {
            e.preventDefault();
            startTour();
        });
    }

    function startTour() {
        if (isTourActive) return;
        isTourActive = true;
        currentStepIndex = 0;
        
        window.scrollTo(0, 0);

        overlay.classList.add('active');
        arrow.classList.add('active');
        tooltip.classList.add('active');

        renderStep(currentStepIndex);
    }

    function stopTour() {
        isTourActive = false;
        overlay.classList.remove('active');
        arrow.classList.remove('active');
        tooltip.classList.remove('active');
        
        // Remove highlight from current target
        const currentTarget = document.querySelector(tourSteps[currentStepIndex]?.target);
        if (currentTarget) {
            currentTarget.classList.remove('walkthrough-highlight');
        }

        resetElevations();
        stopTTS();
    }

    function nextStep() {
        if (currentStepIndex < tourSteps.length - 1) {
            // Remove highlight from old
            const oldTarget = document.querySelector(tourSteps[currentStepIndex].target);
            if (oldTarget) oldTarget.classList.remove('walkthrough-highlight');
            
            currentStepIndex++;
            renderStep(currentStepIndex);
        } else {
            // End of tour, show completion
            const oldTarget = document.querySelector(tourSteps[currentStepIndex].target);
            if (oldTarget) oldTarget.classList.remove('walkthrough-highlight');
            
            showCompletionModal();
        }
    }

    function prevStep() {
        if (currentStepIndex > 0) {
            // Remove highlight from old
            const oldTarget = document.querySelector(tourSteps[currentStepIndex].target);
            if (oldTarget) oldTarget.classList.remove('walkthrough-highlight');
            
            currentStepIndex--;
            renderStep(currentStepIndex);
        }
    }

    function resetElevations() {
        const sidebar = document.getElementById('farmerSidebar');
        if (sidebar) sidebar.style.zIndex = '';
    }

    function elevateParents(targetElement) {
        resetElevations();
        const sidebar = targetElement.closest('.farmer-sidebar');
        if (sidebar) {
            sidebar.style.zIndex = '9999';
        }
    }

    function renderStep(index) {
        stopTTS(); // Stop any playing audio
        tooltip.className = 'active'; // Reset classes, keep active
        const step = tourSteps[index];
        const targetElement = document.querySelector(step.target);

        if (!targetElement) {
            console.warn(`Tour target not found: ${step.target}`);
            tooltip.classList.add('completion-modal');
            renderTooltipContent(step, index, false);
            arrow.style.display = 'none';
            resetElevations();
            return;
        }

        arrow.style.display = 'block';

        // Elevate parent stacking contexts if necessary
        elevateParents(targetElement);

        // Scroll into view if needed
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight element
        targetElement.classList.add('walkthrough-highlight');

        // Render Tooltip HTML
        renderTooltipContent(step, index, true);

        // Position after a tiny delay to allow scroll
        setTimeout(() => positionElements(targetElement), 150);
    }

    function renderTooltipContent(step, index, hasTarget) {
        const isFirst = index === 0;
        
        let footerHtml = `<div class="walkthrough-footer">`;
        
        if (hasTarget) {
            if (isFirst) {
                footerHtml += `<button class="walkthrough-btn walkthrough-btn-skip" id="wt-skip">Skip Tour</button>
                               <button class="walkthrough-btn walkthrough-btn-next" id="wt-next">Next <i class="fa-solid fa-arrow-right"></i></button>`;
            } else {
                footerHtml += `<button class="walkthrough-btn walkthrough-btn-back" id="wt-prev"><i class="fa-solid fa-arrow-left"></i> Back</button>
                               <div class="walkthrough-nav-group">
                                 <button class="walkthrough-btn walkthrough-btn-skip" id="wt-skip">Skip Tour</button>
                                 <button class="walkthrough-btn walkthrough-btn-next" id="wt-next">Next <i class="fa-solid fa-arrow-right"></i></button>
                               </div>`;
            }
        }
        footerHtml += `</div>`;

        tooltip.innerHTML = `
            <div class="walkthrough-header">
                <h3 class="walkthrough-title">${step.title}</h3>
                <button class="walkthrough-speaker" id="wt-speak" title="Read Aloud">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            ${hasTarget ? `<span class="walkthrough-progress">Step ${index + 1} of ${tourSteps.length}</span>` : ''}
            <p class="walkthrough-desc">${step.desc}</p>
            ${footerHtml}
        `;

        // Add event listeners
        document.getElementById('wt-skip')?.addEventListener('click', stopTour);
        document.getElementById('wt-next')?.addEventListener('click', nextStep);
        document.getElementById('wt-prev')?.addEventListener('click', prevStep);
        
        const speakBtn = document.getElementById('wt-speak');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => {
                playTTS(step.title, step.desc, speakBtn);
            });
        }
    }

    function showCompletionModal() {
        stopTTS();
        arrow.style.display = 'none';
        tooltip.className = 'active completion-modal';
        tooltip.style.top = '';
        tooltip.style.left = '';

        tooltip.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
            <h3 class="walkthrough-title" style="margin-bottom: 15px; font-size: 1.8rem; justify-content: center;">You're Ready!</h3>
            <p class="walkthrough-desc">You now know the main features of KisanMitra.<br>Use the dashboard to manage crops, check prices, connect with buyers, and sell smarter.</p>
            <div class="walkthrough-footer" style="justify-content: center; margin-top: 25px;">
                <button class="walkthrough-btn walkthrough-btn-finish" id="wt-finish" style="padding: 12px 30px; font-size: 1.1rem;">Finish Tour</button>
            </div>
        `;

        document.getElementById('wt-finish').addEventListener('click', stopTour);
    }

    function positionElements(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        // Default positioning: Right (Tooltip is on the right of the element)
        let tTop = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        let tLeft = rect.right + 40; // 40px gap for arrow
        
        // Arrow points LEFT (towards the element)
        arrow.className = 'fa-solid fa-arrow-left walkthrough-arrow active arrow-left';
        let aTop = rect.top + (rect.height / 2) - 20; // center vertically
        let aLeft = rect.right + 5; // Arrow starts near element's right edge

        // Check if it fits on the right
        if (tLeft + tooltipRect.width > window.innerWidth) {
            // Try Bottom (Tooltip is below the element)
            tTop = rect.bottom + 40;
            tLeft = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            
            // Arrow points UP (towards the element)
            arrow.className = 'fa-solid fa-arrow-up walkthrough-arrow active arrow-up';
            aTop = rect.bottom + 5;
            aLeft = rect.left + (rect.width / 2) - 15;

            // Check if it fits on bottom, if not try top
            if (tTop + tooltipRect.height > window.innerHeight) {
                 // Try Top (Tooltip is above the element)
                 tTop = rect.top - tooltipRect.height - 40;
                 tLeft = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

                 // Arrow points DOWN (towards the element)
                 arrow.className = 'fa-solid fa-arrow-down walkthrough-arrow active arrow-down';
                 aTop = rect.top - 35; // Above the element
                 aLeft = rect.left + (rect.width / 2) - 15;
            }
        }

        // Adjust left/right boundaries for bottom/top placement
        if (tLeft < 10) tLeft = 10;
        if (tLeft + tooltipRect.width > window.innerWidth - 10) {
            tLeft = window.innerWidth - tooltipRect.width - 10;
        }

        // Adjust top/bottom boundaries so it doesn't get cut off
        if (tTop < 10) {
            tTop = 10; // Prevent cutting off at the top
        }
        if (tTop + tooltipRect.height > window.innerHeight - 10) {
            tTop = window.innerHeight - tooltipRect.height - 10; // Prevent cutting off at the bottom
        }

        tooltip.style.top = `${tTop + window.scrollY}px`;
        tooltip.style.left = `${tLeft + window.scrollX}px`;
        
        arrow.style.top = `${aTop + window.scrollY}px`;
        arrow.style.left = `${aLeft + window.scrollX}px`;
    }

    // Text to Speech
    function playTTS(title, desc, buttonEl) {
        if (!('speechSynthesis' in window)) {
            console.warn("Speech synthesis not supported in this browser.");
            return;
        }
        
        stopTTS(); // Stop previous

        const text = `${title}. ${desc}`;
        const utterance = new SpeechSynthesisUtterance(text);
        currentSynthesis = utterance;

        // Try to match language
        const currentLang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
        
        let langCode = 'en-IN';
        if (currentLang === 'hi') langCode = 'hi-IN';
        if (currentLang === 'mr') langCode = 'mr-IN';
        
        utterance.lang = langCode;

        utterance.onstart = () => {
            buttonEl.classList.add('playing');
        };

        utterance.onend = () => {
            buttonEl.classList.remove('playing');
            currentSynthesis = null;
        };

        utterance.onerror = () => {
            buttonEl.classList.remove('playing');
            currentSynthesis = null;
        };

        window.speechSynthesis.speak(utterance);
    }

    function stopTTS() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            document.querySelectorAll('.walkthrough-speaker.playing').forEach(el => el.classList.remove('playing'));
            currentSynthesis = null;
        }
    }

    // Handle resize
    window.addEventListener('resize', () => {
        if (isTourActive && !tooltip.classList.contains('completion-modal')) {
            const target = document.querySelector(tourSteps[currentStepIndex].target);
            if (target) positionElements(target);
        }
    });
});
