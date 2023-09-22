const express = require('express');
const router = express.Router();

const controller = require('../../controllers/view/adminController');

router.get('/', controller.panelView);
router.get('/postplay', controller.postPlay);
router.get('/insertplayer', controller.insertPlayer);
router.get('/updateplayer', controller.panelView);
router.get('/insertaction', controller.insertAction);
router.get('/updateaction', controller.updateAction);
router.get('/throw', controller.insertThrow);

router.post('/postplay', controller.panelView);
router.post('/insertplayer', controller.panelView);
router.post('/updateplayer', controller.panelView);
router.post('/insertaction', controller.panelView);
router.post('/updateaction', controller.panelView);
router.post('/throw', controller.panelView);

module.exports = router;
