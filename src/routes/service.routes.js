const {connection} = require('../db_connection');
const router = require('express').Router();

router.get('/with_category', (req, res) => {
  const sql = "SELECT *  FROM service INNER JOIN (SELECT sub_category.id AS id,sub_category.name AS sub_name, category.name AS cat_name FROM sub_category INNER JOIN category ON sub_category.category_id = category.id) AS res ON service.sub_category_id = res.id";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});


router.get('/', (req, res) => {
  const sql = "SELECT * FROM service ";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/', (req, res) => {
  const sql = "INSERT INTO service SET ? ";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(201).json({id: results.insertId, ...req.body});
    }
  });
});

router.put('/:id', (req, res) => {
  let sql = "UPDATE service SET ? WHERE id=? ";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM service WHERE id=? ";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `Service with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});





router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM service WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;