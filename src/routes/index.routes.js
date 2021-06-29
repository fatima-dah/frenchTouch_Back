const router = require("express").Router();
const adminRouter = require("./admin_login.routes.js");
const loginRouter = require("./login.routes.js");
const userRouter = require("./user.routes.js");
const buyRouter = require("./buy.routes.js");
const categoryRouter = require("./category.routes.js");
const homeRouter = require("./home.routes.js");
const noticeRouter = require("./notice.routes.js");
const paletteRouter = require("./palette.routes.js");
const productRouter = require("./product.routes.js");
const reserveRouter = require("./reserve.routes.js");
const service_presentationRouter = require("./service_presentation.routes.js");
const serviceRouter = require("./service.routes.js");
const sub_categoryRouter = require("./sub_category.routes.js");
const giftRouter = require("./gift.routes.js");
const reserve_visitorRouter = require("./reserve_visitor.routes.js");
const uploadRouter = require("./upload.routes.js");
const aboutRouter = require("./about.routes.js");
const aboutCartRouter = require("./aboutCart.routes.js");
const loginUserRouter = require("./loginUser.routes")
const panierRouter = require("./panier.routes")
const giftPresentationRouter = require("./giftPresentation.routes")






 
router.use("/admin_login", adminRouter);
router.use('/login', loginRouter);
router.use("/users", userRouter);
router.use("/buys", buyRouter);
router.use("/categorys", categoryRouter);
router.use("/homes", homeRouter);
router.use("/notices", noticeRouter);
router.use("/palettes", paletteRouter);
router.use("/products", productRouter);
router.use("/reserves", reserveRouter);
router.use("/services_presentation", service_presentationRouter);
router.use("/services", serviceRouter);
router.use("/sub_categorys", sub_categoryRouter);
router.use("/gifts", giftRouter);
router.use("/reserve_visitor", reserve_visitorRouter);
router.use("/upload", uploadRouter);
router.use("/abouts", aboutRouter);
router.use("/aboutCarts", aboutCartRouter);
router.use("/loginUsers", loginUserRouter);
router.use("/paniers", panierRouter);
router.use("/giftPresentation", giftPresentationRouter);






module.exports = router;
