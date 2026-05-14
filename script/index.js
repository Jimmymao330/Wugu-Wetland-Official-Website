// ──────────────────────────────────────────────
// 1. HAMBURGER MENU
// ──────────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const navDrawer    = document.getElementById('nav-drawer');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
});

navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
    navDrawer.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
});

// ──────────────────────────────────────────────
// 2. HERO CAROUSEL & CTA
// ──────────────────────────────────────────────
(() => {
    const slidesWrap = document.getElementById('hero-slides');
    const slides     = slidesWrap.querySelectorAll('.hero__slide');
    const dotsWrap   = document.getElementById('carousel-dots');
    const prevBtn    = document.getElementById('carousel-prev');
    const nextBtn    = document.getElementById('carousel-next');
    const ctaBtn     = document.getElementById('hero-cta-btn');
    const mapBtn     = document.getElementById('map-btn');
    let current = 0;
    let timer;

    // CTA 行為綁定
    ctaBtn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // Build dots
    slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `第 ${i+1} 張`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    });

    function goTo(idx) {
    slides[current].removeAttribute('aria-current');
    current = (idx + slides.length) % slides.length;
    slidesWrap.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.hero__dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
    });
    slides[current].setAttribute('aria-current', 'true');
    restartTimer();
    }

    function restartTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    slidesWrap.addEventListener('mouseenter', () => clearInterval(timer));
    slidesWrap.addEventListener('mouseleave', restartTimer);

    slidesWrap.setAttribute('tabindex', '0');
    slidesWrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
    });

    goTo(0);
})();

// ──────────────────────────────────────────────
// 3. NEWS SECTION — Mock Cache Logic
// ──────────────────────────────────────────────
(() => {
    const MOCK_DATA = {
    status: 'success',
    updatedAt: new Date().toISOString(),
    data: [
        { id: '1', title_zh: '測試消息', date_zh: '2025/04/20', desc_zh: '文字文字文字文字文字文字文字文字文字文字文字文字', url: '#' },
        { id: '2', title_zh: '測試消息', date_zh: '2025/04/20', desc_zh: '文字文字文字文字文字文字文字文字文字文字文字文字', url: '#' },
        { id: '3', title_zh: '測試消息', date_zh: '2025/03/20', desc_zh: '文字文字文字文字文字文字文字文字文字文字文字文字', url: '#' }
    ]
    };

    const newsList = document.getElementById('news-list');

    function renderNews(items) {
    if (!items || items.length === 0) {
        newsList.innerHTML = '<li class="news-error">目前暫無最新消息。</li>';
        return;
    }
    newsList.style.opacity = '0';
    setTimeout(() => {
        newsList.innerHTML = items.slice(0, 4).map(item => `
        <li class="news-item">
            <a href="${item.url}" style="display:block;text-decoration:none;color:inherit;" aria-label="${item.title_zh}">
            <p class="news-item__title">${item.title_zh} <span class="news-item__meta" style="font-weight:400;margin-left:8px;">${item.date_zh}</span></p>
            <p class="news-item__desc">${item.desc_zh}</p>
            </a>
        </li>`).join('');
        newsList.style.transition = 'opacity 0.4s';
        newsList.style.opacity = '1';
    }, 200);
    }

    // Simulate async fetch
    setTimeout(() => renderNews(MOCK_DATA.data), 800);
})();

// ──────────────────────────────────────────────
// 4. SPECIES FLIP CARD (Mobile Click Delegation)
// ──────────────────────────────────────────────
(() => {
    const speciesGrid = document.getElementById('species-grid');
    
    speciesGrid.addEventListener('click', (e) => {
    // Find closest card
    const card = e.target.closest('.species-card');
    if (!card) return;

    // Only handle specific interaction for touch/click consistency on mobile
    const isFlipped = card.classList.contains('is-flipped');
    
    // Remove flipped state from all cards
    speciesGrid.querySelectorAll('.species-card').forEach(c => c.classList.remove('is-flipped'));
    
    // Toggle current card
    if (!isFlipped) {
        card.classList.add('is-flipped');
    }
    });
})();

// ──────────────────────────────────────────────
// 5. SCROLL REVEAL & BACK TO TOP
// ──────────────────────────────────────────────
(() => {
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        }
    });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();