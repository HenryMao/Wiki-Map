/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/pins", (req, res) => {
    db.query(`SELECT * FROM pins;`)
      .then(data => {
        const result = data.rows;
        res.json({ result });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // router.get("/",(req,res) =>{
  //   res.render('map');
  // })
  return router;
};
