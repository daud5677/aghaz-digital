// ============================================
// CRITICAL: Hide body content immediately (iOS Fix)
// ============================================
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

// Force hide preloader function
function forceHidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.pointerEvents = 'none';
        preloader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
}

// Multiple triggers to ensure preloader hides
if (document.readyState === 'complete') {
    setTimeout(forceHidePreloader, 1500);
} else {
    window.addEventListener('load', () => setTimeout(forceHidePreloader, 1500));
}

// Absolute fallback (iOS Safari safety)
setTimeout(forceHidePreloader, 3500);

// ============================================
// AOS INIT
// ============================================
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            once: true, 
            offset: 50,
            easing: 'ease-out',
            disable: false
        });
    }
});

// ============================================
// PARTICLES - Reduced on Mobile
// ============================================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('#darkModeBtn i');
    if (document.body.classList.contains('dark')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load Dark Mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    setTimeout(() => {
        const icon = document.querySelector('#darkModeBtn i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }, 100);
}

// ============================================
// CUSTOM CURSOR - Desktop Only
// ============================================
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice && window.innerWidth > 768) {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 80);
        });

        document.querySelectorAll('a, button, .service-card, .portfolio-item, .team-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// ============================================
// SCROLL EFFECTS - Smooth Performance
// ============================================
let ticking = false;

function updateOnScroll() {
    const nav = document.getElementById('navbar');
    const backBtn = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }

    if (backBtn) {
        if (window.scrollY > 300) backBtn.classList.add('show');
        else backBtn.classList.remove('show');
    }

    if (scrollProgress) {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = (scroll / height * 100) + '%';
    }

    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

// ============================================
// COUNTER ANIMATION
// ============================================
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;
                let count = 0;
                const step = target / 50;
                const update = () => {
                    count += step;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else counter.textContent = target;
                };
                update();
                counterObserver.unobserve(counter);
            }
        });
    });
    counters.forEach(c => counterObserver.observe(c));
}

// ============================================
// PORTFOLIO FILTER
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// ============================================
// CONTACT FORM
// ============================================
function sendMessage(event) {
    event.preventDefault();
    alert("✅ Shukriya! Aap ka message mil gaya. Hum jaldi contact karenge.");
    event.target.reset();
}
