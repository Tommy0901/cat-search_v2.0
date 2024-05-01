const apiKey =
  'live_lRc93veAIcN7GuJa1WuY4UjeQ6eNK2omdkK85AHOcV8p2W8xJJuY2vGGstUtg6Ox';

export async function fetchCats(breedIds = [], limit, order, page) {
  const url = new URL('https://api.thecatapi.com/v1/images/search');

  url.searchParams.append('api_key', apiKey);
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
  return (await fetch('https://api.thecatapi.com/v1/breeds')).json();
}
