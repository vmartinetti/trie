const findAllWords = function (node, arr) {
  if (node.end) {
    arr.unshift(node.value);
  }
  for (var child in node.children) {
    findAllWords(node.children[child], arr);
  }
};

class TrieNode {
  constructor(key) {
    this.key = key ? key.toLowerCase() : key;
    this.parent = null;
    this.children = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }
  insert = function (word, value) {
    var wordOriginal = word;
    word = word.toLowerCase();
    var node = this.root;
    for (var i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode(word[i]);
        node.children[word[i]].parent = node;
      }
      node = node.children[word[i]];
      if (i == word.length - 1) {
        node.end = true;
        node.value = { name: wordOriginal, popularity: value };
      }
    //   console.log('node.children', node.children)
    }
  };
  insertMany = function (values){
    for (var name in values) {
        this.insert(name, values[name]);
      }
  };
  find = function (prefix) {
    prefix = prefix.toLowerCase();
    var node = this.root;
    var output = [];
    for (var i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        // entry node not found
        return output;
      }
    }
    findAllWords(node, output);
    return output;
  };
}
module.exports = Trie;
