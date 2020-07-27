/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.post("/create", (req, res) => {
    console.log(req);
    let insert = `INSERT INTO pins (id, username, latitude, longitude)
    VALUES (${req.body.id}, ${req.body.username}, ${req.body.lat},${req.body.lng}) RETURNING *`;
    db.query(insert)
      .then(data => {
        const pinned = data.rows;
        res.json({ pinned });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/retrieve", (req,res) =>{
    let q = `select * from pins where username = $1;`
    db.query(q, req.body.username)
    .then(data => {
      const info = data.rows;
      res.json({info});
    })
  })
  router.get("/",(req,res) =>{
    res.render('edit');
  })


  return router;
};





















