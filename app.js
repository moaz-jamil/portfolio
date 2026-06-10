import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';
import htm from 'https://esm.sh/htm@3.1.1';

const html = htm.bind(React.createElement);

function App() {
  // --- STATE HOOKS ---
  const [activePage, setActivePage] = useState('home');
  const [curtainState, setCurtainState] = useState(''); // '', 'active', 'wipe-out'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState('phota');
  const [activeAccordion, setActiveAccordion] = useState(0); // Index of expanded card
  const [year] = useState(new Date().getFullYear());

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', text: '' }); // type: 'success' or 'loading'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- TRANSITION ANIMATION CONTROLLER ---
  const switchPage = (targetId) => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: Scroll smoothly to the target section element
      const targetView = document.getElementById(`view-${targetId}`);
      if (targetView) {
        // Close menu
        setIsMenuOpen(false);

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
      // Desktop: Immersive curtain wipe
      setCurtainState('active');
      
      setTimeout(() => {
        setActivePage(targetId);
        window.scrollTo({ top: 0 });
        setCurtainState('wipe-out');

        setTimeout(() => {
          setCurtainState('');
        }, 600);
      }, 600);
    }
  };

  // --- MOBILE SCROLL SPY HOOK ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) return;

      const pageViews = ['home', 'projects', 'experience', 'skills', 'contact'];
      let currentView = 'home';
      const scrollPosition = window.scrollY + 140;

      for (const viewId of pageViews) {
        const element = document.getElementById(`view-${viewId}`);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
            currentView = viewId;
          }
        }
      }

      setActivePage(currentView);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- CONTACT FORM HANDLER ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('t-', '')]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: 'loading', text: 'Transmitting Message...' });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: 'success',
        text: 'Secure link handshake success. Message transmitted successfully.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setFormStatus({ type: '', text: '' });
      }, 5000);
    }, 1200);
  };

  // Accordion Toggle
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return html`
    <>
      {/* Curtain Transition Overlay */}
      <div className=${`curtain-wipe ${curtainState}`}></div>

      {/* Main Container */}
      <div className="showcase-container">
        
        {/* Navigation Header */}
        <header className="header">
          <div className="logo" onClick=${() => switchPage('home')}>
            <span className="logo-txt">M.JAMIL</span>
            <span className="logo-dot"></span>
          </div>
          
          <nav className=${`navigation ${isMenuOpen ? 'active' : ''}`}>
            <button 
              className=${`nav-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick=${() => switchPage('home')}
            >
              01 / Index
            </button>
            <button 
              className=${`nav-btn ${activePage === 'projects' ? 'active' : ''}`}
              onClick=${() => switchPage('projects')}
            >
              02 / Atelier
            </button>
            <button 
              className=${`nav-btn ${activePage === 'experience' ? 'active' : ''}`}
              onClick=${() => switchPage('experience')}
            >
              03 / Chronicle
            </button>
            <button 
              className=${`nav-btn ${activePage === 'skills' ? 'active' : ''}`}
              onClick=${() => switchPage('skills')}
            >
              04 / Codex
            </button>
            <button 
              className=${`nav-btn ${activePage === 'contact' ? 'active' : ''}`}
              onClick=${() => switchPage('contact')}
            >
              05 / Contact
            </button>
          </nav>

          <div className="header-actions">
            <button className="btn-cta" onClick=${() => switchPage('contact')}>Get in Touch</button>
            <button 
              className=${`mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
              onClick=${() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="viewport">
          
          {/* SCREEN 1: INDEX (HOME) */}
          <section className=${`page-view ${activePage === 'home' ? 'active' : ''}`} id="view-home">
            <div className="grid-bento">
              
              {/* Introduction Box */}
              <div className="grid-cell title-cell col-span-2">
                <div className="cell-label">Introduction</div>
                <h1 className="main-heading">CREATIVE DEVELOPER ARCHITECTING WEB & MOBILE SYSTEMS.</h1>
                <p className="hero-subtext">
                  I construct clean, high-performance cross-platform mobile apps with Flutter and build robust, secure API structures with Django.
                </p>
                <div className="button-group">
                  <button className="btn-champagne" onClick=${() => switchPage('projects')}>Browse Work</button>
                  <button className="btn-outline" onClick=${() => switchPage('experience')}>View Journey</button>
                </div>
              </div>

              {/* Profile Card */}
              <div className="grid-cell avatar-cell">
                <div className="cell-label">Identity</div>
                <div className="avatar-wrapper">
                  <div className="avatar-ring"></div>
                  <img 
                    src="https://avatars.githubusercontent.com/moaz-jamil" 
                    alt="Moaz Jamil" 
                    onError=${(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Moaz+Jamil&background=dfc08a&color=0d0d0c' }}
                    className="avatar-img"
                  />
                </div>
                <h3>Moaz Jamil</h3>
                <p className="location-txt">Lahore, PK</p>
              </div>

              {/* Statistics Box */}
              <div className="grid-cell stats-cell">
                <div className="cell-label">Metrics</div>
                <div className="metrics-container">
                  <div className="metric-block">
                    <div className="metric-num">1+</div>
                    <div className="metric-lbl">Years Experience</div>
                  </div>
                  <div className="metric-block border-left">
                    <div className="metric-num">5+</div>
                    <div className="metric-lbl">Apps Shipped</div>
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="grid-cell education-cell col-span-2">
                <div className="cell-label">Academic Profile</div>
                <div className="edu-row">
                  <div className="edu-item">
                    <span className="edu-year">2022 - Present</span>
                    <h4>BS Computer Science</h4>
                    <p>NCBA&E University</p>
                  </div>
                  <div className="edu-item border-left">
                    <span className="edu-year">Nov 2025</span>
                    <h4>Frontend Specialization</h4>
                    <p>KICS Lahore</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SCREEN 2: ATELIER (PROJECTS) */}
          <section className=${`page-view ${activePage === 'projects' ? 'active' : ''}`} id="view-projects">
            <div className="atelier-layout">
              
              {/* Left Projects Menu */}
              <div className="atelier-list">
                <div className="cell-label">Curated Work</div>
                
                <div 
                  className=${`atelier-item ${activeProject === 'phota' ? 'active' : ''}`}
                  onClick=${() => setActiveProject('phota')}
                >
                  <span className="atelier-num">01</span>
                  <h3>PHOTA Mobile System</h3>
                </div>

                <div 
                  className=${`atelier-item ${activeProject === 'pos' ? 'active' : ''}`}
                  onClick=${() => setActiveProject('pos')}
                >
                  <span className="atelier-num">02</span>
                  <h3>POS Client & CRM</h3>
                </div>

                <div 
                  className=${`atelier-item ${activeProject === 'alwaiz' ? 'active' : ''}`}
                  onClick=${() => setActiveProject('alwaiz')}
                >
                  <span className="atelier-num">03</span>
                  <h3>Alwaiz Security App</h3>
                </div>

                <div 
                  className=${`atelier-item ${activeProject === 'fyp' ? 'active' : ''}`}
                  onClick=${() => setActiveProject('fyp')}
                >
                  <span className="atelier-num">04</span>
                  <h3>AI E-Commerce Platform</h3>
                </div>
              </div>

              {/* Right Showcase Display */}
              <div className="atelier-display">
                
                <div className=${`display-panel ${activeProject === 'phota' ? 'active' : ''}`}>
                  <div className="cell-label">Project Details</div>
                  <h2 className="display-title">PHOTA Mobile Portal</h2>
                  <p className="display-desc">
                    A mobile application for the Pakistan Human Organ Transplant Authority (PHOTA), facilitating hospital accreditation protocols and transplant verification.
                  </p>
                  <ul className="display-feats">
                    <li>Stateful JWT token integration.</li>
                    <li>.NET Core backend connection with Swagger docs.</li>
                    <li>Collaborated with health department officials.</li>
                  </ul>
                  <div className="display-tech">
                    <span>Flutter</span>
                    <span>Dart</span>
                    <span>JWT Security</span>
                    <span>API Integration</span>
                  </div>
                </div>

                <div className=${`display-panel ${activeProject === 'pos' ? 'active' : ''}`}>
                  <div className="cell-label">Project Details</div>
                  <h2 className="display-title">POS Desktop & CRM</h2>
                  <p className="display-desc">
                    Multi-window Flutter desktop environment and Django database backend to handle product CRUD operations and local inventory synchronization.
                  </p>
                  <ul className="display-feats">
                    <li>Keyboard shortcut action listeners.</li>
                    <li>Django REST Framework API security.</li>
                    <li>Integrated MySQL local cache nodes.</li>
                  </ul>
                  <div className="display-tech">
                    <span>Flutter Desktop</span>
                    <span>Django REST</span>
                    <span>MySQL</span>
                  </div>
                </div>

                <div className=${`display-panel ${activeProject === 'alwaiz' ? 'active' : ''}`}>
                  <div className="cell-label">Project Details</div>
                  <h2 className="display-title">Alwaiz Developers App</h2>
                  <p className="display-desc">
                    Admin panel app including live web filtering, subscription control modules, and an integrated support chatbot.
                  </p>
                  <ul className="display-feats">
                    <li>Restricted URL and content viewer.</li>
                    <li>Role-based access levels.</li>
                    <li>Automated chatbot dialogs.</li>
                  </ul>
                  <div className="display-tech">
                    <span>Flutter</span>
                    <span>Dart</span>
                    <span>Security Blocks</span>
                    <span>Chatbot</span>
                  </div>
                </div>

                <div className=${`display-panel ${activeProject === 'fyp' ? 'active' : ''}`}>
                  <div className="cell-label">Project Details</div>
                  <h2 className="display-title">AI E-Commerce Store</h2>
                  <p className="display-desc">
                    Final year project featuring a full-stack Django shopping store combined with user behavior-based recommendation algorithms.
                  </p>
                  <ul className="display-feats">
                    <li>Cold-start recommendation logic.</li>
                    <li>PostgreSQL complex queries optimization.</li>
                    <li>Custom administrator command dashboard.</li>
                  </ul>
                  <div className="display-tech">
                    <span>Django</span>
                    <span>PostgreSQL</span>
                    <span>Python</span>
                    <span>AI Models</span>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SCREEN 3: CHRONICLE (EXPERIENCE) */}
          <section className=${`page-view ${activePage === 'experience' ? 'active' : ''}`} id="view-experience">
            <div className="chronicle-container">
              <div className="cell-label">Professional Timeline</div>
              <h2 className="section-title">THE CHRONICLE</h2>
              
              <div className="chronicle-accordion">
                
                {/* Accordion Card 1 */}
                <div className=${`chronicle-card ${activeAccordion === 0 ? 'active' : ''}`}>
                  <div className="chronicle-head" onClick=${() => toggleAccordion(0)}>
                    <span className="chronicle-role">Flutter Developer (PHOTA Portal)</span>
                    <span className="chronicle-meta">KICS, Lahore / Oct 2025 - Present</span>
                    <i className="fa-solid fa-chevron-down acc-icon"></i>
                  </div>
                  <div className="chronicle-body">
                    <p>
                      Developing the primary cross-platform mobile application for Pakistan Human Organ Transplant Authority. Implementing token state validations, optimizing API handshakes with .NET backends, and refining screen rendering profiles.
                    </p>
                  </div>
                </div>

                {/* Accordion Card 2 */}
                <div className=${`chronicle-card ${activeAccordion === 1 ? 'active' : ''}`}>
                  <div className="chronicle-head" onClick=${() => toggleAccordion(1)}>
                    <span className="chronicle-role">Full Stack Developer (POS Desktop Client)</span>
                    <span className="chronicle-meta">KICS, Lahore / July 2025 - Sep 2025</span>
                    <i className="fa-solid fa-chevron-down acc-icon"></i>
                  </div>
                  <div className="chronicle-body">
                    <p>
                      Co-developed the desktop POS catalog interfaces in Flutter and configured database CRUD pathways using Django REST Framework and MySQL data synchronizers.
                    </p>
                  </div>
                </div>

                {/* Accordion Card 3 */}
                <div className={`chronicle-card ${activeAccordion === 2 ? 'active' : ''}`}>
                  <div className="chronicle-head" onClick=${() => toggleAccordion(2)}>
                    <span className="chronicle-role">Flutter Developer (Alwaiz App)</span>
                    <span className="chronicle-meta">KICS, Lahore / Sep 2025 - Oct 2025</span>
                    <i className="fa-solid fa-chevron-down acc-icon"></i>
                  </div>
                  <div className="chronicle-body">
                    <p>
                      Configured secure administrator locks, implemented URL and links blockades, and integrated chatbot automation pipelines.
                    </p>
                  </div>
                </div>

                {/* Accordion Card 4 */}
                <div className=${`chronicle-card ${activeAccordion === 3 ? 'active' : ''}`}>
                  <div className="chronicle-head" onClick=${() => toggleAccordion(3)}>
                    <span className="chronicle-role">IT Assistant & Lab Support</span>
                    <span className="chronicle-meta">NAVTTC Program / Feb 2026 - May 2026</span>
                    <i className="fa-solid fa-chevron-down acc-icon"></i>
                  </div>
                  <div className="chronicle-body">
                    <p>
                      Provided support in programming environments config, hardware maintenance, and troubleshot code execution syntax issues for students.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SCREEN 4: CODEX (SKILLS) */}
          <section className=${`page-view ${activePage === 'skills' ? 'active' : ''}`} id="view-skills">
            <div className="codex-container">
              <div className="cell-label">Technical Competence</div>
              <h2 className="section-title">THE CODEX</h2>
              
              <div className="codex-grid">
                
                {/* Skill Card 1 */}
                <div className="codex-card">
                  <div className="codex-header">
                    <i className="fa-solid fa-mobile-screen"></i>
                    <h3>Mobile & Desktop</h3>
                  </div>
                  <p className="codex-tagline">Cross-platform interfaces</p>
                  <div className="codex-skills-list">
                    <span>Flutter</span>
                    <span>Dart</span>
                    <span>State Management</span>
                    <span>Custom Widgets</span>
                    <span>Hotkey Bindings</span>
                  </div>
                </div>

                {/* Skill Card 2 */}
                <div className="codex-card">
                  <div className="codex-header">
                    <i className="fa-solid fa-server"></i>
                    <h3>Backend & APIs</h3>
                  </div>
                  <p className="codex-tagline">Scalable logic & services</p>
                  <div className="codex-skills-list">
                    <span>Django</span>
                    <span>Django REST (DRF)</span>
                    <span>Python</span>
                    <span>JWT Auth</span>
                    <span>API Documentation</span>
                  </div>
                </div>

                {/* Skill Card 3 */}
                <div className="codex-card">
                  <div className="codex-header">
                    <i className="fa-solid fa-database"></i>
                    <h3>Databases & Web</h3>
                  </div>
                  <p className="codex-tagline">Data persistence & layouts</p>
                  <div className="codex-skills-list">
                    <span>MySQL</span>
                    <span>PostgreSQL</span>
                    <span>HTML5 / CSS3</span>
                    <span>Bootstrap</span>
                    <span>Git & GitHub</span>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SCREEN 5: CONTACT */}
          <section className=${`page-view ${activePage === 'contact' ? 'active' : ''}`} id="view-contact">
            <div className="contact-layout">
              
              {/* Left Contact Info */}
              <div className="contact-info">
                <div className="cell-label">Collaboration Node</div>
                <h2 className="huge-txt">LET'S BUILD SOMETHING UNIQUE.</h2>
                
                <div className="links-stack">
                  <a href="mailto:jamilahmed20201970@gmail.com" className="link-item">
                    <span className="link-label">Mail</span>
                    <span className="link-value">jamilahmed20201970@gmail.com</span>
                  </a>
                  <a href="tel:+923054246898" className="link-item">
                    <span className="link-label">Call</span>
                    <span className="link-value">+92 305 4246898</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/moaz-jamil-3630a7324/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link-item"
                  >
                    <span className="link-label">LinkedIn</span>
                    <span className="link-value">moaz-jamil-3630a7324</span>
                  </a>
                  <a 
                    href="https://github.com/moaz-jamil" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="link-item"
                  >
                    <span className="link-label">GitHub</span>
                    <span className="link-value">github.com/moaz-jamil</span>
                  </a>
                </div>
              </div>

              {/* Right Form Console */}
              <div className="contact-console">
                <div className="cell-label">Secure Message Transmitter</div>
                <form onSubmit=${handleFormSubmit} className="console-form">
                  <div className="field-group">
                    <input 
                      type="text" 
                      id="t-name" 
                      required 
                      value=${formData.name}
                      onChange=${handleInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="t-name">Your Name</label>
                  </div>
                  <div className="field-group">
                    <input 
                      type="email" 
                      id="t-email" 
                      required 
                      value=${formData.email}
                      onChange=${handleInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="t-email">Your Email</label>
                  </div>
                  <div className="field-group">
                    <input 
                      type="text" 
                      id="t-subject" 
                      required 
                      value=${formData.subject}
                      onChange=${handleInputChange}
                      placeholder=" "
                    />
                    <label htmlFor="t-subject">Subject</label>
                  </div>
                  <div className="field-group">
                    <textarea 
                      id="t-message" 
                      rows="4" 
                      required 
                      value=${formData.message}
                      onChange=${handleInputChange}
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="t-message">Your Message</label>
                  </div>
                  <button 
                    type="submit" 
                    className="btn-submit" 
                    disabled=${isSubmitting}
                  >
                    ${isSubmitting ? 'Transmitting...' : 'Send Message'}
                  </button>
                  ${formStatus.text && html`
                    <div className=${`status-box ${formStatus.type === 'success' ? 'success' : ''}`}>
                      ${formStatus.text}
                    </div>
                  `}
                </form>
              </div>

            </div>
          </section>

        </div>

        {/* Minimalist Footer */}
        <footer className="footer">
          <div className="footer-wrap">
            <p>&copy; ${year} Moaz Jamil.</p>
            <div className="scroll-ind">SCROLL TO NAVIGATE</div>
          </div>
        </footer>

      </div>
    </>
  `;
}

// Render the application directly to the root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
