// NOTE: We have same code for OddLeaves because we already handled in previous section
class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        let currentLayer = this.leaves;
        while (currentLayer.length > 1) {
            let newLayer = [];
            let isOdd = currentLayer.length % 2 !== 0;
            let loopRange = isOdd
                ? currentLayer.length - 1
                : currentLayer.length;

            for (let i = 0; i < loopRange; i += 2) {
                newLayer.push(
                    this.concat(currentLayer[i], currentLayer[i + 1])
                );
            }

            if (isOdd) {
                newLayer.push(currentLayer[currentLayer.length - 1]);
            }

            currentLayer = newLayer;
        }

        return currentLayer[0];
    }
}

module.exports = MerkleTree;
