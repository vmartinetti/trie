const util = require('util')

const SUGGESTION_NUMBER = process.env.SUGGESTION_NUMBER || 5;

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
        node.value = { name: wordOriginal, times: value };
      }
    //   console.log( node )
    //   console.log(util.inspect(node, {showHidden: false, depth: null, colors: true}))
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
        // console.log(node.children[prefix[i]].key)
        node = node.children[prefix[i]];
      } else {
        // entry node not found
        return output;
      }
    }
    findAllWords(node, output);
    if(output.length){
        output = output.sort((a,b)=>{
            if (a.name.toLowerCase() === prefix) return -1;
            b.times-a.times
        })
        .slice(0,SUGGESTION_NUMBER)
    }

    return output;
  };
  findAndIncrement = function (prefix) {
    prefix = prefix.toLowerCase();
    var node = this.root;
    var output = [];
    for (var i = 0; i < prefix.length; i++) {
      if (node.children[prefix[i]]) {
        console.log(node.children[prefix[i]].key)
        node = node.children[prefix[i]];
      } else {
        // entry node not found
        return output;
      }
    }
    // find exact match
    if (node.end) {
        node.value.times = node.value.times + 1;
        output.unshift(node.value);
      }
    return output;
  };
  getTopN = function (n) {
    var node = this.root;
    var output = [];
    findAllWords(node, output);
    output.sort((a, b) => 
    {   
        if (a.times === b.times) {
            return a.name.localeCompare(b.name);
        }
        return b.times - a.times
    });
    return output.slice(0, n);
  }
}
module.exports = Trie;
