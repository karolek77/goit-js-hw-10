module.exports = { fetchBreeds, fetchCatByBreed };

const apiKey =
  'live_8nXLD69ky6MH51nGc5mvPbjfOi98w4qyCcfPOoIFwqHLRKTTVCD9ryS7DrODa9D1';

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve cat breeds data.');
      }
      return response.json();
    })
    .catch(error => {
      console.log('There was a problem with the fetch operation:', error);
    });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve cat data.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error while fetching cat data:', error);
    });
}
