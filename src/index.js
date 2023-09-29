import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const errorElement = document.querySelector('.error');

const loadInfo = document.querySelector('.loader');

const slimSelect = new SlimSelect('.breed-select');

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
                <p class="cat-temp"><span class="text-bold">Temperament: </span>${cat.temperament}</p>
            </div>
       
        `;
        const catInfoElement = document.querySelector('.cat-info');
        catInfoElement.innerHTML = catHtml;
      } else {
        throw new Error('No cat information found');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!' + error,
        {
          position: 'center-top',
          timeout: 1500,
        }
      );
      console.error('Error while fetching cat data', error);
    });
});
