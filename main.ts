import { SHA256 } from "crypto-js"

class Block {
    index: number;
    readonly timestamp: number;
    readonly data: any;
    hash: any;
    previousHash: any;
    constructor(index:number, timestamp: number, data: any, previousHash: any = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    chain: Array<Block>;
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "NO_PREV");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let someCoin = new BlockChain()
someCoin.addBlock(new Block(1, Date.now(), {amount : 4}));
someCoin.addBlock(new Block(2, Date.now(), {amount : 20}));

console.log(JSON.stringify(someCoin, null, 4));
