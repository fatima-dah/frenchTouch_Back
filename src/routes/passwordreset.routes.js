const { connection } = require("../db_connection");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { authenticateWithJWT } =  require('../middlewares');;

router.put('/:id', authenticateWithJWT, (req, res) => {
  let sql = "UPDATE admin SET password WHERE id=?";
  const {password, password_1} = req.body;
  connection.query(sql, [password, password_1, req.params.id], (err, results) =>{
    if(!password || !password_1){
      res.status(400).json({errorMessage: "Veuillez renseigner votre nouveau mot de passe."})
    }
    else if (password !== password_1){
      res.status(400).json({errorMessage: "Les mots de passes ne correspondent pas!"})
    }
    else {
      sql = "SELECT * FROM admin WHERE id=?";
      const hash = bcrypt.hashSync(password, 25);
      connection.query(sql, [hash], req.params.id, (err, result) => {
        if(result.length === 0){
          res.status(404).send({errorMessage: `Admin with id ${req.params.id} not found`});
        } else {
          res.status(201).json({
            id: result.insertId,
            password: "hidden"
          })
        }
      });
    }
  } )
});

  module.exports= router;