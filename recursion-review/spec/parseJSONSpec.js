// test cases are described in fixtures.js
describe('parseJSON', function() {
  it('should work for boolean and null', function() {
    let parseableStrings = ['true', 'false', 'null'];
    parseableStrings.forEach(function(test) {
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected);
      expect(equality).to.be.true;
    });
  });  

  it('should work for some numbers', function() {
    let parseableStrings = ['2', '2.2', '1', '10000', '3.333234234', '-123123.123123'];
    parseableStrings.forEach(function(test) {
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected);
      expect(equality).to.be.true;
    });
  });

  it('should work for some strings', function() {
    let parseableStrings = ['"aaa"', '"f f , ,f , :  f : "', '"[1, 2]"', '"{0}"'];
    parseableStrings.forEach(function(test) {
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected);
      expect(equality).to.be.true;
    });
  });

  it('should work for some arrays', function() {
    let parseableStrings = ['[1, 2]', '[[[[[1]]]]]', '[[1, 2], [3, [3.3, "stringy"]]]', '[]'];
    parseableStrings.forEach(function(test) {
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected);
      expect(equality).to.be.true;
    });
  });

  it('should work for some objects', function() {
    let parseableStrings = ['{"key": "value"}', '{"k": 1, "k1": "v1"}', '{"key, key": [1, [2, 3]]}', '{"kk": {"in": 9}}', '{"a": "b", "c": "d"}'];
    parseableStrings.push('{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }');
    parseableStrings.push('[{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}]');
    
    parseableStrings.forEach(function(test) { 
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected);
      expect(equality).to.be.true;
    });
  });

  it('should NOT work for some inputs aka return undefined', function() {
    let parseableStrings = ['1.', '.2', '0000012', '{"key": : }', '{"keyonly"}', '{: ["valueonly"]}', '["no close"', '{', '"asdf'];
    parseableStrings.forEach(function(test) { 
      var result = parseJSON(test);
      var expected = undefined;
      var equality = _.isEqual(result, expected);
      expect(result).to.be.undefined;
    });
  });  

  it('should match the result of calling JSON.parse', function() {
    parseableStrings.forEach(function(test) {
      var result = parseJSON(test);
      var expected = JSON.parse(test);
      var equality = _.isEqual(result, expected); // why can't we use `===` here?
      expect(equality).to.be.true;
      // Replace this line with an `expect` statement that tests
      // the behavior described by the `it` string
      // throw new Error('Test is missing.')
    });
  });

  it('should throw an error for invalid stringified JSON', function() {
    unparseableStrings.forEach(function(test) {
      var fn = function() {
        parseJSON(test);
      };
      // if you'd prefer, you can write your version of parseJSON 
      // so that it passes this test instead of the one on line 21. 
      expect(parseJSON(test)).to.equal(undefined);
      // expect(fn).to.throw(SyntaxError);
    });
  });
});
