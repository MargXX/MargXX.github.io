/* ── Floating particles background ── */
(function () {
    const container = document.getElementById('particlesBg');
    if (!container) return;

    const symbols = ['✦', '✧', '✦', '+', '◆', '✧', '·', '✦', '+', '◆'];
    const count = 36;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const size    = 1.2 + Math.random() * 2.2;       // rem
        const dur     = 18  + Math.random() * 22;         // seconds, drift
        const spinDur = 6   + Math.random() * 10;         // seconds per full rotation
        const delay   = -(Math.random() * dur);            // stagger, pre-fill screen
        const left    = Math.random() * 100;              // vw
        const drift   = (Math.random() - 0.5) * 60;       // px horizontal wander

        el.style.cssText = `
            left: ${left}vw;
            font-size: ${size}rem;
            animation-duration: ${dur}s, ${spinDur}s;
            animation-delay: ${delay}s, 0s;
            --drift: ${drift}px;
        `;
        container.appendChild(el);
    }
}());

/* ── Mobile nav toggle ── */
const toggle = document.querySelector('.menu-toggle');
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
            setTimeout(type, 55 + Math.random() * 30);
        } else {
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
        if (e.target.closest('a')) return; // don't intercept link clicks
        const isExpanded = card.classList.toggle('expanded');
        const toggle = card.querySelector('.expand-toggle');
        if (toggle) toggle.textContent = isExpanded ? '↑' : '↓';
    });
});
