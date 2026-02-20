# Ebisa Achame - Professional Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Cisco](https://img.shields.io/badge/Cisco-1BA0D7?style=for-the-badge&logo=cisco&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Professional portfolio website showcasing work in network infrastructure, backend engineering, cybersecurity, and IT operations.

## Table of Contents
- [Professional Profile](#professional-profile)
- [Project Overview](#project-overview)
- [Core Objectives](#core-objectives)
- [Highlights](#highlights)
- [Portfolio Standards Used](#portfolio-standards-used)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Section-by-Section Website Map](#section-by-section-website-map)
- [Theme System](#theme-system)
- [Recent Updates](#recent-updates)
- [Contact Flow](#contact-flow)
- [Local Development](#local-development)
- [Deployment (Vercel)](#deployment-vercel)
- [API](#api)
- [Security and Reliability Notes](#security-and-reliability-notes)
- [Customization Guide](#customization-guide)
- [Content Maintenance Checklist](#content-maintenance-checklist)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

## Professional Profile
- **Profession:** Electrical and Computer Engineer
- **Specialization:** Network Infrastructure, Backend Engineering (Django/Python), Cybersecurity
- **Value:** Building secure, scalable, reliable systems for real operational environments

## Project Overview
This repository contains a production-focused personal portfolio website designed to present professional capability, practical engineering experience, and measurable technical impact.

The project includes:
- A static frontend portfolio application (HTML/CSS/JavaScript)
- A serverless contact endpoint using Vercel Functions
- Email delivery integration through Resend

## Core Objectives
- Present a clear professional identity and specialization
- Demonstrate evidence of competence through structured project case studies
- Show responsibility, methodology, and growth mindset
- Provide a reliable contact channel for recruiters, clients, and collaborators
- Maintain a clean, readable, and professional UX on desktop and mobile

## Highlights
- Professional capability framework section
- Portfolio projects with structured case-study format
- Certifications section with detailed cards
- Skills, tools, and experience sections
- Custom Welcome hero feature layout with profile image panel
- Theme toggle with full `light-mode` and `dark-mode` support
- Contact form powered by Vercel serverless API + Resend
- Mobile responsive layout and interactive filtering

## Portfolio Standards Used
The portfolio content is intentionally structured around professional evaluation signals:
- Clear professional identity
- Evidence over claims
- Results and impact
- Structured methodology (Problem, Role, Method, Tools, Result, Lessons)
- Depth of technical understanding
- Continuous development
- Tool and environment familiarity
- Professional responsibility
- Clean communication and presentation
- Career direction and long-term growth

## Tech Stack
### Frontend
- HTML5
- CSS3
- JavaScript (jQuery-based interactions)
- Bootstrap-based responsive layout
- Font Awesome icons

### Backend / Integration
- Node.js (Vercel serverless runtime)
- Resend API for email delivery

### Deployment
- Vercel rewrites for static app routing + API routing

## Architecture
The project follows a simple static-plus-serverless architecture:

1. Browser loads static site from:
   - `portfolio/ui-themez.smartinnovates.net/items/Ebisa/index.html`
2. User submits contact form
3. Frontend sends JSON to:
   - `POST /api/contact`
4. Vercel function validates payload and sends email via Resend
5. Frontend displays success or fallback message

## Project Structure
```text
My-Web-Sites/
├── index.html
├── portfolio/ui-themez.smartinnovates.net/items/Ebisa/
│   ├── index.html
│   ├── css/style.css
│   ├── js/scripts.js
│   ├── img/
│   └── blog-*.html
├── api/
│   └── contact.js
├── vercel.json
├── LICENSE
└── README.md
```

## Section-by-Section Website Map
- **Home**
  - Professional headline, identity, primary CTAs
- **About**
  - Profile summary and focus areas
- **Professional Capability Framework**
  - High-level standards for capability and professionalism
- **Services**
  - Capability domains and value statements
- **Portfolio**
  - Filterable project cards using structured case-study format
- **Technical Skills**
  - Skill categories and proficiency indicators
- **Experience**
  - Career timeline and role-based responsibilities
- **Certifications**
  - Credential cards with issuer, date, and category
- **Tools & Technologies**
  - Practical stack familiarity
- **Blog**
  - Topic-focused short articles
- **Contact**
  - Direct contact info + form submission channel

## Theme System
The portfolio supports two explicit UI themes:
- `light-mode`: soft warm-neutral palette for readability
- `dark-mode`: high-contrast dark palette for low-light viewing

Theme implementation details:
- Toggle control: `#darkModeToggle`
- Class switching target: `<body>`
- State persistence: `localStorage` key `darkMode`
- Styling source: `portfolio/ui-themez.smartinnovates.net/items/Ebisa/css/style.css`

## Recent Updates
- Reworked Welcome section into a featured hero-style layout
- Added `hero (2).jpg` as Welcome visual panel
- Kept About section image independently styled (`hero1.jpg`)
- Stabilized theme toggle initialization and persistence behavior
- Applied light-mode overrides across all major sections, including:
  - Tools & Technologies
  - Portfolio
  - Experience
  - Certifications
  - Blog
  - Contact

## Contact Flow
- Frontend form lives in:  
  `portfolio/ui-themez.smartinnovates.net/items/Ebisa/index.html`
- JS submission logic lives in:  
  `portfolio/ui-themez.smartinnovates.net/items/Ebisa/js/scripts.js`
- API handler lives in:  
  `api/contact.js`

Validation and behavior:
- Required fields are checked before submit
- API accepts only `POST`
- API returns success/error JSON for clear frontend feedback

## Local Development
```bash
git clone https://github.com/ebisaa944/My-Web-Sites.git
cd My-Web-Sites
python -m http.server 8000
```

Open:
- `http://localhost:8000/`
- `http://localhost:8000/portfolio/ui-themez.smartinnovates.net/items/Ebisa/index.html`

## Deployment (Vercel)
Set environment variables:

```text
RESEND_API_KEY=your_api_key_here
ALLOWED_ORIGIN=https://your-domain.com
```

Routing is controlled by:
- `vercel.json`

Current intent:
- Route `/api/*` to serverless function handlers
- Route `/` to portfolio entry
- Serve other static paths from the portfolio directory

## API
### `POST /api/contact`
Submits contact form data:
- `name`
- `email`
- `subject`
- `message`

Response:
- `200`: success payload
- `400`: validation error
- `405`: method not allowed
- `500`: server/send failure

## Security and Reliability Notes
- External links opened in new tabs use `rel="noopener noreferrer"`
- API CORS origin can be restricted via `ALLOWED_ORIGIN`
- Form has frontend + backend validation
- Includes fallback contact email for delivery interruptions

## Customization Guide
### Profile and Content
- Edit main content in:
  - `portfolio/ui-themez.smartinnovates.net/items/Ebisa/index.html`

### Styling
- Edit visual design in:
  - `portfolio/ui-themez.smartinnovates.net/items/Ebisa/css/style.css`

### Interactions
- Edit UI/behavior scripts in:
  - `portfolio/ui-themez.smartinnovates.net/items/Ebisa/js/scripts.js`

### Contact Handling
- Edit backend validation/email behavior in:
  - `api/contact.js`

### Social and Contact Links
- Keep links current in `index.html`:
  - LinkedIn
  - GitHub
  - Email
  - Phone
  - Location

## Content Maintenance Checklist
- Replace placeholder/legacy links
- Keep certifications and dates current
- Update project outcomes with measurable impact
- Ensure every project card has:
  - Problem
  - Role
  - Method
  - Tools
  - Result
  - Lessons
- Re-test contact form after any deployment change
- Verify mobile layout after major content updates

## Troubleshooting
### Contact form not sending
- Confirm `RESEND_API_KEY` is set
- Confirm API route is reachable (`/api/contact`)
- Check Vercel function logs for runtime errors

### Portfolio filters not working
- Hard refresh browser cache (`Ctrl+F5`)
- Check for JS console errors in browser dev tools
- Confirm filter classes match item classes in markup

### Styles not updating
- Ensure the edited file is:
  - `portfolio/ui-themez.smartinnovates.net/items/Ebisa/css/style.css`
- Clear cache and reload

### Local vs deployed behavior differs
- Verify rewrite rules in `vercel.json`
- Verify env vars in Vercel dashboard

## Roadmap
- Add downloadable PDF resume asset
- Add deeper project pages with screenshots/architecture diagrams
- Add analytics for contact conversion and section engagement
- Add automated linting/format checks for JS/CSS consistency
- Add multilingual support for broader audience reach

## Author
**Ebisa Achame Mihirate**  
Electrical & Computer Engineer  
Network & Infrastructure Specialist  
Backend Developer (Django/Python)  
Cybersecurity Practitioner  

- Location: Addis Ababa, Ethiopia
- Email: `ebisaachame123@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/ebisa-achame-mihirate-1b3667280/`
- GitHub: `https://github.com/ebisaa944`

## License
This project is licensed under the MIT License. See `LICENSE`.
