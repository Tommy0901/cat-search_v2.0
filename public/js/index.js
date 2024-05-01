import { fetchCats, fetchBreeds } from './api.js';
import {
  addCloseDropdownListener,
  addDropDownListener,
  clearImages,
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
}

function handleBreedOptionChange(e) {
  const changedOption = e.target;
  if (changedOption.checked) {
    selectedOptions.push(changedOption.value);
  } else {
    selectedOptions = selectedOptions.filter(
      (item) => item !== changedOption.value,
    );
  }
  clearImages();
  loadCats(selectedOptions, limit, order, page);
}

async function loadBreedOptions() {
  const breeds = await fetchBreeds();
  renderOptions(breeds, handleBreedOptionChange);
}

function addListeners() {
  addDropDownListener();
  addCloseDropdownListener();
}

document.addEventListener('DOMContentLoaded', async () => {
  loadBreedOptions();
  await loadCats(selectedOptions, limit, order, page);

  addListeners();
});
