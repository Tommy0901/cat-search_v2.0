import {
  createBreedOption,
  createCard,
  createDrawerStatsItem,
  createTempItem,
} from './createElement.js';

export function renderCats(catList) {
  const columns = [
    document.getElementById('col1'),
    document.getElementById('col2'),
    document.getElementById('col3'),
  ];
  for (let i = 0; i < catList.length; i++) {
    const col = i % columns.length;
    const item = catList[i];
    const card = createCard(item);
    card.addEventListener('click', (e) => {
      setDrawerContent(item);
      openDrawer();
    });
    columns[col].appendChild(card);
  }
}

export function setDrawerContent(item) {
  const drawerImg = document.getElementById('drawer-image');
  drawerImg.src = item.url;
  const breedName = document.getElementById('drawer-breed-name');
  breedName.innerHTML = item.name;
  const origin = document.getElementById('drawer-origin-text');
  origin.innerHTML = item.origin;
  const weight = document.getElementById('drawer-weight');
  weight.innerHTML = item.weight;
  const lifeSpan = document.getElementById('drawer-lifespan');
  lifeSpan.innerHTML = item.lifeSpan;
  const temperament = document.getElementById('temperament');
  temperament.innerHTML = '';
  const temperamentList = item.temperamentList;
  for (const temp of temperamentList) {
    const tempItem = createTempItem(temp);
    temperament.appendChild(tempItem);
  }

  const scoreListings = [
    {
      key: 'intelligence',
      displayName: '智力',
    },
    {
      key: 'affection_level',
      displayName: '親密度',
    },
    {
      key: 'energy_level',
      displayName: '活力',
    },
    {
      key: 'child_friendly',
      displayName: '兒童友善',
    },
    {
      key: 'dog_friendly',
      displayName: '親近狗狗',
    },
    {
      key: 'indoor',
      displayName: '喜歡在家',
    },
    {
      key: 'health_issues',
      displayName: '遺傳疾病',
    },
    {
      key: 'shedding_level',
      displayName: '掉毛量',
    },
    {
      key: 'social_needs',
      displayName: '社交需求',
    },
    {
      key: 'stranger_friendly',
      displayName: '陌生人友善',
    },
    {
      key: 'rare',
      displayName: '稀有度',
    },
  ];

  const drawerStats = document.getElementById('drawer-stats');
  drawerStats.innerHTML = '';

  for (const { key, displayName } of scoreListings) {
    const statsItem = createDrawerStatsItem(displayName, item[key]);
    drawerStats.appendChild(statsItem);
  }
}

export function openDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.classList.add('open');
}

export function addDropDownListener() {
  const dropdownButton = document.getElementById('dropdown-button');
  const options = document.getElementById('options');

  // Toggle dropdown
  dropdownButton.addEventListener('click', () => {
    options.classList.toggle('hidden');
  });
}

export function addCloseDropdownListener() {
  document.addEventListener('click', (e) => {
    const dropdownButton = document.getElementById('dropdown-button');
    const options = document.getElementById('options');
    const isClickedInsideDropdownButton = dropdownButton.contains(e.target);
    const isClickedInsideOptions = options.contains(e.target);

    if (!isClickedInsideDropdownButton && !isClickedInsideOptions) {
      options.classList.add('hidden');
    }
  });
}

export function renderOptions(breeds, handleBreedOptionChange) {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  breeds.forEach((breed) => {
    const option = createBreedOption(breed, handleBreedOptionChange);
    optionsContainer.appendChild(option);
  });
}

export function clearImages() {
  const columns = [
    document.getElementById('col1'),
    document.getElementById('col2'),
    document.getElementById('col3'),
  ];

  columns.forEach((column) => (column.innerHTML = ''));
}

export function addSelectOrderListener(handler) {
  const orderSelect = document.getElementById('order-select');
  orderSelect.addEventListener('change', handler);
}

export function addLoadMoreButtonListener(handler) {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', handler);
}

export function disableLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.disabled = true;
}

export function enableLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.disabled = false;
}

export function addCloseDrawerListener() {
  document.addEventListener('click', (e) => {
    const drawer = document.getElementById('drawer');
    const isClickedInsideCard = e.target.closest('.card');
    const isClickedInsideDrawer = drawer.contains(e.target);

    if (!isClickedInsideCard && !isClickedInsideDrawer) {
      drawer.classList.remove('open');
    }
  });
}
