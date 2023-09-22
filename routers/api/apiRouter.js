const express = require('express');
const router = express.Router();

const getController = require('../../controllers/api/getController');
const postController = require('../../controllers/api/postController');

router.get('/getplayers', getController.getPlayers);
router.get('/getactions', getController.getActions);
router.get('/getseasons', getController.getSeasons);
router.get('/getcurseason', getController.getCurSeason);
router.get('/getplays', getController.getPlays);
router.get('/gettable', getController.getTable);
router.get('/getplayeractions', getController.getPlayerActions);

router.post('/postplay', postController.postPlay);
router.post('/insertplayer', postController.insertPlayer);
router.post('/updateplayer', postController.updatePlayer);
router.post('/insertaction', postController.insertAction);
router.post('/updateaction', postController.updateAction);
router.post('/throw', postController.throwPlay);

module.exports = router;
