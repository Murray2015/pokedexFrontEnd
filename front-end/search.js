// Get the search string
// query the database
// display the answer
const formSubmit = document.querySelector("#submit");
formSubmit.addEventListener("click", getSearchedPokemon);

function getSearchedPokemon() {
  const pokeSearchId = document.querySelector("#pokeSearchTerm").value;
  console.log(pokeSearchId);
  fetch(`http://localhost:5000/pokemon/${pokeSearchId}`, {
    method: "GET"
  }).then(res => res.json()).then(data => console.log(data));
}