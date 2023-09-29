module.exports = { fetchBreeds, fetchCatByBreed };
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const apiKey =
  'live_8nXLD69ky6MH51nGc5mvPbjfOi98w4qyCcfPOoIFwqHLRKTTVCD9ryS7DrODa9D1';
const breedSelect = document.querySelector('.breed-select');
const loadInfo = document.querySelector('.loader-container');
const catInfoElement = document.querySelector('.cat-info');

function fetchBreeds() {
  loadInfo.classList.remove('loader-container');
  breedSelect.style.display = 'none';

  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve cat breeds data.');
      }

      breedSelect.style.display = 'block';
      return response.json();
    })
    .then(data => {
      const breedOptions = data.map(breed => ({
        value: breed.id,
        name: breed.name,
      }));

      return breedOptions;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!' + error,
        {
          position: 'center-top',
          timeout: 1500,
        }
      );
      console.log('There was a problem with the fetch operation:', error);
    })
    .finally(() => {
      loadInfo.classList.add('loader-container');
    });
}

new SlimSelect({
  select: 'single',
});

function fetchCatByBreed(breedId) {
  loadInfo.classList.remove('loader-container');
  breedSelect.setAttribute('disabled', true);
  catInfoElement.style.display = 'none';

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
    })
    .finally(() => {
      loadInfo.classList.add('loader-container');
      breedSelect.removeAttribute('disabled');
      catInfoElement.style.display = 'flex';
    });
}
