const STORAGE_KEY = 'schapentracker-data';

const state = {
  paddocks: [],
  sheep: [],
  movements: [],
};

const elements = {
  paddockForm: document.getElementById('paddock-form'),
  paddockName: document.getElementById('paddock-name'),
  paddockSize: document.getElementById('paddock-size'),
  paddockList: document.getElementById('paddock-list'),
  sheepForm: document.getElementById('sheep-form'),
  sheepTag: document.getElementById('sheep-tag'),
  sheepBreed: document.getElementById('sheep-breed'),
  sheepWeight: document.getElementById('sheep-weight'),
  sheepPaddock: document.getElementById('sheep-paddock'),
  moveForm: document.getElementById('move-form'),
  moveSheep: document.getElementById('move-sheep'),
  movePaddock: document.getElementById('move-paddock'),
  movementTableBody: document.querySelector('#movement-table tbody'),
  statPaddocks: document.getElementById('stat-paddocks'),
  statSections: document.getElementById('stat-sections'),
  statSheep: document.getElementById('stat-sheep'),
  statMaintenance: document.getElementById('stat-maintenance'),
  statTopPaddock: document.getElementById('stat-top-paddock'),
  distributionBar: document.getElementById('distribution-bar'),
  togglePaddockPanel: document.getElementById('toggle-paddock-panel'),
  toggleSheepPanel: document.getElementById('toggle-sheep-panel'),
};

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('nl-NL', { dateStyle: 'short', timeStyle: 'short' });
}

function getPaddockName(id) {
  const paddock = state.paddocks.find((item) => item.id === id);
  return paddock ? paddock.name : 'Onbekend';
}

function getTopPaddock() {
  if (state.paddocks.length === 0) return '-';
  const counts = state.paddocks.map((paddock) => ({
    name: paddock.name,
    count: state.sheep.filter((sheep) => sheep.paddockId === paddock.id).length,
  }));
  const sorted = counts.sort((a, b) => b.count - a.count);
  return sorted[0].count > 0 ? sorted[0].name : '-';
}

function renderSummary() {
  elements.statPaddocks.textContent = state.paddocks.length;
  elements.statSections.textContent = state.paddocks.length;
  elements.statSheep.textContent = state.sheep.length;
  elements.statMaintenance.textContent = 0;
  elements.statTopPaddock.textContent = getTopPaddock();
}

function renderDistribution() {
  if (state.paddocks.length === 0 || state.sheep.length === 0) {
    elements.distributionBar.innerHTML = '<span class="distribution-segment distribution-blue" style="width:100%">Geen data</span>';
    return;
  }

  const colors = ['distribution-green', 'distribution-blue', 'distribution-purple', 'distribution-orange'];
  const total = state.sheep.length;
  elements.distributionBar.innerHTML = state.paddocks
    .map((paddock, index) => {
      const count = state.sheep.filter((sheep) => sheep.paddockId === paddock.id).length;
      const width = Math.round((count / total) * 100);
      if (count === 0) return '';
      return `<span class="distribution-segment ${colors[index % colors.length]}" style="width:${width}%">${paddock.name} ${count}</span>`;
    })
    .join('');
}

function renderPaddocks() {
  if (state.paddocks.length === 0) {
    elements.paddockList.innerHTML = '<div class="card"><strong>Geen weides</strong><p>Voeg een weide toe om te starten.</p></div>';
    return;
  }

  elements.paddockList.innerHTML = state.paddocks
    .map((paddock) => {
      const sheepForPaddock = state.sheep.filter((sheep) => sheep.paddockId === paddock.id);
      const count = sheepForPaddock.length;
      const sheepRows = sheepForPaddock.length
        ? sheepForPaddock
            .map((sheep) => `
              <div class="sheep-item">
                <div>
                  <strong>${sheep.tag}</strong>
                  <div class="sheep-meta">${sheep.breed || 'Onbekend'} • ${sheep.weight ? sheep.weight + ' kg' : 'Gewicht onbekend'}</div>
                </div>
                <div class="actions-row">
                  <span class="action-icon">✏️</span>
                  <span class="action-icon">🩺</span>
                  <span class="action-icon">➡️</span>
                </div>
              </div>
            `)
            .join('')
        : '<div class="sheep-item"><em>Geen schapen in deze weide</em></div>';

      return `
        <article class="paddock-card">
          <header class="paddock-header">
            <strong>${paddock.name}</strong>
            <span class="paddock-badge">${count} 🐑</span>
          </header>
          <div class="paddock-sheep">
            ${sheepRows}
          </div>
        </article>
      `;
    })
    .join('');
}

function renderSelectors() {
  const paddockOptions = state.paddocks
    .map((p) => `<option value="${p.id}">${p.name}</option>`)
    .join('');

  elements.sheepPaddock.innerHTML = `<option value="">Kies een weide</option>${paddockOptions}`;
  elements.movePaddock.innerHTML = `<option value="">Kies weide</option>${paddockOptions}`;
  elements.moveSheep.innerHTML = state.sheep
    .map((sheep) => `<option value="${sheep.id}">${sheep.tag} (${getPaddockName(sheep.paddockId)})</option>`)
    .join('');
}

function renderMovements() {
  if (state.movements.length === 0) {
    elements.movementTableBody.innerHTML = '<tr><td colspan="4">Nog geen verplaatsingen geregistreerd.</td></tr>';
    return;
  }

  elements.movementTableBody.innerHTML = state.movements
    .slice()
    .reverse()
    .map((movement) => `
      <tr>
        <td>${formatDate(movement.timestamp)}</td>
        <td>${movement.tag}</td>
        <td>${movement.from || 'Onbekend'}</td>
        <td>${movement.to || 'Onbekend'}</td>
      </tr>
    `)
    .join('');
}

function refresh() {
  renderSummary();
  renderDistribution();
  renderPaddocks();
  renderSelectors();
  renderMovements();
}

function addPaddock(event) {
  event.preventDefault();
  const name = elements.paddockName.value.trim();
  const size = elements.paddockSize.value.trim();
  if (!name) return;

  state.paddocks.push({ id: crypto.randomUUID(), name, size });
  elements.paddockName.value = '';
  elements.paddockSize.value = '';
  saveState();
  refresh();
}

function addSheep(event) {
  event.preventDefault();
  const tag = elements.sheepTag.value.trim();
  const breed = elements.sheepBreed.value.trim();
  const weight = parseFloat(elements.sheepWeight.value);
  const paddockId = elements.sheepPaddock.value;

  if (!tag || !paddockId) return;

  state.sheep.push({
    id: crypto.randomUUID(),
    tag,
    breed,
    weight: Number.isFinite(weight) ? weight : null,
    paddockId,
  });

  elements.sheepTag.value = '';
  elements.sheepBreed.value = '';
  elements.sheepWeight.value = '';
  elements.sheepPaddock.value = '';
  saveState();
  refresh();
}

function moveSheep(event) {
  event.preventDefault();
  const sheepId = elements.moveSheep.value;
  const targetPaddockId = elements.movePaddock.value;
  if (!sheepId || !targetPaddockId) return;

  const sheep = state.sheep.find((item) => item.id === sheepId);
  if (!sheep || sheep.paddockId === targetPaddockId) return;

  const fromName = getPaddockName(sheep.paddockId);
  const toName = getPaddockName(targetPaddockId);

  state.movements.push({
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    tag: sheep.tag,
    from: fromName,
    to: toName,
  });

  sheep.paddockId = targetPaddockId;
  saveState();
  refresh();
}

function init() {
  loadState();
  elements.paddockForm.addEventListener('submit', addPaddock);
  elements.sheepForm.addEventListener('submit', addSheep);
  elements.moveForm.addEventListener('submit', moveSheep);
  elements.togglePaddockPanel.addEventListener('click', () => document.getElementById('paddock-name').focus());
  elements.toggleSheepPanel.addEventListener('click', () => document.getElementById('sheep-tag').focus());
  refresh();
}

init();
