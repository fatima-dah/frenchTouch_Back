const { connection } = require("../db_connection");
const router = require("express").Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

require("dotenv").config();
const { CLIENT_URL, JWT_SECRET } = process.env;

router.use(
  cors({
    origin: CLIENT_URL,
  })
);




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


router.post("/singIn", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Merci d'entrer votre adresse mail ET votre mot de passe",
    });
  } else {
    connection.query(
      `SELECT email, password FROM user WHERE email=? `,
      [email],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else if (result.length === 0) {
          res.status(403).json({ errorMessage: "Adresse mail invalide" });
        } else if (bcrypt.compareSync(password, result[0].password)) {
          const users = {
            id: result[0].id,
            email,
            password: "hidden",
          };
          const user =  jwt.sign({ id: users.id }, JWT_SECRET, {
            expiresIn: "1h", 
          });
          user = "SELECT * FROM user"

          res.status(200).json({ users, user });
        } else {
          res.status(403).json({ errorMessage: "Mot de passe invalide" });
        }
      }
    );
  }
});




module.exports = router;
