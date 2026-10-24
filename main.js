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
        tagline: 'Velvet, marble & fluted timber', img: 'theme-emerald', priceFrom: 68000, sqft: 1250, beds: 3, days: 30,
        desc: 'A jewel-toned living space anchored by a deep green velvet sofa, book-matched marble and warm fluted timber. Designed for owners who entertain — and investors targeting premium expat tenants.',
        palette: [['Forest velvet', '#2E5141'], ['Calacatta', '#ECE8E1'], ['Smoked oak', '#6B4A33'], ['Brass', '#B8954A']],
        popular: true
    },
    {
        slug: 'linen-morning', name: 'Linen Morning', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Oak, linen & soft daylight', img: 'theme-linen', priceFrom: 42000, sqft: 1000, beds: 3, days: 30,
        desc: 'Pale oak, washed linen and built-in shelving that keeps clutter out of sight. Our most-requested theme for young families moving into their first home.',
        palette: [['Oat linen', '#E6DCCB'], ['White oak', '#C9A97E'], ['Chalk', '#F4F1EA'], ['Sage', '#A3AE95']],
        popular: true
    },
    {
        slug: 'ember-loft', name: 'Ember Loft', style: 'industrial', styleLabel: 'Industrial',
        tagline: 'Leather, brick & black steel', img: 'theme-ember', priceFrom: 47000, sqft: 900, beds: 2, days: 30,
        desc: 'Tan leather, charcoal limewash and black steel track lighting. A loft feel for compact units that rents especially well to young professionals near city centres.',
        palette: [['Cognac leather', '#8A5232'], ['Charcoal', '#2F2F2D'], ['Raw steel', '#5A5D5F'], ['Walnut', '#5B3E2B']]
    },
    {
        slug: 'salon-boheme', name: 'Salon Bohème', style: 'eclectic', styleLabel: 'Eclectic',
        tagline: 'Gallery walls & collected colour', img: 'theme-boheme', priceFrom: 45000, sqft: 1100, beds: 3, days: 30,
        desc: 'Teal velvet, layered rugs and a floor-to-ceiling gallery wall. For people who want a home that looks collected over years, delivered in thirty days.',
        palette: [['Teal', '#22566A'], ['Terracotta', '#B4583A'], ['Mustard', '#C9A13B'], ['Ivory', '#F1EBDD']]
    },
    {
        slug: 'soft-arc', name: 'Soft Arc', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Curves, cove light & calm', img: 'theme-softarc', priceFrom: 38000, sqft: 750, beds: 2, days: 25,
        desc: 'Curved furniture, hidden cove lighting and a quiet, tonal palette. Our best-value theme for rental studios and 2-bedroom units.',
        palette: [['Mist', '#DCD8D2'], ['Honey oak', '#C08A55'], ['Bone', '#F3EFE8'], ['Graphite', '#4A4B4D']],
        popular: true
    },
    {
        slug: 'skyline-walnut', name: 'Skyline Walnut', style: 'modern', styleLabel: 'Modern luxe',
        tagline: 'Walnut, stone & city views', img: 'theme-skyline', priceFrom: 72000, sqft: 1600, beds: 4, days: 35,
        desc: 'Walnut panelling, stacked stone and layered ambient lighting built for high-floor units with a view. Hotel-suite polish for penthouses and dual-key homes.',
        palette: [['Walnut', '#5A3B28'], ['Travertine', '#CDBFA8'], ['Bronze', '#8C6A45'], ['Ink', '#1E1F1D']]
    },
    {
        slug: 'ivory-hearth', name: 'Ivory Hearth', style: 'minimal', styleLabel: 'Warm minimal',
        tagline: 'Arches, plaster & rust accents', img: 'room-living', priceFrom: 44000, sqft: 1050, beds: 3, days: 30,
        desc: 'Limewashed walls, arched windows and a low, curved sofa with rust cushions. Mediterranean warmth that suits landed homes and low-density condos.',
        palette: [['Plaster', '#EDE6DA'], ['Rust', '#A4532F'], ['Ash', '#B9A890'], ['Clay', '#C98F6B']]
    },
    {
        slug: 'marble-pantry', name: 'Marble Pantry', style: 'modern', styleLabel: 'Modern luxe',
        tagline: 'Island living & brass pendants', img: 'room-kitchen', priceFrom: 56000, sqft: 1300, beds: 3, days: 35,
        desc: 'A kitchen-first theme: waterfall marble island, walnut open shelving and brass pendants. Ideal if you cook, and want the kitchen to be the heart of the home.',
        palette: [['Carrara', '#EEECE8'], ['Walnut', '#6C4A32'], ['Brass', '#B48D4C'], ['Fog', '#D7D6D2']]
    },
    {
        slug: 'clay-cotton', name: 'Clay & Cotton', style: 'eclectic', styleLabel: 'Eclectic',
        tagline: 'Fireside textures & terracotta', img: 'room-bedroom', priceFrom: 41000, sqft: 950, beds: 3, days: 30,
        desc: 'Chunky knits, terracotta cushions and soft, low lighting — a bedroom-led theme for slow mornings and long weekends.',
        palette: [['Cotton', '#F1ECE3'], ['Terracotta', '#B5603E'], ['Teak', '#7A5236'], ['Stone', '#A79C8C']]
    }
];

const ROOMS = {
    living: { name: 'Living room', note: 'Feature wall, TV console, sofa set, rug, curtains & lighting.' },
    dining: { name: 'Dining', note: 'Six-seater dining set, pendant light, built-in sideboard.', img: 'room-living' },
    kitchen: { name: 'Kitchen', note: 'Top & bottom cabinets, quartz top, hob, hood & island seating.', img: 'room-kitchen' },
    master: { name: 'Master bedroom', note: 'Bed frame & headboard, wardrobe, side tables, blackout curtains.', img: 'room-bedroom' }
};

const themeCard = (t, opts = {}) => `
    <a href="design-detail.html?theme=${t.slug}" class="theme-card${opts.wide ? ' theme-card--wide' : ''}" data-style="${t.style}">
        ${t.popular && opts.badges ? '<span class="theme-card__badge">Popular</span>' : ''}
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
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); } });
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
    });
    $$('.theme-card--wide', grid).forEach((c) => { c.dataset.wideDefault = '1'; });
}

// =========================================
// Cost estimator with live summary
// =========================================
const PRICING = {
    // RM per sq ft, [low, high]
    scope: {
        furnish: { label: 'Furnish & style', rate: [32, 46], days: '14–18 working days' },
        partial: { label: 'Makeover', rate: [48, 68], days: '30 working days' },
        full: { label: 'Full renovation', rate: [85, 120], days: '40–45 working days' }
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
const monthlyFlat = (principal, months) => (principal * (1 + FLAT_RATE * (months / 12))) / months;

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
        const areaShare = s.areas.includes('whole') || !s.areas.length
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

    const render = () => {
        const s = read();
        const { low, high, scope } = calc(s);
        animateTo($('#est-low'), lastLow, low);
        animateTo($('#est-high'), lastHigh, high);
        lastLow = low; lastHigh = high;

        $('#est-monthly').textContent = `RM ${fmt(monthlyFlat(low, 84))}`;
        $('#est-days').textContent = scope.days;
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
        $('#size-out').textContent = fmt(sizeInput.value);
        updateFill(sizeInput);
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
        render();
        root.classList.remove('is-pulse');
        void root.offsetWidth;
        root.classList.add('is-pulse');
    });

    sizeInput.addEventListener('input', () => {
        $('#size-out').textContent = fmt(sizeInput.value) + (sizeInput.value === sizeInput.max ? '+' : '');
        updateFill(sizeInput);
        render();
    });

    $$('.stepper__btn', form).forEach((b) => b.addEventListener('click', () => {
        const v = Math.min(6, Math.max(1, parseInt(bedsInput.value, 10) + parseInt(b.dataset.stepDir, 10)));
        bedsInput.value = v;
        $('#beds-out').textContent = v;
        $$('.stepper__btn', form).forEach((sb) => { sb.disabled = (sb.dataset.stepDir === '-1' && v === 1) || (sb.dataset.stepDir === '1' && v === 6); });
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

    updateFill(sizeInput);
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
        if (input.type === 'tel' && val) ok = new RegExp(input.pattern).test(val);
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
        $('#loan-ten-out').textContent = `${months} months`;
        $('#loan-monthly').textContent = fmt(monthly);
        $('#loan-interest').textContent = `RM ${fmt(totalPay - p)}`;
        $('#loan-total').textContent = `RM ${fmt(totalPay)}`;
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
            status.textContent = 'Thanks — a designer will reach out within one working day.';
            status.classList.add('is-ok');
        }, 900);
    });
}

// =========================================
// Mobile sticky action bar — appears after the hero, hides near the estimator & contact form
// =========================================
function initActionBar() {
    const bar = $('#action-bar');
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
    let filter = new URLSearchParams(location.search).get('style') || 'all';

    const render = () => {
        let list = THEMES.filter((t) => filter === 'all' || t.style === filter);
        const by = sort.value;
        if (by === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
        if (by === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
        if (by === 'popular') list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        grid.innerHTML = list.map((t) => themeCard(t, { meta: true, badges: true })).join('');
        count.textContent = `${list.length} ${list.length === 1 ? 'theme' : 'themes'}`;
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
    const theme = THEMES.find((t) => t.slug === slug) || THEMES[0];
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
    $('#dt-beds').textContent = `${theme.beds} bedrooms`;
    $('#dt-days').textContent = `${theme.days} working days`;
    $('#dt-stylestat').textContent = theme.styleLabel;
    $('#dt-desc').textContent = theme.desc;

    $('#dt-palette').innerHTML = theme.palette.map(([n, hex]) => `
        <li><span class="swatch" style="background:${hex}"></span><span>${n}</span></li>`).join('');

    // Price lines scale from the theme's base price.
    const p = theme.priceFrom;
    const lines = [['Design & 3D render', 0], ['Carpentry & built-ins', 0.38], ['Furniture & soft furnishings', 0.34], ['Lighting & electrical', 0.14], ['Paint, ceiling & styling', 0.14]];
    $('#dt-lines').innerHTML = lines.map(([n, s]) => `<div><dt>${n}</dt><dd>${s ? `RM ${fmt(Math.round(p * s / 100) * 100)}` : 'Included'}</dd></div>`).join('')
        + `<div class="total"><dt>From</dt><dd>RM ${fmt(p)}</dd></div>`;
    $('#dt-monthly').textContent = `RM ${fmt(monthlyFlat(p, 84))}`;
    $('#dt-aside-title').textContent = `Get the ${theme.name} look`;

    // Floor plan rooms
    const rooms = { ...ROOMS, living: { ...ROOMS.living, img: theme.img } };
    const roomCard = $('#plan-room');
    const showRoom = (key) => {
        const r = rooms[key];
        $$('.hotspot').forEach((h) => { const on = h.dataset.room === key; h.classList.toggle('is-active', on); h.setAttribute('aria-pressed', String(on)); });
        $$('#plan-rooms .chip-btn').forEach((c) => { const on = c.dataset.room === key; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
        $('img', roomCard).src = `assets/img/${r.img}-sm.webp`;
        $('img', roomCard).alt = `${r.name} in the ${theme.name} theme`;
        $('h3', roomCard).textContent = r.name;
        $('p', roomCard).textContent = r.note;
        roomCard.classList.remove('is-swapping');
        void roomCard.offsetWidth;
        roomCard.classList.add('is-swapping');
    };
    $$('.hotspot, #plan-rooms .chip-btn').forEach((h) => h.addEventListener('click', () => showRoom(h.dataset.room)));
    showRoom('living');

    // Gallery + lightbox
    const shots = [
        { img: theme.img, cap: 'Living room' },
        { img: 'room-kitchen', cap: 'Kitchen' },
        { img: 'room-bedroom', cap: 'Master bedroom' },
        { img: 'room-living', cap: 'Dining & reading nook' },
        { img: 'theme-softarc', cap: 'Second bedroom' }
    ].filter((s, i, arr) => arr.findIndex((x) => x.img === s.img) === i);
    const gallery = $('#dt-gallery');
    gallery.innerHTML = shots.map((s, i) => `<button type="button" data-i="${i}" data-caption="${s.cap}" aria-label="Open photo: ${s.cap}"><img src="assets/img/${s.img}${i === 0 ? '' : '-sm'}.webp" alt="" loading="lazy"></button>`).join('');
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
        requestAnimationFrame(() => lb.classList.add('is-open'));
        document.body.style.overflow = 'hidden';
        $('.lightbox__close', lb).focus();
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
