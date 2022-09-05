const Readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Trie = require("./Trie.js");
var trie = new Trie();
// const values = {"Aaren":361,"Aarika":151,"Abagael":704,"Abagail":608,"Abbe":396,"Abbey":674,"Abbi":309,"Abbie":349,"Abby":469,"Abbye":95,"Abigael":512,"Abigail":837,"Abigale":125,"Abra":106,"Ada":23};
// const values = {"aab":100,"Abbe":396,"Abbey":674,"Abbi":309,"Abbie":349,"Abby":469,"Abbye":95};
// const values = { "Abbe": 396, "Abbey": 674 };
const values = require('./names.json');
trie.insertMany(values);
console.log("Initial load done!");

const ask = () => {
  Readline.question(`What's the name you are searching for? `, (Name) => {
    console.log("Result:", trie.find(Name));
    // console.log(`Hi ${Name}!`);
    // Readline.close();
    ask();
  });
};

ask();
