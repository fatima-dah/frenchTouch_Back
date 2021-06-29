require('dotenv').config();
const PORT = process.env.PORT || 8000
const app = require('./app');
// require('npm-audit')();


app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});