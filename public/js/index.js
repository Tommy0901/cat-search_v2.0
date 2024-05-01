import { fetchCats } from './api.js';
import { renderCats } from './dom.js';

let order = 'DESC';
let page = 1;
let selectedOptions = [];
const catList = [];

async function loadCats(breedIds = [], limit, order, page) {
  // 從api抓貓的資料
  const list = await fetchCats(breedIds, limit, order, page);
  catList.push(...list);

  renderCats(catList);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadCats(selectedOptions, 12, order, page);
});
