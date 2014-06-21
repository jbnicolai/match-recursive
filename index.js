// (c) 2007 Steven Levithan <stevenlevithan.com>
// MIT License

/*** matchRecursive
  accepts a string to search and a format (start and end tokens separated by "...").
  returns an array of matches, allowing nested instances of format.

  examples:
    matchRecursive("test",          "(...)")   -> []
    matchRecursive("(t(e)s)()t",    "(...)")   -> ["t(e)s", ""]
    matchRecursive("t<e>>st",       "<...>")   -> ["e"]
    matchRecursive("t<<e>st",       "<...>")   -> ["e"]
    matchRecursive("t<<e>>st",      "<...>")   -> ["<e>"]
    matchRecursive("<|t<e<|s|>t|>", "<|...|>") -> ["t<e<|s|>t"]
*/

module.exports = (function () {
  var formatParts = /^([\S\s]+?)\.\.\.([\S\s]+)/,
    metaChar = /[-[\]{}()*+?.\\^$|,]/g,
    escape = function (str) {
      return str.replace(metaChar, "\\$&");
    };

  return function (str, format) {
    var p = formatParts.exec(format);

    if (!p) {
      throw new Error("format must include start and end tokens separated by '...'");
    }

    if (p[1] === p[2]) {
      throw new Error("start and end format tokens cannot be identical");
    }

    var opener = p[1],
      closer = p[2],
      /* Use an optimized regex when opener and closer are one character each */
      iterator = new RegExp(format.length === 5 ? "["+escape(opener+closer)+"]" : escape(opener)+"|"+escape(closer), "g"),
      results = [],
      openTokens, matchStartIndex, match;

    do {
      openTokens = 0;
      while (match = iterator.exec(str)) {
        if (match[0] === opener) {
          if (!openTokens) {
            matchStartIndex = iterator.lastIndex;
          }
          openTokens++;
        } else if (openTokens) {
          openTokens--;
          if (!openTokens) {
            results.push(str.slice(matchStartIndex, match.index));
          }
        }
      }
    } while (openTokens && (iterator.lastIndex = matchStartIndex));

    return results;
  };
})();

