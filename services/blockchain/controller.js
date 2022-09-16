
const { ERROR_MESSAGE, MISSING_REQUIRED_FIELDS, inch_GET_TOKENS_URL } = require('../../common/messages');
const ResponseService = require('../../common/response');
const BlockChainService = require('./service')
const externalRequest = require('./../../common/requests');
class BlockChainController {

    async getAllBlockChains(req, res) {
        try {
            let response = { ...req.query }
            console.log("Hey Man")
            const blockchain = await BlockChainService.getAllBlockChains()
            res.send(ResponseService.success(blockchain));
        }
        catch (err) {
            console.log(err, "Error Log")
            res.status(err.status || 400).send(ResponseService.failure(ERROR_MESSAGE));
        }

    }

    async getOneBlockChain(req, res) {
        try {
            let request = { ...req.query }
            let criteria = {
                _id: request.id
            }
            const blockchain = await BlockChainService.getOneBlockChain(criteria)
            res.send(ResponseService.success(blockchain));
        }
        catch (err) {
            console.log(err, "Error Log")
            res.status(err.status || 400).send(ResponseService.failure(ERROR_MESSAGE));
        }

    }

    async createBlockChain(req, res) {
        try {
            let request = { ...req.body }
            if (!(request.name && request.inchId && request.url)) throw new Error(MISSING_REQUIRED_FIELDS)
            const criteria = {
                name: request.name,
                inchId: request.inchId,
                url: request.url
            }
            const blockchain = await BlockChainService.createBlockChain(criteria)
            res.send(ResponseService.success(blockchain));
        }
        catch (err) {
            res.status(err.status || 400).send(ResponseService.failure(err.message || ERROR_MESSAGE));

        }

    }

    async getAllToken(req, res) {
        try {
            let request = { ...req.query }

            let url = `${inch_GET_TOKENS_URL}${request.id ? request.id : 1}/tokens`
            console.log(url)
            const tokens = await externalRequest.get(url)

            res.send(ResponseService.success(tokens?.response?.tokens));
        }
        catch (err) {
            res.status(err.status || 400).send(ResponseService.failure(err.message || ERROR_MESSAGE));

        }
    }

}

module.exports = new BlockChainController; 