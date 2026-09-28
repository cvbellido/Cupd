const fallbackCoffeeData = [
  {
    id: 1,
    name: 'Sunrise Cold Brew',
    cafe: 'North Loop Coffee',
    address: '214 W 14th St, Baltimore, MD',
    price: 6.5,
    distance: '0.4 mi',
    eta: '4 min',
    open: true,
    mood: 'focus',
    tags: ['Cold Brew', 'Vegan', 'High Caffeine'],
    description: 'Orange peel brightness with a smooth cacao finish.',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Maple Oat Latte',
    cafe: 'Oak & Ember',
    address: '18 Mercer St, Annapolis, MD',
    price: 7.25,
    distance: '0.8 mi',
    eta: '6 min',
    open: true,
    mood: 'cozy',
    tags: ['Oat Milk', 'Sweet', 'Popular'],
    description: 'Velvety espresso layered with warm maple and cinnamon foam.',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Citrus Matcha',
    cafe: 'Gather & Bloom',
    address: '174 Seventh Ave S, Silver Spring, MD',
    price: 6.9,
    distance: '1.1 mi',
    eta: '8 min',
    open: true,
    mood: 'refresh',
    tags: ['Matcha', 'Bright', 'Light'],
    description: 'Uji matcha matched with yuzu and a silky coconut finish.',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Honey Almond Cortado',
    cafe: 'Moss Street Roasters',
    address: '72 W 11th St, Towson, MD',
    price: 5.75,
    distance: '0.6 mi',
    eta: '5 min',
    open: false,
    mood: 'focus',
    tags: ['Balanced', 'Nutty', 'Small Batch'],
    description: 'A mellow shot with almond sweetness and roasted honey notes.',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Cocoa Mocha',
    cafe: 'Hollow Bean',
    address: '61 E 4th St, Bethesda, MD',
    price: 7.5,
    distance: '1.5 mi',
    eta: '10 min',
    open: true,
    mood: 'cozy',
    tags: ['Mocha', 'Comfort', 'Dessert'],
    description: 'Dark chocolate espresso with a whipped vanilla crema finish.',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Berry Citrus Spritz',
    cafe: 'Harbor Tea Co.',
    address: '330 W 24th St, Rockville, MD',
    price: 6.25,
    distance: '0.9 mi',
    eta: '7 min',
    open: true,
    mood: 'refresh',
    tags: ['Tea', 'Bubbly', 'Iced'],
    description: 'A crisp tea refresher with berry essence and citrus sparkle.',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80'
  }
];

const state = {
  allCoffees: [],
  currentIndex: 0,
  favorites: [],
  tried: [],
  ratings: {},
  pendingCoffee: null,
  selectedPickup: null,
  swipeCount: 0,
  swipeHistory: [],
  orderPlaced: false
};

const coffeePhotoPool = [
  'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80'
];

const cardStage = document.getElementById('cardStage');
const cardMetrics = document.getElementById('cardMetrics');
const favoritesList = document.getElementById('favoritesList');
const triedList = document.getElementById('triedList');
const favoriteCount = document.getElementById('favoriteCount');
const triedCount = document.getElementById('triedCount');
const deckCounter = document.getElementById('deckCounter');
const deckTotal = document.getElementById('deckTotal');
const locationLabel = document.getElementById('locationLabel');
const pickupSummary = document.getElementById('pickupSummary');
const tasteProfile = document.getElementById('tasteProfile');
const cancelPickupButton = document.getElementById('cancelPickupOrder');
let passButton = null;
let saveButton = null;
const pickupButton = document.getElementById('pickupButton');
const useLocationButton = document.getElementById('useLocationButton');
const placePickupOrder = document.getElementById('placePickupOrder');
const ratingModal = document.getElementById('ratingModal');
const closeRatingModal = document.getElementById('closeRatingModal');
const submitRating = document.getElementById('submitRating');
const rateLink = document.getElementById('rateLink');
const triedToggle = document.getElementById('triedToggle');
const triedBody = document.getElementById('triedBody');
const openNowText = document.getElementById('openNowText');

function haversineDistanceMiles(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * earthRadiusMiles * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistanceMiles(distanceInMiles) {
  return distanceInMiles < 1
    ? `${distanceInMiles.toFixed(1)} mi`
    : `${distanceInMiles.toFixed(1)} mi`;
}

function normalizeOverpassPlace(item, index, userLat, userLon) {
  const name = item.tags?.name || `Coffee stop ${index + 1}`;
  const address = item.tags?.['addr:street']
    ? `${item.tags['addr:street']}${item.tags['addr:housenumber'] ? ` ${item.tags['addr:housenumber']}` : ''}${item.tags['addr:city'] ? `, ${item.tags['addr:city']}` : ''}`
    : 'Address unavailable';
  const latitude = Number(item.lat ?? item.center?.lat ?? userLat);
  const longitude = Number(item.lon ?? item.center?.lon ?? userLon);
  const distanceMiles = haversineDistanceMiles(userLat, userLon, latitude, longitude);

  return {
    id: item.id || `live-${index}`,
    name,
    cafe: name,
    address: `${address}${item.tags?.['addr:state'] ? `, ${item.tags['addr:state']}` : ''}`,
    price: 6 + ((index % 3) * 0.75),
    distance: formatDistanceMiles(distanceMiles),
    eta: `${Math.max(3, Math.round(distanceMiles * 11))} min`,
    open: true,
    mood: ['focus', 'cozy', 'refresh'][index % 3],
    tags: ['Local favorite', 'Pickup', 'Roasted'],
    description: 'Freshly brewed coffee near your location.',
    rating: Number((4.3 + (index % 5) * 0.15).toFixed(1)),
    image: coffeePhotoPool[index % coffeePhotoPool.length]
  };
}

async function fetchNearbyCoffeeShops(latitude, longitude) {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="cafe"](around:5000,${latitude},${longitude});
      node["shop"="coffee"](around:5000,${latitude},${longitude});
    );
    out center 20;
  `;

  const encoded = encodeURIComponent(query);
  const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encoded}`);

  if (!response.ok) {
    throw new Error('Nearby coffee search failed');
  }

  const data = await response.json();
  const places = Array.isArray(data.elements) ? data.elements : [];

  return places
    .filter((place) => place.tags && (place.tags.amenity === 'cafe' || place.tags.shop === 'coffee'))
    .slice(0, 8)
    .map((place, index) => normalizeOverpassPlace(place, index, latitude, longitude));
}

async function reverseGeocode(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    if (!response.ok) return 'your area';

    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.suburb || data.address?.neighbourhood || 'your area';
  } catch (error) {
    return 'your area';
  }
}

async function loadCoffeeData() {
  state.allCoffees = fallbackCoffeeData;
  renderCurrentCard();
  renderFavorites();
  renderTriedList();
  updatePickupSummary();
  updateTasteProfile();
  syncOrderButtons();
  syncCardsWithCurrentCoffee();
}

function getVisibleCoffees() {
  return state.allCoffees;
}

function focusCoffeeById(coffeeId) {
  const index = state.allCoffees.findIndex((coffee) => coffee.id === coffeeId);
  if (index === -1) return;

  state.currentIndex = index;
  renderCurrentCard();
}

function getTasteProfileSummary() {
  const referenceCoffees = [...state.favorites];

  if (!referenceCoffees.length && state.swipeHistory.length) {
    const recent = [...state.swipeHistory].slice(-5);
    recent.forEach((coffee) => referenceCoffees.push(coffee));
  }

  if (!referenceCoffees.length) {
    return 'Your taste profile is still brewing. Swipe a few more to see your vibe.';
  }

  const scores = {
    smooth: 0,
    chocolatey: 0,
    bright: 0,
    sweet: 0,
    bold: 0
  };

  referenceCoffees.forEach((coffee) => {
    const text = `${coffee.name} ${coffee.description} ${(coffee.tags || []).join(' ')}`.toLowerCase();

    if (coffee.mood === 'cozy' || /mocha|cocoa|maple|chocolate|almond|honey/.test(text)) {
      scores.chocolatey += 2;
    }
    if (coffee.mood === 'refresh' || /citrus|matcha|berry|bright|yuzu|tea/.test(text)) {
      scores.bright += 2;
    }
    if (coffee.mood === 'focus' || /cold brew|espresso|roast|caffeine|bold/.test(text)) {
      scores.bold += 2;
    }
    if (/sweet|maple|oat|almond|honey|vanilla/.test(text)) {
      scores.sweet += 2;
    }
    if (/smooth|velvety|crema|latte|cortado|balanced/.test(text)) {
      scores.smooth += 2;
    }
  });

  const topDescriptor = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'smooth';

  if (topDescriptor === 'chocolatey') {
    return 'You\'re into smooth, chocolatey medium roasts.';
  }
  if (topDescriptor === 'bright') {
    return 'You\'re into bright, citrusy coffees with a lighter finish.';
  }
  if (topDescriptor === 'bold') {
    return 'You\'re into bold, punchy brews with plenty of character.';
  }
  if (topDescriptor === 'sweet') {
    return 'You\'re into sweet, mellow coffee drinks with a soft finish.';
  }
  return 'You\'re into smooth, balanced pours that feel easy to come back to.';
}

function updateTasteProfile() {
  if (!tasteProfile) return;

  if (state.swipeCount < 5) {
    tasteProfile.textContent = 'Your taste profile is still brewing. Swipe a few more to see your vibe.';
    return;
  }

  tasteProfile.textContent = getTasteProfileSummary();
}

function renderFavorites() {
  favoriteCount.textContent = String(state.favorites.length);

  if (!state.favorites.length) {
    favoritesList.innerHTML = `
      <li class="favorite-item">
        <div class="favorite-thumb" style="background: linear-gradient(135deg, #3b2c27, #1d1715);"></div>
        <div>
          <strong>No favorites yet</strong>
          <span>Save a café you want to revisit.</span>
        </div>
        <span class="favorite-price">--</span>
      </li>
    `;
    return;
  }

  favoritesList.innerHTML = state.favorites
    .slice(0, 4)
    .map(
      (coffee) => `
        <li class="favorite-item" data-id="${coffee.id}" tabindex="0">
          <div class="favorite-thumb" style="background-image: url('${coffee.image}')"></div>
          <div>
            <strong>${coffee.name}</strong>
            <span>${coffee.cafe}</span>
          </div>
          <span class="favorite-price">$${coffee.price.toFixed(2)}</span>
        </li>
      `
    )
    .join('');

  favoritesList.querySelectorAll('.favorite-item').forEach((item) => {
    item.addEventListener('click', () => focusCoffeeById(Number(item.dataset.id)));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        focusCoffeeById(Number(item.dataset.id));
      }
    });
  });
}

function getAverageRating(id) {
  const ratings = state.ratings[id];
  if (!ratings) return 0;

  const values = Object.values(ratings);
  if (!values.length) return 0;

  return values.reduce((sum, value) => sum + Number(value), 0) / values.length;
}

function renderTriedList() {
  triedCount.textContent = String(state.tried.length);

  if (!state.tried.length) {
    triedList.innerHTML = `
      <li class="favorite-item">
        <div class="favorite-thumb" style="background: linear-gradient(135deg, #2a3d2d, #151d18);"></div>
        <div>
          <strong>No reviews yet</strong>
          <span>After trying a drink, rate it.</span>
        </div>
        <span class="favorite-price">--</span>
      </li>
    `;
    return;
  }

  triedList.innerHTML = state.tried
    .slice(0, 4)
    .map((coffee) => {
      const avgRating = getAverageRating(coffee.id);
      return `
        <li class="favorite-item" data-id="${coffee.id}" tabindex="0">
          <div class="favorite-thumb" style="background-image: url('${coffee.image}')"></div>
          <div>
            <strong>${coffee.name}</strong>
            <span>${coffee.cafe}</span>
          </div>
          <span class="favorite-price">${avgRating.toFixed(1)}★</span>
        </li>
      `;
    })
    .join('');

  triedList.querySelectorAll('.favorite-item').forEach((item) => {
    item.addEventListener('click', () => {
      focusCoffeeById(Number(item.dataset.id));
      state.pendingCoffee = state.allCoffees.find((coffee) => coffee.id === Number(item.dataset.id)) || null;
      openRatingModal();
    });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        focusCoffeeById(Number(item.dataset.id));
        state.pendingCoffee = state.allCoffees.find((coffee) => coffee.id === Number(item.dataset.id)) || null;
        openRatingModal();
      }
    });
  });
}

function renderCardMetrics() {
  const visible = getVisibleCoffees();
  if (!visible.length || !cardMetrics) {
    if (cardMetrics) {
      cardMetrics.innerHTML = '';
    }
    return;
  }

  const currentCoffee = visible[state.currentIndex] || visible[0];
  cardMetrics.innerHTML = `
    <div class="utility-stat">
      <span class="utility-label">Price</span>
      <strong class="utility-value utility-price">$${currentCoffee.price.toFixed(2)}</strong>
    </div>
    <div class="utility-stat">
      <span class="utility-label">Rating</span>
      <strong class="utility-value utility-rating">${currentCoffee.rating.toFixed(1)} ★</strong>
    </div>
    <div class="utility-stat">
      <span class="utility-label">Distance</span>
      <strong class="utility-value">${currentCoffee.distance}</strong>
    </div>
  `;
}

function syncCardsWithCurrentCoffee() {
  const visible = getVisibleCoffees();
  const currentCard = cardStage.querySelector('.coffee-card');
  const currentPickupButton = currentCard ? currentCard.querySelector('#pickupButton') : null;

  if (!visible.length) {
    if (currentCard) {
      const statusPill = currentCard.querySelector('.status-pill');
      if (statusPill) statusPill.textContent = 'Closed';
      statusPill?.classList.remove('open');
      statusPill?.classList.add('closed');
    }
    if (currentPickupButton) {
      currentPickupButton.textContent = 'Closed';
      currentPickupButton.disabled = true;
      currentPickupButton.classList.add('disabled');
    }
    renderCardMetrics();
    return;
  }

  const currentCoffee = visible[state.currentIndex] || visible[0];

  if (currentCard) {
    const statusPill = currentCard.querySelector('.status-pill');
    const secondaryPill = currentCard.querySelector('.status-pill-secondary');
    if (statusPill) {
      statusPill.textContent = currentCoffee.open ? 'Open now' : 'Closed';
      statusPill.classList.toggle('open', !!currentCoffee.open);
      statusPill.classList.toggle('closed', !currentCoffee.open);
    }
    if (secondaryPill) {
      secondaryPill.textContent = currentCoffee.open ? 'Pick-up available' : 'Pickup unavailable';
    }
  }

  if (currentPickupButton) {
    currentPickupButton.textContent = currentCoffee.open ? 'Pick up' : 'Closed';
    currentPickupButton.disabled = !currentCoffee.open;
    currentPickupButton.classList.toggle('disabled', !currentCoffee.open);
  }

  renderCardMetrics();
}

function renderCurrentCard() {
  const visible = getVisibleCoffees();

  if (!visible.length) {
    cardStage.innerHTML = `
      <div class="empty-state">
        <div>
          <h3>No coffee spots nearby.</h3>
          <p>Try another location or explore a wider radius to find more nearby cafés.</p>
        </div>
      </div>
    `;
    deckCounter.textContent = '0';
    deckTotal.textContent = '0';
    syncCardsWithCurrentCoffee();
    return;
  }

  const currentCoffee = visible[state.currentIndex] || visible[visible.length - 1];

  deckCounter.textContent = String(Math.min(state.currentIndex + 1, visible.length));
  deckTotal.textContent = String(visible.length);

  const card = document.createElement('article');
  card.className = 'coffee-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${currentCoffee.name} at ${currentCoffee.cafe}`);

  const pickupBadge = currentCoffee.open ? '<span class="status-pill status-pill-secondary">Pick-up available</span>' : '<span class="status-pill status-pill-secondary">Pickup unavailable</span>';

  card.innerHTML = `
    <div class="card-photo" style="background-image: url('${currentCoffee.image}')"></div>
    <div class="card-overlay"></div>
    <div class="card-content">
      <div class="card-meta-row">
        ${pickupBadge}
        <span class="status-pill ${currentCoffee.open ? 'open' : 'closed'}">
          ${currentCoffee.open ? 'Open now' : 'Closed'}
        </span>
      </div>

      <div class="card-info-panel">
        <h3>${currentCoffee.name}</h3>
        <p class="card-description">${currentCoffee.description}</p>
        <div class="card-subline">${currentCoffee.cafe} · ${currentCoffee.eta}</div>
        <div class="card-address">${currentCoffee.address}</div>
      </div>

      <div class="card-bottom-actions">
        <button class="action-button pass" id="passButton" aria-label="Skip coffee" type="button">
          <span>✕</span>
          Skip
        </button>
        <button class="action-button save" id="saveButton" aria-label="Save coffee to favorites" type="button">
          <span>♡</span>
          Love
        </button>
      </div>
    </div>
  `;

  cardStage.innerHTML = '';
  cardStage.appendChild(card);
  attachDragInteractions(card);

  passButton = card.querySelector('#passButton');
  saveButton = card.querySelector('#saveButton');

  if (passButton) {
    passButton.addEventListener('click', () => skipCurrentCoffee());
  }
  if (saveButton) {
    saveButton.addEventListener('click', () => saveCurrentCoffee());
  }

  const pickupInlineButton = card.querySelector('#pickupButton');
  if (pickupInlineButton) {
    pickupInlineButton.addEventListener('click', () => {
      placeOrderForPickup();
    });
  }
  syncCardsWithCurrentCoffee();
}

function attachDragInteractions(card) {
  let startX = 0;
  let deltaX = 0;

  const pointerDown = (event) => {
    startX = event.clientX;
    deltaX = 0;
    card.setPointerCapture(event.pointerId);
    card.addEventListener('pointermove', pointerMove);
    card.addEventListener('pointerup', pointerUp);
    card.addEventListener('pointerleave', pointerUp);
  };

  const pointerMove = (event) => {
    deltaX = event.clientX - startX;
    card.style.transform = `translate(${deltaX}px, 0px) rotate(${deltaX * 0.08}deg)`;
  };

  const pointerUp = (event) => {
    const moveDistance = Math.abs(deltaX);

    if (moveDistance > 110) {
      if (deltaX > 0) {
        saveCurrentCoffee();
      } else {
        skipCurrentCoffee();
      }
    } else {
      card.style.transform = 'translate(0, 0) rotate(0deg)';
    }

    card.removeEventListener('pointermove', pointerMove);
    card.removeEventListener('pointerup', pointerUp);
    card.removeEventListener('pointerleave', pointerUp);
    card.releasePointerCapture?.(event.pointerId);
  };

  card.addEventListener('pointerdown', pointerDown);
}

function skipCurrentCoffee() {
  const visible = getVisibleCoffees();
  if (!visible.length) return;

  const coffee = visible[state.currentIndex];
  state.swipeCount += 1;
  state.swipeHistory.push(coffee);
  if (state.swipeHistory.length > 12) {
    state.swipeHistory = state.swipeHistory.slice(-12);
  }
  updateTasteProfile();

  state.currentIndex = (state.currentIndex + 1) % visible.length;
  renderCurrentCard();
}

function saveCurrentCoffee() {
  const visible = getVisibleCoffees();
  if (!visible.length) return;

  const coffee = visible[state.currentIndex];

  if (!state.favorites.some((item) => item.id === coffee.id)) {
    state.favorites.unshift(coffee);
  }

  state.swipeCount += 1;
  state.swipeHistory.push(coffee);
  if (state.swipeHistory.length > 12) {
    state.swipeHistory = state.swipeHistory.slice(-12);
  }
  updateTasteProfile();

  state.currentIndex = (state.currentIndex + 1) % visible.length;
  renderCurrentCard();
  renderFavorites();
}

function markAsTried() {
  const visible = getVisibleCoffees();
  if (!visible.length) return;

  const coffee = visible[state.currentIndex];
  if (!state.tried.some((item) => item.id === coffee.id)) {
    state.tried.unshift(coffee);
  }

  state.pendingCoffee = coffee;
  openRatingModal();

  state.currentIndex = (state.currentIndex + 1) % visible.length;
  renderCurrentCard();
  renderTriedList();
}

function toggleTriedSection() {
  const isCollapsed = triedBody.classList.toggle('collapsed');
  triedToggle.setAttribute('aria-expanded', String(!isCollapsed));
  const arrow = triedToggle.querySelector('.toggle-arrow');
  if (arrow) {
    arrow.textContent = isCollapsed ? '▸' : '▾';
  }
}

function updatePickupSummary() {
  if (!state.selectedPickup) {
    pickupSummary.textContent = 'No order started yet.';
    return;
  }

  pickupSummary.innerHTML = `
    <strong>${state.selectedPickup.name}</strong><br>
    ${state.selectedPickup.cafe}<br>
    ${state.selectedPickup.address}<br>
    <span>$${state.selectedPickup.price.toFixed(2)} · Ready in ${state.selectedPickup.eta}</span>
  `;
}

function syncOrderButtons() {
  if (!placePickupOrder) return;
  const hasOrder = state.orderPlaced && !!state.selectedPickup;
  placePickupOrder.textContent = 'Place pickup order';
  if (cancelPickupButton) {
    cancelPickupButton.classList.toggle('hidden', !hasOrder);
  }
}

function placeOrderForPickup() {
  const currentCoffee = getVisibleCoffees()[state.currentIndex];
  if (!currentCoffee) return;

  if (state.orderPlaced) {
    state.selectedPickup = null;
    state.orderPlaced = false;
    updatePickupSummary();
    syncOrderButtons();
    return;
  }

  state.selectedPickup = currentCoffee;
  state.orderPlaced = true;
  updatePickupSummary();
  syncOrderButtons();
}

function cancelCurrentPickupOrder() {
  state.selectedPickup = null;
  state.orderPlaced = false;
  updatePickupSummary();
  syncOrderButtons();
}

function openRatingModal() {
  if (!state.pendingCoffee) return;
  setReviewHeader();
  ratingModal.classList.remove('hidden');
  ratingModal.setAttribute('aria-hidden', 'false');
  renderStarControls();
}

function setReviewHeader() {
  if (!state.pendingCoffee) return;
  const label = document.getElementById('ratingTitle');
  if (label) label.textContent = `How was ${state.pendingCoffee.cafe}?`;
}

function closeRating() {
  ratingModal.classList.add('hidden');
  ratingModal.setAttribute('aria-hidden', 'true');
  state.pendingCoffee = null;
  const title = document.getElementById('ratingTitle');
  if (title) title.textContent = 'How did it go?';
  document.querySelectorAll('.star-button').forEach((button) => {
    button.classList.remove('active');
  });
}

function renderStarControls() {
  const fields = ['shop', 'coffee', 'vibe'];
  fields.forEach((field) => {
    const container = document.querySelector(`.star-rating[data-field="${field}"]`);
    if (!container) return;

    const saved = state.pendingCoffee && state.ratings[state.pendingCoffee.id]
      ? state.ratings[state.pendingCoffee.id][field] || 0
      : 0;

    container.innerHTML = Array.from({ length: 5 }, (_, index) => {
      const value = index + 1;
      const className = value <= saved ? 'star-button active' : 'star-button';
      return `<button class="${className}" type="button" data-field="${field}" data-value="${value}" aria-label="${value} star">★</button>`;
    }).join('');

    container.querySelectorAll('.star-button').forEach((button) => {
      button.addEventListener('click', () => {
        const selectedValue = Number(button.dataset.value);
        const selectedButtons = container.querySelectorAll('.star-button');
        selectedButtons.forEach((starButton) => {
          starButton.classList.toggle('active', Number(starButton.dataset.value) <= selectedValue);
        });
      });
    });
  });
}

function submitReview() {
  if (!state.pendingCoffee) return;

  const ratingFields = ['shop', 'coffee', 'vibe'];
  const nextRating = {};

  ratingFields.forEach((field) => {
    const buttons = document.querySelectorAll(`.star-button[data-field="${field}"]`);
    const selected = [...buttons].filter((button) => button.classList.contains('active')).at(-1);
    nextRating[field] = selected ? Number(selected.dataset.value) : 0;
  });

  state.ratings[state.pendingCoffee.id] = nextRating;

  if (!state.tried.some((coffee) => coffee.id === state.pendingCoffee.id)) {
    state.tried.unshift(state.pendingCoffee);
  }

  closeRating();
  renderTriedList();
}

async function useCurrentLocation() {
  const defaultLocation = 'Baltimore, MD';

  if (!navigator.geolocation) {
    locationLabel.textContent = `${defaultLocation} • ${state.allCoffees.length} cafés nearby`;
    return;
  }

  locationLabel.textContent = 'Locating nearby cafés…';

  navigator.geolocation.getCurrentPosition(
    async ({ latitude, longitude }) => {
      try {
        const neighborhood = await reverseGeocode(latitude, longitude);
        const nearby = await fetchNearbyCoffeeShops(latitude, longitude);

        if (nearby.length) {
          state.allCoffees = nearby;
          locationLabel.textContent = `${neighborhood} • ${nearby.length} cafés nearby`;
        } else {
          state.allCoffees = fallbackCoffeeData;
          locationLabel.textContent = `${neighborhood} • ${fallbackCoffeeData.length} cafés nearby`;
        }

        renderCurrentCard();
        renderFavorites();
        renderTriedList();
        updatePickupSummary();
        syncCardsWithCurrentCoffee();
      } catch (error) {
        console.warn('Could not fetch live nearby coffee shops:', error);
        state.allCoffees = fallbackCoffeeData;
        locationLabel.textContent = `${defaultLocation} • ${state.allCoffees.length} cafés nearby`;
        renderCurrentCard();
      }
    },
    () => {
      state.allCoffees = fallbackCoffeeData;
      locationLabel.textContent = `${defaultLocation} • ${state.allCoffees.length} cafés nearby`;
      renderCurrentCard();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

if (passButton) {
  passButton.addEventListener('click', () => {
    skipCurrentCoffee();
  });
}

if (saveButton) {
  saveButton.addEventListener('click', () => {
    saveCurrentCoffee();
  });
}

if (pickupButton) {
  pickupButton.addEventListener('click', () => {
    placeOrderForPickup();
  });
}

rateLink.addEventListener('click', (event) => {
  event.preventDefault();
  const currentCoffee = getVisibleCoffees()[state.currentIndex];
  if (!currentCoffee) return;
  state.pendingCoffee = currentCoffee;
  openRatingModal();
});

triedToggle.addEventListener('click', toggleTriedSection);

useLocationButton.addEventListener('click', () => {
  useCurrentLocation();
});

placePickupOrder.addEventListener('click', () => {
  if (!state.selectedPickup) {
    const visible = getVisibleCoffees();
    if (!visible.length) return;
    state.selectedPickup = visible[state.currentIndex];
  }

  placeOrderForPickup();
});

if (cancelPickupButton) {
  cancelPickupButton.addEventListener('click', () => {
    cancelCurrentPickupOrder();
  });
}

closeRatingModal.addEventListener('click', () => {
  closeRating();
});

submitRating.addEventListener('click', () => {
  submitReview();
});

ratingModal.addEventListener('click', (event) => {
  if (event.target === ratingModal) {
    closeRating();
  }
});

loadCoffeeData();
useCurrentLocation();

