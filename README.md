# StudyFlow-AI
==========================================================================
STUDYFLOW AI — AI-POWERED STUDENT PRODUCTIVITY & LEARNING PLATFORM
==========================================================================
Tagline: "Study Smarter. Learn Faster. Achieve More."
Author / Creator: Somil Jain
Project Type: Frontend Web Development Internship Assignment (Task 3)
Architecture: Pure Static Modern Web Application (HTML5 + CSS3 + Vanilla ES6 JS)

==========================================================================
1. FINAL PROJECT STRUCTURE
==========================================================================
StudyFlow-AI/
│
├── index.html          # Semantic HTML5 markup, SEO meta tags, accessible structure
├── style.css           # Warm academic styling, DM Sans / Inter typography, clean cards, responsive grid
├── script.js           # Interactive UI logic, simulated AI tools, theme toggle, form validation, modals
├── README.txt          # Complete documentation, setup guide, and submission summary
└── assets/             # Vector icons, avatars, and logo assets
    ├── logo.svg            # StudyFlow AI brand logo & favicon
    ├── student-aarav.svg   # Vector avatar for testimonial (Aarav)
    ├── student-sophia.svg  # Vector avatar for testimonial (Sophia)
    └── student-marcus.svg  # Vector avatar for testimonial (Marcus)

==========================================================================
2. FEATURES IMPLEMENTED
==========================================================================
1. Sticky Header & Navigation:
   - Sticky header with glassmorphism blur and elevation on scroll.
   - Comprehensive navigation links: Home, About, Features, AI Tools, How It Works, Pricing, FAQ, Contact.
   - Prominent "Get Started" CTA button.
   - Fully responsive animated hamburger menu with mobile drawer.
   - Dynamic Dark / Light theme toggle with local storage persistence.

2. Impressive Hero Section:
   - Official Heading: "Study Smarter. Learn Faster. Achieve More."
   - Official Tagline & Supporting description.
   - Dual Call-to-Action buttons: "Get Started Free" & "Explore Features".
   - Social proof badges with +10k student metric and star ratings.
   - High-fidelity interactive AI Student Dashboard visual mockup:
     * Working focus session countdown timer with Pause/Resume toggle.
     * Checkable study schedule tasks with instant feedback.
     * Live AI synthesis note preview with reading-time reduction metrics.
     * Circadian recommendation alert banner.

3. Trust / Introduction Section ("Your Personal AI Study Assistant"):
   - 4 clean icon benefit cards:
     * Personalized study planning
     * AI-powered summaries
     * Smart productivity tools
     * Progress tracking

4. About Section ("Built for the Way Students Learn Today"):
   - Clear value narrative detailing how StudyFlow AI combines productivity and AI learning tools.
   - 3 Core Values: Simplicity, Personalization, Productivity.
   - Visual comparison card showing Traditional Studying vs. StudyFlow AI with time-savings gauge.

5. Features Section ("Everything You Need to Study Better"):
   - 6 comprehensive feature cards with custom vector icons:
     1. AI Study Planner
     2. Smart Notes
     3. AI Quiz Generator
     4. Focus Mode
     5. Progress Tracking
     6. Personalized Recommendations
   - Interactive "Learn More" links that open detailed educational modals.

6. AI Tools Interactive Sandbox ("Powerful AI Tools in One Place"):
   - 3 large interactive demonstration cards:
     * AI Summarizer: Test topic switcher (Biology, History, Computer Science) with simulated AI synthesis.
     * Quiz Generator: Real interactive 3-question active recall quiz with immediate grading and feedback.
     * Study Planner: Customizable subject & study hour selector that dynamically generates a 5-day plan.
   - "Try AI Tools" CTA buttons with custom feedback.

7. How It Works Section:
   - 3-step connected timeline cards:
     * Step 1: Set Your Goal
     * Step 2: Let AI Plan
     * Step 3: Learn & Track

8. Statistics / Impact Section:
   - Clearly labeled fictional demonstration statistics:
     * 10K+ Study Sessions
     * 95% Goal Completion
     * 4.8/5 Student Rating
     * 24/7 AI Assistance
   - Explicit academic showcase disclaimer note.

9. Testimonials Section ("What Students Say"):
   - 3 fictional student persona cards with custom avatars:
     * Aarav, College Student (Computer Science)
     * Sophia, Pre-Med Student (Biology)
     * Marcus, High School Senior (AP History)
   - Labeled clearly as fictional demonstration profiles.

10. Transparent Pricing Section:
    - Monthly / Annual pricing toggle with 25% discount calculation.
    - 3 tiers: FREE, PRO, and PREMIUM with detailed feature checklists.
    - Interactive plan selection with demonstration notice modal.

11. Expandable FAQ Accordion:
    - 6 required questions with smooth animated expansion:
      1. What is StudyFlow AI?
      2. How does the AI study planner work?
      3. Can I use StudyFlow AI on mobile?
      4. Is StudyFlow AI free?
      5. Can I generate quizzes from my notes?
      6. Do I need technical knowledge to use it?

12. Contact Section & Interactive Form:
    - Heading: "Ready to Study Smarter?"
    - Full Name, Email, and Message inputs with live client-side validation.
    - Simulated submission feedback modal and toast notification.
    - Clear demonstration notice label.

13. Professional Footer:
    - Brand logo, required tagline: "Study smarter. Learn faster. Achieve more."
    - Navigation links, AI module links, and social media placeholders.
    - Privacy Policy, Terms of Service, and Demonstration Policy interactive dialogs.
    - Mandatory author credit: "Website created by Somil Jain".

14. Polish, Accessibility & Animations:
    - Smooth scroll reveal animations via IntersectionObserver.
    - Clean color contrast adhering to WCAG standards.
    - Zero horizontal scrolling across all screen widths (320px to 4K).
    - Lightweight, fast loading, zero external dependencies or heavy frameworks.

==========================================================================
3. TECHNOLOGIES USED
==========================================================================
- HTML5: Semantic structure (header, main, section, nav, article, aside, footer), ARIA accessibility tags.
- CSS3: Modern Vanilla CSS with CSS custom properties (variables), Flexbox, CSS Grid, Glassmorphism (backdrop-filter), CSS keyframe animations, Dark/Light mode theming.
- JavaScript (ES6+): Pure vanilla JS for DOM manipulation, IntersectionObserver scroll animations, interactive sandboxes, timers, accordion toggles, local storage state persistence.
- SVG Graphics: Lightweight vector icons and illustrations for retina display crispness.
- Google Fonts: DM Sans for headings & Inter for body and navigation.

==========================================================================
4. HOW TO RUN LOCALLY
==========================================================================
Method A: Direct Browser Opening (Zero installation needed)
1. Navigate to the `StudyFlow-AI` folder on your computer.
2. Double-click `index.html` or right-click -> "Open with" -> Google Chrome / Microsoft Edge / Firefox / Safari.

Method B: Using VS Code Live Server extension
1. Open the `StudyFlow-AI` folder in VS Code.
2. Right-click `index.html` and select "Open with Live Server".
3. The site will launch automatically at `http://127.0.0.1:5500`.

Method C: Using Node.js http-server / npx
1. Open your terminal inside the `StudyFlow-AI` directory.
2. Run:
   npx serve .
   or
   npx http-server .
3. Visit the local URL displayed in the terminal (e.g., http://localhost:3000).

Method D: Using Python's built-in HTTP server
1. Open your terminal in the `StudyFlow-AI` directory.
2. Run:
   python -m http.server 8080
3. Open `http://localhost:8080` in your web browser.

==========================================================================
5. HOW TO DEPLOY TO VERCEL
==========================================================================
Because this project is built as a clean static website (HTML, CSS, JS), deploying to Vercel takes less than 2 minutes!

Option 1: Deploy via Vercel CLI (Fastest)
1. Open your terminal in the `StudyFlow-AI` folder.
2. Run:
   npx vercel
3. Follow the quick interactive prompts:
   - Set up and deploy? [Y]
   - Which scope? [Select your account]
   - Link to existing project? [N]
   - Project name? [studyflow-ai]
   - In which directory is your code located? [./]
4. Vercel will immediately output your live production URL (e.g., `https://studyflow-ai.vercel.app`).

Option 2: Deploy via Vercel Web Dashboard & GitHub
1. Create a repository on GitHub (e.g. `studyflow-ai`).
2. Push the contents of the `StudyFlow-AI` directory to GitHub:
   git init
   git add .
   git commit -m "Initial commit of StudyFlow AI website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/studyflow-ai.git
   git push -u origin main
3. Log in to https://vercel.com.
4. Click "Add New..." -> "Project".
5. Import your `studyflow-ai` repository.
6. Leave the build settings as default (Framework Preset: "Other", Root Directory: `./`).
7. Click "Deploy". Your website will be live globally in seconds with free SSL.

Option 3: Drag & Drop via Vercel Dashboard
1. Go to https://vercel.com/new.
2. Scroll to the "Deploy a template or import a repository" section.
3. You can deploy static folders directly using Vercel CLI or linked GitHub/GitLab repositories.

==========================================================================
6. SHORT DESCRIPTION FOR INTERNSHIP TASK 3 SUBMISSION
==========================================================================
Below is a concise, professionally written summary you can paste directly into your internship Task 3 submission portal:

---
Project Title: StudyFlow AI — AI-Powered Student Productivity & Learning Platform
Submitted By: Somil Jain
Task: Internship Task 3 — AI Website Generation & Frontend Development

Project Overview:
StudyFlow AI is a modern, responsive, human-centered education web platform designed to help students organize their academic life, generate tailored study plans, condense lengthy lecture notes into key takeaways, and test their retention with automated quizzes. Built using pure HTML5, CSS3, and Vanilla JavaScript, the website features a warm, approachable academic aesthetic (forest green, warm amber, and clean cream surfaces), DM Sans & Inter typography, clean cards, subtle animations, and interactive AI demonstration sandboxes.

Key Highlights:
- Architecture: 100% static, lightweight, and deployable instantly on Vercel without backend dependencies or heavy frameworks.
- UI/UX Design: Thoughtful modern education startup aesthetic featuring DM Sans and Inter typography, warm organic palette (Forest Green #4F6F52, Warm Amber #D99A5B, Soft Cream #FAF9F6), restrained shadows, clean cards, and zero horizontal scrolling across all device sizes.
- Interactive AI Tools: Features live browser-based demonstrations for an AI Notes Summarizer (condenses text with reading-time metrics), an interactive Active Recall Quiz with instant scoring, and a 5-day AI Study Planner generator.
- Complete Academic Suite: Includes sticky navigation with a mobile hamburger drawer, clean student dashboard preview with a live focus timer, trust metrics, 6 feature cards, 3-step workflow, fictional demonstration statistics, student testimonials, pricing plans with monthly/annual toggle, expandable FAQ accordion, and an accessible contact form with client-side validation.
- Compliance & Ethics: All statistics, testimonials, and pricing structures are clearly labeled as prototype demonstration content for educational showcase purposes.
---
