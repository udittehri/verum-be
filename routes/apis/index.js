const express = require('express');
const router = express.Router();

const BlockChainController = require('../../services/blockchain');


router.use('/block', BlockChainController)

module.exports = router;