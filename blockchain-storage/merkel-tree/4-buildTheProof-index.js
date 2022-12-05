class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        let currentLayer = this.leaves;
        while (currentLayer.leaves > 1) {
            let newLayer = [];
            const isOdd = currentLayer.length % 2 !== 0;
            const toRange = isOdd
                ? currentLayer.length - 1
                : currentLayer.length; //if element are odd i number then we don't need to loop to the end
            for (let i = 0; i < toRange; i += 2) {
                let left = currentLayer[i];
                let right = currentLayer[i + 1];
                newLayer.push(this.concat(left, right));
            }
            if (isOdd) newLayer.push(currentLayer[currentLayer.length - 1]);
            currentLayer = newLayer;
        }
        return currentLayer[0];
    }
    getProof(index) {
        let currentLayer = this.leaves;

        let proof = [];
        while (currentLayer.length > 1) {
            let newLayer = [];
            let isOdd = currentLayer.length % 2 !== 0;
            let toRange = isOdd ? currentLayer.length - 1 : currentLayer.length;

            for (let i = 0; i < toRange; i += 2) {
                newLayer.push(
                    this.concat(currentLayer[i], currentLayer[i + 1])
                );
                if (i === index) {
                    proof.push({ data: currentLayer[i + 1], left: false });
                }
                if (i + 1 === index) {
                    proof.push({ data: currentLayer[i], left: true });
                }
            }

            if (isOdd) {
                newLayer.push(currentLayer[currentLayer.length - 1]);
            }

            index = Math.floor(index / 2);
            currentLayer = newLayer;
        }

        return proof;
    }
}

module.exports = MerkleTree;
