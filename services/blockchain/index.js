const express = require('express');
const router = express.Router();

const BlockChainController = require('./controller');

router.get('/', BlockChainController.getAllBlockChains)

router.get('/check', BlockChainController.getOneBlockChain)
router.post('/create', BlockChainController.createBlockChain)

router.get('/token', BlockChainController.getAllToken)


module.exports = router;