var express = require('express');
var router = express.Router();
var { connection } = require('../config/config')

var checkToken = require('../middleware/checkToken')

/* GET users listing. */
router.get('/', checkToken,function (req, res, next) {
  try {
    connection.connect()

    let sql = "SELECT id, username from user";

    connection.query(sql, (err, rows, fields) => {
      if (err) throw err
      res.status(200).json(rows)
    })
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
