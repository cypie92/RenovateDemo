document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = (n) => Math.round(n).toLocaleString('en-MY');
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// =========================================
// Theme catalogue (shared by home, catalogue and detail pages)
// =========================================
const THEMES = [
    {
        slug: 'emerald-atelier', name: 'Emerald Atelier', style: 'modern', styleLabel: 'Modern luxe',
        tagline: 'Velvet, marble & fluted timber', img: 'theme-emerald', priceFrom: 68000, sqft: 1250, days: 30, bestFor: 'Own stay & premium rentals',
        desc: 'A jewel-toned living space anchored by a deep green velvet sofa, book-matched marble and warm fluted timber. Designed for owners who entertain — and investors targeting premium expat tenants.',
        palette: [['Forest velvet', '#2E5141'], ['Calacatta', '#ECE8E1'], ['Smoked oak', '#6B4A33'], ['Brass', '#B8954A']],
        shots: ['Velvet lounge', 'Fluted timber & art', 'Marble centre table'],
        finishes: { dining: 'Marble-top table, emerald dining chairs, brass pendant.', kitchen: 'Smoked oak cabinetry, Calacatta quartz, brushed brass handles.', master: 'Fluted timber headboard wall, green velvet bench, warm cove lighting.' },
        badge: 'Investor favourite'
    },
    {
        slug: 'linen-morning', name: 'Linen Morning', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Oak, linen & soft daylight', img: 'theme-linen', priceFrom: 42000, sqft: 1000, days: 30, bestFor: 'Young families',
        desc: 'Pale oak, washed linen and built-in shelving that keeps clutter out of sight. Our most-requested theme for young families moving into their first home.',
        palette: [['Oat linen', '#E6DCCB'], ['White oak', '#C9A97E'], ['Chalk', '#F4F1EA'], ['Sage', '#A3AE95']],
        shots: ['Built-in oak shelving', 'Linen lounge', 'Round oak table'],
        finishes: { dining: 'Round white-oak table, woven chairs, paper lantern pendant.', kitchen: 'Chalk-white shaker doors, oak open shelves, sage tile splashback.', master: 'Linen upholstered bed, oak side tables, sheer + blackout curtains.' },
        badge: 'Most booked'
    },
    {
        slug: 'ember-loft', name: 'Ember Loft', style: 'industrial', styleLabel: 'Industrial',
        tagline: 'Leather, brick & black steel', img: 'theme-ember', priceFrom: 47000, sqft: 900, days: 30, bestFor: 'Rentals near city centres',
        desc: 'Tan leather, charcoal limewash and black steel track lighting. A loft feel for compact units that rents especially well to young professionals near city centres.',
        palette: [['Cognac leather', '#8A5232'], ['Charcoal', '#2F2F2D'], ['Raw steel', '#5A5D5F'], ['Walnut', '#5B3E2B']],
        shots: ['Steel shelving & art', 'Industrial pendants', 'Leather & reclaimed timber'],
        finishes: { dining: 'Reclaimed timber table, black steel chairs, cage pendant.', kitchen: 'Charcoal matte cabinets, concrete-look quartz, black steel open shelving.', master: 'Leather headboard, limewash feature wall, swing-arm wall lamps.' }
    },
    {
        slug: 'salon-boheme', name: 'Salon Bohème', style: 'eclectic', styleLabel: 'Eclectic',
        tagline: 'Gallery walls & collected colour', img: 'theme-boheme', priceFrom: 45000, sqft: 1100, days: 30, bestFor: 'Creative own-stay homes',
        desc: 'Teal velvet, layered rugs and a floor-to-ceiling gallery wall. For people who want a home that looks collected over years, delivered in thirty days.',
        palette: [['Teal', '#22566A'], ['Terracotta', '#B4583A'], ['Mustard', '#C9A13B'], ['Ivory', '#F1EBDD']],
        shots: ['Gallery wall', 'Textiles & art', 'Layered rugs'],
        finishes: { dining: 'Mismatched vintage chairs, terracotta table runner, rattan pendant.', kitchen: 'Teal lower cabinets, patterned encaustic tiles, brass rail.', master: 'Mustard velvet headboard, kilim rug, framed print series.' }
    },
    {
        slug: 'soft-arc', name: 'Soft Arc', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Curves, cove light & calm', img: 'theme-softarc', priceFrom: 38000, sqft: 750, days: 25, bestFor: 'Studios & 2-bed rentals',
        desc: 'Curved furniture, hidden cove lighting and a quiet, tonal palette. Our best-value theme for rental studios and 2-bedroom units.',
        palette: [['Mist', '#DCD8D2'], ['Honey oak', '#C08A55'], ['Bone', '#F3EFE8'], ['Graphite', '#4A4B4D']],
        shots: ['Curved lounge', 'Media wall', 'Cove lighting'],
        finishes: { dining: 'Pill-shaped table, boucle chairs, linear LED pendant.', kitchen: 'Handleless bone-white cabinets, honey-oak island cladding.', master: 'Curved upholstered bed, cove-lit ceiling, mist-grey wardrobe.' },
        badge: 'Best value'
    },
    {
        slug: 'skyline-walnut', name: 'Skyline Walnut', style: 'modern', styleLabel: 'Modern luxe',
        tagline: 'Walnut, stone & city views', img: 'theme-skyline', priceFrom: 72000, sqft: 1600, days: 35, bestFor: 'High-floor & penthouse units',
        desc: 'Walnut panelling, stacked stone and layered ambient lighting built for high-floor units with a view. Hotel-suite polish for penthouses and dual-key homes.',
        palette: [['Walnut', '#5A3B28'], ['Travertine', '#CDBFA8'], ['Bronze', '#8C6A45'], ['Ink', '#1E1F1D']],
        shots: ['Stacked-stone fireplace', 'Curved sofa & view', 'Travertine table'],
        finishes: { dining: 'Travertine table, walnut chairs, bronze chandelier.', kitchen: 'Walnut veneer cabinets, travertine island, bronze fittings.', master: 'Walnut panelled bed wall, bronze sconces, motorised curtains.' }
    },
    {
        slug: 'ivory-hearth', name: 'Ivory Hearth', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Arches, plaster & rust accents', img: 'room-living', priceFrom: 44000, sqft: 1050, days: 30, bestFor: 'Landed homes',
        desc: 'Limewashed walls, arched windows and a low, curved sofa with rust cushions. Mediterranean warmth that suits landed homes and low-density condos.',
        palette: [['Plaster', '#EDE6DA'], ['Rust', '#A4532F'], ['Ash', '#B9A890'], ['Clay', '#C98F6B']],
        shots: ['Curved sofa', 'Arched window & art', 'Low oak table'],
        finishes: { dining: 'Limewashed trestle table, ash chairs, plaster pendant.', kitchen: 'Plaster-finish hood, ash cabinetry, terracotta floor tiles.', master: 'Arched headboard niche, rust linen bedding, limewash walls.' }
    },
    {
        slug: 'marble-pantry', name: 'Marble Pantry', style: 'modern', styleLabel: 'Modern luxe',
        tagline: 'Island living & brass pendants', img: 'room-kitchen', priceFrom: 56000, sqft: 1300, days: 35, bestFor: 'Home cooks',
        desc: 'A kitchen-first theme: waterfall marble island, walnut open shelving and brass pendants. Ideal if you cook, and want the kitchen to be the heart of the home.',
        palette: [['Carrara', '#EEECE8'], ['Walnut', '#6C4A32'], ['Brass', '#B48D4C'], ['Fog', '#D7D6D2']],
        shots: ['Walnut shelving', 'Waterfall island', 'Built-in ovens'],
        finishes: { living: 'Fog-grey sofa, walnut media console, brass floor lamp.', dining: 'Island seating for four plus a walnut dining nook.', master: 'Fog-grey upholstered bed, walnut side tables, brass reading lights.' }
    },
    {
        slug: 'clay-cotton', name: 'Clay & Cotton', style: 'eclectic', styleLabel: 'Eclectic',
        tagline: 'Fireside textures & terracotta', img: 'room-bedroom', priceFrom: 41000, sqft: 950, days: 30, bestFor: 'Slow-living own stay',
        desc: 'Chunky knits, terracotta cushions and soft, low lighting — a bedroom-led theme for slow mornings and long weekends.',
        palette: [['Cotton', '#F1ECE3'], ['Terracotta', '#B5603E'], ['Teak', '#7A5236'], ['Stone', '#A79C8C']],
        shots: ['Layered bedding', 'Fireside corner', 'Teak bedside'],
        finishes: { living: 'Stone-coloured modular sofa, teak coffee table, knit throws.', dining: 'Teak table, cotton-slipcover chairs, clay pendant.', kitchen: 'Cotton-white cabinets, teak worktop, terracotta splashback.' }
    }
];

// The room each theme's cover photo shows; other rooms are described by finish spec.
const COVER_ROOM = { 'marble-pantry': 'kitchen', 'clay-cotton': 'master' };

const ROOMS = {
    living: 'Living room',
    dining: 'Dining',
    kitchen: 'Kitchen',
    master: 'Master bedroom'
};

const themeCard = (t, opts = {}) => `
    <a href="design-detail.html?theme=${t.slug}" class="theme-card${opts.wide ? ' theme-card--wide' : ''}" data-style="${t.style}">
        ${t.badge && opts.badges ? `<span class="theme-card__badge">${t.badge}</span>` : ''}
        <div class="theme-card__img"><img src="assets/img/${t.img}${opts.wide ? '' : '-sm'}.webp" alt="" loading="lazy" width="${opts.wide ? 1024 : 640}" height="${opts.wide ? 1024 : 640}"></div>
        <div class="theme-card__body">
            <div>
                <h3>${t.name}</h3>
                <p>${t.tagline}</p>
            </div>
            <span class="theme-card__price">from <strong>RM ${Math.round(t.priceFrom / 1000)}k</strong></span>
        </div>
        ${opts.meta ? `<div class="theme-card__meta"><span><svg class="i" aria-hidden="true"><use href="#i-ruler" /></svg>${fmt(t.sqft)} sq ft</span><span><svg class="i" aria-hidden="true"><use href="#i-clock" /></svg>${t.days} working days</span></div>` : ''}
    </a>`;

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroThemes();
    initPromo();
    initReveal();
    initCounters();
    initPaths();
    initThemeFilter();
    initEstimator();
    initLoan();
    initCarousel();
    initContactForm();
    initActionBar();
    initCatalogue();
    initDetailPage();
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
});

// =========================================
// Header: scrolled state + mobile drawer
// =========================================
function initHeader() {
    const header = $('#site-header');
    const nav = $('#nav');
    const btn = $('.menu-btn');
    if (!header) return;

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!btn || !nav) return;
    const setOpen = (open) => {
        // Drawer sits directly below the header, wherever the header currently is.
        nav.style.setProperty('--nav-top', `${header.getBoundingClientRect().bottom}px`);
        nav.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
        // Visibility flips on the next frame of the transition; focus after it has.
        if (open) setTimeout(() => $('a', nav).focus(), 60);
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
        if (!nav.classList.contains('is-open')) return;
        if (e.key === 'Escape') { setOpen(false); btn.focus(); return; }
        if (e.key === 'Tab') {
            // Keep focus cycling between the menu button and the drawer's links.
            const items = [btn, ...$$('a', nav)];
            const i = items.indexOf(document.activeElement);
            const nextIdx = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
            e.preventDefault();
            items[nextIdx].focus();
        }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 1040) setOpen(false); });
}

// =========================================
// Hero theme preview
// =========================================
function initHeroThemes() {
    const fig = $('#hero-img');
    if (!fig) return;
    const img = $('img', fig);
    const dots = $$('.theme-dot');
    // Warm the cache so swaps are instant.
    dots.forEach((d) => { const pre = new Image(); pre.src = `assets/img/${d.dataset.img}.webp`; });
    dots.forEach((dot) => dot.addEventListener('click', () => {
        if (dot.classList.contains('is-active')) return;
        dots.forEach((d) => { const on = d === dot; d.classList.toggle('is-active', on); d.setAttribute('aria-pressed', String(on)); });
        $('#hero-theme-name').textContent = dot.dataset.name;
        $('#hero-theme-price').textContent = `from RM ${dot.dataset.price}`;
        $('#hero-theme-link').href = `design-detail.html?theme=${dot.dataset.slug}`;
        const swap = () => {
            img.src = `assets/img/${dot.dataset.img}.webp`;
            img.alt = `Living room in the ${dot.dataset.name} design theme`;
            fig.classList.remove('is-fading');
        };
        if (prefersReducedMotion) { swap(); return; }
        fig.classList.add('is-fading');
        setTimeout(swap, 300);
    }));
}

// =========================================
// Promo bar: countdown + dismiss (remembered per browser)
// =========================================
function initPromo() {
    const bar = $('#promo-bar');
    if (!bar) return;
    try { if (localStorage.getItem('kemas-promo-dismissed') === '1') { bar.remove(); return; } } catch (e) { /* storage unavailable */ }

    $('.promo-bar__close', bar).addEventListener('click', () => {
        bar.remove();
        try { localStorage.setItem('kemas-promo-dismissed', '1'); } catch (e) { /* storage unavailable */ }
    });

    const countEl = $('[data-countdown]', bar);
    if (!countEl) return;
    const end = new Date(countEl.dataset.countdown).getTime();
    const tick = () => {
        const ms = end - Date.now();
        if (ms <= 0) { countEl.textContent = 'Ends today'; return; }
        const d = Math.floor(ms / 864e5);
        const h = Math.floor((ms % 864e5) / 36e5);
        const m = Math.floor((ms % 36e5) / 6e4);
        // Only count down in the final week; before that, a plain date is more honest.
        if (d >= 7) return;
        countEl.textContent = `Ends in ${d}d ${h}h ${String(m).padStart(2, '0')}m`;
    };
    tick();
    setInterval(tick, 30000);
}

// =========================================
// Scroll reveal
// =========================================
function initReveal() {
    const targets = $$('.section-head, .path.is-active, .theme-grid, .stats, .steps, .est, .financing__grid, .carousel, .care__grid, .accordion, .contact__grid, .timeline__item, .values, .dt-block, .cta-band');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((el) => {
        // Anything already on screen at load stays visible — no flash of hidden content.
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.classList.add('reveal');
        io.observe(el);
    });
}

// =========================================
// Count-up numbers
// =========================================
function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const run = (el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const start = performance.now();
        const dur = 1600;
        const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
    // Final values ship in the HTML; only zero them out for counting once JS is running.
    nums.forEach((n) => { if (n.getBoundingClientRect().top > window.innerHeight) n.textContent = (0).toFixed(parseInt(n.dataset.decimals || '0', 10)); });
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
}

// =========================================
// Own-stay vs investor tabs
// =========================================
function initPaths() {
    const seg = $('.segmented');
    if (!seg) return;
    const tabs = $$('[role="tab"]', seg);
    const select = (i, focus) => {
        tabs.forEach((t, idx) => {
            const on = idx === i;
            t.classList.toggle('is-active', on);
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            panel.hidden = !on;
            panel.classList.toggle('is-active', on);
        });
        seg.dataset.active = String(i);
        if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
        t.addEventListener('click', () => select(i));
        t.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                select((i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length, true);
            }
        });
    });
}

// =========================================
// Theme filter chips (home page grid)
// =========================================
function bindChips(container, onChange) {
    const chips = $$('.chip-btn', container);
    chips.forEach((chip) => chip.addEventListener('click', () => {
        chips.forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
        onChange(chip.dataset.filter);
    }));
}

// When a filter leaves a thin row, offer to adapt a theme rather than leave a hole.
function syncStyleCta(grid, filter, shown) {
    let cta = $('.theme-card--cta', grid);
    if (!cta) {
        cta = document.createElement('a');
        cta.className = 'theme-card theme-card--cta';
        cta.href = grid.closest('.page-home') || document.body.classList.contains('page-home') ? '#contact' : 'index.html#contact';
        cta.innerHTML = `<span class="eyebrow">Not quite it?</span><h3>We’ll adapt any theme to your taste.</h3><p>Tell a designer what you love — we’ll shortlist and tailor three looks for your unit, free.</p><span class="link-arrow">Talk to a designer <svg class="i" aria-hidden="true"><use href="#i-arrow" /></svg></span>`;
        grid.appendChild(cta);
    }
    cta.hidden = filter === 'all' || shown === 0 || shown % 3 === 0;
    cta.style.gridColumn = shown % 3 === 1 ? 'span 2' : '';
}

function initThemeFilter() {
    const grid = $('#theme-grid');
    const chips = $('.themes .chips');
    if (!grid || !chips) return;
    const empty = $('#themes-empty');
    bindChips(chips, (filter) => {
        let shown = 0;
        $$('.theme-card', grid).forEach((card) => {
            const match = filter === 'all' || card.dataset.style === filter;
            card.classList.toggle('is-hidden', !match);
            if (match) shown++;
        });
        // The wide feature card only makes sense in the unfiltered view.
        $$('.theme-card', grid).forEach((card) => card.classList.toggle('theme-card--wide', filter === 'all' && card.dataset.wideDefault === '1'));
        if (empty) empty.hidden = shown > 0;
        syncStyleCta(grid, filter, shown);
    });
    $$('.theme-card--wide', grid).forEach((c) => { c.dataset.wideDefault = '1'; });
}

// =========================================
// Cost estimator with live summary
// =========================================
const PRICING = {
    // RM per sq ft, [low, high]
    scope: {
        furnish: { label: 'Furnish & style', rate: [32, 46], days: 14 },
        partial: { label: 'Makeover', rate: [48, 68], days: 30 },
        full: { label: 'Full renovation', rate: [85, 120], days: 40 }
    },
    type: {
        condo: { label: 'Condo', mult: 1 },
        apartment: { label: 'Apartment', mult: 0.92 },
        terrace: { label: 'Terrace', mult: 1.06 },
        semid: { label: 'Semi-D', mult: 1.14 },
        bungalow: { label: 'Bungalow', mult: 1.28 }
    },
    style: { minimal: 1, modern: 1.14, industrial: 1.04, eclectic: 1.08 },
    // Share of a whole-home budget each space typically takes
    areas: { living: 0.32, bedrooms: 0.28, kitchen: 0.22, bathrooms: 0.12, study: 0.06 },
    // Breakdown of the total by trade, by scope
    split: {
        furnish: [['Furniture', 0.62], ['Lighting & curtains', 0.2], ['Décor & styling', 0.18]],
        partial: [['Carpentry', 0.38], ['Furniture', 0.32], ['Electrical & lighting', 0.14], ['Paint & ceiling', 0.16]],
        full: [['Civil & wet works', 0.34], ['Carpentry & kitchen', 0.28], ['Furniture', 0.22], ['Electrical & plumbing', 0.16]]
    },
    rentPerSqft: { condo: 2.6, apartment: 2.1, terrace: 1.7, semid: 1.8, bungalow: 1.9 }
};
const FLAT_RATE = 0.0499;
const LOAN_CAP = 200000;
// Working days grow by 5 for every 500 sq ft above 1,500 sq ft.
const workingDays = (scope, size) => scope.days + Math.max(0, Math.ceil((size - 1500) / 500)) * 5;
// Malaysian mobile: optional +60/60/0 prefix, then 1x and 7–8 digits; spaces, dashes and brackets ignored.
const isMyMobile = (v) => /^(\+?60|0)?1\d{8,9}$/.test(v.replace(/[\s\-().]/g, ''));
const monthlyFlat = (principal, months) => (principal * (1 + FLAT_RATE * (months / 12))) / months;
// Effective annual rate of a flat-rate loan: solve for the monthly rate whose annuity matches the instalment.
const effectiveRate = (months) => {
    const pay = monthlyFlat(1, months);
    let lo = 0;
    let hi = 0.05;
    for (let k = 0; k < 60; k++) {
        const r = (lo + hi) / 2;
        const pv = (pay * (1 - Math.pow(1 + r, -months))) / r;
        if (pv > 1) lo = r; else hi = r;
    }
    return ((lo + hi) / 2) * 12;
};

function initEstimator() {
    const form = $('#est-form');
    if (!form) return;
    const root = $('#estimator');
    const steps = $$('.est__step', form);
    const total = steps.length;
    const backBtn = $('#est-back');
    const nextBtn = $('#est-next');
    const sizeInput = $('#size');
    const bedsInput = $('#beds');
    let current = 1;

    const updateFill = (input) => {
        const p = ((input.value - input.min) / (input.max - input.min)) * 100;
        input.style.setProperty('--fill', `${p}%`);
    };

    const read = () => {
        const data = new FormData(form);
        return {
            purpose: data.get('purpose'),
            type: data.get('type'),
            size: parseInt(data.get('size'), 10),
            beds: parseInt(data.get('beds'), 10),
            areas: data.getAll('areas'),
            scope: data.get('scope'),
            style: data.get('style')
        };
    };

    const calc = (s) => {
        const scope = PRICING.scope[s.scope];
        const areaShare = s.areas.includes('whole')
            ? 1
            : Math.min(1, s.areas.reduce((sum, a) => sum + (PRICING.areas[a] || 0), 0));
        // Larger homes get a modest economy of scale on the per-sq-ft rate.
        const scale = s.size > 1500 ? 1 - Math.min(0.12, (s.size - 1500) / 25000) : 1;
        const bedAdj = 1 + (s.beds - 3) * 0.03;
        const base = s.size * areaShare * PRICING.type[s.type].mult * PRICING.style[s.style] * scale * bedAdj;
        const low = Math.max(15000, Math.round((base * scope.rate[0]) / 500) * 500);
        const high = Math.max(low + 5000, Math.round((base * scope.rate[1]) / 500) * 500);
        return { low, high, scope };
    };

    let lastLow = 0;
    let lastHigh = 0;
    const animateTo = (el, from, to) => {
        if (prefersReducedMotion || from === to) { el.textContent = fmt(to); return; }
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / 500, 1);
            el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const maxBeds = (size) => Math.min(6, Math.max(1, Math.round(size / 300)));
    const typicalBeds = (size) => (size < 600 ? 1 : size < 900 ? 2 : size < 1400 ? 3 : size < 2200 ? 4 : size < 3000 ? 5 : 6);
    let bedsTouched = false;
    const clampBeds = () => {
        const max = maxBeds(parseInt(sizeInput.value, 10));
        let v = parseInt(bedsInput.value, 10);
        const hint = $('#beds-hint');
        if (v > max) v = max;
        hint.textContent = v === max && max < 6 ? `Up to ${max} bedroom${max > 1 ? 's' : ''} at this size.` : '';
        bedsInput.value = v;
        $('#beds-out').textContent = v;
        $$('.stepper__btn', form).forEach((sb) => { sb.disabled = (sb.dataset.stepDir === '-1' && v === 1) || (sb.dataset.stepDir === '1' && v >= max); });
    };

    let latest = null;
    let touched = false;
    const summary = $('.est__summary', root);
    const render = () => {
        const s = read();
        const noAreas = !s.areas.length;
        root.classList.toggle('is-empty', noAreas);
        if (noAreas) {
            // Don't show a price for nothing.
            $('#est-low').textContent = '—'; $('#est-high').textContent = '—';
            $('#est-monthly').textContent = 'RM —';
            $('#est-sum-title').textContent = 'Your live estimate';
            $('#est-bar-val').textContent = 'Pick a space';
            lastLow = 0; lastHigh = 0; latest = null;
            return;
        }
        const { low, high, scope } = calc(s);
        latest = { s, low, high, scope };
        $('#est-bar-val').textContent = `RM ${Math.round(low / 1000)}k – ${Math.round(high / 1000)}k`;
        animateTo($('#est-low'), lastLow, low);
        animateTo($('#est-high'), lastHigh, high);
        lastLow = low; lastHigh = high;

        const monthlyEl = $('#est-monthly').parentElement;
        if (low > LOAN_CAP) {
            monthlyEl.innerHTML = `Financing available up to <strong id="est-monthly">RM ${fmt(LOAN_CAP)}</strong> of this`;
        } else {
            monthlyEl.innerHTML = `or from <strong id="est-monthly">RM ${fmt(monthlyFlat(low, 84))}</strong>/month over 84 months*`;
        }
        $('#est-days').textContent = `${workingDays(scope, s.size)} working days`;
        $('#est-sum-title').textContent = touched ? 'Your live estimate' : 'Example · 1,000 sq ft condo';
        $('#est-scope').textContent = scope.label;
        $('#est-prop').textContent = `${PRICING.type[s.type].label} · ${fmt(s.size)} sq ft · ${s.beds} bed`;

        const rentRow = $('#est-rent-row');
        rentRow.hidden = s.purpose !== 'rental';
        if (s.purpose === 'rental') {
            const rent = Math.round((s.size * PRICING.rentPerSqft[s.type]) / 50) * 50;
            $('#est-rent').textContent = `RM ${fmt(rent * 0.95)}–${fmt(rent * 1.15)}/mo`;
        }

        const mid = (low + high) / 2;
        const split = PRICING.split[s.scope];
        const maxShare = Math.max(...split.map(([, share]) => share));
        $('#est-bars').innerHTML = split.map(([label, share]) => `
            <div class="bar">
                <span class="bar__label">${label}</span>
                <span class="bar__val">≈ RM ${fmt(Math.round((mid * share) / 100) * 100)}</span>
                <span class="bar__track"><span class="bar__fill" style="width:${Math.round((share / maxShare) * 100)}%"></span></span>
            </div>`).join('');
    };

    const showStep = (n) => {
        current = n;
        steps.forEach((st) => st.classList.toggle('is-active', parseInt(st.dataset.step, 10) === n));
        const contentSteps = total - 1; // last step is the lead form
        $('#est-progress').style.width = `${(Math.min(n, total) / total) * 100}%`;
        $('#est-stepcount').textContent = n <= contentSteps ? `Step ${n} of ${contentSteps}` : 'Almost done';
        backBtn.disabled = n === 1;
        nextBtn.innerHTML = n === total
            ? 'Send me my quote <svg class="i" aria-hidden="true"><use href="#i-arrow" /></svg>'
            : n === contentSteps
                ? 'See my estimate <svg class="i" aria-hidden="true"><use href="#i-arrow" /></svg>'
                : 'Continue <svg class="i" aria-hidden="true"><use href="#i-arrow" /></svg>';
    };

    const scrollFormIntoView = () => {
        const top = form.getBoundingClientRect().top;
        if (top < 60 || top > window.innerHeight * 0.4) {
            // On narrow screens the summary sits above the form; keep the question in view.
            form.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
    };

    const validateStep = (n) => {
        if (n === 3) {
            const ok = $$('input[name="areas"]:checked', form).length > 0;
            $('#areas-error').hidden = ok;
            return ok;
        }
        if (n === total) {
            return validateFields($$('.est__step--lead .field', form));
        }
        return true;
    };

    nextBtn.addEventListener('click', () => {
        if (!validateStep(current)) return;
        if (current < total) {
            showStep(current + 1);
            scrollFormIntoView();
            const firstInput = $('.est__step.is-active input', form);
            if (current === total && firstInput) firstInput.focus({ preventScroll: true });
            return;
        }
        // Submit lead (demo — no backend)
        const name = $('#lead-name').value.trim().split(' ')[0];
        $('#done-name').textContent = name || 'there';
        $('#done-ref').textContent = `KS-${String(Math.floor(1000 + Math.random() * 9000))}`;
        if (latest) {
            const range = `RM ${fmt(latest.low)} – ${fmt(latest.high)}`;
            $('#done-range').textContent = range;
            $('#done-scope').textContent = latest.scope.label;
            $('#done-days').textContent = `${workingDays(latest.scope, latest.s.size)} working days`;
            const msg = `Hi Kemas! My estimate (${$('#done-ref').textContent}): ${range}, ${latest.scope.label}, ${PRICING.type[latest.s.type].label} ${fmt(latest.s.size)} sq ft. ${shareUrl()}`;
            $('#done-wa').href = `https://wa.me/60123456789?text=${encodeURIComponent(msg)}`;
        }
        steps.forEach((st) => st.classList.remove('is-active'));
        $('#est-nav').hidden = true;
        $('#est-stepcount').textContent = 'Done';
        $('#est-progress').style.width = '100%';
        const done = $('#est-done');
        done.hidden = false;
        done.focus();
    });

    backBtn.addEventListener('click', () => { if (current > 1) { showStep(current - 1); scrollFormIntoView(); } });

    $('#est-restart').addEventListener('click', () => {
        form.reset();
        $('#beds-out').textContent = bedsInput.value = '3';
        bedsTouched = false;
        $('#size-out').textContent = fmt(sizeInput.value);
        updateFill(sizeInput);
        clampBeds();
        $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
        $('#est-done').hidden = true;
        $('#est-nav').hidden = false;
        showStep(1);
        render();
    });

    // "Whole home" and individual spaces are mutually exclusive.
    form.addEventListener('change', (e) => {
        if (e.target.name === 'areas') {
            const whole = $('input[name="areas"][value="whole"]', form);
            if (e.target === whole && whole.checked) {
                $$('input[name="areas"]:not([value="whole"])', form).forEach((c) => { c.checked = false; });
            } else if (e.target !== whole && e.target.checked) {
                whole.checked = false;
            }
            $('#areas-error').hidden = true;
        }
        touched = true;
        render();
        root.classList.remove('is-pulse');
        void root.offsetWidth;
        root.classList.add('is-pulse');
    });

    sizeInput.addEventListener('input', () => {
        $('#size-out').textContent = fmt(sizeInput.value) + (sizeInput.value === sizeInput.max ? '+' : '');
        sizeInput.setAttribute('aria-valuetext', `${fmt(sizeInput.value)} square feet`);
        updateFill(sizeInput);
        // Follow the size with a typical bedroom count until the user sets one themselves.
        touched = true;
        if (!bedsTouched) bedsInput.value = typicalBeds(parseInt(sizeInput.value, 10));
        clampBeds();
        render();
    });

    $$('.stepper__btn', form).forEach((b) => b.addEventListener('click', () => {
        bedsTouched = true;
        bedsInput.value = Math.max(1, parseInt(bedsInput.value, 10) + parseInt(b.dataset.stepDir, 10));
        clampBeds();
        render();
    }));

    // Pressing Enter in a field advances rather than submitting the form.
    form.addEventListener('submit', (e) => { e.preventDefault(); nextBtn.click(); });
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.matches('input:not([type="range"])')) { e.preventDefault(); nextBtn.click(); }
    });

    // Buttons elsewhere on the page can preset the goal.
    $$('[data-set-purpose]').forEach((btn) => btn.addEventListener('click', () => {
        const radio = $(`input[name="purpose"][value="${btn.dataset.setPurpose}"]`, form);
        if (radio) { radio.checked = true; render(); }
    }));

    // Shareable estimates: ?est=purpose.type.size.beds.areas.scope.style
    const shareUrl = () => {
        const s = read();
        const code = [s.purpose, s.type, s.size, s.beds, s.areas.join('_'), s.scope, s.style].join('.');
        const url = new URL(location.href);
        url.search = `?est=${code}`;
        url.hash = 'estimate';
        return url.toString();
    };
    const restore = () => {
        const params = new URLSearchParams(location.search);
        const code = params.get('est');
        if (!code) return;
        touched = true;
        bedsTouched = true;
        const fromTheme = THEMES.find((t) => t.slug === params.get('theme'));
        const banner = $('#est-prefill');
        banner.textContent = fromTheme
            ? `Pre-filled for ${fromTheme.name}. Adjust anything that doesn’t match your home.`
            : 'You’re viewing a shared estimate. Change any answer to make it yours.';
        banner.hidden = false;
        if (location.hash === '#estimate') {
            // On mobile the questions come first; land on the number instead.
            setTimeout(() => (window.innerWidth <= 980 ? summary : root).scrollIntoView({ block: 'start' }), 100);
        }
        const [purpose, type, size, beds, areas, scope, style] = code.split('.');
        const pick = (name, val) => { const el = $(`input[name="${name}"][value="${val}"]`, form); if (el) el.checked = true; };
        pick('purpose', purpose); pick('type', type); pick('scope', scope); pick('style', style);
        const sz = parseInt(size, 10);
        if (sz >= 400 && sz <= 4000) { sizeInput.value = sz; $('#size-out').textContent = fmt(sz); }
        if (parseInt(beds, 10) > 0) bedsInput.value = parseInt(beds, 10);
        if (areas) {
            const list = areas.split(/[_+\s]/);
            $$('input[name="areas"]', form).forEach((c) => { c.checked = list.includes(c.value); });
        }
    };
    $$('[data-share-estimate]').forEach((btn) => btn.addEventListener('click', async () => {
        const url = shareUrl();
        const label = $('span', btn) || btn;
        const original = label.textContent;
        try {
            if (navigator.share && matchMedia('(pointer: coarse)').matches) await navigator.share({ title: 'My Kemas makeover estimate', url });
            else { await navigator.clipboard.writeText(url); label.textContent = 'Link copied'; }
        } catch (e) {
            history.replaceState(null, '', url);
            label.textContent = 'Link is in your address bar';
        }
        setTimeout(() => { label.textContent = original; }, 2400);
    }));

    // Mobile: keep the live number visible while answering questions.
    const bar = $('#est-bar');
    if (bar && 'IntersectionObserver' in window) {
        let formIn = false;
        let summaryIn = false;
        const sync = () => {
            const show = formIn && !summaryIn && window.innerWidth <= 980 && $('#est-done').hidden;
            bar.classList.toggle('is-visible', show);
            bar.setAttribute('aria-hidden', String(!show));
            $('#est-bar-btn').tabIndex = show ? 0 : -1;
        };
        new IntersectionObserver(([e]) => { formIn = e.isIntersecting; sync(); }, { threshold: 0.05 }).observe(form);
        new IntersectionObserver(([e]) => { summaryIn = e.isIntersecting; sync(); }, { threshold: 0.2 }).observe(summary);
        $('#est-bar-btn').addEventListener('click', () => summary.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' }));
        form.addEventListener('click', sync);
    }

    restore();
    updateFill(sizeInput);
    clampBeds();
    showStep(1);
    render();
}

// =========================================
// Field validation helper
// =========================================
function validateFields(fields) {
    let firstBad = null;
    fields.forEach((field) => {
        const input = $('input, textarea', field);
        if (!input) return;
        const val = input.value.trim();
        let ok = input.checkValidity();
        if (input.required && !val) ok = false;
        if (input.type === 'tel' && val) ok = isMyMobile(val);
        field.classList.toggle('is-invalid', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstBad) firstBad = input;
        if (!input.dataset.bound) {
            input.dataset.bound = '1';
            input.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) validateFields([field]);
            });
        }
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
}

// =========================================
// Loan calculator
// =========================================
function initLoan() {
    const amt = $('#loan-amt');
    if (!amt) return;
    const loan = $('#loan');
    const update = () => {
        const p = parseInt(amt.value, 10);
        const months = parseInt($('input[name="tenure"]:checked', loan).value, 10);
        const monthly = monthlyFlat(p, months);
        const totalPay = monthly * months;
        amt.style.setProperty('--fill', `${((p - amt.min) / (amt.max - amt.min)) * 100}%`);
        $('#loan-amt-out').textContent = `RM ${fmt(p)}`;
        amt.setAttribute('aria-valuetext', `RM ${fmt(p)}`);
        $('#loan-ten-out').textContent = `${months} months`;
        $('#loan-monthly').textContent = fmt(monthly);
        $('#loan-interest').textContent = `RM ${fmt(totalPay - p)}`;
        $('#loan-total').textContent = `RM ${fmt(totalPay)}`;
        $('#loan-eir').textContent = `≈ ${(effectiveRate(months) * 100).toFixed(1)}% p.a.`;
    };
    amt.addEventListener('input', update);
    $$('input[name="tenure"]', loan).forEach((r) => r.addEventListener('change', update));
    update();
}

// =========================================
// Reviews carousel
// =========================================
function initCarousel() {
    const track = $('#reviews-track');
    if (!track) return;
    const prev = $('[data-carousel="prev"]');
    const next = $('[data-carousel="next"]');
    const stepBy = () => track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24);
    const sync = () => {
        prev.disabled = track.scrollLeft < 8;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -stepBy() }));
    next.addEventListener('click', () => track.scrollBy({ left: stepBy() }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
}

// =========================================
// Contact form
// =========================================
function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#contact-status');
    const consent = $('input[name="consent"]', form);
    const consentErr = $('#consent-err');

    // CTAs elsewhere preselect the topic.
    $$('[data-set-subject]').forEach((a) => a.addEventListener('click', () => {
        const r = $(`input[name="topic"][value="${a.dataset.setSubject}"]`, form);
        if (r) r.checked = true;
    }));

    consent.addEventListener('change', () => consentErr.classList.toggle('is-shown', !consent.checked && consentErr.classList.contains('is-shown')));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = '';
        status.classList.remove('is-ok');
        const fieldsOk = validateFields($$('.field', form));
        consentErr.classList.toggle('is-shown', !consent.checked);
        if (!fieldsOk) return;
        if (!consent.checked) { consent.focus(); return; }

        const btn = $('button[type="submit"]', form);
        btn.disabled = true;
        btn.firstChild.textContent = 'Sending… ';
        setTimeout(() => {
            form.reset();
            btn.disabled = false;
            btn.firstChild.textContent = 'Send to a designer ';
            status.textContent = 'Thanks — a designer will WhatsApp you within the hour (Mon–Sat, 9am–7pm).';
            status.classList.add('is-ok');
        }, 900);
    });
}

// =========================================
// Mobile sticky action bar — appears after the hero, hides near the estimator & contact form
// =========================================
function initActionBar() {
    const bar = $('#action-bar');
    const wa = $('.wa-float');
    if (wa && $('.hero')) {
        const syncWa = () => wa.classList.toggle('is-hidden', window.scrollY < window.innerHeight * 0.5);
        syncWa();
        window.addEventListener('scroll', syncWa, { passive: true });
    }
    if (!bar) return;
    const hideNear = $$('#estimate, #contact, .dt-aside');
    let nearCount = 0;
    let pastHero = false;
    const sync = () => bar.classList.toggle('is-visible', pastHero && nearCount === 0);
    window.addEventListener('scroll', () => { pastHero = window.scrollY > window.innerHeight * 0.6; sync(); }, { passive: true });
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                const was = e.target.dataset.near === '1';
                if (e.isIntersecting && !was) { nearCount++; e.target.dataset.near = '1'; }
                if (!e.isIntersecting && was) { nearCount--; e.target.dataset.near = '0'; }
            });
            sync();
        }, { threshold: 0.15 });
        hideNear.forEach((el) => io.observe(el));
    }
}

// =========================================
// Catalogue page
// =========================================
function initCatalogue() {
    const grid = $('#catalogue-grid');
    if (!grid) return;
    const sort = $('#catalogue-sort');
    const count = $('#catalogue-count');
    const params = new URLSearchParams(location.search);
    let filter = params.get('style') || 'all';
    if (params.has('missing')) $('#catalogue-missing').hidden = false;

    const render = () => {
        let list = THEMES.filter((t) => filter === 'all' || t.style === filter);
        const by = sort.value;
        if (by === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
        if (by === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
        if (by === 'popular') list = [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
        grid.innerHTML = list.map((t) => themeCard(t, { meta: true, badges: true })).join('');
        count.textContent = `${list.length} ${list.length === 1 ? 'theme' : 'themes'}`;
        syncStyleCta(grid, filter, list.length);
    };

    const chips = $('.catalogue .chips');
    $$('.chip-btn', chips).forEach((c) => {
        const on = c.dataset.filter === filter;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
    });
    bindChips(chips, (f) => {
        filter = f;
        const url = new URL(location.href);
        if (f === 'all') url.searchParams.delete('style'); else url.searchParams.set('style', f);
        history.replaceState(null, '', url);
        render();
    });
    sort.addEventListener('change', render);
    render();
}

// =========================================
// Design detail page
// =========================================
function initDetailPage() {
    if (!document.body.classList.contains('page-detail')) return;
    const slug = new URLSearchParams(location.search).get('theme');
    const theme = THEMES.find((t) => t.slug === slug);
    if (!theme) { location.replace(`designs.html?missing=${encodeURIComponent(slug || '')}`); return; }
    const idx = THEMES.indexOf(theme);

    document.title = `${theme.name} — Design theme | Kemas Studio`;
    $('#dt-crumb').textContent = theme.name;
    $('#dt-style').textContent = theme.styleLabel;
    $('#dt-title').textContent = theme.name;
    $('#dt-tagline').textContent = theme.tagline;
    $('#dt-price').textContent = `RM ${fmt(theme.priceFrom)}`;
    $('#dt-img').src = `assets/img/${theme.img}.webp`;
    $('#dt-img').alt = `${theme.name} theme — ${theme.tagline}`;
    $('#dt-sqft').textContent = `${fmt(theme.sqft)} sq ft`;
    $('#dt-best').textContent = theme.bestFor;
    $('#dt-days').textContent = `${theme.days} working days`;
    $('#dt-stylestat').textContent = theme.styleLabel;
    $('#dt-desc').textContent = theme.desc;

    $('#dt-palette').innerHTML = theme.palette.map(([n, hex]) => `
        <li><span class="swatch" style="background:${hex}"></span><span>${n}</span></li>`).join('');

    // Price lines scale from the theme's base price.
    const p = theme.priceFrom;
    const shares = [['Carpentry & built-ins', 0.37], ['Furniture & soft furnishings', 0.33], ['Lighting & electrical', 0.13], ['Paint, ceiling & styling', 0.17]];
    // Round each line to RM 100 and give the remainder to the last line, so the lines always sum to the total.
    let allocated = 0;
    const amounts = shares.map(([, share], i) => {
        const v = i === shares.length - 1 ? p - allocated : Math.round((p * share) / 100) * 100;
        allocated += v;
        return v;
    });
    $('#dt-lines').innerHTML = `<div><dt>Design & 3D render</dt><dd>Included</dd></div>`
        + shares.map(([n], i) => `<div><dt>${n}</dt><dd>RM ${fmt(amounts[i])}</dd></div>`).join('')
        + `<div class="total"><dt>From</dt><dd>RM ${fmt(p)}</dd></div>`;
    $('#dt-monthly').textContent = `RM ${fmt(monthlyFlat(p, 84))}`;
    $('#dt-aside-title').textContent = `Get the ${theme.name} look`;
    $('#dt-estimate').href = `index.html?est=own.condo.${theme.sqft}.${Math.min(6, Math.max(1, Math.round(theme.sqft / 380)))}.whole.partial.${theme.style}&theme=${theme.slug}#estimate`;
    $('#dt-wa').href = `https://wa.me/60123456789?text=${encodeURIComponent(`Hi Kemas! I'm interested in the ${theme.name} theme (from RM ${fmt(theme.priceFrom)}). Could a designer advise on my unit?`)}`;

    // Floor plan: the photographed room shows its photo; the rest show the theme's finish spec.
    const coverRoom = COVER_ROOM[theme.slug] || 'living';
    const roomCard = $('#plan-room');
    const showRoom = (key) => {
        $$('.hotspot').forEach((h) => {
            const on = h.dataset.room === key;
            h.classList.toggle('is-active', on);
            h.setAttribute('aria-pressed', String(on));
            $('use', h).setAttribute('href', on ? '#i-check' : '#i-plus');
        });
        $$('#plan-rooms .chip-btn').forEach((c) => { const on = c.dataset.room === key; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
        if (key === coverRoom) {
            roomCard.innerHTML = `
                <img src="assets/img/${theme.img}-sm.webp" alt="${ROOMS[key]} in the ${theme.name} theme" width="640" height="640">
                <div class="plan__room-body"><span class="plan__room-tag">As photographed</span><h3>${ROOMS[key]}</h3><p>${theme.desc.split('. ')[0]}.</p></div>`;
        } else {
            roomCard.innerHTML = `
                <div class="plan__board" aria-hidden="true">${theme.palette.map(([n, hex]) => `<span style="background:${hex}"><em>${n}</em></span>`).join('')}</div>
                <div class="plan__room-body"><span class="plan__room-tag">Finish spec</span><h3>${ROOMS[key]}</h3><p>${theme.finishes[key]}</p><p class="plan__room-note">You’ll see this room in 3D, on your own floor plan, before you sign.</p></div>`;
        }
        roomCard.classList.remove('is-swapping');
        void roomCard.offsetWidth;
        roomCard.classList.add('is-swapping');
    };
    $$('.hotspot, #plan-rooms .chip-btn').forEach((h) => h.addEventListener('click', () => showRoom(h.dataset.room)));
    showRoom(coverRoom);

    // Gallery: the theme's own photo plus close-ups of it.
    const shots = [{ img: theme.img, full: true, cap: theme.name }]
        .concat(theme.shots.map((cap, i) => ({ img: `${theme.img}-d${i + 1}`, cap })));
    const gallery = $('#dt-gallery');
    gallery.innerHTML = shots.map((s, i) => `<button type="button" data-i="${i}" data-caption="${s.cap}" aria-label="Open photo: ${s.cap}"><img src="assets/img/${s.img}${s.full ? '' : ''}.webp" alt="" loading="lazy" width="640" height="640"></button>`).join('');
    initLightbox(shots, gallery);
    $('#dt-open-gallery').addEventListener('click', () => $('button', gallery).click());

    // More themes
    const others = [1, 2, 3].map((o) => THEMES[(idx + o) % THEMES.length]);
    $('#dt-more').innerHTML = others.map((t) => themeCard(t)).join('');
}

function initLightbox(shots, gallery) {
    const lb = $('#lightbox');
    const img = $('img', lb);
    const cap = $('figcaption', lb);
    let i = 0;
    let lastFocus = null;
    const show = (n) => {
        i = (n + shots.length) % shots.length;
        img.src = `assets/img/${shots[i].img}.webp`;
        img.alt = shots[i].cap;
        cap.textContent = `${shots[i].cap} · ${i + 1} / ${shots.length}`;
    };
    const open = (n) => {
        lastFocus = document.activeElement;
        show(n);
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
        // Focus once the dialog is visible; hidden elements can't take focus.
        requestAnimationFrame(() => {
            lb.classList.add('is-open');
            setTimeout(() => $('.lightbox__close', lb).focus(), 60);
        });
    };
    const close = () => {
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { lb.hidden = true; }, 300);
        if (lastFocus) lastFocus.focus();
    };
    gallery.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) open(parseInt(b.dataset.i, 10)); });
    $('[data-lb="prev"]', lb).addEventListener('click', () => show(i - 1));
    $('[data-lb="next"]', lb).addEventListener('click', () => show(i + 1));
    $('.lightbox__close', lb).addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
        if (lb.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(i - 1);
        if (e.key === 'ArrowRight') show(i + 1);
        if (e.key === 'Tab') {
            // Keep focus inside the dialog.
            const f = $$('button', lb);
            const first = f[0];
            const last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
}
