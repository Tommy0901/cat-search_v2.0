import { fetchCats, fetchBreeds } from './api.js';
import {
  addCloseDrawerListener,
  addCloseDropdownListener,
  addDropDownListener,
  addLoadMoreButtonListener,
  addSelectOrderListener,
  clearImages,
  disableLoadMoreButton,
  enableLoadMoreButton,
  renderCats,
  renderOptions,
} from './dom.js';

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
