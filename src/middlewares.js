require('dotenv').config();


function authJWT(req, res, next) {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err) => {
      if (err) {
        res
          .status(401)
          .json({ errorMessage: "you're not allowed to access these data" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ errorMessage: "you're not allowed to access these data" });
  }
}

module.exports = {
  authJWT: authJWT
};
