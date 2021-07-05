// Get the search string
// query the database
// display the answer
const formSubmit = document.querySelector('#submit');
formSubmit.addEventListener('click', getSearchedPokemon);

async function getSearchedPokemon() {
  const pokeSearchId = document.querySelector('#pokeSearchTerm').value;
  console.log(pokeSearchId);
  const response = await fetch(
    `http://localhost:5000/pokemon/${pokeSearchId}`,
    {
      method: 'GET'
    }
  );
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data);
  // });
  // NOTE: I've commented out the bit above because I've added in async/await, but I haven't deleted them in case we need to go back to this way
  const searchResultArray = response.json();
  console.log(searchResultArray);
  searchResultArray.forEach(item => generateCard(item)); // goes thru the array of returned searches that match the search string and does the generateCard function on each
}

function generateCard(item) {
  const { name, img_url, description, types } = item; //each item should be an array; this destructures all the bits out that need to go into the card

  let typeList = '';
  for (i = 0; i < types.length; i++) {
    typeList += types[i] + ' '; //this should iterate through the types array and make the list which is then used when generating the card below

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
    appendCard(pokemonCard);
  }
}

//function to put the card on the page
function appendCard(pokemonCard) {
  const mainSearchArea = document.querySelector('#search-main');
  mainSearchArea.removeProperty('background-image'); //I've used the ID of the main portion of the page with the image of the pokedex; this should hopefuly take off the picture of the pokedex and leave it as a clean slate where the cards can be appended
  mainSearchArea.appendChild(pokemonCard);
}
