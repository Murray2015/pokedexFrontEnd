const { query } = require('../db/index.js');

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
    [name]
  );
  return pokemon.rows;
}

async function savePokemon(pokemon) {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
  const newPokemon = await query(
    `INSERT INTO pokemon (pkdx_id, name, description, img_url, types, evolutions) VALUES ($1, $2, $3, $4, $5, $6)`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return newPokemon;
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
  const { name, description, img_url, types, evolutions } = body;
  const updatedPokemon = await query(
    `UPDATE pokemon SET name = $2, description = $3, img_url = $4, types = $5, evolutions = $6 WHERE pkdx_id = $1`,
    [id, name, description, img_url, types, evolutions]
  );
  return updatedPokemon.rows[0];
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
  const res = await query(
    `UPDATE pokemon 
    SET pkdx_id COALESCE($1, pkdx_id),
    name = COALESCE($2, name),
    description = COALESCE($3, description),
    img_url = COALESCE($4, img_url),
    types = COALESCE($5, types,
    evolutions = COALESCE($6, evolutions)
    WHERE id = $1
    RETURNING name
  )`,
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
