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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Merci de renseigner votre mail ET votre mot de passe",
    });
  } else {
    const hash = bcrypt.hashSync(password, 10);
    connection.query(
      "INSERT INTO admin_login(email, password) VALUES (?, ?)",
      [email, hash],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else {
          res.status(201).json({
            id: result.insertId,
            email,
            password: "hidden",
          });
        }
      }
    );
  }
});


router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Merci d'entrer votre adresse mail ET votre mot de passe",
    });
  } else {
    connection.query(
      `SELECT * FROM admin_login WHERE email=?`,
      [email],
      (error, result) => {
        if (error) {
          res.status(500).json({ errorMessage: error.message });
        } else if (result.length === 0) {
          res.status(403).json({ errorMessage: "Adresse mail invalide" });
        } else if (bcrypt.compareSync(password, result[0].password)) {
          const user = {
            id: result[0].id,
            email,
            password: "hidden",
          };
          const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h",
          });

          res.status(200).json({ user, token });
        } else {
          res.status(403).json({ errorMessage: "Mot de passe invalide" });
        }
      }
    );
  }
});


module.exports = router;
