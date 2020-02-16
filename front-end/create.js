// add button listener 
const createBtn = document.querySelector("#create-poke-button");
createBtn.addEventListener("click", sendNewPokemon);

// use fetch for POST request 
function makeNewPokemon() {
    const formPokeId = document.getElementById("form-poke-id").value;
    const formPokeName = document.getElementById("form-poke-name").value;
    const formPokeDesc = document.getElementById("form-poke-desc").value;
    const formPokeUrl = document.getElementById("form-poke-url").value;
    const formPokeTypes = document.getElementById("form-poke-types").value;
    const formPokeEvos = document.getElementById("form-poke-evos").value;
    return {
        "pkdx_id": formPokeId,
        "name": formPokeName,
        "description": formPokeDesc,
        "img_url": formPokeUrl,
        "types": [formPokeTypes],
        "evolutions": [formPokeEvos]
    }
}

function sendNewPokemon() {
    const pokeJson = JSON.stringify(makeNewPokemon());
    // const pokeJson = makeNewPokemon();
    fetch(`http://localhost:5000/pokemon/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: pokeJson
    }).then(res => res.json()).then(data => console.log(data));
}

// display new pokemon on card 