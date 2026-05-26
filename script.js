// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.menu ul');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
const scrollBtn = document.createElement('button');
scrollBtn.classList.add('scroll-top');
scrollBtn.innerHTML = '&#8679;';
scrollBtn.title = 'Back to top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// SKILL BARS (Intersection Observer)
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');
    if (!skills.length) return;

    const animateSkill = (el) => {
        const percent = parseInt(el.getAttribute('data-percent'));
        let current = 0;
        const step = () => {
            if (current < percent) {
                current++;
                el.style.width = current + '%';
                // Update percent label sibling
                const label = el.closest('.icon-box')?.querySelector('.skill-percent');
                if (label) label.textContent = current + '%';
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skills.forEach(skill => observer.observe(skill));
});

// ===========================
// COUNTER ANIMATION
// ===========================
function animateCount(el, target, duration = 1500) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(interval);
        }
        const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '%';
        el.textContent = start + suffix;
    }, 16);
}

const counterEls = document.querySelectorAll('.counter');
if (counterEls.length) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target || 80);
                animateCount(entry.target, target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => obs.observe(el));
}

// ===========================
// IMAGE VIEWER
// ===========================
function openImage(src) {
    const viewer = document.getElementById('imageViewer');
    if (viewer) {
        document.getElementById('viewerImg').src = src;
        viewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeImage() {
    const viewer = document.getElementById('imageViewer');
    if (viewer) {
        viewer.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close viewer on overlay click
document.addEventListener('click', (e) => {
    if (e.target.id === 'imageViewer') closeImage();
});

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImage();
});

// ===========================
// ACTIVE NAV LINK
// ===========================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu ul li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) {
        link.classList.add('active');
    }
});