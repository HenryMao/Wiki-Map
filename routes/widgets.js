/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



module.exports = (db) => {

  router.post("/", (req, res) => {
    console.log(req);
    let insert = `INSERT INTO maps (id, latitude, longitude)
    VALUES (${req.body.id},${req.body.lat},${req.body.lng}) RETURNING *`;
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
  return router;
};














