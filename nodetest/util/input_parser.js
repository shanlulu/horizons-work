function parse(args) {
  var numberStringArray = args.slice(3);
  var answer;
  var numberArray = numberStringArray.map(function(str) {
    return parseFloat(str);
  })
  return numberArray;
}

module.exports = {
  parse: parse
}
