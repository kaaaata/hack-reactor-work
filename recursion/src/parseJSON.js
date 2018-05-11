let parseJSON = function(json) {
  let x=json;
  let ret;
  switch (input_type(x)) {
    case 'invalid':
      return 'Error: invalid JSON. ';
      break;
    case 'null':
      return null;
      break;
    case 'true':
      return true;
      break;
    case 'false':
      return false;
      break;
    case 'string':
      return x.slice(1,x.length-1);
      break;
    case 'number':
      return Number(x);
      break;
    case 'array':
      //break it up and apply recursion
      ret=[];
      let array_split=x.slice(1,x.length-1).split(', ');
      for (let i=0;i<array_split.length;i++) {
        ret.push(parseJSON(array_split[i]));
      }
      return ret;
      break;
    case 'object':
      //break it up and apply recursion
      ret={};
      let object_split=x.slice(1,x.length-1).split(', ');
      for (let i=0;i<object_split.length;i++) {
        let key_value_split=object_split[i].split(': ');
        ret[parseJSON(key_value_split[0])]=parseJSON(key_value_split[1]);
      }
      return ret;
      break;     
  }
 
};             
 
/*valid inputs
'null'/'true'/'false' -> 'null'/'true'/'false'
'[...]' -> 'array'
'{...}' -> 'object'
'"..."' -> 'string'
'...' -> 'number'
everything else invalid -> 'invalid'
*/
let input_type = function(x) {
  let a=x;
  let b=x.split('').reverse().join('');
 
  if (['null','true','false'].indexOf(a)!==-1) {
    return a;
  } else if (a[0]==='"'&&b[0]==='"') {
    return 'string';
  } else if (is_valid_num(a)) {
    return 'number';
  } else if (a[0]==='['&&b[0]===']') {
    return 'array';
  } else if (a[0]==='{'&&b[0]==='}') {
    return 'object';
  } else {
    return 'invalid';
  }
}; 
 
let is_valid_num=function(x){
  let valid_chars='1234567890.';
  //must have only 1 decimal point, and not lead with 0
  if (x.indexOf('.')!==x.lastIndexOf('.')){
    return false;
  }
  //must not start with 0 unless it's a valid decimal
  if (x[0]==='0'&&x[1]!=='.'&&x.length>=2){
    return false;
  }
  //must only use valid characters
  for (let i=0;i<x.length;i++){
    if (valid_chars.indexOf(x[i])===-1){
      return false;
    }
  }
  return true;
};
 
/*
let x='{"1": 1, "2": 2, "3": "asdfasdf"}';
 
console.log(parseJSON(x));
console.log(typeof(parseJSON(x)));
console.log(Array.isArray(parseJSON(x)));
*/