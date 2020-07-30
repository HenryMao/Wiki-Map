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
    //receives the data from the create page with all pins and map info
    let userN = req.body.username;
    let insert = `INSERT INTO pins (id, mapid, username, mapTitle, mapDes, pinNote, imag, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;

    db.query(insert, [req.body.id, req.body.map_id, userN, req.body.mapTitle, req.body.mapDes, req.body.pinNote, req.body.img, req.body.lat, req.body.lng])
      .then(data => {
        const pinned = data.rows;
        res.json({ pinned });
      }).catch(err => {
        //prints out the error on console if any
        console.log(err);
      });
  });


  return router;
};





















