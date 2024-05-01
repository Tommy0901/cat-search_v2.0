import { createCard } from './createElement.js';

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
    columns[col].appendChild(card);
  }
}
