// need to fetch from the backend API to get the data
// can hopefully use innerHTML to generate most of the tags, with ${} to insert the different bits

function generateCard() {
  const name = 'testName';
  const img_url =
    'https://www.rd.com/wp-content/uploads/2019/11/cat-10-e1573844975155-1024x692.jpg';
  const description = 'testDescript';
  const types = ['exampleTypeOne', 'exampleTypeTwo'];

  let typeList = '';
  for (i = 0; i < types.length; i++) {
    typeList += types[i] + ' ';
  }
  //const response = await fetch('#'); // fetches the data from the API
  //const data = await response.json(); // JSONS the res into data
  const pokemonCard = document.createElement('div');
  pokemonCard.innerHTML = `
        <div class="pokemon-card">
            <p class="card-title">${name}</p>
            <div class="pokemon-picture"><img src="${img_url} /></div>
            <div class="about-text-area">
                <p class="label">Description:</p class="label">
                <p class="description">${description}</p>
                <p class="label">Types:</p>
                <p class="types">${typeList}</p>
            </div>
        </div>
    `;
  return pokemonCard;
}

//function to put the card on the page
function appendCard() {
  const newCard = generateCard(); //runs generate card function
  const resultsArea = document.querySelector('.results-area');
  resultsArea.appendChild(newCard); // appends the new card generated above to the resultsArea div on the page
}

const testButton = document
  .querySelector('#test-button')
  .addEventListener('click', appendCard);
