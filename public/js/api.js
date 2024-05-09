const API_BASE_URL = 'https://cat-search.vercel.app';

export async function fetchCats(limit, order, page, breedIds = []) {
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

export async function fetchBreeds() {
  try {
    return (await fetch(`${API_BASE_URL}/breedList`)).json();
  } catch (err) {
    console.error('Oops! Something messed up...', err);
  }
}
