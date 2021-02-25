require('dotenv').config();
const PORT = process.env.PORT;
const app = require('./app');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});