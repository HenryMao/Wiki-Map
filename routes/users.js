/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //variable to store the specific map that needs to be loaded
  let mapLoad;

  router.post("/:mapid", (req, res) => {
    console.log(req.params.mapid);
    let query = `SELECT * FROM pins WHERE mapid = $1;`;
    db.query(query, [req.params.mapid])
      .then(data => {
        const result = data.rows;
        //stores the pin information from desired map in mapLoad
        mapLoad = result;
      })
      .catch(err => {
        console.log("error here");
        res
          .status(500)
          .json({ error: err.message });
        throw err;
      });
  });
  router.get("/specific", (req, res) =>{
    //use the mapLoad variable to send back the specific pins from desired map
    res.json(mapLoad);
  });

  return router;
};
