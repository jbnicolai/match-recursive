#match-recursive [![Build Status](https://travis-ci.org/jbnicolai/match-recursive.png?branch=master)](https://travis-ci.org/jbnicolai/match-recursive)
> Recursive regular expression matching for nested constructs

Heavily inspired by [Steven Leviathan](http://blog.stevenlevithan.com/about)'s [article](http://blog.stevenlevithan.com/archives/javascript-match-nested).

Ever wanted to match all contents between braces in a string, only to run into trouble with unmatched braces? Here's the solution!

Each [balanced, so this ']' bracket is ignored] subgroup will be matched recursively, ((2 + 2)\*2)^2 will also match the outer group '(2 + 2)\*2'. A second invocation will match the inner group '2+2'.

```
npm install match-recursive
```

##Usage examples

```js
var matchRecursive = require("match-recursive");

matchRecursive("test    ",      "(...)");     // returns:   []
matchRecursive("(t(e)s)()t",    "(...)");     // returns:   ["t(e)s", ""]
matchRecursive("t<e>>st",       "<...>");     // returns:   ["e"]
matchRecursive("t<<e>st",       "<...>");     // returns:   ["e"]
matchRecursive("t<<e>>st",      "<...>");     // returns:   ["<e>"]
matchRecursive("<|t<e<|s|>t|>", "<|...|>");   // returns: ["t<e<|s|>t"]
```
