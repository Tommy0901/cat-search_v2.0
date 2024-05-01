import { createBreedOption, createCard } from './createElement.js';

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
