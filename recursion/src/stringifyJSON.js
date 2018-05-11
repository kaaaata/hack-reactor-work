// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON=function(obj){
  if (obj===null){
  	return 'null';
  } else if (obj.constructor===Array){
    for (var i=0;i<obj.length;i++){
      obj[i]=stringifyJSON(obj[i]);
    }
    return '['+obj.toString()+']';
  } else if (obj.constructor===String){
    return '\"'+obj+'\"';
  } else if (obj.constructor===Number){
    return obj.toString();
  } else if (obj.constructor===Object){
    let ret='';
    for (var i in obj){
      if (typeof(obj[i])==='function'||obj[i]===undefined){
      	//do nothing
      } else {
        ret=ret+stringifyJSON(i)+':'+stringifyJSON(obj[i])+',';
      }
    }
    return '{'+ret.slice(0,-1)+'}';
  } else {
    return obj.toString();
  } 
    
};