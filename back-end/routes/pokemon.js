// this file is the router - it routes the requests where they need to go

const express = require('express');
const router = express.Router();
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  searchPokemonByName,
  savePokemon,
  deletePokemonById,
  deletePokemonByName,
  updatePokemonById,
  patchPokemon
} = require('../models/pokemon.js');

router.get('/pokemon', async (req, res) => {
  // Allows for using queries using any key-value pairs in the data; a query will be /pokemon?key=value in the path
  const { name, search } = req.query; // could also be const name = req.query.name
  //const { searchTerm } = req.query;
  if (name) {
    // if name is specified, return that specific pokemon
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return; // makes sure the function quits here if it's using this if statement (if this is true)
  }
  if (search) {
    const searchedPokemon = await searchPokemonByName();
    res.json(searchedPokemon);
  }
  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get('/pokemon/:pokemonId', async (req, res) => {
  // req.params takes in the id entered by the user in the path
  const { pokemonId } = req.params; //what's after req.params has to match what's after the : in the path!
  // same as req.params.pokemonID, but destructured instead of writing out
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.post('/pokemon', async (req, res) => {
  const { body } = req; // parse and extract the body and converted the JSON into an object
  await savePokemon(body);
  // Don't need a res.json here because the SQL INSERT query does the manipulation of the data over in the query
  res.send(`You have saved ${body.name} as a pokemon.`);
});

router.delete('/pokemon/:pokemonId', async (req, res) => {
  const { pokemonId } = req.params;
  const name = await deletePokemonById(pokemonId);
  if (name) {
    res.status(200).send(`Pokemon ${pokemonId}, ${name}, has been deleted.`);
  } else {
    res.status(406).send(`No pokemon by that id found.`); // 406 is status: not acceptable
  }
});

router.put('/pokemon/:pokemonId', async (req, res) => {
  const { body } = req;
  const { pokemonId } = req.params;
  const updatedPokemon = await updatePokemonById(body, pokemonId);
  if (updatedPokemon) {
    res.status(200).send(`You've updated pokemon ${pokemonId}`);
  } else {
    res.status(400).send(`No pokemon by that id found.`);
  }
});

router.patch('/pokemon/:pokemonId', async function(req, res) {
  const { body } = req;
  const { pokemonId } = req.params;
  const patchedPokemon = await patchPokemon(pokemonId, body);
  // res.json({
  //   success: true,
  //   message: `You've updated pokemon ${updatedPokemon.name}`
  // });
  if (patchedPokemon) {
    res.status(200).send(`You've updated pokemon ${pokemonId}`);
  } else {
    res.status(400).send(`No pokemon by that id found.`);
  }
});

// router.patch('/pokemon', async function(req, res) {
// const key = Object.keys(req.query)[0];
// const value = Object.values(req.query)[0];
// const { body } = req;
// const output = await patchPokemon(key, value, body);
// res.send(output);
// });

module.exports = router;
