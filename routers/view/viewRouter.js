const express = require('express');
const router = express.Router();

const playerRouter = require('./playerRouter');
const adminRouter = require('./adminRouter');

const controller = require('../../controllers/view/viewController');

router.use('/players', playerRouter);
router.use('/admin', adminRouter);

router.get('/', controller.table);
router.get('/customselect', controller.customSelect);

module.exports = router;
