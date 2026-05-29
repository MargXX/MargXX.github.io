/* ── Floating particle dots ── */
(function () {
    const container = document.getElementById('particlesBg');
    if (!container) return;

    const count = 55;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');

        const size  = 1.2 + Math.random() * 2.8;           // px
        const dur   = 22  + Math.random() * 28;             // seconds
        const delay = -(Math.random() * dur);               // stagger pre-fill
        const left  = Math.random() * 100;                  // vw
        const drift = (Math.random() - 0.5) * 100;          // px horizontal

        // hue across blue → purple range
        const hue   = 210 + Math.random() * 70;
        const alpha = 0.10 + Math.random() * 0.15;

        el.style.cssText = `
            left: ${left}vw;
            width: ${size}px;
            height: ${size}px;
            background: hsla(${hue}, 75%, 65%, ${alpha});
            animation-duration: ${dur}s;
            animation-delay: ${delay}s;
            --drift: ${drift}px;
        `;
        container.appendChild(el);
    }
}());

/* ── Mobile nav toggle ── */
const toggle  = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
    });
});

/* ── Typewriter effect for hero name ── */
const nameEl = document.querySelector('.hero-name');
if (nameEl) {
    const fullText = nameEl.textContent.trim();
    nameEl.textContent = '';

    let i = 0;
    const type = () => {
        if (i < fullText.length) {
            nameEl.textContent += fullText[i++];
            setTimeout(type, 52 + Math.random() * 28);
        } else {
            // remove the blinking cursor pseudo-element
            setTimeout(() => nameEl.classList.add('done'), 900);
        }
    };
    setTimeout(type, 350);
}

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, { rootMargin: '-35% 0px -65% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Expandable project cards ── */
document.querySelectorAll('.project-card.expandable').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        const isExpanded = card.classList.toggle('expanded');
        const tog = card.querySelector('.expand-toggle');
        if (tog) tog.textContent = isExpanded ? 'see less' : 'see more...';
    });
});

/* ── Scroll-entrance animation for cards ── */
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.children].filter(el =>
            el.classList.contains('project-card') || el.classList.contains('interest-card')
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.07}s`;
        entry.target.classList.add('card-visible');
        // clear delay after animation so hover transitions aren't delayed
        entry.target.addEventListener('transitionend', () => {
            entry.target.style.transitionDelay = '';
        }, { once: true });
        cardObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card, .interest-card').forEach(card => {
    cardObserver.observe(card);
});
