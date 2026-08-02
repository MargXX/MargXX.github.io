/* ── Floating symbol particles ── */
(function () {
    const container = document.getElementById('particlesBg');
    if (!container) return;

    const symbols = ['✦', '✧', '✦', '+', '◆', '✧', '·', '✦', '+', '◆'];
    const count = 36;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const size    = 1.2 + Math.random() * 2.2;
        const dur     = 18  + Math.random() * 22;
        const spinDur = 6   + Math.random() * 10;
        const delay   = -(Math.random() * dur);
        const left    = Math.random() * 100;
        const drift   = (Math.random() - 0.5) * 60;

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
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// only one card transition runs at a time — a second click/keypress mid-animation
// is ignored rather than starting an overlapping view transition
let cardTransitionInFlight = false;

function runTransition(mutate) {
    if (document.startViewTransition && !prefersReducedMotion) {
        return document.startViewTransition(mutate).finished;
    }
    mutate();
    return Promise.resolve();
}

// shows a dashed placeholder in the expanded card's original grid slot,
// marking where it collapses back to, driven by a --expanded-col custom
// property so the indicator can sit in that slot independently of the
// card itself (which has physically moved to the row-2 drawer)
function updateExpandedIndicator(grid) {
    if (!grid || !grid.classList.contains('projects-grid')) return;
    const expandedCard = grid.querySelector('.project-card.expandable.expanded');
    if (expandedCard) {
        const siblings = [...grid.children].filter(el => el.classList.contains('project-card'));
        grid.style.setProperty('--expanded-col', siblings.indexOf(expandedCard) + 1);
        grid.classList.add('has-expanded');
    } else {
        grid.classList.remove('has-expanded');
    }
}

function setCardExpanded(card, expanded) {
    card.classList.toggle('expanded', expanded);
    card.setAttribute('aria-expanded', String(expanded));
    const tog = card.querySelector('.expand-toggle');
    if (tog) tog.textContent = expanded ? 'see less' : 'see more...';
    updateExpandedIndicator(card.parentElement);
}

function collapseExpanded(scope) {
    if (cardTransitionInFlight) return;
    const expandedCards = [...scope.querySelectorAll('.project-card.expandable.expanded')];
    if (!expandedCards.length) return;
    cardTransitionInFlight = true;
    runTransition(() => expandedCards.forEach(card => setCardExpanded(card, false)))
        .then(() => { cardTransitionInFlight = false; });
}

function toggleCard(card) {
    if (cardTransitionInFlight) return;
    const willExpand = !card.classList.contains('expanded');
    cardTransitionInFlight = true;
    const done = () => { cardTransitionInFlight = false; };

    if (!willExpand) {
        runTransition(() => setCardExpanded(card, false)).then(done);
        return;
    }

    // collapse any sibling that's already open first and wait for that
    // transition to finish before expanding this one, rather than morphing
    // two different cards at once — doing both together let their animation
    // paths overlap and clip each other
    const others = [...card.parentElement.querySelectorAll('.project-card.expandable.expanded')]
        .filter(other => other !== card);

    const expandThis = () => runTransition(() => setCardExpanded(card, true)).then(done);

    if (others.length) {
        runTransition(() => others.forEach(other => setCardExpanded(other, false)))
            .then(expandThis);
    } else {
        expandThis();
    }
}

document.querySelectorAll('.project-card.expandable').forEach((card, i) => {
    // gives each card its own view-transition snapshot so the browser morphs
    // its position/size individually instead of cross-fading the whole page
    const name = card.id || i;
    card.style.viewTransitionName = `project-card-${name}`;

    // the thumbnail gets its own snapshot too, separate from the card's, so
    // it morphs smoothly to its new position/size instead of being flattened
    // into the card's crossfade (which briefly double-exposes old/new image)
    const thumb = card.querySelector('.project-thumb');
    if (thumb) thumb.style.viewTransitionName = `project-thumb-${name}`;

    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');

    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        toggleCard(card);
    });

    card.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('a')) return;
        e.preventDefault();
        toggleCard(card);
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') collapseExpanded(document);
});

document.addEventListener('click', e => {
    if (e.target.closest('.project-card.expandable')) return;
    collapseExpanded(document);
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
