// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// ==================== Custom Cursor ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    });
    
    // Hover effect on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .service-card, .work-card, .pricing-card, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// ==================== Particles.js Configuration ====================
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: '#561c24' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#6d2932', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 3 } }
        },
        retina_detect: true
    });
}

// ==================== Theme Toggle ====================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    showToast('تم تغيير الوضع بنجاح', 'success');
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('svg');
    if (theme === 'dark') {
        icon.innerHTML = `
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        `;
    } else {
        icon.innerHTML = `
            <path d="M12 3V4M12 20V21M4 12H3M21 12H20M6.3 6.3L5.6 5.6M18.4 18.4L17.7 17.7M6.3 17.7L5.6 18.4M18.4 5.6L17.7 6.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
        `;
    }
}

// ==================== Toast Notifications ====================
function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span>${icons[type]}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== Scroll Progress Bar ====================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active nav link
    updateActiveNavLink();
});

// ==================== Counter Animation ====================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + (target === 100 ? '%' : '');
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + (target === 100 ? '%' : '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => animateCounter(counter));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==================== Skills Animation ====================
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==================== Mobile Menu ====================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==================== Active Nav Link ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ==================== Works Filter ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        workCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==================== Testimonials Slider ====================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
let currentSlide = 0;
let autoSlideInterval;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot';
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');
updateDots();

function goToSlide(index) {
    currentSlide = index;
    const offset = -index * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoSlide();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    goToSlide(currentSlide);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Start auto slide
if (testimonialCards.length > 1) {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Swipe support for testimonials
let touchStartX = 0;
let touchEndX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    // RTL: swipe right-to-left = next, left-to-right = prev
    if (touchEndX > touchStartX + swipeThreshold) {
        nextSlide();
    } else if (touchEndX < touchStartX - swipeThreshold) {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        goToSlide(currentSlide);
    }
}

// ==================== FAQ Accordion ====================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ==================== Update Contact Links ====================
// ⚠️ غير البيانات دي بمعلوماتك الحقيقية
const contactConfig = {
    whatsapp: '201017753052',
    instagram: 'elekiaby_hamza',
    email: 'hakyorelekiaby@gmail.com'
};

// Update contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    const href = card.getAttribute('href');
    if (href && href.includes('wa.me')) {
        card.href = `https://wa.me/${contactConfig.whatsapp}`;
    } else if (href && href.includes('instagram.com')) {
        card.href = `https://instagram.com/${contactConfig.instagram}`;
    } else if (href && href.includes('mailto:')) {
        card.href = `mailto:${contactConfig.email}`;
    }
});

// Update floating WhatsApp
const floatingWhatsapp = document.querySelector('.floating-whatsapp');
if (floatingWhatsapp) {
    floatingWhatsapp.href = `https://wa.me/${contactConfig.whatsapp}`;
}

// Update footer social links
const footerSocialLinks = document.querySelectorAll('.footer-social .social-link');
if (footerSocialLinks.length >= 3) {
    footerSocialLinks[0].href = `https://wa.me/${contactConfig.whatsapp}`;
    footerSocialLinks[1].href = `https://instagram.com/${contactConfig.instagram}`;
    footerSocialLinks[2].href = `mailto:${contactConfig.email}`;
}

// ==================== Download CV ====================
const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('قريباً هيكون في CV للتحميل! 🎉', 'info');
    });
}

// ==================== Back to Top ====================
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== Scroll Animation for Elements ====================
const fadeElements = document.querySelectorAll('.service-card, .work-card, .pricing-card, .contact-card, .skill-item, .faq-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeObserver.observe(el);
});

// ==================== Fix Broken Images ====================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
    
    if (!img.src || img.src.includes('file:///') || img.naturalWidth === 0) {
        img.style.display = 'none';
    }
});

// ==================== Current Year ====================
const yearSpan = document.querySelector('.footer-bottom p:first-child');
if (yearSpan) {
    const year = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2024', year);
}

// ==================== Welcome Message ====================
console.log('🚀 موقع حمزة الأكيابي جاهز!');
console.log('💡 غير روابط التواصل في السكريبت (سطر ~290) عشان تشتغل مع بياناتك');
console.log('📱 لو عايز تضيف صورك، حطها في نفس المجلد بالأسماء: logo.png, hero-image.jpg, work1.jpg, work2.jpg, work3.jpg');
console.log('✨ المميزات المضافة:');
console.log('  - Custom Cursor');
console.log('  - Particles Animation');
console.log('  - Skills Bars');
console.log('  - Pricing Section');
console.log('  - Testimonials Slider');
console.log('  - FAQ Accordion');
console.log('  - Filter Portfolio');
console.log('  - Scroll Progress Bar');
console.log('  - Toast Notifications');
console.log('  - Floating WhatsApp');
console.log('  - Back to Top Button');

// ==================== Page Visibility ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 ارجع تاني! - حمزة الأكيابي';
    } else {
        document.title = 'حمزة الأكيابي - مواقع المشاريع الصغيرة';
    }
});

// ==================== Contact Form ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('formSubmitBtn');
        const status = document.getElementById('formStatus');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const service = document.getElementById('service').value;

        if (!name || !whatsapp || !service) {
            status.textContent = '❌ من فضلك اكمل البيانات المطلوبة';
            status.className = 'form-status error';
            return;
        }

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        btn.disabled = true;
        status.textContent = '';

        try {
            const res = await fetch('https://YOUR_WORKER_NAME.YOUR_SUBDOMAIN.workers.dev/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    whatsapp,
                    service: document.getElementById('service').value,
                    message: document.getElementById('message').value.trim()
                })
            });

            if (res.ok) {
                status.textContent = '✅ تم إرسال طلبك! هرد عليك قريباً 🎉';
                status.className = 'form-status success';
                contactForm.reset();
                showToast('تم إرسال طلبك بنجاح!', 'success');
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            status.textContent = '❌ حصل مشكلة، حاول تاني أو تواصل واتساب مباشرة';
            status.className = 'form-status error';
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            btn.disabled = false;
        }
    });
}
