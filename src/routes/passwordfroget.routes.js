const { connection } = require("../db_connection");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { authenticateWithJWT } =  require('../middlewares');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const {sendResetEmail} = require('../Services/resetemailservices');

router.get("/", authenticateWithJWT, (req, res) => {
    const {email} = req.body;
    if(!email) {
        res.status(400).json({errorMessage: "Veuillez renseigner votre email et votre mot de passe"})
    } else {
        const sql = 'SELECT email FROM admin WHERE email= ?';
        connection.query(sql, [email], (error, result) =>{
            if(error){
                res.status(500).json({ errorMessage: error.message});
            } else {
                const admin = {
                    id: result,
                    email
                }
                const token = jwt.sign({id: admin.id}, JWT_SECRET, {expiresIn: '1h',})
                res.status(201).json({admin, token})
                sendResetEmail(admin);
            }
        })
    }
})

module.exports = router;