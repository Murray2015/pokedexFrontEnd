function generateCard() {
  //Test data below (will delete once actual data is fetched from API)
  const name = 'testName';
  const img_url = '../images/sample-img-for-test.jpg';
  const description = 'testDescript';
  const types = ['exampleTypeOne', 'exampleTypeTwo'];

  let typeList = '';
  for (i = 0; i < types.length; i++) {
    typeList += types[i] + ' ';
  }
  //const response = await fetch('#'); // fetches the data from the API - TBC!
  //const data = await response.json(); // JSONS the res into data - TBC!
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.innerHTML = `
            <p class="card-title">${name}</p>
            <img class="pokemon-picture" src='${img_url}' alt='pokemon image' />
            <div class="about-text-area">
                <p class="label">Description:</p class="label">
                <p class="description">${description}</p>
                <p class="label">Types:</p>
                <p class="types">${typeList}</p>
            </div>
    `;
  return pokemonCard;
}

//function to put the card on the page
function appendCard() {
  const newCard = generateCard();
  const resultsArea = document.querySelector('.results-area');
  resultsArea.appendChild(newCard);
}

const testButton = document
  .querySelector('#test-button')
  .addEventListener('click', appendCard);
