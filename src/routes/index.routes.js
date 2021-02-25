const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const userRouter = require("./user.routes.js");
const bookRouter = require("./book.routes");
const buyRouter = require("./buy.routes");
const homeRouter = require("./home.routes");
const noticeRouter = require("./notice.routes");
const paletteRouter = require("./palette.routes");
const productRouter = require("./product.routes");
const serviceRouter = require("./service.routes");
const sub_categoryRouter = require("./sub_category.routes");
const categoryRouter = require("./category.routes");
const reserveRouter = require("./reserve.routes");

router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/buys", buyRouter);
router.use("/homes", homeRouter);
router.use("/notices", noticeRouter);
router.use("/palettes", paletteRouter);
router.use("/products", productRouter);
router.use("/services", serviceRouter);
router.use("/sub_categorys", sub_categoryRouter);
router.use("/categorys", categoryRouter);
router.use("/reserves", reserveRouter);

router.use('/admins', adminRouter);

module.exports = router;