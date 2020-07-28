/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.post("/retrieve", (req, res) => {
    //console.log(req);
    let userN = req.body.username;
    let insert = `INSERT INTO pins (id, mapid, username, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5);`;
    // console.log(insert);
    db.query(insert, [req.body.id, req.body.map_id, userN, req.body.lat, req.body.lng])
      .then(data => {
        const pinned = data.rows;
        // console.log(pinned);
        // res.json({ pinned });
        res.end();
      })
      .catch(err => {
        res
          .status(500)
            console.log(err)
          .json({ error: err.message });
          throw err;
      });
  });
  // router.post("/retrieve", (req,res) =>{
  //   let q = `select * from pins where username = $1;`
  //   db.query(q, req.body.username)
  //   .then(data => {
  //     const info = data.rows;
  //     // res.json({info});
  //     res.end();
  //   })
  // })


  return router;
};





















