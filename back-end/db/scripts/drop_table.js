//**WHAT THIS FILE DOES: contains the scripts necessary to drop a table in the database**

const { query } = require('../index.js');

async function dropTable() {
  try {
    const res = await query(`DROP TABLE pokemon`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropTable();
