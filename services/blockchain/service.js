const BlockChain = require('./blockchain');


class BlockChainService {

    getOneBlockChain(details) {
        return BlockChain.findOne(details)
    }
    getAllBlockChains(details) {
        return BlockChain.find(details)
    }

    createBlockChain(details) {
        return new BlockChain(details).save();
    }

    updateBlockChain(id, detials) {
        return BlockChain.findByIdAndUpdate(id, detials, { new: true })
    }
}

module.exports = new BlockChainService();