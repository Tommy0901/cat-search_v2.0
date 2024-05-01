export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  // create image
  const img = document.createElement('img');
  img.src = item.url;
  img.className = 'card__img';
  // create breeds text
  const breeds = document.createElement('p');
  breeds.innerHTML = item.breeds.map((breed) => breed.name).join(', ');

  card.appendChild(img);
  card.appendChild(breeds);
  return card;
}
