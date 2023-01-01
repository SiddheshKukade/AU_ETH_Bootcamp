const TrieNode = require("./TrieNode");

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(string) {
        let currentNode = this.root;
        const charArr = string.split("");

        for (let i = 0; i < charArr.length; i++) {
            const letter = charArr[i];
            if (!(letter in currentNode.children)) {
                currentNode.children[letter] = new TrieNode(letter);
            }
            currentNode = currentNode.children[letter];
        }
        currentNode.isWord = true;
    }
    contains(word) {
        let currentNode = this.root;
        let charArr = word.split("");

        for (let i = 0; i < charArr.length; i++) {
            const letter = charArr[i];
            if (!(letter in currentNode.children)) {
                return false;
            }
            currentNode = currentNode.children[letter];
        }
        if (currentNode.isWord) {
            return true;
        } else {
            return false;
        }
    }
}
const trie = new Trie();

module.exports = Trie;
