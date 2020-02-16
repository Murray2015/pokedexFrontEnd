//**WHAT THIS FILE DOES: Connects us to postgres and defines/exports query**

// Npm i pg to install Node Postgress
const { Pool } = require('pg'); // requires the library Node Postgress (the interface between our node app and Postgres itself over in Google Cloud)
const pool = new Pool({
  // makes the initial connection to the database via an instance of Pool - uses the Node Postgress library to tell it where the database is and how to log in
  // ANALOGY: Man with the hose connects one side to us and the other side to the database
  // user: 'postgres', // default user is postgres
  // host: '34.89.6.76',
  // database: 'postgres', // default database is postgres
  // password: 'HNc7FJzzl9cCMcOv'
  // NOTE: in the "real world", wouldn't put password etc. here; more secure to use environment variables (below):
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD
});

module.exports = {
  // once Node Postgress connects up to the right database, it then gives us a query to use to use that connection with
  // ANALOGY: this is the way to send the messages down that hose that the man with the hose hooked up for us above
  query: (text, params, callback) => {
    return pool.query(text, params, callback); // key/value pair where the function is declared right in the value of key query; makes it easier to just lift and shift it as query in other files
    // text is the sql query, params is the value, and callback is optional
  }
};
//SOURCE: code above copied from the suggested project structure on node-postgress website in guides section
