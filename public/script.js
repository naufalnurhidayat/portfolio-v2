// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            alert(currentLang === 'en' ? 'Please fill in all fields' : 'Mohon isi semua kolom');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLang === 'en' ? 'Please enter a valid email address' : 'Mohon masukkan email yang valid');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (currentLang === 'en' ? 'Sending...' : 'Mengirim...');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                alert(currentLang === 'en' ? 'Message sent successfully!' : 'Pesan berhasil dikirim!');
                this.reset();
            } else {
                throw new Error('Server returned ' + response.status);
            }
        } catch (error) {
            console.error('Email error:', error);
            alert(currentLang === 'en' ? 'Failed to send message. Please try again later.' : 'Gagal mengirim pesan. Silakan coba lagi nanti.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Language Translation Dictionary
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_hello: "Hello, I'm",
        hero_subtitle: "Web Developer",
        hero_desc: "I create beautiful and functional web experiences",
        hero_btn_work: "View My Work",
        hero_btn_contact: "Get In Touch",
        about_title: "About Me",
        about_desc: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating digital experiences that are not only visually appealing but also highly functional and user-friendly.",
        skills_title: "Skills",
        projects_title: "My Projects",
        p1_title: "E-Commerce Website",
        p1_desc: "A full-stack e-commerce platform built with React and Node.js",
        p2_title: "Task Management App",
        p2_desc: "A responsive task management application with drag-and-drop functionality",
        p3_title: "Data Visualization Dashboard",
        p3_desc: "Interactive dashboard for data analysis and visualization",
        btn_code: "Code",
        btn_demo: "Live Demo",
        contact_title: "Get In Touch",
        contact_name: "Your Name",
        contact_email: "Your Email",
        contact_msg: "Your Message",
        btn_send: "Send Message"
    },
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang",
        nav_projects: "Proyek",
        nav_contact: "Kontak",
        hero_hello: "Halo, Saya",
        hero_subtitle: "Pengembang Web",
        hero_desc: "Saya merancang pengalaman web yang indah dan fungsional",
        hero_btn_work: "Lihat Karya Saya",
        hero_btn_contact: "Hubungi Saya",
        about_title: "Tentang Saya",
        about_desc: "Saya adalah pengembang full-stack yang bersemangat dengan keahlian dalam teknologi web modern. Saya suka menciptakan pengalaman digital yang tidak hanya menarik secara visual, tetapi juga sangat fungsional dan ramah pengguna.",
        skills_title: "Keahlian",
        projects_title: "Proyek Saya",
        p1_title: "Situs E-Commerce",
        p1_desc: "Platform e-commerce full-stack yang dibuat dengan React dan Node.js",
        p2_title: "Aplikasi Manajemen Tugas",
        p2_desc: "Aplikasi manajemen tugas responsif dengan fitur drag-and-drop",
        p3_title: "Dasbor Visualisasi Data",
        p3_desc: "Dasbor interaktif untuk analisis dan visualisasi data",
        btn_code: "Kode",
        btn_demo: "Demo Langsung",
        contact_title: "Hubungi Saya",
        contact_name: "Nama Anda",
        contact_email: "Email Anda",
        contact_msg: "Pesan Anda",
        btn_send: "Kirim Pesan"
    }
};

// Global Language State
let currentLang = localStorage.getItem('lang') || 'en';

// Define language updater function
function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    const langLabel = document.querySelector('#lang-toggle span');
    if(langLabel) {
        langLabel.textContent = lang.toUpperCase();
    }
}

// Language Toggle Event
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.innerHTML = '<i class="fas fa-globe"></i> <span style="margin-left:5px; font-weight:bold; font-size:0.9rem;">EN</span>';
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('lang', currentLang);
        updateLanguage(currentLang);
        runTypingAnimation();
    });
}

// Fixed Typing Animation
let typingTimeout = null;
function runTypingAnimation() {
    const greetingSpan = document.querySelector('[data-i18n="hero_hello"]');
    if (!greetingSpan) return;
    
    const targetText = translations[currentLang]['hero_hello'];
    greetingSpan.textContent = '';
    
    if (typingTimeout) clearTimeout(typingTimeout);
    
    let i = 0;
    function type() {
        if (i < targetText.length) {
            greetingSpan.textContent += targetText.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 50);
        }
    }
    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    updateLanguage(currentLang);
    runTypingAnimation();
});

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Project cards hover effect handled via CSS now

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Update copyright year dynamically
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const icon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        // Update LocalStorage
        if (isDarkMode) {
            localStorage.setItem('dark-mode', 'enabled');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}