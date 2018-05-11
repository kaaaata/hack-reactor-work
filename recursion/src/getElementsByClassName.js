// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

//use:
//document.body
//element.childNodes
//element.classList
var getElementsByClassName=function(className){
  var ret=[];

  var getElementsInNode=function(node){
  	if (node.classList&&node.classList.contains(className)){
  	  ret.push(node);
  	}
  	if (node.childNodes){
	  for (var i=0;i<node.childNodes.length;i++){
	    getElementsInNode(node.childNodes[i]);
	  }
	}
  }

  getElementsInNode(document.body);
  
  return ret;
};
