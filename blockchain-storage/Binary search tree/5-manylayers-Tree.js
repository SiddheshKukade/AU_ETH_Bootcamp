const Node = require("./Node.js");
class Tree {
    constructor() {
        this.root = null;
    }
    insertNode(root, newNode) {
        if (newNode.data < root.data) {
            if (root.left) {
                this.insertNode(root.left, newNode);
            } else {
                root.left = newNode;
                return;
            }
        } else {
            if (root.right) {
                this.insertNode(root.right, newNode);
            } else {
                root.right = newNode;
                return;
            }
        }
    }
    addNode(newNode) {
        if (this.root) {
            this.insertNode(this.root, newNode);
        } else {
            this.root = newNode;
        }
    }
}
// create a new tree and new node
const tree = new Tree();
const node = new Node(5);

// add the node to the tree using addNode
tree.addNode(node);

// the new node becomes the tree's root
console.log(tree.root.data); // 5

module.exports = Tree;
