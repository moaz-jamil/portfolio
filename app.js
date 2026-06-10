document.addEventListener('DOMContentLoaded', () => {

    // --- Footer Year ---
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // --- Tab Navigation Switcher ---
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabScreens = document.querySelectorAll('.tab-screen');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    function switchTab(tabId) {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const targetScreen = document.getElementById(`screen-${tabId}`);
            if (targetScreen) {
                // Update active tab style
                navTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('data-tab') === tabId) {
                        tab.classList.add('active');
                    }
                });

                // Close mobile menu
                if (menuToggle && navLinks) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                // Scroll with offset for sticky mobile header
                const offset = 70;
                const elementPosition = targetScreen.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Remove active state from nav links
            navTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-tab') === tabId) {
                    tab.classList.add('active');
                }
            });

            // Hide other screen views, display target screen view
            tabScreens.forEach(screen => {
                screen.classList.remove('active');
                if (screen.getAttribute('id') === `screen-${tabId}`) {
                    screen.classList.add('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (tabId === 'skills') {
                animateSkills();
            }
        }
    }

    // Attach listeners to navbar buttons
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Attach listeners to intra-screen button triggers
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Attach listener to "Hire Me" link in header
    document.querySelectorAll('[data-tab-trigger]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-tab-trigger');
            switchTab(targetId);
        });
    });


    // --- Mobile Menu Toggle Drawer ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }


    // --- Portfolio Grid Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active style from other filter buttons
            filterButtons.forEach(fb => fb.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Iterate cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Add subtle fade in animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.35s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // --- Skills Progress Bar Animations ---
    function animateSkills() {
        const fillElements = document.querySelectorAll('.meter-fill');
        fillElements.forEach(fill => {
            // Trigger width transition
            const targetWidth = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    }


    // --- Contact Form Simulation ---
    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status-msg');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && statusMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                statusMsg.className = 'form-status-msg success';
                statusMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message transmitted successfully! I will reach out to you shortly.';
                
                // Clear Form
                contactForm.reset();
                
                setTimeout(() => {
                    statusMsg.className = 'form-status-msg';
                    statusMsg.innerHTML = '';
                }, 5000);
            }, 1200);
    // --- Scroll Spy for Mobile ---
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) return;
        
        let currentTab = 'home';
        const scrollPosition = window.scrollY + 120;

        tabScreens.forEach(screen => {
            const sectionTop = screen.offsetTop;
            const sectionHeight = screen.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentTab = screen.getAttribute('id').replace('screen-', '');
            }
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === currentTab) {
                tab.classList.add('active');
            }
        });
    });

    // Run skills progress animation on page load
    setTimeout(animateSkills, 600);

});
