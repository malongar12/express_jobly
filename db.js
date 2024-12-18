"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");



/*if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}
  */

const Pool = require("pg").Pool



const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "express_jobly",
    password: "malongar12",
    port: 5432,

});

module.exports = pool


//const db = new pg.Client("postgresql:///express_jobly");

//db.connect();




pool.connect();

