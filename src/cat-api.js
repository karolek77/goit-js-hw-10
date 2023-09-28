module.exports = { fetchBreeds, fetchCatByBreed };

const apiKey =
  'live_8nXLD69ky6MH51nGc5mvPbjfOi98w4qyCcfPOoIFwqHLRKTTVCD9ryS7DrODa9D1';
const breedSelect = document.querySelector('.breed-select');
const loadInfo = document.querySelector('.loader');
const catInfoElement = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

function fetchBreeds() {
  loadInfo.classList.remove('loader');
  //breedSelect.style.display = 'none';
  breedSelect.setAttribute('hidden', true);
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve cat brees data.');
      }
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
      errorElement.style.display = 'block';
      console.log('There was a problem with the fetch operation:', error);
      breedSelect.style.display = 'none';
    })
    .finally(() => {
      loadInfo.classList.add('loader');
      //breedSelect.style.display = 'block';
      breedSelect.removeAttribute('hidden');
    });
}

function fetchCatByBreed(breedId) {
  loadInfo.classList.remove('loader');
  breedSelect.setAttribute('disabled', true);
  catInfoElement.style.display = 'none';
  //catInfoElement.setAttribute('hidden', true);
  return (
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to retrieve cat data.');
        }
        return response.json();
      })
      //.then(data => {
      //  return data;
      //})
      .catch(error => {
        //errorElement.style.display = 'block';
        //breedSelect.style.display = 'none';
        console.error('Error while fetching cat data:', error);
      })
      .finally(() => {
        loadInfo.classList.add('loader');
        breedSelect.removeAttribute('disabled');
        catInfoElement.style.display = 'flex';
        //catInfoElement.removeAttribute('hidden');
      })
  );
}
