//**WHAT THIS FILE DOES: contains the scripts necessary to create a table in the database**

const { query } = require('../index.js'); // ../ instead of ./ because it's up one level in the folders
//extracts just the query so we don't have to do client.query everywhere

async function createTable() {
  try {
    // can test that everything's hooked up by starting with a query with a select query to just select something in the DB before writing the actual query
    const res = await query(
      `CREATE TABLE IF NOT EXISTS pokemon (
            id SERIAL, 
            pkdx_id INT,
            name TEXT,
            description TEXT,
            img_url TEXT,
            types TEXT[],
            evolutions TEXT[],
            PRIMARY KEY(id)
        )
        ` //this string is the text argument of the query's function (this is where the actual SQL string goes, including the create table command and all the column names); use backticks so we can have multiple lines; primary key at the end does what it says and specifies the column to use as the primary key
      // if there was an [] with separate values, it would be the second argument of the query's function here (the params); it would be referenced in the SQL query with $1, $2, etc. for each item of the []
      // then could add a callback as the third argument; but as we're just returning the result of the SQL query, we don't need it right now
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createTable(); //calls the function when the file's run
// TO RUN FILE: added this script in the package.json: "db:createTable": "node ./db/scripts/create_table.js"; now to run it, can just type npm run db:createTable in the terminal

// NOTE: the old-school way: could also use the weird extra parentheses around/after it to mean it's an immediately invoked function expression (IFFE) - runs immediately after it's created; we need to do this instead of just writing the code without calling a function because it needs to be a function to async/await; this gives best of both worlds: it's a function, but it's also just executed immediately without having to be separately called.
