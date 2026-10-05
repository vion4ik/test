/* ============================================
   ОБЩИЙ SCRIPT ДЛЯ ВСЕХ СТРАНИЦ
   Данные — в data.js (подключается до этого файла)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsGrid')) initProducts();
  if (document.getElementById('calcBtn')) initCalculator();

  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
});

/* ============================================
   ГЛАВНАЯ — ТОВАРЫ
   ============================================ */
function initProducts() {
  const state = { category: 'all', search: '', sort: 'default' };

  const els = {
    grid: document.getElementById('productsGrid'),
    categoryFilters: document.getElementById('categoryFilters'),
    search: document.getElementById('searchInput'),
    sort: document.getElementById('sortSelect'),
    empty: document.getElementById('emptyMessage'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modalContent'),
  };

  function getCategories() {
    const set = new Set(PRODUCTS.map(p => p.category));
    return ['all', ...set];
  }

  function renderCategoryFilters() {
    const cats = getCategories();
    els.categoryFilters.innerHTML = cats.map(cat => {
      const label = cat === 'all' ? 'Все услуги' : cat;
      const active = state.category === cat ? 'active' : '';
      return `<button class="cat-btn ${active}" data-cat="${cat}">${label}</button>`;
    }).join('');

    els.categoryFilters.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        renderCategoryFilters();
        renderProducts();
      });
    });
  }

  function getVisibleProducts() {
    let list = [...PRODUCTS];
    if (state.category !== 'all') list = list.filter(p => p.category === state.category);
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }
    if (state.sort === 'price-asc')  list.sort((a, b) => a.soloPrice - b.soloPrice);
    if (state.sort === 'price-desc') list.sort((a, b) => b.soloPrice - a.soloPrice);
    return list;
  }

  function renderProducts() {
    const list = getVisibleProducts();

    if (list.length === 0) {
      els.grid.innerHTML = '';
      els.empty.style.display = 'block';
      return;
    }
    els.empty.style.display = 'none';

    els.grid.innerHTML = list.map(p => `
      <div class="card" data-id="${p.id}">
        <div class="card__icon">${p.icon}</div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__price">
          <div class="price-option">
            <span>Solo</span>
            <b>${formatPrice(p.soloPrice)}</b>
            <i>за 1 игру</i>
          </div>
          <div class="price-option">
            <span>Party</span>
            <b>${formatPrice(p.partyPrice)}</b>
            <i>за 1 игру</i>
          </div>
        </div>
        <div class="card__actions">
          <button class="btn btn--primary btn--sm btn--full" data-action="details" data-id="${p.id}">
            Подробнее
          </button>
        </div>
      </div>
    `).join('');

    els.grid.querySelectorAll('[data-action="details"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openModal(Number(e.currentTarget.dataset.id));
      });
    });
  }

  function openModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;

    els.modalContent.innerHTML = `
      <button class="modal__close" id="modalClose">×</button>
      <div class="card__icon">${p.icon}</div>
      <h3 class="card__title" style="font-size:22px;">${p.title}</h3>
      <p class="card__desc" style="margin: 12px 0 18px;">${p.desc}</p>

      <div style="background: var(--bg-3); padding: 14px; border-radius: 10px; margin-bottom: 14px;">
        <div style="margin-bottom: 10px; font-weight: 600; font-size: 13px;">Тип буста:</div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <button class="btn btn--primary btn--sm" id="modalSoloBtn" style="flex:1;">Solo</button>
          <button class="btn btn--ghost btn--sm" id="modalPartyBtn" style="flex:1;">Party</button>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: var(--accent);" id="modalPrice">
            ${formatPrice(p.soloPrice)}
          </div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">за 1 игру</div>
        </div>
      </div>

      <div style="margin-bottom: 12px; font-weight: 600; font-size: 13px;">Выбери бустера:</div>
      <div class="boosters-grid" id="boostersGrid">
        ${BOOSTERS.map((b, i) => `
          <div class="booster-card ${i === 0 ? 'active' : ''}" data-booster="${b.id}">
            <div class="booster-card__avatar">${b.avatar}</div>
            <div class="booster-card__name">Бустер #${b.id}</div>
            <div class="booster-card__elo">${b.cs2.elo} ELO</div>
          </div>
        `).join('')}
      </div>

      <div id="boosterStatsWrap"></div>

      <a href="https://t.me/ILoVeGaBi" target="_blank" class="btn btn--primary btn--full" style="margin-top: 6px;">
        Написать в Telegram
      </a>
    `;

    els.modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const soloBtn = document.getElementById('modalSoloBtn');
    const partyBtn = document.getElementById('modalPartyBtn');
    const priceDisplay = document.getElementById('modalPrice');

    soloBtn.addEventListener('click', () => {
      soloBtn.className = 'btn btn--primary btn--sm';
      partyBtn.className = 'btn btn--ghost btn--sm';
      priceDisplay.textContent = formatPrice(p.soloPrice);
    });

    partyBtn.addEventListener('click', () => {
      soloBtn.className = 'btn btn--ghost btn--sm';
      partyBtn.className = 'btn btn--primary btn--sm';
      priceDisplay.textContent = formatPrice(p.partyPrice);
    });

    let selectedBoosterId = BOOSTERS[0].id;

    function renderBoosterStats() {
      const b = BOOSTERS.find(x => x.id === selectedBoosterId);
      if (!b) return;
      document.getElementById('boosterStatsWrap').innerHTML = `
        <div class="booster-stats">
          <div class="booster-stats__title">
            <span style="font-size:18px;">${b.avatar}</span>
            <span>Бустер #${b.id}</span>
          </div>
          <div class="booster-stats__block">
            <div class="booster-stats__label">CS2 · Faceit</div>
            <div class="booster-stats__grid">
              <div class="booster-stats__item"><b>${b.cs2.elo}</b><span>ELO</span></div>
              <div class="booster-stats__item"><b>${b.cs2.kd}</b><span>K/D</span></div>
              <div class="booster-stats__item"><b>${b.cs2.hs}%</b><span>HS</span></div>
              <div class="booster-stats__item"><b>${b.cs2.wr}%</b><span>Winrate</span></div>
            </div>
          </div>
          <div class="booster-stats__block">
            <div class="booster-stats__label">CS:GO · Faceit</div>
            <div class="booster-stats__grid">
              <div class="booster-stats__item"><b>${b.csgo.elo}</b><span>ELO</span></div>
              <div class="booster-stats__item"><b>${b.csgo.kd}</b><span>K/D</span></div>
              <div class="booster-stats__item"><b>${b.csgo.hs}%</b><span>HS</span></div>
              <div class="booster-stats__item"><b>${b.csgo.wr}%</b><span>Winrate</span></div>
            </div>
          </div>
        </div>
      `;
    }

    document.querySelectorAll('.booster-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.booster-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedBoosterId = Number(card.dataset.booster);
        renderBoosterStats();
      });
    });

    renderBoosterStats();
    document.getElementById('modalClose').addEventListener('click', closeModal);
  }

  renderCategoryFilters();
  renderProducts();

  els.search.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderProducts();
  });

  els.sort.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderProducts();
  });
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ============================================
   КАЛЬКУЛЯТОР
   ============================================ */
function initCalculator() {
  let calcType = 'solo';
  let calcRegion = 'ru';

  const els = {
    startElo: document.getElementById('startElo'),
    endElo: document.getElementById('endElo'),
    typeToggle: document.getElementById('typeToggle'),
    regionToggle: document.getElementById('regionToggle'),
    calcBtn: document.getElementById('calcBtn'),
    calcResult: document.getElementById('calcResult'),
    calcDiff: document.getElementById('calcDiff'),
    calcGames: document.getElementById('calcGames'),
    calcPrice: document.getElementById('calcPrice'),
    calcError: document.getElementById('calcError'),
  };

  els.typeToggle.querySelectorAll('.calc__toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      els.typeToggle.querySelectorAll('.calc__toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcType = btn.dataset.type;
    });
  });

  els.regionToggle.querySelectorAll('.calc__toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      els.regionToggle.querySelectorAll('.calc__toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcRegion = btn.dataset.region;
    });
  });

  function getBracket(elo) {
    return BRACKETS.find(b => elo >= b.min && elo < b.max);
  }

  function calculate(startElo, targetElo, type, region) {
    if (targetElo <= startElo) return { error: 'Целевое ELO должно быть больше начального.' };
    if (startElo < 900 || targetElo > 3000) return { error: 'ELO должен быть в диапазоне 900–3000.' };

    let total = 0;
    let games = 0;
    let current = startElo;

    while (current < targetElo) {
      const bracket = getBracket(current);
      if (!bracket) return { error: 'ELO вышел за поддерживаемый диапазон.' };
      total += type === 'solo' ? bracket.solo : bracket.party;
      games++;
      current += ELO_PER_GAME;
    }

    if (region === 'eu') total = Math.round(total * 1.15);
    return { total, games, diff: targetElo - startElo };
  }

  els.calcBtn.addEventListener('click', () => {
    const startElo = parseInt(els.startElo.value, 10);
    const endElo = parseInt(els.endElo.value, 10);

    els.calcError.style.display = 'none';
    els.calcResult.style.display = 'none';

    if (isNaN(startElo) || isNaN(endElo)) {
      els.calcError.textContent = 'Введи корректные значения ELO.';
      els.calcError.style.display = 'block';
      return;
    }

    const result = calculate(startElo, endElo, calcType, calcRegion);
    if (result.error) {
      els.calcError.textContent = result.error;
      els.calcError.style.display = 'block';
      return;
    }

    els.calcDiff.textContent = '+' + result.diff + ' ELO';
    els.calcGames.textContent = result.games + ' игр';
    els.calcPrice.textContent = formatPrice(result.total);
    els.calcResult.style.display = 'flex';
  });
}