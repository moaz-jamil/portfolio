document.addEventListener('DOMContentLoaded', () => {

    // --- current year in footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- typing text effect ---
    const words = [
        "Flutter Developer",
        "Django Backend Engineer",
        "Full Stack Developer",
        "BSCS Student"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.getElementById('typing-text');

    function type() {
        if (!typingSpan) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation
    type();

    // --- mobile navigation toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- scroll spy active links ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- contact form submission simulation ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            
            // Simulate API Request (e.g. EmailJS/formspree)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Show success status
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
                
                // Clear form
                contactForm.reset();
                
                // Remove status after 5s
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.innerHTML = '';
                }, 6000);
            }, 1500);
        });
    }

    // --- interactive chatbot widget ---
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const suggestButtons = document.querySelectorAll('.suggest-btn');
    const chatOpenIcon = document.querySelector('.chat-open-icon');
    const chatCloseIcon = document.querySelector('.chat-close-icon');

    // Chatbot responses database based on user's CV
    const botAnswers = {
        skills: "I specialize in both frontend and backend development! My toolkit includes:<br><br>• <strong>Mobile/Desktop:</strong> Flutter & Dart<br>• <strong>Backend:</strong> Django, Python, Django REST Framework<br>• <strong>Databases:</strong> MySQL & PostgreSQL<br>• <strong>Languages:</strong> C++, Python, Dart<br>• <strong>Tools:</strong> Git, GitHub, Swagger, Postman",
        
        experience: "I have 1 year of hands-on experience at KICS, Lahore working on:<br><br>1. <strong>PHOTA (Hospital Accreditation):</strong> Secure Flutter app with JWT auth and .NET Core APIs.<br>2. <strong>POS Desktop & CRM:</strong> Integrated Flutter desktop frontend with Django backend database.<br>3. <strong>Alwaiz Developers:</strong> Administrative control app featuring content restriction, subscription plans, and an interactive support chatbot.",
        
        project: "My Final Year Project (FYP) is an <strong>AI-Powered E-Commerce Platform</strong> built using Django, PostgreSQL, and Python.<br><br>It features secure user authentication, product recommendation engines, and role-based administration panels.",
        
        contact: "You can reach out to me via:<br><br>• <strong>Email:</strong> jamilahmed20201970@gmail.com<br>• <strong>Phone/WhatsApp:</strong> +92 3054246898<br>• <strong>LinkedIn:</strong> <a href='https://linkedin.com/in/moaz-jamil-3630a7324/' target='_blank' style='text-decoration: underline; color: #00f2fe;'>moaz-jamil</a><br>• <strong>GitHub:</strong> <a href='https://github.com/moaz-jamil' target='_blank' style='text-decoration: underline; color: #00f2fe;'>github.com/moaz-jamil</a>"
    };

    if (chatbotBtn && chatbotPanel) {
        // Toggle Panel
        chatbotBtn.addEventListener('click', () => {
            chatbotPanel.classList.toggle('hidden');
            chatOpenIcon.classList.toggle('hidden');
            chatCloseIcon.classList.toggle('hidden');
            
            // Remove pulse indicator when opened once
            const pulse = document.querySelector('.pulse-indicator');
            if (pulse) pulse.remove();
        });

        // Question suggestions
        suggestButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const questionKey = btn.getAttribute('data-question');
                const questionText = btn.textContent;
                
                // Add User message bubble
                appendMessage(questionText, 'user');
                
                // Add typing animation
                const typingId = appendTypingIndicator();
                
                // Scroll down
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                
                // Simulate reply delay
                setTimeout(() => {
                    removeTypingIndicator(typingId);
                    
                    const answer = botAnswers[questionKey] || "I'm not sure about that. Please contact me directly!";
                    appendMessage(answer, 'bot');
                    
                    // Scroll down again
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 850);
            });
        });
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = text;
        chatbotMessages.appendChild(msgDiv);
    }

    function appendTypingIndicator() {
        const id = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-typing';
        typingDiv.id = id;
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingDiv);
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});
