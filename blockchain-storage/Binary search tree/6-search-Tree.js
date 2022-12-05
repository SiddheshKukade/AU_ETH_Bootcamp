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
    hasNode(data) {
        return this.findNode(this.root, data);
    }
    findNode(root, data) {
        if (!root) {
            return false; // if nothitng is found return false
        } else if (root.data === data) {
            // base case for recursion
            return true;
        } else if (root.data > data) {
            return this.findNode(root.left, data); // recursive call to the left
        } else if (root.data < data) {
            return this.findNode(root.right, data); // recursive call to the right
        }
    }
}
const tree = new Tree();
const node1 = new Node(4);

tree.addNode(node1);

console.log(tree.hasNode(4)); // true
console.log(tree.hasNode(7)); // false
module.exports = Tree;
