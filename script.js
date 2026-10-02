/**
 * STUDYFLOW AI — JAVASCRIPT MASTER LOGIC
 * Crafted by Somil Jain | Internship Submission
 * High-performance, vanilla JavaScript powering SaaS interactions,
 * AI tool sandboxes, theme switcher, responsive navigation, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('studyflow_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else {
    body.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('studyflow_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  /* ==========================================================================
     2. DEMO BANNER DISMISS
     ========================================================================== */
  const bannerCloseBtn = document.getElementById('bannerCloseBtn');
  const demoBanner = document.querySelector('.demo-banner');

  if (bannerCloseBtn && demoBanner) {
    bannerCloseBtn.addEventListener('click', () => {
      demoBanner.style.transition = 'all 0.3s ease';
      demoBanner.style.opacity = '0';
      demoBanner.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        demoBanner.style.display = 'none';
      }, 300);
    });
  }

  /* ==========================================================================
     3. STICKY HEADER & MOBILE HAMBURGER MENU
     ========================================================================== */
  const mainHeader = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileCtaBtn');

  // Sticky header elevation on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  function toggleMobileMenu(isOpen) {
    const shouldOpen = typeof isOpen === 'boolean' ? isOpen : !mobileDrawer.classList.contains('open');
    if (shouldOpen) {
      mobileDrawer.classList.add('open');
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  /* ==========================================================================
     4. ACTIVE NAVIGATION LINK ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  /* ==========================================================================
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* ==========================================================================
     6. HERO DASHBOARD SIMULATION (LIVE TIMER & INTERACTIVE TASKS)
     ========================================================================== */
  const heroTimerDisplay = document.getElementById('heroTimerDisplay');
  const heroTimerBtn = document.getElementById('heroTimerBtn');
  let timerSeconds = 24 * 60 + 45;
  let timerRunning = true;
  let timerInterval;

  function updateTimerUI() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    if (heroTimerDisplay) {
      heroTimerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerUI();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        if (heroTimerBtn) heroTimerBtn.textContent = 'Restart Session';
      }
    }, 1000);
  }
  startTimer();

  if (heroTimerBtn) {
    heroTimerBtn.addEventListener('click', () => {
      if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        heroTimerBtn.textContent = 'Resume Session';
        showToast('Focus session paused', 'info');
      } else {
        if (timerSeconds === 0) timerSeconds = 25 * 60;
        startTimer();
        timerRunning = true;
        heroTimerBtn.textContent = 'Pause Session';
        showToast('Focus session resumed', 'info');
      }
    });
  }

  // Checkable tasks inside Hero Mockup
  const heroCheckboxes = document.querySelectorAll('#heroTaskList input[type="checkbox"]');
  heroCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const parent = e.target.closest('.task-item');
      if (e.target.checked) {
        parent.classList.add('completed');
        showToast('Task marked as completed! (+15 XP)', 'success');
      } else {
        parent.classList.remove('completed');
      }
    });
  });

  // Jump to quiz from hero insight
  const heroStartQuizBtn = document.getElementById('heroStartQuizBtn');
  if (heroStartQuizBtn) {
    heroStartQuizBtn.addEventListener('click', () => {
      const quizSection = document.getElementById('toolCardQuiz');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        quizSection.classList.add('highlight-glow');
        setTimeout(() => quizSection.classList.remove('highlight-glow'), 1800);
      }
    });
  }

  /* ==========================================================================
     7. AI TOOL 1: INTERACTIVE AI SUMMARIZER
     ========================================================================== */
  const samplePills = document.querySelectorAll('.sample-pill');
  const summarizerInput = document.getElementById('summarizerInput');
  const runSummarizerBtn = document.getElementById('runSummarizerBtn');
  const summarizerStatus = document.getElementById('summarizerStatus');
  const summarizerOutput = document.getElementById('summarizerOutput');

  const sampleTexts = {
    biology: {
      text: "Deoxyribonucleic acid (DNA) is a polymer composed of two polynucleotide chains that coil around each other to form a double helix. The polymer carries genetic instructions for the development, functioning, growth and reproduction of all known organisms. The two DNA strands are known as polynucleotides since they are composed of simpler monomeric units called nucleotides (adenine, cytosine, guanine, and thymine).",
      bullets: [
        { label: "Structure", desc: "Double-helix polymer composed of two coiled polynucleotide strands." },
        { label: "Core Function", desc: "Encodes genetic instructions for development, growth, and cellular reproduction." },
        { label: "Nucleotide Bases", desc: "Built from 4 fundamental bases: Adenine (A), Cytosine (C), Guanine (G), Thymine (T)." }
      ],
      timeSaved: "Condensed 42 min reading to 2.5 min overview"
    },
    history: {
      text: "The Industrial Revolution marked a period of development in the latter half of the 18th century that transformed largely rural, agrarian societies in Europe and America into industrialized, urban ones. Key innovations included James Watt's improved steam engine, the spinning jenny, and smelting iron with coke rather than charcoal, drastically raising production volumes.",
      bullets: [
        { label: "Shift in Society", desc: "Transition from agrarian/rural economies to mechanized urban manufacturing." },
        { label: "Core Inventions", desc: "Steam engine (James Watt), spinning jenny, and coke iron smelting." },
        { label: "Socioeconomic Impact", desc: "Massive population shifts toward cities, factory employment, and global trade scaling." }
      ],
      timeSaved: "Condensed 35 min chapter to 2.1 min key takeaways"
    },
    cs: {
      text: "Recursion in computer science is a method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. A recursive function solves problems by calling itself within its own code. To prevent infinite loops and stack overflow, every recursive function must define a base case that returns directly.",
      bullets: [
        { label: "Definition", desc: "Algorithmic technique where a function calls itself to solve smaller sub-problems." },
        { label: "Base Case", desc: "Mandatory termination condition preventing infinite recursion and call stack overflow." },
        { label: "Call Stack", desc: "Each recursive call allocates a frame in memory until unwound in LIFO order." }
      ],
      timeSaved: "Condensed 28 min programming concept to 1.8 min logic summary"
    }
  };

  samplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      samplePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const sampleKey = pill.getAttribute('data-sample');
      if (sampleTexts[sampleKey]) {
        summarizerInput.value = sampleTexts[sampleKey].text;
      }
    });
  });

  if (runSummarizerBtn && summarizerInput && summarizerOutput) {
    runSummarizerBtn.addEventListener('click', () => {
      const activeSamplePill = document.querySelector('.sample-pill.active');
      const sampleKey = activeSamplePill ? activeSamplePill.getAttribute('data-sample') : 'biology';
      const data = sampleTexts[sampleKey] || sampleTexts.biology;

      // Simulate AI processing state
      runSummarizerBtn.disabled = true;
      runSummarizerBtn.innerHTML = `<span>⏳ Synthesizing...</span>`;
      summarizerStatus.textContent = 'Reading & analyzing text...';
      summarizerOutput.style.opacity = '0.4';

      setTimeout(() => {
        runSummarizerBtn.disabled = false;
        runSummarizerBtn.innerHTML = `<span>✨ Summarize with AI</span>`;
        summarizerStatus.textContent = 'Simulated AI summary updated';
        summarizerOutput.style.opacity = '1';

        // Render new bullet points
        let bulletHtml = '';
        data.bullets.forEach(b => {
          bulletHtml += `<li><strong>${b.label}:</strong> ${b.desc}</li>`;
        });

        summarizerOutput.innerHTML = `
          <div class="res-badge">Synthesized Key Takeaways (${data.timeSaved}):</div>
          <ul class="res-list">${bulletHtml}</ul>
        `;

        showToast('AI Summary successfully generated!', 'success');
      }, 700);
    });
  }

  /* ==========================================================================
     8. AI TOOL 2: INTERACTIVE AI QUIZ GENERATOR
     ========================================================================== */
  const quizData = [
    {
      question: "Which nucleotide base pairs specifically with Adenine (A) in standard DNA?",
      options: ["Guanine (G)", "Cytosine (C)", "Thymine (T)", "Uracil (U)"],
      correct: 2,
      explanation: "Adenine forms two hydrogen bonds exclusively with Thymine (T) in DNA. (In RNA, Uracil pairs with Adenine)."
    },
    {
      question: "What is the primary function of a base case in a recursive algorithm?",
      options: ["Speed up compilation", "Prevent infinite recursion & stack overflow", "Allocate heap variables", "Execute multithreading"],
      correct: 1,
      explanation: "A base case provides an explicit condition to return a value without making further recursive calls, halting execution."
    },
    {
      question: "Which invention catalyzed the steam-powered Industrial Revolution in the 18th century?",
      options: ["James Watt's Steam Engine", "Gutenberg's Printing Press", "Tesla's AC Motor", "The Telegraph"],
      correct: 0,
      explanation: "James Watt's rotary steam engine drastically improved efficiency, powering factories, mines, and locomotives."
    }
  ];

  let currentQuizIndex = 0;
  let quizScore = 0;
  let hasAnsweredCurrent = false;

  const quizProgText = document.getElementById('quizProgText');
  const quizScoreText = document.getElementById('quizScoreText');
  const quizQuestionTitle = document.getElementById('quizQuestionTitle');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const quizFeedbackText = document.getElementById('quizFeedbackText');
  const nextQuizQBtn = document.getElementById('nextQuizQBtn');
  const resetQuizBtn = document.getElementById('resetQuizBtn');

  function renderQuizQuestion(index) {
    hasAnsweredCurrent = false;
    const q = quizData[index];
    if (quizProgText) quizProgText.textContent = `Question ${index + 1} of ${quizData.length}`;
    if (quizScoreText) quizScoreText.textContent = `Score: ${quizScore} / ${quizData.length}`;
    if (quizQuestionTitle) quizQuestionTitle.textContent = q.question;

    if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';
    if (nextQuizQBtn) nextQuizQBtn.style.display = 'none';

    if (quizOptionsContainer) {
      quizOptionsContainer.innerHTML = '';
      q.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.textContent = `${String.fromCharCode(65 + optIdx)}. ${opt}`;
        btn.addEventListener('click', () => handleQuizOptionClick(optIdx));
        quizOptionsContainer.appendChild(btn);
      });
    }
  }

  function handleQuizOptionClick(selectedIdx) {
    if (hasAnsweredCurrent) return;
    hasAnsweredCurrent = true;

    const q = quizData[currentQuizIndex];
    const optionBtns = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (selectedIdx === q.correct) {
      quizScore++;
      if (quizScoreText) quizScoreText.textContent = `Score: ${quizScore} / ${quizData.length}`;
      if (quizFeedbackText) {
        quizFeedbackText.innerHTML = `✅ <strong>Correct!</strong> ${q.explanation}`;
      }
      showToast('Correct answer! +20 Retention points', 'success');
    } else {
      if (quizFeedbackText) {
        quizFeedbackText.innerHTML = `❌ <strong>Incorrect.</strong> ${q.explanation}`;
      }
      showToast('Keep practicing! Reviewing key concepts.', 'info');
    }

    if (quizFeedbackBox) quizFeedbackBox.style.display = 'block';

    if (currentQuizIndex < quizData.length - 1) {
      if (nextQuizQBtn) {
        nextQuizQBtn.style.display = 'inline-block';
        nextQuizQBtn.textContent = 'Next Question ➔';
      }
    } else {
      if (nextQuizQBtn) {
        nextQuizQBtn.style.display = 'inline-block';
        nextQuizQBtn.textContent = 'View Final Results';
      }
    }
  }

  if (nextQuizQBtn) {
    nextQuizQBtn.addEventListener('click', () => {
      if (currentQuizIndex < quizData.length - 1) {
        currentQuizIndex++;
        renderQuizQuestion(currentQuizIndex);
      } else {
        // Show summary modal
        openGenericModal(
          'Quiz Demonstration Completed',
          `<div style="text-align: center; padding: 12px 0;">
            <div style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
            <h3 style="margin-bottom: 8px;">Final Score: ${quizScore} out of ${quizData.length}</h3>
            <p style="color: var(--text-muted); margin-bottom: 16px;">
              ${quizScore === 3 ? 'Outstanding! You have mastered these study topics.' : 'Great effort! Spaced repetition with StudyFlow AI ensures high exam readiness.'}
            </p>
            <p style="font-size: 0.85rem; color: var(--text-dim);">
              In the live platform, custom quizzes are automatically generated from uploaded PDF textbooks and lecture notes.
            </p>
          </div>`
        );
      }
    });
  }

  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', () => {
      currentQuizIndex = 0;
      quizScore = 0;
      renderQuizQuestion(0);
      showToast('Quiz reset to Question 1', 'info');
    });
  }

  // Initialize Quiz
  renderQuizQuestion(0);

  /* ==========================================================================
     9. AI TOOL 3: INTERACTIVE STUDY PLANNER GENERATOR
     ========================================================================== */
  const generateScheduleBtn = document.getElementById('generateScheduleBtn');
  const plannerSubjectSelect = document.getElementById('plannerSubjectSelect');
  const plannerHoursSelect = document.getElementById('plannerHoursSelect');
  const generatedScheduleList = document.getElementById('generatedScheduleList');

  const scheduleTemplates = {
    'Physics Finals': [
      { day: 'Day 1', title: 'Newtonian Mechanics & Energy Conservation', sub: 'Calculus derivations + 15 practice free-body diagrams' },
      { day: 'Day 2', title: 'Electromagnetism & Gauss\'s Law', sub: 'Field equations + Active recall flashcards' },
      { day: 'Day 3', title: 'Wave Optics & Thermodynamics', sub: 'Interference formulas + Error review journal' },
      { day: 'Day 4', title: 'Comprehensive Timed Mock Exam', sub: 'Full 3-hour simulated test under exam conditions' },
      { day: 'Day 5', title: 'AI Targeted Weak-Spot Review', sub: 'Reviewing missed mock questions + restful sleep buffer' }
    ],
    'Calculus II Midterm': [
      { day: 'Day 1', title: 'Integration by Parts & Partial Fractions', sub: 'Step-by-step integral drill sets' },
      { day: 'Day 2', title: 'Trigonometric Substitutions & Improper Integrals', sub: 'Limit evaluation drills' },
      { day: 'Day 3', title: 'Infinite Sequences & Series Convergence', sub: 'Ratio, Root, and Integral tests checklist' },
      { day: 'Day 4', title: 'Taylor & Maclaurin Polynomials', sub: 'Error bounds calculations + speed drills' },
      { day: 'Day 5', title: 'Mock Midterm & Concept Synthesis', sub: 'Formula sheet condensation' }
    ],
    'World History Exam': [
      { day: 'Day 1', title: 'Age of Exploration & Global Maritime Trade', sub: 'Columbian exchange maps & timeline creation' },
      { day: 'Day 2', title: 'The Enlightenment & Atlantic Revolutions', sub: 'Comparative philosophical essay outlines' },
      { day: 'Day 3', title: 'Industrialization & Imperial Expansion', sub: 'Document-based question (DBQ) analysis' },
      { day: 'Day 4', title: 'Global Conflicts & 20th Century Treaties', sub: 'Primary source evaluation drills' },
      { day: 'Day 5', title: 'Final Flashcard Blitz & Timeline Synthesis', sub: 'Key treaties, dates, and cause-effect matrices' }
    ]
  };

  if (generateScheduleBtn && generatedScheduleList) {
    generateScheduleBtn.addEventListener('click', () => {
      const subject = plannerSubjectSelect ? plannerSubjectSelect.value : 'Physics Finals';
      const hours = plannerHoursSelect ? plannerHoursSelect.value : '3';
      const plan = scheduleTemplates[subject] || scheduleTemplates['Physics Finals'];

      generateScheduleBtn.disabled = true;
      generateScheduleBtn.innerHTML = `<span>⏳ Optimizing Calendar...</span>`;

      setTimeout(() => {
        generateScheduleBtn.disabled = false;
        generateScheduleBtn.innerHTML = `<span>⚡ Generate 5-Day Smart Plan</span>`;

        let html = '';
        plan.forEach(item => {
          html += `
            <div class="plan-day-item">
              <span class="day-badge">${item.day}</span>
              <div class="day-details">
                <strong>${item.title}</strong>
                <small>${hours}h/day: ${item.sub}</small>
              </div>
            </div>
          `;
        });
        generatedScheduleList.innerHTML = html;
        showToast(`Generated 5-day AI study schedule for ${subject}!`, 'success');
      }, 550);
    });
  }

  /* ==========================================================================
     10. PRICING TOGGLE & PLAN SELECTION
     ========================================================================== */
  const billingToggle = document.getElementById('billingToggle');
  const priceVals = document.querySelectorAll('.price-val[data-monthly]');
  const proBilledNote = document.getElementById('proBilledNote');
  const premBilledNote = document.getElementById('premBilledNote');

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      const isAnnual = billingToggle.getAttribute('aria-checked') === 'true';
      const newState = !isAnnual;
      billingToggle.setAttribute('aria-checked', String(newState));

      priceVals.forEach(val => {
        const monthly = val.getAttribute('data-monthly');
        const annual = val.getAttribute('data-annual');
        val.textContent = newState ? annual : monthly;
      });

      if (proBilledNote) {
        proBilledNote.textContent = newState ? 'Billed annually ($72/yr)' : 'Billed monthly';
      }
      if (premBilledNote) {
        premBilledNote.textContent = newState ? 'Billed annually ($144/yr)' : 'Billed monthly';
      }

      showToast(newState ? 'Switched to Annual Billing (Save 25%)' : 'Switched to Monthly Billing', 'info');
    });
  }

  // Plan buttons
  const planButtons = document.querySelectorAll('.select-plan-btn');
  planButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      openGenericModal(
        `${plan} Plan Simulation`,
        `<div style="text-align: center; padding: 12px 0;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">🎓</div>
          <h3 style="margin-bottom: 8px;">You selected the ${plan} Plan</h3>
          <p style="color: var(--text-muted); margin-bottom: 16px;">
            Thank you for exploring StudyFlow AI! In this prototype demonstration, full access to all features has been unlocked for your evaluation.
          </p>
          <div style="background: var(--bg-surface); padding: 12px; border-radius: 8px; font-size: 0.85rem; color: var(--text-dim);">
            No credit card is required. This is a non-commercial academic assignment showcase.
          </div>
        </div>`
      );
    });
  });

  /* ==========================================================================
     11. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (btn && panel) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for neat accordion behavior
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        }
      });
    }
  });

  /* ==========================================================================
     12. CONTACT FORM VALIDATION & SIMULATION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function checkInput(input, errorElement, isValid, errorText) {
    const formGroup = input.closest('.form-group');
    if (!isValid) {
      formGroup.classList.add('has-error');
      if (errorElement && errorText) errorElement.textContent = errorText;
      return false;
    } else {
      formGroup.classList.remove('has-error');
      return true;
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let valid = true;

      const nameVal = contactName.value.trim();
      const emailVal = contactEmail.value.trim();
      const msgVal = contactMessage.value.trim();

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      if (!checkInput(contactName, nameError, nameVal.length >= 2, 'Please enter your full name')) {
        valid = false;
      }

      if (!checkInput(contactEmail, emailError, validateEmail(emailVal), 'Please enter a valid email address')) {
        valid = false;
      }

      if (!checkInput(contactMessage, messageError, msgVal.length >= 8, 'Please enter a message (at least 8 characters)')) {
        valid = false;
      }

      if (valid) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
          contactForm.reset();

          openGenericModal(
            'Message Received (Demonstration)',
            `<div style="text-align: center; padding: 10px 0;">
              <div style="font-size: 3rem; margin-bottom: 10px;">✉️</div>
              <h3 style="margin-bottom: 8px;">Thank You, ${escapeHtml(nameVal)}!</h3>
              <p style="color: var(--text-muted); margin-bottom: 16px;">
                Your inquiry has been simulated successfully. In a production environment, our academic support team responds within 24 hours.
              </p>
              <div style="background: var(--bg-surface); padding: 12px; border-radius: 8px; font-size: 0.82rem; color: var(--text-dim);">
                Prototype notice: No information is transmitted to external servers.
              </div>
            </div>`
          );

          showToast('Message sent successfully! (Demonstration)', 'success');
        }, 600);
      }
    });

    // Real-time error clearance
    [contactName, contactEmail, contactMessage].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });
  }

  /* ==========================================================================
     13. MODAL DIALOG MANAGEMENT (GENERIC, LEGAL, FEATURES)
     ========================================================================== */
  const genericModal = document.getElementById('genericModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalActionBtn = document.getElementById('modalActionBtn');

  function openGenericModal(title, htmlContent) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = htmlContent;
    if (genericModal) {
      genericModal.classList.add('open');
      genericModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGenericModal() {
    if (genericModal) {
      genericModal.classList.remove('open');
      genericModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGenericModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeGenericModal);

  if (genericModal) {
    genericModal.addEventListener('click', (e) => {
      if (e.target === genericModal) closeGenericModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && genericModal && genericModal.classList.contains('open')) {
      closeGenericModal();
    }
  });

  // Feature cards "Learn More" links
  const featureLearnLinks = document.querySelectorAll('.feature-link[data-modal]');
  const featureData = {
    focusModal: {
      title: "Focus Mode & Ambient Audio",
      body: `<p><strong>Distraction-Free Study Chamber:</strong></p>
             <p>StudyFlow AI incorporates customizable Pomodoro technique intervals (25/5 or 50/10 min cycles) paired with scientifically validated ambient audio frequencies (Binaural beats, brown noise, soft library acoustics).</p>
             <ul style="padding-left: 20px; margin: 12px 0; color: var(--text-muted);">
               <li>Digital tab limiter preventing tab hoarding</li>
               <li>Live countdown widget synced to task schedules</li>
               <li>Ambient soundscapes designed for neurodivergent & ADHD learners</li>
             </ul>`
    },
    progressModal: {
      title: "Progress Tracking & Retention Analytics",
      body: `<p><strong>Visualize Academic Momentum:</strong></p>
             <p>Our analytics dashboard visualizes your mastery using Ebbinghaus forgetting curve modeling. Rather than guessing whether you remember a topic, StudyFlow AI calculates memory decay rates based on your quiz accuracy.</p>
             <ul style="padding-left: 20px; margin: 12px 0; color: var(--text-muted);">
               <li>Daily and weekly study streak tracking</li>
               <li>Subject-by-subject exam readiness index</li>
               <li>Exportable study logs for academic counselors</li>
             </ul>`
    },
    recModal: {
      title: "Personalized AI Recommendations",
      body: `<p><strong>Adaptive Learning Assistant:</strong></p>
             <p>Whenever you complete a practice quiz or summary, StudyFlow AI tags concepts where your hesitation or error rate was elevated. The recommendation engine automatically schedules quick refresher drills 48 hours prior to your exam.</p>
             <ul style="padding-left: 20px; margin: 12px 0; color: var(--text-muted);">
               <li>Automated weak-point remediation drills</li>
               <li>Circadian-calibrated study interval suggestions</li>
               <li>Dynamic schedule reprioritization when deadlines shift</li>
             </ul>`
    }
  };

  featureLearnLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = link.getAttribute('data-modal');
      if (featureData[modalKey]) {
        openGenericModal(featureData[modalKey].title, featureData[modalKey].body);
      }
    });
  });

  // Footer Legal Modals
  const footerModalLinks = document.querySelectorAll('.footer-modal-link');
  const legalData = {
    privacyModal: {
      title: "Privacy Policy (Demonstration)",
      body: `<p><strong>Commitment to Student Data Privacy:</strong></p>
             <p>StudyFlow AI is an academic project prototype developed by Somil Jain. This website does not collect, sell, or monetize user data. All demonstrations (such as the contact form, quiz generator, and summarizer) execute entirely client-side inside your browser.</p>
             <p style="margin-top: 10px;">No cookies are used for third-party ad tracking. Preferences such as dark/light mode are stored purely in your browser's local storage.</p>`
    },
    termsModal: {
      title: "Terms of Service (Demonstration)",
      body: `<p><strong>Academic Demonstration Terms:</strong></p>
             <p>This website is provided for educational and review purposes for internship assignment Task 3. Features, fictional testimonials, sample pricing, and simulated metrics represent prototype concepts and should not be construed as commercial offerings or binding legal contracts.</p>`
    },
    demoModal: {
      title: "Demonstration Notice",
      body: `<p><strong>Internship Project Portfolio Piece:</strong></p>
             <p><strong>Platform:</strong> StudyFlow AI</p>
             <p><strong>Author:</strong> Somil Jain</p>
             <p><strong>Objective:</strong> To demonstrate modern frontend engineering, responsive SaaS design, semantic accessibility, and practical interactive AI tooling using clean, static HTML, CSS, and Vanilla JavaScript.</p>`
    }
  };

  footerModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = link.getAttribute('data-modal');
      if (legalData[modalKey]) {
        openGenericModal(legalData[modalKey].title, legalData[modalKey].body);
      }
    });
  });

  /* ==========================================================================
     14. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : 'ℹ️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${escapeHtml(message)}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Global "Try AI Tools" buttons
  const globalTryAiToolsBtn = document.getElementById('globalTryAiToolsBtn');
  if (globalTryAiToolsBtn) {
    globalTryAiToolsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const summarizer = document.getElementById('toolCardSummarizer');
      if (summarizer) {
        summarizer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Try out the interactive AI tools below!', 'info');
      }
    });
  }

  const toolCtaButtons = document.querySelectorAll('.tool-cta-btn');
  toolCtaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      showToast(`Launching ${target} tool sandbox!`, 'info');
    });
  });

});
