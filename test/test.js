var matchRecursive = require("..");
var assert = require("chai").assert;

describe("the matchRecursive function", function () {
  function createInputOutputSpec(arg1, arg2, output) {
    return it("should return " + output + " when called with " + arg1 + " and " + arg2, function () {
      assert.deepEqual(matchRecursive(arg1, arg2), output);
    });
  }

  createInputOutputSpec("test    ",      "(...)",   []);
  createInputOutputSpec("(t(e)s)()t",    "(...)",   ["t(e)s", ""]);
  createInputOutputSpec("t<e>>st",       "<...>",   ["e"]);
  createInputOutputSpec("t<<e>st",       "<...>",   ["e"]);
  createInputOutputSpec("t<<e>>st",      "<...>",   ["<e>"]);
  createInputOutputSpec("<|t<e<|s|>t|>", "<|...|>", ["t<e<|s|>t"]);
});

