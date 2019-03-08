const REG = require("reg");
const GEN = require("general");
const simple = require("simple");
const index = require("../udb/DB/index.js");

const sum = function(a, b) {
   return a + b;
}
module.exports = {
  sum, REG, ...GEN, ...simple, ...index, 
};