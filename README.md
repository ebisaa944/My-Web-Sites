Ebisa Achame - Professional Portfolio
https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
https://img.shields.io/badge/Cisco-1BA0D7?style=for-the-badge&logo=cisco&logoColor=white
https://img.shields.io/badge/License-MIT-yellow.svg

A modern, responsive portfolio website showcasing expertise as a Network Engineer, Backend Developer, and Cybersecurity Specialist. Built with a clean dark theme, it highlights technical skills, professional experience, certifications, and projects in the IT field.

🚀 Features
Professional Design: Clean dark theme with gold accents (#c49b66) and responsive layout

Interactive Sections:

Professional Experience timeline with skills tags

Certifications grid with interactive cards

Tools & Technologies showcase

Portfolio gallery with filtering

Skills progress indicators

Contact Integration: Working contact form with Resend API email delivery

Dark Mode Toggle: User preference switching

Smooth Animations: CSS transitions and JavaScript animations

Mobile-First: Fully responsive across all devices

🛠️ Technologies Used
Frontend
HTML5 – Semantic markup structure

CSS3 – Custom styles with Flexbox/Grid layouts

JavaScript – Interactive functionality

jQuery – DOM manipulation and plugins

Bootstrap 4 – Responsive grid system

Font Awesome – Icon library

Backend
Resend API – Email delivery service

Node.js – Serverless function for contact form

📁 Project Structure
text
My-Web-Sites/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet
│   └── plugins.css        # Third-party plugin styles
├── js/
│   ├── scripts.js         # Main JavaScript
│   ├── jquery-3.0.0.min.js
│   └── (other plugin files)
├── img/
│   ├── hero1.jpg          # Profile image
│   ├── bg.jpg             # Background image
│   ├── portfolio/         # Project images
│   └── blog/              # Blog images
├── api/
│   └── contact.js         # Resend API integration
├── cv.pdf                 # Downloadable resume
└── README.md              # Documentation
⚙️ Setup & Installation
Local Development
Clone the repository

bash
git clone https://github.com/ebisaa944/My-Web-Sites.git
cd My-Web-Sites
Open in browser or use local server

bash
# Using Python
python -m http.server 8000
Deployment
Push to GitHub

Connect to Vercel/Netlify

Set environment variable:

text
RESEND_API_KEY=your_api_key_here
📧 Contact Form Setup
The contact form uses Resend API. Configuration:

Sign up at resend.com

Create API key and add domain

Update api/contact.js with your email

Form submission endpoint: /api/contact

javascript
// API configuration
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
🎨 Customization Guide
Update Personal Information
About Section: Edit personal details in index.html

Experience: Update work history in experience section

Certifications: Add your certifications in cert-grid

Skills: Modify skill progress values

Projects: Update portfolio items with your work

Contact: Change email, phone, and social links

Change Theme Colors
Edit in style.css:

css
:root {
    --primary-color: #c49b66; /* Main gold color */
}
🔗 API Endpoints
Endpoint	Method	Description
/api/contact	POST	Submit contact form
Form Fields: name, email, subject, message		
📱 Responsive Breakpoints
Desktop: ≥ 1200px (3 columns layout)

Tablet: 768px - 1199px (2 columns layout)

Mobile: < 768px (1 column layout)

👨‍💻 Author
Ebisa Achame Mihirate

Electrical & Computer Engineer

Network & Infrastructure Specialist

Backend Developer (Django/Python)

Cybersecurity Practitioner

📍 Addis Ababa, Ethiopia
📧 ebisaachame123@gmail.com
🔗 LinkedIn Profile
💻 GitHub

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.