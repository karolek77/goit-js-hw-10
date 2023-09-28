import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const errorElement = document.querySelector('.error');

//const loadInfo = document.querySelector('.loader');
//const apiKey =
//'live_8nXLD69ky6MH51nGc5mvPbjfOi98w4qyCcfPOoIFwqHLRKTTVCD9ryS7DrODa9D1';

//breedSelect.addEventListener('change', function () {});
document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds().then(breedOptions => {
    breedOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.name;
      breedSelect.appendChild(optionElement);
    });
  });
});

breedSelect.addEventListener('change', function () {
  const selectedBreedId = breedSelect.value;
  errorElement.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      if (catData.length > 0) {
        const cat = catData[0].breeds[0];
        const catImg = catData[0];
        console.log(catData);
        const catHtml = `
            <img class="cat-img" src=${catImg.url} alt="Cat">
            <div class="cat-text">
                <h2 class="cat-name">${cat.name}</h2>
                <p class="cat-description">${cat.description}</p>    
                <p class="cat-temp"><span class="text-bold">Temperament:</span>${cat.temperament}</p>
            </div>
       
        `;
        const catInfoElement = document.querySelector('.cat-info');
        catInfoElement.innerHTML = catHtml;
      } else {
        throw new Error('Brak danych o kocie.');
      }
    })
    .catch(error => {
      errorElement.style.display = 'block';
      console.error('Błąd podczas pobierania danych o kocie:', error);
    });
});
