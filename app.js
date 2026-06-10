document.addEventListener('DOMContentLoaded', () => {

    // --- Year Config ---
    const yearLabel = document.getElementById('year-label');
    if (yearLabel) {
        yearLabel.textContent = new Date().getFullYear();
    }

    // --- Page View Switcher (Curtain Wipe Transition) ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageViews = document.querySelectorAll('.page-view');
    const curtain = document.getElementById('curtain-wipe');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navigation = document.getElementById('navigation');

    function switchPage(targetId) {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: Scroll to section smoothly
            const targetView = document.getElementById(`view-${targetId}`);
            if (targetView) {
                // Update active tab style
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-target') === targetId) {
                        btn.classList.add('active');
                    }
                });

                // Close mobile drawer menu
                if (mobileToggle && navigation) {
                    mobileToggle.classList.remove('active');
                    navigation.classList.remove('active');
                }

                // Scroll with header offset
                const offset = 80;
                const elementPosition = targetView.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Desktop: Immersive Curtain Wipe Page Swap
            if (!curtain) return;

            // Step 1: Slide curtain in
            curtain.classList.remove('wipe-out');
            curtain.classList.add('active');

            setTimeout(() => {
                // Step 2: Swap active nav state
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-target') === targetId) {
                        btn.classList.add('active');
                    }
                });

                // Step 3: Swap active page view state
                pageViews.forEach(view => {
                    view.classList.remove('active');
                    if (view.getAttribute('id') === `view-${targetId}`) {
                        view.classList.add('active');
                    }
                });

                // Scroll page to top
                window.scrollTo({ top: 0 });

                // Step 4: Wipe curtain out
                curtain.classList.remove('active');
                curtain.classList.add('wipe-out');

                setTimeout(() => {
                    curtain.classList.remove('wipe-out');
                }, 600);

            }, 600);
        }
    }

    // Nav bar tab buttons click listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            switchPage(targetId);
        });
    });

    // Custom links trigger redirects
    document.querySelectorAll('.nav-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-dest');
            switchPage(targetId);
        });
    });


    // --- Mobile Menu Toggle Drawer ---
    if (mobileToggle && navigation) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navigation.classList.toggle('active');
        });
    }


    // --- Atelier Showcase Project Switcher ---
    const atelierItems = document.querySelectorAll('.atelier-item');
    const displayPanels = document.querySelectorAll('.display-panel');

    atelierItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active states on other project buttons
            atelierItems.forEach(ai => ai.classList.remove('active'));
            item.classList.add('active');

            const projectKey = item.getAttribute('data-project');

            // Swap visual panel details on the right
            displayPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === `display-${projectKey}`) {
                    panel.classList.add('active');
                }
            });
        });
    });


    // --- Chronicle Timeline Accordion ---
    const accordionCards = document.querySelectorAll('.chronicle-card');

    accordionCards.forEach(card => {
        const head = card.querySelector('.chronicle-head');
        if (head) {
            head.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                
                // Collapse other accordion panels
                accordionCards.forEach(c => c.classList.remove('active'));
                
                // Toggle clicked panel state
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        }
    });


    // --- Scroll Spy for Mobile ---
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) return;

        let currentView = 'home';
        const scrollPosition = window.scrollY + 140;

        pageViews.forEach(view => {
            const sectionTop = view.offsetTop;
            const sectionHeight = view.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentView = view.getAttribute('id').replace('view-', '');
            }
        });

        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-target') === currentView) {
                btn.classList.add('active');
            }
        });
    });


    // --- Secure Message Transmitter (Contact Form) ---
    const transmitterForm = document.getElementById('transmitter-form');
    const transmitterStatus = document.getElementById('transmitter-status');
    const transmitterSubmitBtn = document.getElementById('t-submit-btn');

    if (transmitterForm && transmitterStatus) {
        transmitterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            transmitterSubmitBtn.disabled = true;
            transmitterSubmitBtn.textContent = 'Transmitting Message...';

            setTimeout(() => {
                transmitterSubmitBtn.disabled = false;
                transmitterSubmitBtn.textContent = 'Send Message';

                transmitterStatus.className = 'status-box success';
                transmitterStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Secure link handshake success. Message transmitted.';

                // Reset inputs
                transmitterForm.reset();

                setTimeout(() => {
                    transmitterStatus.className = 'status-box';
                    transmitterStatus.innerHTML = '';
                }, 5000);
            }, 1200);
        });
    }

});
