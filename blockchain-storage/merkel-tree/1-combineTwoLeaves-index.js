class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        this.root = this.concat(this.leaves[0], this.leaves[1]);
        return this.root;
    }
}

module.exports = MerkleTree;
