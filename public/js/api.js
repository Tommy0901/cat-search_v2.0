export async function fetchCats(breedIds = [], limit, order, page) {
  const url = new URL('http://localhost:3000/catList');

  url.searchParams.append('has_breeds', 1);
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

export async function fetchBreeds() {
  try {
    return (await fetch('http://localhost:3000/breedList')).json();
  } catch (err) {
    console.error('Oops! Something messed up...', err);
  }
}
