const { connection } = require("../db_connection");
const router = require("express").Router();


router.get('/', (req, res) => {
  const sql = "SELECT * FROM user";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});


// router.get("/:id", (req, res) => {
//   const sql = "SELECT * FROM user WHERE id=? ";

//     connection.query(sql,  [ req.params.id], (error, result) => {
//         if (error) {
//           res.status(500).json({ errorMessage: error.message });
//         } else if (result.length === 0) {
//           res.status(403).json({ errorMessage: "Adresse mail invalide" });
//         } else {
//            res.status(200).json(result);
//               }
//       });
// });


router.post("/register", (req, res) => {
  const { firstname, lastname, email, password, confirmedPassword } = req.body;
  if (!firstname || !lastname || !email || !password || !confirmedPassword) {
    res.status(400).json({
      errorMessage: "Merci de renseigner votre mail ET votre mot de passe",
    });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    const hashs = bcrypt.hashSync( confirmedPassword, 10);


    connection.query(
      "INSERT INTO user(firstname, lastname, email, password, confirmedPassword) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, hash, hashs],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else {
          res.status(201).json({
            id: result.insertId,
            firstname,
            lastname,
            email,
            password: "hidden",
            confirmedPassword: "hidden",
          });
        }
      }
    );
  }
});




router.post('/', (req, res) => {
  const sql = "INSERT INTO user SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(201).json({id: results.insertId, ...req.body});
    }
  });
});

router.put('/:id', (req, res) => {
  let sql = "UPDATE user SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM user WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `User with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM user WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;