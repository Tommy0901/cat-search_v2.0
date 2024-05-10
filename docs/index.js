let limit = 12;
let order = 'DESC';
let page = 1;
let selectedOptions = [];

async function loadCats(limit, order, page, breedIds = []) {
  // 從api抓貓的資料
  const list = await fetchCats(limit, order, page, breedIds);
  // catList.push(...list);

  renderCats(list);
  if (list.length < limit) {
    // no more cats
    disableLoadMoreButton();
    return false;
  }

  return true;
}

async function handleBreedOptionChange(e) {
  const changedOption = e.target;
  if (changedOption.checked) {
    selectedOptions.push(changedOption.value);
  } else {
    selectedOptions = selectedOptions.filter(
      (item) => item !== changedOption.value,
    );
  }
  clearImages();
  enableLoadMoreButton();
  page = 1;
  const hasNextPage = await loadCats(limit, order, page, selectedOptions);
  if (hasNextPage) {
    page++;
  }
}

async function loadBreedOptions() {
  const breeds = await fetchBreeds();
  renderOptions(breeds, handleBreedOptionChange);
}

function addListeners() {
  addDropDownListener();
  addCloseDrawerListener();
  addCloseDropdownListener();
  addSelectOrderListener(async (e) => {
    order = e.target.value;
    clearImages();
    enableLoadMoreButton();
    page = 1;
    const hasNextPage = await loadCats(limit, order, page, selectedOptions);
    if (hasNextPage) {
      page++;
    }
  });

  addLoadMoreButtonListener(async () => {
    const hasNextPage = await loadCats(limit, order, page, selectedOptions);
    if (hasNextPage) {
      page++;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  loadBreedOptions();
  const hasNextPage = await loadCats(limit, order, page, selectedOptions);
  if (hasNextPage) {
    page++;
  }
  addListeners();
});

const API_BASE_URL = 'https://cat-search.vercel.app';

async function fetchCats(limit, order, page, breedIds = []) {
  const url = new URL(`${API_BASE_URL}/catList`);

  // url.searchParams.append('has_breeds', 1);
  url.searchParams.append('limit', limit);
  url.searchParams.append('order', order);
  url.searchParams.append('page', page);

  if (breedIds.length > 0) {
    url.searchParams.append('breed_ids', breedIds.join(','));
  }

  try {
    return (await fetch(url)).json();
  } catch (err) {
    console.error("What's going on...", err);
  }
}

async function fetchBreeds() {
  try {
    // console.log(await (await fetch('https://cat-search.vercel.app')).json());
    return (await fetch(`${API_BASE_URL}/breedList`)).json();
  } catch (err) {
    console.error('Oops! Something messed up...', err);
  }
}

function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  // create image
  const img = document.createElement('img');
  img.src = item.url;
  img.className = 'card__img';
  // create breeds text
  const breeds = document.createElement('p');
  breeds.innerHTML = item.name;

  card.appendChild(img);
  card.appendChild(breeds);
  return card;
}

function createBreedOption(breed, handleBreedOptionChange) {
  const option = document.createElement('div');
  option.classList.add('multi-select-dropdown__options__option');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = breed.id;
  checkbox.addEventListener('change', handleBreedOptionChange);

  const label = document.createElement('label');
  label.classList.add('multi-select-dropdown__label');
  label.innerHTML = breed.name;

  const br = document.createElement('br');
  option.appendChild(checkbox);
  option.appendChild(label);
  option.appendChild(br);
  return option;
}

function createTempItem(temperament) {
  const tempItem = document.createElement('span');
  tempItem.className = 'drawer__personality__tags__tag';
  tempItem.innerHTML = temperament;
  return tempItem;
}

function createDrawerStatsItem(displayName, score) {
  const statsItem = document.createElement('div');
  statsItem.className = 'drawer__stats__item';
  const itemTitle = document.createElement('span');
  itemTitle.className = 'drawer__stats__item__title';
  itemTitle.innerHTML = `${displayName}:`;
  const bar = document.createElement('div');
  bar.className = 'drawer__stats__item__bar';
  const fill = document.createElement('div');
  fill.className = 'drawer__stats__item__bar__fill';
  fill.style.width = `${score * 20}%`;
  bar.appendChild(fill);
  statsItem.appendChild(itemTitle);
  statsItem.appendChild(bar);

  return statsItem;
}

function renderCats(catList) {
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

function setDrawerContent(item) {
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

function openDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.classList.add('open');
}

function addDropDownListener() {
  const dropdownButton = document.getElementById('dropdown-button');
  const options = document.getElementById('options');

  // Toggle dropdown
  dropdownButton.addEventListener('click', () => {
    options.classList.toggle('hidden');
  });
}

function addCloseDropdownListener() {
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

function renderOptions(breeds, handleBreedOptionChange) {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  breeds.forEach((breed) => {
    const option = createBreedOption(breed, handleBreedOptionChange);
    optionsContainer.appendChild(option);
  });
}

function clearImages() {
  const columns = [
    document.getElementById('col1'),
    document.getElementById('col2'),
    document.getElementById('col3'),
  ];

  columns.forEach((column) => (column.innerHTML = ''));
}

function addSelectOrderListener(handler) {
  const orderSelect = document.getElementById('order-select');
  orderSelect.addEventListener('change', handler);
}

function addLoadMoreButtonListener(handler) {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', handler);
}

function disableLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.disabled = true;
}

function enableLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.disabled = false;
}

function addCloseDrawerListener() {
  document.addEventListener('click', (e) => {
    const drawer = document.getElementById('drawer');
    const isClickedInsideCard = e.target.closest('.card');
    const isClickedInsideDrawer = drawer.contains(e.target);

    if (!isClickedInsideCard && !isClickedInsideDrawer) {
      drawer.classList.remove('open');
    }
  });
}
