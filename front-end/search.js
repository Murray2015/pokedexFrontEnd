// Get the search string
// query the database
// display the answer
const formSubmit = document.querySelector("#submit");
formSubmit.addEventListener("click", getSearchedPokemon);

function getSearchedPokemon() {
  const pokeSearchName = document.querySelector("#pokeSearchTerm").value;
  console.log(pokeSearchName);
}

// fetch("http://localhost:3000/pokemon", {
//   method: "GET"
// });
