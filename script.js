/**
 * ==========================================================================
 * INTERACTIVE PORTFOLIO ENGINE
 * Manages State, Renders Content, and Controls Live customizer Panel
 * ==========================================================================
 */

import defaultConfig from './config.js';

// --- State Management ---
let appState = {};

// Load configuration from LocalStorage or fallback to default config
function loadState() {
  const saved = localStorage.getItem('sivani_portfolio_config');
  if (saved) {
    try {
      appState = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing saved configuration, resetting to default:', e);
      appState = JSON.parse(JSON.stringify(defaultConfig));
    }
  } else {
    // Clone defaultConfig to prevent mutation of original module
    appState = JSON.parse(JSON.stringify(defaultConfig));
  }
}

// Save configuration to LocalStorage
function saveStateToLocalStorage() {
  localStorage.setItem('sivani_portfolio_config', JSON.stringify(appState));
  showToast('Configuration saved successfully!');
}

// Reset state
function resetState() {
  if (confirm('Are you sure you want to reset all customizations back to the original resume details?')) {
    localStorage.removeItem('sivani_portfolio_config');
    loadState();
    applyTheme(appState.selectedTheme);
    renderPortfolio();
    initCustomizerInputs();
    showToast('Reset to original resume details.');
  }
}

// --- DOM Rendering Engine ---
function renderPortfolio() {
  const { profile, education, skills, experience, projects, certifications, achievements } = appState;

  // 1. Logo & Footer Names
  document.getElementById('logo-text').textContent = profile.name.split(' ').pop() || 'Portfolio';
  document.getElementById('footer-name').textContent = profile.name;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // 2. Hero Section
  document.getElementById('hero-name').textContent = profile.name;
  document.getElementById('hero-bio').textContent = profile.summary;
  
  // Hero Social Links
  const socialsContainer = document.getElementById('hero-socials');
  socialsContainer.innerHTML = '';
  const socialIcons = [
    { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
    { key: 'github', icon: 'github', label: 'GitHub' },
    { key: 'leetcode', icon: 'code', label: 'LeetCode' },
    { key: 'codechef', icon: 'award', label: 'CodeChef' }
  ];
  socialIcons.forEach(soc => {
    if (profile[soc.key]) {
      const a = document.createElement('a');
      a.href = profile[soc.key];
      a.target = '_blank';
      a.className = 'social-link-icon';
      a.title = soc.label;
      a.innerHTML = `<i data-lucide="${soc.icon}"></i>`;
      socialsContainer.appendChild(a);
    }
  });

  // 3. About Section & Education
  document.getElementById('about-detailed-bio').textContent = profile.summary;
  
  if (education && education.length > 0) {
    const edu = education[0];
    document.getElementById('edu-degree').textContent = edu.degree;
    document.getElementById('edu-institution').textContent = `${edu.institution}, ${edu.location}`;
    document.getElementById('edu-duration').innerHTML = `<i data-lucide="calendar"></i> ${edu.duration}`;
    document.getElementById('edu-grade').innerHTML = `<i data-lucide="award"></i> ${edu.metrics}`;
  }

  // Stats Counters
  document.getElementById('stat-cgpa').textContent = education[0]?.metrics?.match(/[\d\.]+/)?.[0] || '9.65';
  document.getElementById('stat-projects-count').textContent = `${projects.length}+`;
  
  // Find hackathon winner details dynamically if they exist
  const firstPlaceAward = achievements.find(a => a.text.toLowerCase().includes('1st place') || a.text.toLowerCase().includes('winner'));
  document.getElementById('stat-hackathons').textContent = firstPlaceAward ? '1st' : 'Awarded';
  document.getElementById('stat-certs').textContent = `${certifications.length}+`;

  // 4. Render Skills Section
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = '';
  
  // Group skills by category
  const categories = [...new Set(skills.map(s => s.category))];
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skills-category-card glass scroll-reveal';
    
    // Group icons matching category
    let catIcon = 'code-2';
    if (cat.toLowerCase().includes('language')) catIcon = 'code';
    else if (cat.toLowerCase().includes('concept')) catIcon = 'binary';
    else if (cat.toLowerCase().includes('backend')) catIcon = 'server';
    else if (cat.toLowerCase().includes('database')) catIcon = 'database';
    else if (cat.toLowerCase().includes('libraries') || cat.toLowerCase().includes('framework')) catIcon = 'package';
    else if (cat.toLowerCase().includes('tool') || cat.toLowerCase().includes('platform')) catIcon = 'terminal';

    let listHtml = '';
    const catSkills = skills.filter(s => s.category === cat);
    catSkills.forEach(skill => {
      const skillIcon = skill.icon || 'star';
      listHtml += `
        <span class="skill-badge">
          <i data-lucide="${skillIcon}"></i>
          ${skill.name}
        </span>
      `;
    });

    card.innerHTML = `
      <div class="category-title-container">
        <i data-lucide="${catIcon}"></i>
        <h3 class="category-title">${cat}</h3>
      </div>
      <div class="skills-list">
        ${listHtml}
      </div>
    `;
    skillsContainer.appendChild(card);
  });

  // 5. Render Projects Section
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  projects.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'project-card glass scroll-reveal';
    
    // Generate bullets HTML
    let bulletsHtml = '';
    if (proj.bullets) {
      proj.bullets.forEach(b => {
        bulletsHtml += `<li>${b}</li>`;
      });
    }

    // Generate tech stack tags HTML
    let techHtml = '';
    if (proj.techStack) {
      proj.techStack.forEach(t => {
        techHtml += `<span class="tech-tag">${t}</span>`;
      });
    }

    const platformIcon = proj.platform.toLowerCase().includes('power bi') ? 'trending-up' : 'cpu';

    card.innerHTML = `
      <div class="project-cover"></div>
      <div class="project-icon-badge">
        <i data-lucide="${platformIcon}"></i>
      </div>
      <div class="project-body">
        <span class="project-platform">${proj.platform}</span>
        <h3 class="project-title">${proj.title}</h3>
        <ul class="project-bullets">
          ${bulletsHtml}
        </ul>
        <div class="project-tech">
          ${techHtml}
        </div>
        <div class="project-footer">
          <a href="${proj.link || '#'}" target="_blank" class="project-link">
            <i data-lucide="github"></i> View Repository
          </a>
        </div>
      </div>
    `;
    projectsContainer.appendChild(card);
  });

  // 6. Render Experience Timeline
  const timelineContainer = document.getElementById('timeline-container');
  timelineContainer.innerHTML = '';
  experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    
    let bulletsHtml = '';
    exp.bullets.forEach(b => {
      bulletsHtml += `<li>${b}</li>`;
    });

    let techHtml = '';
    if (exp.techStack) {
      exp.techStack.forEach(t => {
        techHtml += `<span class="tech-tag">${t}</span>`;
      });
    }

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card glass scroll-reveal">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-company">${exp.company}</span>
          </div>
        </div>
        <div class="timeline-meta">
          <span><i data-lucide="calendar"></i> ${exp.duration}</span>
          <span><i data-lucide="map-pin"></i> ${exp.location}</span>
        </div>
        <ul class="timeline-bullets">
          ${bulletsHtml}
        </ul>
        <div class="project-tech">
          ${techHtml}
        </div>
      </div>
    `;
    timelineContainer.appendChild(item);
  });

  // 7. Render Certifications
  const certsContainer = document.getElementById('certifications-container');
  certsContainer.innerHTML = '';
  certifications.forEach(cert => {
    const item = document.createElement('div');
    item.className = 'cert-item glass';
    item.innerHTML = `
      <div class="item-icon-wrapper"><i data-lucide="award"></i></div>
      <div class="item-content">
        <h4 class="cert-name">${cert.name}</h4>
        <span class="cert-authority">${cert.authority}</span>
      </div>
    `;
    certsContainer.appendChild(item);
  });

  // 8. Render Achievements
  const achievementsContainer = document.getElementById('achievements-container');
  achievementsContainer.innerHTML = '';
  achievements.forEach(ach => {
    const item = document.createElement('div');
    item.className = 'achievement-item glass';
    item.innerHTML = `
      <div class="item-icon-wrapper"><i data-lucide="trophy"></i></div>
      <div class="item-content">
        <p class="achievement-text">${ach.text}</p>
      </div>
    `;
    achievementsContainer.appendChild(item);
  });

  // 9. Contact Details
  document.getElementById('contact-email').textContent = profile.email;
  document.getElementById('contact-email').href = `mailto:${profile.email}`;
  document.getElementById('contact-phone').textContent = profile.phone;
  document.getElementById('contact-phone').href = `tel:${profile.phone.replace(/\s+/g, '')}`;
  document.getElementById('contact-location').textContent = profile.location;

  // Initialize scroll reveals on new content
  initScrollReveal();

  // Re-run Lucide Icons to draw SVGs on dynamic items
  lucide.createIcons();
}

// --- Theme Application Engine ---
function applyTheme(themeId) {
  const theme = appState.themes.find(t => t.id === themeId);
  if (!theme) return;

  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary);
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--gradient-theme', theme.gradient);
  root.style.setProperty('--glow-shadow', theme.glow);
  root.style.setProperty('--bg-color', theme.bg);
  root.style.setProperty('--card-bg', theme.cardBg);

  // Extract color values for rgb shadow helper
  if (theme.primary.includes('hsla')) {
    // E.g. hsla(263, 90%, 60%, 1)
    const matches = theme.primary.match(/\d+/g);
    if (matches && matches.length >= 3) {
      // Approximate translation to RGB for shadow glow (rough mapping for convenience)
      root.style.setProperty('--primary-color-rgb', `${matches[0]}, ${matches[1]}%, ${matches[2]}%`);
    }
  }

  appState.selectedTheme = themeId;
  
  // Highlight active theme in customizer sidebar
  document.querySelectorAll('.theme-choice').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('data-theme') === themeId) {
      el.classList.add('active');
    }
  });
}

function cycleThemes() {
  const currentIdx = appState.themes.findIndex(t => t.id === appState.selectedTheme);
  const nextIdx = (currentIdx + 1) % appState.themes.length;
  const nextThemeId = appState.themes[nextIdx].id;
  applyTheme(nextThemeId);
  showToast(`Switched theme to: ${appState.themes[nextIdx].name}`);
}

// --- Dynamic Visual Effects ---

// Typing Text Effect for Hero Title
function initTypingAnimation() {
  const titleText = document.getElementById('hero-title-text');
  const roles = [
    "Data Science & AI Engineer",
    "Python Developer",
    "RAG & LLM Specialist",
    "Competitive Programmer"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      titleText.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      titleText.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 120;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Scroll-Reveal Animation with IntersectionObserver
let revealObserver;
function initScrollReveal() {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });
}

// --- Customizer Panel Logic ---

function initCustomizerInputs() {
  const { profile } = appState;

  // Bind values to inputs
  document.getElementById('edit-name').value = profile.name || '';
  document.getElementById('edit-title').value = profile.title || '';
  document.getElementById('edit-bio').value = profile.summary || '';
  document.getElementById('edit-email').value = profile.email || '';
  document.getElementById('edit-phone').value = profile.phone || '';
  document.getElementById('edit-location').value = profile.location || '';
  document.getElementById('edit-linkedin').value = profile.linkedin || '';
  document.getElementById('edit-github').value = profile.github || '';
  document.getElementById('edit-leetcode').value = profile.leetcode || '';
  document.getElementById('edit-codechef').value = profile.codechef || '';

  renderEditSkillsList();
  renderEditProjectsList();
}

function bindLiveSynchronization() {
  // Input sync listeners for real-time changes
  const inputsMapping = [
    { inputId: 'edit-name', statePath: 'profile.name', domIds: ['hero-name', 'footer-name'] },
    { inputId: 'edit-title', statePath: 'profile.title' }, // Handled dynamically in typewriter
    { inputId: 'edit-bio', statePath: 'profile.summary', domIds: ['hero-bio', 'about-detailed-bio'] },
    { inputId: 'edit-email', statePath: 'profile.email', domIds: ['contact-email'] },
    { inputId: 'edit-phone', statePath: 'profile.phone', domIds: ['contact-phone'] },
    { inputId: 'edit-location', statePath: 'profile.location', domIds: ['contact-location'] }
  ];

  inputsMapping.forEach(mapping => {
    const inputEl = document.getElementById(mapping.inputId);
    inputEl.addEventListener('input', (e) => {
      const val = e.target.value;
      
      // Update state path (handles nested profile object)
      const pathParts = mapping.statePath.split('.');
      if (pathParts.length === 2) {
        appState[pathParts[0]][pathParts[1]] = val;
      }

      // Update DOM instantly if IDs are bound
      if (mapping.domIds) {
        mapping.domIds.forEach(domId => {
          const el = document.getElementById(domId);
          if (el) {
            if (domId === 'contact-email' && el.tagName === 'A') {
              el.href = `mailto:${val}`;
              el.textContent = val;
            } else if (domId === 'contact-phone' && el.tagName === 'A') {
              el.href = `tel:${val.replace(/\s+/g, '')}`;
              el.textContent = val;
            } else {
              el.textContent = val;
            }
          }
        });
      }
    });
  });

  // Sync social URLs on change
  const socialInputs = ['edit-linkedin', 'edit-github', 'edit-leetcode', 'edit-codechef'];
  socialInputs.forEach(inputId => {
    document.getElementById(inputId).addEventListener('change', (e) => {
      const key = inputId.replace('edit-', '');
      appState.profile[key] = e.target.value;
      
      // Re-render hero socials since it's cleaner
      const socialsContainer = document.getElementById('hero-socials');
      socialsContainer.innerHTML = '';
      const socialIcons = [
        { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
        { key: 'github', icon: 'github', label: 'GitHub' },
        { key: 'leetcode', icon: 'code', label: 'LeetCode' },
        { key: 'codechef', icon: 'award', label: 'CodeChef' }
      ];
      socialIcons.forEach(soc => {
        if (appState.profile[soc.key]) {
          const a = document.createElement('a');
          a.href = appState.profile[soc.key];
          a.target = '_blank';
          a.className = 'social-link-icon';
          a.title = soc.label;
          a.innerHTML = `<i data-lucide="${soc.icon}"></i>`;
          socialsContainer.appendChild(a);
        }
      });
      lucide.createIcons();
    });
  });

  // Card glass blur adjust slider
  const blurSlider = document.getElementById('blur-slider');
  const blurVal = document.getElementById('blur-val');
  blurSlider.addEventListener('input', (e) => {
    const val = `${e.target.value}px`;
    blurVal.textContent = val;
    document.documentElement.style.setProperty('--card-blur', val);
    appState.customBlur = val;
  });

  // Card opacity slider
  const opacitySlider = document.getElementById('glass-opacity');
  const opacityVal = document.getElementById('opacity-val');
  opacitySlider.addEventListener('input', (e) => {
    const decimal = e.target.value / 100;
    opacityVal.textContent = decimal;
    
    // Parse current cardBg colors to apply new opacity
    const currentTheme = appState.themes.find(t => t.id === appState.selectedTheme);
    if (currentTheme) {
      let rgbBase = "22, 17, 36"; // violet fallback
      if (appState.selectedTheme === 'cyan') rgbBase = "12, 28, 48";
      else if (appState.selectedTheme === 'sunset') rgbBase = "33, 17, 12";
      else if (appState.selectedTheme === 'emerald') rgbBase = "10, 31, 20";
      
      const newCardBg = `rgba(${rgbBase}, ${decimal})`;
      document.documentElement.style.setProperty('--card-bg', newCardBg);
      currentTheme.cardBg = newCardBg;
    }
  });
}

// Render Themes in Sidebar
function renderThemeSelector() {
  const container = document.getElementById('theme-selector-container');
  container.innerHTML = '';
  
  appState.themes.forEach(theme => {
    const div = document.createElement('div');
    div.className = `theme-choice glass ${theme.id === appState.selectedTheme ? 'active' : ''}`;
    div.setAttribute('data-theme', theme.id);
    
    div.innerHTML = `
      <div class="theme-choice-name">${theme.name}</div>
      <div class="theme-preview-dots">
        <div class="theme-dot-preview" style="background: ${theme.primary};"></div>
        <div class="theme-dot-preview" style="background: ${theme.accent};"></div>
      </div>
    `;
    
    div.addEventListener('click', () => {
      applyTheme(theme.id);
    });
    
    container.appendChild(div);
  });
}

// Render editable list of skills in sidebar
function renderEditSkillsList() {
  const list = document.getElementById('edit-skills-list');
  list.innerHTML = '';

  appState.skills.forEach((skill, idx) => {
    const item = document.createElement('div');
    item.className = 'manage-item glass';
    item.innerHTML = `
      <div class="manage-item-text">
        <span>${skill.name}</span>
        <span class="manage-item-subtitle">${skill.category}</span>
      </div>
      <button class="delete-item-btn" data-index="${idx}" title="Delete Skill">
        <i data-lucide="trash-2"></i>
      </button>
    `;

    item.querySelector('.delete-item-btn').addEventListener('click', () => {
      appState.skills.splice(idx, 1);
      renderEditSkillsList();
      renderPortfolio();
    });

    list.appendChild(item);
  });
  lucide.createIcons();
}

// Render editable list of projects in sidebar
function renderEditProjectsList() {
  const list = document.getElementById('edit-projects-list');
  list.innerHTML = '';

  appState.projects.forEach((proj, idx) => {
    const item = document.createElement('div');
    item.className = 'manage-item glass';
    item.innerHTML = `
      <div class="manage-item-text">
        <span>${proj.title}</span>
        <span class="manage-item-subtitle">${proj.platform}</span>
      </div>
      <button class="delete-item-btn" data-index="${idx}" title="Delete Project">
        <i data-lucide="trash-2"></i>
      </button>
    `;

    item.querySelector('.delete-item-btn').addEventListener('click', () => {
      appState.projects.splice(idx, 1);
      renderEditProjectsList();
      renderPortfolio();
    });

    list.appendChild(item);
  });
  lucide.createIcons();
}

// Export Configuration as Downloadable JSON File
function exportConfigAsJSON() {
  // Strip out UI helper values to keep the configuration clean
  const cleanConfig = JSON.parse(JSON.stringify(appState));
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cleanConfig, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "portfolio-config.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  
  showToast("portfolio-config.json exported! Replace the content in config.js to save permanently.");
}

// Helper Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  msgEl.textContent = message;
  
  toast.classList.remove('hidden');
  
  // Clear any existing timeouts if possible, or just let it replace
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// --- Event Listeners and Setup ---
document.addEventListener('DOMContentLoaded', () => {
  // Load State
  loadState();

  // Rendering
  renderPortfolio();
  applyTheme(appState.selectedTheme);
  
  // Typing Effect
  initTypingAnimation();

  // Customizer Setup
  initCustomizerInputs();
  bindLiveSynchronization();
  renderThemeSelector();

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('navbar');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenuBtn.innerHTML = isOpen ? `<i data-lucide="x"></i>` : `<i data-lucide="menu"></i>`;
    lucide.createIcons();
  });

  // Close mobile menu on click link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
      lucide.createIcons();
    });
  });

  // Customizer Panel Toggles
  const customizerToggle = document.getElementById('customizer-toggle');
  const customizerClose = document.getElementById('customizer-close');
  const customizerSidebar = document.getElementById('customizer-sidebar');
  const customizerBackdrop = document.getElementById('customizer-backdrop');

  const openSidebar = () => {
    customizerSidebar.classList.add('open');
    customizerBackdrop.classList.add('open');
  };

  const closeSidebar = () => {
    customizerSidebar.classList.remove('open');
    customizerBackdrop.classList.remove('open');
  };

  customizerToggle.addEventListener('click', openSidebar);
  customizerClose.addEventListener('click', closeSidebar);
  customizerBackdrop.addEventListener('click', closeSidebar);

  // Customizer Tab Switchers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.customizer-pane').forEach(p => p.classList.remove('active'));
      
      e.target.classList.add('active');
      const paneId = e.target.getAttribute('data-tab');
      document.getElementById(paneId).classList.add('active');
    });
  });

  // Add Skill Action
  document.getElementById('add-skill-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('new-skill-name');
    const catSelect = document.getElementById('new-skill-category');
    
    if (nameInput.value.trim() === '') {
      alert('Please enter a skill name.');
      return;
    }

    // Match icons loosely
    let icon = 'star';
    const name = nameInput.value.trim().toLowerCase();
    if (name.includes('python')) icon = 'code-2';
    else if (name.includes('js') || name.includes('javascript') || name.includes('node')) icon = 'server';
    else if (name.includes('sql') || name.includes('mysql') || name.includes('db')) icon = 'database';
    else if (name.includes('git')) icon = 'git-branch';

    appState.skills.push({
      name: nameInput.value.trim(),
      category: catSelect.value,
      icon: icon
    });

    nameInput.value = '';
    renderEditSkillsList();
    renderPortfolio();
    showToast('New skill added!');
  });

  // Add Project Action
  document.getElementById('add-project-btn').addEventListener('click', () => {
    const titleInput = document.getElementById('new-project-title');
    const platInput = document.getElementById('new-project-platform');
    const linkInput = document.getElementById('new-project-link');
    const bulletsInput = document.getElementById('new-project-bullets');
    const techInput = document.getElementById('new-project-tech');

    if (titleInput.value.trim() === '') {
      alert('Please enter a project title.');
      return;
    }

    const bullets = bulletsInput.value.split(',').map(b => b.trim()).filter(b => b !== '');
    const techStack = techInput.value.split(',').map(t => t.trim()).filter(t => t !== '');

    appState.projects.push({
      title: titleInput.value.trim(),
      platform: platInput.value.trim() || 'Python Project',
      link: linkInput.value.trim() || 'https://github.com/',
      bullets: bullets.length > 0 ? bullets : ['Developed standard applications.'],
      techStack: techStack.length > 0 ? techStack : ['Python']
    });

    titleInput.value = '';
    platInput.value = '';
    linkInput.value = '';
    bulletsInput.value = '';
    techInput.value = '';

    renderEditProjectsList();
    renderPortfolio();
    showToast('New project added!');
  });

  // Footer Actions
  document.getElementById('save-customization-btn').addEventListener('click', saveStateToLocalStorage);
  document.getElementById('export-customization-btn').addEventListener('click', exportConfigAsJSON);
  document.getElementById('reset-customization-btn').addEventListener('click', resetState);
  document.getElementById('theme-btn').addEventListener('click', cycleThemes);

  // Copy details button
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const copyVal = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(copyVal).then(() => {
        showToast(`Copied to clipboard: ${copyVal}`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // Contact Form Mock Submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    
    // Simulate API request delay
    showToast(`Sending message from ${name}...`);
    setTimeout(() => {
      showToast(`Thank you, ${name}! Your message was simulated successfully.`);
      contactForm.reset();
    }, 1200);
  });
});
