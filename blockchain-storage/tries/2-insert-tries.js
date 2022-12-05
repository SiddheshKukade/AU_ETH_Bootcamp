const TrieNode = require("./1-constructor-TrieNode");
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let currentnode = this.root;
        const chararr = word.split("");

        for (let i = 0; i < chararr.length; i++) {
            const alphabate = chararr[i];
            if (!(alphabate in currentnode.children)) {
                currentnode.children[alphabate] = new TrieNode(alphabate);
            }
            currentnode = currentnode.children[alphabate];
        }
        currentnode.isWord = true;
    }
    contains(word) {
        let currentNode = this.root;
        let charArr = word.split("");

        for (let i = 0; i < charArr.length; i++) {
            const letter = charArr[i];
            if (!(letter in currentNode.children)) {
                console.log("No word");
                return false;
            }
            currentNode = currentNode.children[letter];
        }
        if (currentNode.isWord) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    }
}
const node = new TrieNode();
const trie = new Trie();
trie.insert("healthly");
trie.contains("health");

module.exports = Trie;
