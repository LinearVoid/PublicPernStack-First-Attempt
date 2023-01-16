//here we have all of the information to connect to our postgres server
//https://node-postgres.com/guides/async-express super helpful

const { Pool } = require('pg')
const pool = new Pool({
  user: 'api',
  host: 'localhost',
  database: 'postgres',
  password: process.env.password, //dont commit unless you want the password saved to the github
  port: 5432
})
//create USER api WITH ENCRYPTED PASSWORD that is in;
//


module.exports = {
  query: (text, params) => pool.query(text, params),
}

// this connects to our pg from npm and exports the query module for us to use in other files
// https://node-postgres.com/features/connecting specifies how to connect to our database





/*const Router = require('express-promise-router')
const db = require('../db')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
module.exports = router
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
  res.send(rows[0])
})
*/