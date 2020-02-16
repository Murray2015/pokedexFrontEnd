const {
  query
} = require('../db/index.js');

async function getPokemon() {
  const data = await query(`
  SELECT * FROM pokemon;
  `);
  return data.rows;
}

async function getPokemonById(id) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE pkdx_id = $1`, [id]);
  return pokemon.rows[0];
}

async function getPokemonByName(name) {
  const pokemon = await query(`SELECT * FROM pokemon WHERE name ILIKE $1`, [
    name
  ]);
  return pokemon.rows[0];
}

async function searchPokemonByName(search) {
  const pokemon = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    // ILIKE instead of LIKE ignores the case
    // the %s are a wildcard
    [search]
  );
  return pokemon.rows;
}

async function savePokemon(pokemon) {
  const {
    pkdx_id,
    name,
    description,
    img_url,
    types,
    evolutions
  } = pokemon; // destructuring the values that the query is going to grab and work with from the request's body; it now expects a pokemon object with these six keys/values
  const newPokemon = await query(
    `INSERT INTO pokemon (pkdx_id, name, description, img_url, types, evolutions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return newPokemon.rows[0];
}

async function deletePokemonById(id) {
  const res = await query(
    `DELETE FROM pokemon WHERE pkdx_id = $1 RETURNING name`,
    [id]
  );
  if (res.rowCount > 0) {
    return res.rows[0].name;
  } else {
    return null;
  }
}

async function deletePokemonByName(name) {
  const pokemon = await query(`DELETE FROM pokemon WHERE name = $1`, [name]);
  return pokemon.rows;
}

async function updatePokemonById(id, body) {
  const {
    name,
    description,
    img_url,
    types,
    evolutions
  } = body;
  const updatedPokemon = await query(
    `UPDATE pokemon SET name = $2, description = $3, img_url = $4, types = $5, evolutions = $6 WHERE pkdx_id = $1 RETURNING name`,
    [id, name, description, img_url, types, evolutions]
  );
  return updatedPokemon.rows[0];
}

async function patchPokemon(body, id) {
  const {
    pkdx_id,
    name,
    description,
    img_url,
    types,
    evolutions
  } = body;
  console.log(id, name, description, img_url, types, evolutions)
  const res = await query(
    `UPDATE pokemon 
    SET pkdx_id = COALESCE($1, pkdx_id),
    name = COALESCE($2, name),
    description = COALESCE($3, description),
    img_url = COALESCE($4, img_url),
    types = COALESCE($5, types),
    evolutions = COALESCE($6, evolutions) 
    WHERE id = $1 RETURNING pkdx_id`,
    [id, name, description, img_url, types, evolutions]
  );
  return res.rows[0];
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  savePokemon,
  deletePokemonById,
  deletePokemonByName,
  updatePokemonById,
  patchPokemon
};

//---------------------OLD WAY:--------------------------------------

// const fs = require('fs');
// const { promisify } = require('util');

// const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

// async function getPokemon() {
//   const data = await readFile('pokedex.json');
//   const pokemon = JSON.parse(data);
//   return pokemon;
// }

// async function getPokemonById(id) {
//   const pokemon = await getPokemon();
//   return pokemon.find(
//     item => item.pkdx_id == id // returns the found pokemon
//     // == instead of === in the find method so that it coerces the id to a number (it starts as a string in the JSON)
//   );
// }

// async function getPokemonByName(name) {
//   const pokemon = await getPokemon();
//   return pokemon.find(
//     item => item.name.toLowerCase() == name.toLowerCase() // returns the found pokemon by name (both made lowercase so they can compare)
//   );
// }

// // Make search function for ?search= query
// // similar to getPokemonByName, but will search inside of the name of each object, not searching for the whole name
// // export that function to the router file and call it inside the app.get

// async function searchPokemonByName(search) {
//   const pokemon = await getPokemon();
//   return pokemon.filter(item =>
//     item.name.toLowerCase().includes(name.toLowerCase())
//   );
//   }

// async function savePokemon(pokemon) {
//   //read file, write into JS, add our new object, and put it back into the file as JSON again
//   const pokemonArray = await getPokemon();
//   const newPokemonArray = [...pokemonArray, pokemon]; //use spread operator instead of .push bc this makes a new array and doesn't mutate the original one
//   await writeFile('./pokedex.json', JSON.stringify(newPokemonArray));
// }

// module.exports = {
//   getPokemon,
//   getPokemonById,
//   getPokemonByName,
//   searchPokemonByName,
//   savePokemon
// };