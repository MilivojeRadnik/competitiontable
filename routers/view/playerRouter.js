const express = require('express');
const router = express.Router();

const controller = require('../../controllers/view/playerController');

router.get('/', controller.players);
router.get('/:name', controller.playerActions);

module.exports = router;
