const router = require("express").Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ errorMessage: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(
    `${__dirname}/../../../frenchtouch-front-/public/upload/${file.name}`,
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.status(200).json({
        fileName: file.name,
        filePath: `/upload/${file.name}`,
      });
    }
  );
});

module.exports = router;
