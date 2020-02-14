// need to fetch from the backend API to get the data
// can hopefully use innerHTML to generate most of the tags, with ${} to insert the different name and description from what the API returns
// for types, because some have one and some have multiple, will need to use the JS to create li elements and then append them to the type ul

function generateCard() {
    
    const response = await fetch('#'); // fetches the data from the API
    const data = await response.json(); // JSONS the res into data
    const pokemonCard = document.createElement('div').innerHTML = `
        <div class="pokemon-card">
            <p class="card-title">${name}</p>
            <div class="pokemon-picture"><img src="${img} />></div>
            <div class="about-text-area">
                <p class="label">Description:</p class="label">
                <p class="description">${descrip}</p>
                <p class="label">Types:</p>
                <ul class="types">
                </ul>
            </div>
        </div>
    `; // creates the card itself with the easy bits filled in w/ ${}s
    return 
}

//function to create the type list 
function populateTypes(){
    const typeList = ["water", "ground"]; // SAMPLE TEXT
    for (i = 0; i<typeList.length; i++) {
        document.body
    }
}

//function to put the card on the page
function appendCard() {
    const newCard = generateCard();
    const resultsArea = document.querySelector('.resultsArea');

}