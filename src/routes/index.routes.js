const router = require('express').Router();
const adminRouter = require('./admin.routes.js');
const userRouter = require('./user.routes.js');
const bookRouter = require('./book.routes.js');
const buyRouter = require('./buy.routes.js');
const categoryRouter = require('./category.routes.js');
const homeRouter = require('./home.routes.js');
const noticeRouter = require('./notice.routes.js');
const paletteRouter = require('./palette.routes.js');
const productRouter = require('./product.routes.js');
const reserveRouter = require('./reserve.routes.js');
const service_presentationRouter = require('./service_presentation.routes.js');
const serviceRouter = require('./service.routes.js');
const sub_categoryRouter = require('./sub_category.routes.js');


router.use('/admins', adminRouter);
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/buys', buyRouter);
router.use('/categorys', categoryRouter);
router.use('/homes', homeRouter);
router.use('/notices', noticeRouter);
router.use('/palettes', paletteRouter);
router.use('/products', productRouter);
router.use('/reserves', reserveRouter);
router.use('/services_presentation', service_presentationRouter);
router.use('/services', serviceRouter);
router.use('/sub_categorys', sub_categoryRouter);

module.exports = router;