import axios from 'axios';

export async function fetchCats(limit, order, page, breedIds = []) {
  const params = {
    api_key: process.env.API_KEY,
    has_breeds: 1,
    limit,
    order,
    page,
  };

  if (breedIds.length > 0) {
    params['breed_ids'] = breedIds.join(',');
  }

  try {
    return (
      await axios.get(`${process.env.API_URL}/V1/images/search`, { params })
    ).data;
  } catch (err) {
    console.error("What's going on...", err);
  }
}

export async function fetchBreeds() {
  try {
    return (await axios.get(`${process.env.API_URL}/V1/breeds`)).data;
  } catch (err) {
    console.error('Something bad happend...', err);
  }
}
