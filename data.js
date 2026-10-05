/* ============================================
   ОБЩИЕ ДАННЫЕ ДЛЯ ВСЕГО САЙТА
   ============================================ */

const PRODUCTS = [
  { id: 1,  title: '900-1050 ELO (4-5 lvl)',  category: 'Faceit ELO', icon: '📈', soloPrice: 105, partyPrice: 158, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 2,  title: '1050-1200 ELO (5-6 lvl)', category: 'Faceit ELO', icon: '📈', soloPrice: 125, partyPrice: 188, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 3,  title: '1200-1350 ELO (6-7 lvl)', category: 'Faceit ELO', icon: '📈', soloPrice: 145, partyPrice: 218, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 4,  title: '1350-1530 ELO (7-8 lvl)', category: 'Faceit ELO', icon: '📈', soloPrice: 165, partyPrice: 248, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 5,  title: '1530-1750 ELO (8-9 lvl)', category: 'Faceit ELO', icon: '📈', soloPrice: 190, partyPrice: 285, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 6,  title: '1750-2000 ELO (9-10 lvl)', category: 'Faceit ELO', icon: '📈', soloPrice: 230, partyPrice: 345, desc: 'Поднятие рейтинга в указанном диапазоне.' },
  { id: 7,  title: '2000-2100 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🔥', soloPrice: 270, partyPrice: 405, desc: 'Высокий уровень игры.' },
  { id: 8,  title: '2100-2200 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🔥', soloPrice: 320, partyPrice: 480, desc: 'Высокий уровень игры.' },
  { id: 9,  title: '2200-2300 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🔥', soloPrice: 355, partyPrice: 533, desc: 'Высокий уровень игры.' },
  { id: 10, title: '2300-2400 ELO (10 lvl)',   category: 'Faceit ELO', icon: '💎', soloPrice: 390, partyPrice: 683, desc: 'Про-уровень.' },
  { id: 11, title: '2400-2500 ELO (10 lvl)',   category: 'Faceit ELO', icon: '💎', soloPrice: 460, partyPrice: 805, desc: 'Про-уровень.' },
  { id: 12, title: '2500-2600 ELO (10 lvl)',   category: 'Faceit ELO', icon: '💎', soloPrice: 520, partyPrice: 910, desc: 'Про-уровень.' },
  { id: 13, title: '2600-2700 ELO (10 lvl)',   category: 'Faceit ELO', icon: '💎', soloPrice: 580, partyPrice: 1015, desc: 'Про-уровень.' },
  { id: 14, title: '2700-2800 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🚀', soloPrice: 670, partyPrice: 1240, desc: 'Топовый уровень.' },
  { id: 15, title: '2800-2900 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🚀', soloPrice: 850, partyPrice: 1573, desc: 'Топовый уровень.' },
  { id: 16, title: '2900-3000 ELO (10 lvl)',   category: 'Faceit ELO', icon: '🏆', soloPrice: 900, partyPrice: 1800, desc: 'Максимальный уровень.' },
];

/* Бустеры: #1 и #3 — 4000+ ELO в CS2 */
const BOOSTERS = [
  { id: 1, avatar: '🔥', cs2: { elo: 4080, kd: 1.28, hs: 61, wr: 71 }, csgo: { elo: 5340, kd: 1.42, hs: 66, wr: 74 } },
  { id: 2, avatar: '⚡', cs2: { elo: 3860, kd: 1.21, hs: 58, wr: 68 }, csgo: { elo: 5020, kd: 1.35, hs: 63, wr: 71 } },
  { id: 3, avatar: '💀', cs2: { elo: 4210, kd: 1.34, hs: 64, wr: 74 }, csgo: { elo: 5480, kd: 1.48, hs: 69, wr: 77 } },
  { id: 4, avatar: '🎯', cs2: { elo: 3720, kd: 1.18, hs: 55, wr: 66 }, csgo: { elo: 4780, kd: 1.31, hs: 60, wr: 69 } },
  { id: 5, avatar: '🌀', cs2: { elo: 3960, kd: 1.31, hs: 62, wr: 72 }, csgo: { elo: 5210, kd: 1.51, hs: 71, wr: 79 } },
];

const BRACKETS = [
  { min: 900,  max: 1050, solo: 105, party: 158 },
  { min: 1050, max: 1200, solo: 125, party: 188 },
  { min: 1200, max: 1350, solo: 145, party: 218 },
  { min: 1350, max: 1530, solo: 165, party: 248 },
  { min: 1530, max: 1750, solo: 190, party: 285 },
  { min: 1750, max: 2000, solo: 230, party: 345 },
  { min: 2000, max: 2100, solo: 270, party: 405 },
  { min: 2100, max: 2200, solo: 320, party: 480 },
  { min: 2200, max: 2300, solo: 355, party: 533 },
  { min: 2300, max: 2400, solo: 390, party: 683 },
  { min: 2400, max: 2500, solo: 460, party: 805 },
  { min: 2500, max: 2600, solo: 520, party: 910 },
  { min: 2600, max: 2700, solo: 580, party: 1015 },
  { min: 2700, max: 2800, solo: 670, party: 1240 },
  { min: 2800, max: 2900, solo: 850, party: 1573 },
  { min: 2900, max: 3000, solo: 900, party: 1800 },
];

const ELO_PER_GAME = 25;

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽';
}