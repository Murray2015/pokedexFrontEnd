//**WHAT THIS FILE DOES: contains the scripts necessary to put the data into the table created by db:createTable**

const { query } = require('../index.js'); // gets query
const fs = require('fs'); //need this to get the data out of the json so we can put it in the db
const { promisify } = require('util'); // need this to promisify readFile
const path = require('path');

const readFile = promisify(fs.readFile); // fs.readfile only takes a callback as-is; but because this callback follows the set node pattern, we can use promisify to make it return a promise and use w/ async/await

async function uploadPoke() {
  // function to just get one pokemon to test it in the console
  try {
    const data = await readFile(
      path.join(__dirname, '..', 'data', 'pokedex.json')
    ); // uses the path module to move around into our other file for us ('..' for each level it travels up the tree, and then the folder name to go down into the folder; so this is up one level back to db, and then down into data)
    const pokemon = JSON.parse(data); // turns the info read from the JSON into a javascript object

    //console.log(pokemon[0]); //initial check to make sure working

    for (let i = 0; i < pokemon.length; i++) {
      //loops it: destructures each pokemon and runs the query on it, then moves onto the next one until it runs out of pokemon
      const {
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      } = pokemon[i]; //this is destructuring the values from the data object (read by readFile) into an array pokemon[0]; this is what SQL will then use to get each bit of the $1, $2, etc.
      const res = await query(
        `INSERT INTO pokemon (
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      ) 
      VALUES ($1, $2, $3, $4, $5, $6)`, // sql query as text argument in query function
        //SQL SYNTAX: INSERT INTO tablename (columnnames) VALUES (values)
        [pkdx_id, name, description, img_url, types, evolutions] // values from the destructured object above as the params argument of the query function
      );
      console.log(name); //console-logs only the name of each pokemon as each is recorded into the table
    }
  } catch (err) {
    //will stop the loop and error out if anything in the loop throws an error
    throw new Error('Failed to insert data into table. Loop stopped!');
    console.log(err);
  }
}

uploadPoke();

// TO RUN: npm run db:populate (because that's how it's stored in scripts in package.json)
