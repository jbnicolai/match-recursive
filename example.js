var matchRecursive = require("./index");

function print(string, format) {
  console.log(string, '\t->\t', matchRecursive(string, format));
}

print("test    ",      "(...)");
print("(t(e)s)()t",    "(...)");
print("t<e>>st",       "<...>");
print("t<<e>st",       "<...>");
print("t<<e>>st",      "<...>");
print("<|t<e<|s|>t|>", "<|...|>");
