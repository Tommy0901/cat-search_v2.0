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
const catList = [];

async function loadCats(breedIds = [], limit, order, page) {
  // 從api抓貓的資料
  const list = await fetchCats(breedIds, limit, order, page);
  catList.push(...list);

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
  const hasNextPage = await loadCats(selectedOptions, limit, order, page);
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
    const hasNextPage = await loadCats(selectedOptions, limit, order, page);
    if (hasNextPage) {
      page++;
    }
  });

  addLoadMoreButtonListener(async () => {
    const hasNextPage = await loadCats(selectedOptions, limit, order, page);
    if (hasNextPage) {
      page++;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  loadBreedOptions();
  const hasNextPage = await loadCats(selectedOptions, limit, order, page);
  if (hasNextPage) {
    page++;
  }
  addListeners();
});
