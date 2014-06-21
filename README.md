#match-recursive [![Build Status](https://travis-ci.org/jbnicolai/match-recursive.png?branch=master)](https://travis-ci.org/jbnicolai/match-recursive)
> Recursive regular expression matching for nested constructs

Heavily inspired by [Steven Leviathan](http://blog.stevenlevithan.com/about)'s [article](http://blog.stevenlevithan.com/archives/javascript-match-nested).

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
