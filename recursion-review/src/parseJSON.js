let parseJSON = function(json) {
  let invalidJSON = false;
  // get rid of \r, \n, and \t
  json = json.replace(/\r|\n|\t/g,''); 

  let parse = function(json) {
    let ret = [];

    switch (typeOfJSON(json)) {
    case 'boolean':
      return json === 'true' ? true : false;
    case 'null':
      return null;
    case 'string':
      // ensure string has correct amount of " without counting \"
      if (json.replace(/\\"/g,'').match(/"/g).length % 2 !== 0) {
        invalidJSON = true;
        return undefined;
      }
      // make escape-characters work: replace \" with ", and \\ with \
      return json.slice(1, json.length - 1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');
    case 'number':
      return parseFloat(json);
    case 'array':    
      ret = [];
      if (arraystrToArray(json)) {
        arraystrToArray(json).forEach(array => {ret.push(parse(array));});
      } else {
        invalidJSON = true;
        return undefined;
      }
      return ret;
    case 'object':
      ret = {};
      let keyValuePairs = objstrToKeyValuePairs(json);
      if (keyValuePairs) {
        for (let i = 0; i < keyValuePairs[0].length; i++) {
          ret[parse(keyValuePairs[0][i])] = parse(keyValuePairs[1][i]);
        }
      } else {
        invalidJSON = true;
        return undefined;
      }
      return ret;
    case 'invalid':
      invalidJSON = true;
      return;
    }
    return ret;
  };

  let ret = parse(json);

  return invalidJSON ? undefined : ret;
};

let typeOfJSON = function(json) {
  // get rid of leading/trailing spaces and horizontal tabs
  json = json.replace(/^[ \t]+|[ \t]+$/g, '');
  if (json === 'true' || json === 'false') {return 'boolean';}
  if (json === 'null') {return 'null';}
  if (json[0] === '"' && json[json.length - 1] === '"') {return 'string';}
  if (isValidNumber(json)) {return 'number';}
  if (json[0] === '[' && json[json.length - 1] === ']') {return 'array';}
  if (json[0] === '{' && json[json.length - 1] === '}') {return 'object';}
  return 'invalid';
};

let isValidNumber = function(value) {
  let validChars = '1234567890-.';
  // get rid of leading/trailing spaces and horizontal tabs
  value = value.replace(/^[ \t]+|[ \t]+$/g, '');
  
  if (value.indexOf('.') !== value.lastIndexOf('.') || // more than one decimal point
    value.lastIndexOf('-') > 0 || // negative sign in wrong place
    value[0] === '.' || value[value.length - 1] === '.' || // start or end with decimal point
    value[0] === '0' && value[1] !== '.' && value !== '0' || // start with 0 and is not with decimals
    value[1] === '0' && value[2] !== '.' && value !== '0' && value[0] === '-') { // same as above test but for negative number
    return false;
  } 
  for (let i = 0; i < value.length; i++) {
    if (validChars.indexOf(value[i]) === -1) {
      return false;
    }
  }
  return true;
};

let arraystrToArray = function(array) {
  let ret = [];
  array = array.slice(1, array.length - 1);
  for (let i = 0; i < array.length; i++) { 
    if (array[i] === '"') {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] === '"' && array.slice(j - 1, j + 1) !== '\\"') {
          ret.push(array.slice(i, j + 1));
          i = j + 1;
          break;
        }
        if (j === array.length - 1) {
          return undefined;
        }
      }
    } else if (array[i] === '[') {      
      for (let j = i + 1; j < array.length; j++) {
        // the following if pattern is used multiple times below
        // it ensures nested patterns are parsed correctly, and not messed up by " or \"
        if (array[j] === ']' && (array.slice(i, j + 1).match(/\"/g) || []).length % 2 === 0 && 
          array.slice(i, j + 1).match(/\[/g).length === array.slice(i, j + 1).match(/\]/g).length) {
          ret.push(array.slice(i, j + 1));
          i = j + 1;
          break;
        }
        if (j === array.length - 1) {
          return undefined;
        }
      }
    } else if (array[i] === '{') {      
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] === '}' && (array.slice(i, j + 1).match(/\"/g) || []).length % 2 === 0 && 
          array.slice(i, j + 1).match(/\{/g).length === array.slice(i, j + 1).match(/\}/g).length) {
          ret.push(array.slice(i, j + 1));
          i = j + 1;
          break;
        }
        if (j === array.length - 1) {
          return undefined;
        }
      } 
    } else if (array[i] !== ' ') { 
      for (let j = i; j < array.length; j++) {
        if (array[j] === ',') {
          let numResult = array.slice(i, j);
          if (isValidNumber(numResult) || typeOfJSON(numResult) === 'boolean' || typeOfJSON(numResult) === 'null') {
            ret.push(numResult);
            i = j;
            break;
          } else {
            return undefined;
          }
        }
        if (j === array.length - 1) {
          let numResult = array.slice(i, j + 1);
          if (isValidNumber(numResult) || typeOfJSON(numResult) === 'boolean' || typeOfJSON(numResult) === 'null') {
            ret.push(numResult);
            i = j;
            break;
          } else {
            return undefined;
          }
        }
      }
    }
  } 
  return ret;
};

let objstrToKeyValuePairs = function(str) {
  let ret = {};
  let keys = [];
  let values = [];

  str = str.slice(1, str.length - 1);
  for (let i = 0; i < str.length; i++) { 
    if (str[i] === '"') {
      for (let j = i + 1; j < str.length; j++) {
        if (str[j] === '"' && str.slice(j - 1, j + 1) !== '\\"') {
          keys.push(str.slice(i, j + 1));
          i = j;
          break;
        }
        if (j === str.length - 1) {
          return undefined;
        }
      }
    } else if (str[i] === ':') {      
      for (let k = i + 1; k < str.length; k++) { 
        if (str[k] === '"') { 
          for (let j = k + 1; j < str.length; j++) {
            if (str[j] === '"') {
              values.push(str.slice(k, j + 1));
              k = str.length;
              i = j;
              break;
            }
            if (j === str.length - 1) {
              return undefined;
            }
          }
          break;
        } else if (str[k] === '[') { 
          for (let j = k; j < str.length; j++) {
            if (str[j] === ']' && (str.slice(k, j + 1).match(/\"/g) || []).length % 2 === 0 && 
              str.slice(k, j + 1).match(/\[/g).length === str.slice(k, j + 1).match(/\]/g).length)  {
              values.push(str.slice(k, j + 1));
              k = str.length;
              i = j;
              break;
            }
            if (j === str.length - 1) {
              return undefined;
            }
          }
          break;
        } else if (str[k] === '{') { 
          for (let j = k; j < str.length; j++) {
            if (str[j] === '}' && (str.slice(k, j + 1).match(/\"/g) || []).length % 2 === 0 && 
              str.slice(k, j + 1).match(/\{/g).length === str.slice(k, j + 1).match(/\}/g).length) {
              values.push(str.slice(k, j + 1));
              k = str.length;
              i = j;
              break;
            }
            if (j === str.length - 1) {
              return undefined;
            }
          }
          break;
        } else if (str[k] !== ' ') {
          for (let j = k; j < str.length; j++) {
            if (str[j] === ',') {
              let numResult = str.slice(k, j);
              if (isValidNumber(numResult) || typeOfJSON(numResult) === 'boolean' || typeOfJSON(numResult) === 'null') {
                values.push(numResult);
                k = str.length;
                i = j;
                break;
              } else {
                return undefined;
              }
            }
            if (j === str.length - 1) {
              let numResult = str.slice(k, j + 2);
              if (isValidNumber(numResult) || typeOfJSON(numResult) === 'boolean' || typeOfJSON(numResult) === 'null') {
                values.push(numResult);
                k = str.length;
                i = j;
              } else {
                return undefined;
              }
            }
          }
        }
      }
    } 
  }
  if (keys.length === values.length) {
    return [keys, values];
  } 
  return undefined;
};



