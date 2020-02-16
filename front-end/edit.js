// add button listener 
const editBtn = document.querySelector("#edit-poke-button");
editBtn.addEventListener("click", sendNewPokemon);

// use fetch for POST request 
function makeNewPokemon() {
    const formPokeId = document.getElementById("form-poke-id").value;
    const formPokeName = document.getElementById("form-poke-name").value;
    const formPokeDesc = document.getElementById("form-poke-desc").value;
    const formPokeUrl = document.getElementById("form-poke-url").value;
    const formPokeTypes = document.getElementById("form-poke-types").value;
    const formPokeEvos = document.getElementById("form-poke-evos").value;
    let poke = {
        "pkdx_id": formPokeId,
        "name": formPokeName,
        "description": formPokeDesc,
        "img_url": formPokeUrl,
        "types": [formPokeTypes],
        "evolutions": [formPokeEvos]
    }
    Object.keys(poke).forEach((key) => (poke[key] == "") && delete poke[key]);
    return poke;
}

function sendNewPokemon() {
    const poke = makeNewPokemon();
    fetch(`http://localhost:5000/pokemon/${poke.pkdx_id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(poke)
    }).then(res => res.json()).then(data => console.log(data));
}

// display new pokemon on card 