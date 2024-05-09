export function createCard(item) {
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

export function createBreedOption(breed, handleBreedOptionChange) {
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

export function createTempItem(temperament) {
  const tempItem = document.createElement('span');
  tempItem.className = 'drawer__personality__tags__tag';
  tempItem.innerHTML = temperament;
  return tempItem;
}

export function createDrawerStatsItem(displayName, score) {
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
