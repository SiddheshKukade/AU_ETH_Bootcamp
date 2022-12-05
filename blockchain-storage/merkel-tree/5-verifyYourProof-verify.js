function verifyProof(proof, node, root, concat) {
    for (let i = 0; i < proof.length; i++) {
        let proofNode = proof[i];
        if (proofNode.left) {
            node = concat(proofNode.data, node);
        } else {
            node = concat(node, proofNode.data);
        }
    }
    return node === root;
}

module.exports = verifyProof;
