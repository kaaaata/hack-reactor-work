// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.
 	const DINERS_CLUB = {prefix:["38","39"], length:[14]}
 	const AMERICAN_EXPRESS = {prefix:["34","37"], length:[15]}
 	const VISA = {prefix:["4"], length:[13,16,19]}
 	const MASTERCARD = {prefix:["51","52","53","54","55"], length:[16]}
 	const DISCOVER = {prefix:["6011","644","645","646","647","648","649","65"], length:[16,19]}
 	const MAESTRO = {prefix:["5018","5020","5038","6304"], length:[12,13,14,15,16,17,18,19]}
 	const CHINA_UNIONPAY = {prefix:["624","625","626"],length:[16,17,18,19]}
 	const SWITCH = {prefix:["4903","4905","4911","4936","564182","633110","6333","6759"], length:[16,18,19]}

 	for (var i=622126;i<=622925;i++) {
 		CHINA_UNIONPAY.prefix.push(i.toString())
 	}
 	for (var i=6282;i<=6288;i++) {
 		CHINA_UNIONPAY.prefix.push(i.toString())
 	}

 	let firstNum = cardNumber.slice(0,1);
 	let firstTwoNums = cardNumber.slice(0,2);
 	let firstThreeNums = cardNumber.slice(0,3);
 	let firstFourNums = cardNumber.slice(0,4);
 	let firstSixNums = cardNumber.slice(0,6);
 	let length = cardNumber.length;

	if (DINERS_CLUB.prefix.indexOf(firstTwoNums)>-1&&DINERS_CLUB.length.indexOf(length)>-1) {
		return "Diner's Club";
	} else if (AMERICAN_EXPRESS.prefix.indexOf(firstTwoNums)>-1&&AMERICAN_EXPRESS.length.indexOf(length)>-1) {
		return "American Express";
	} else if (MASTERCARD.prefix.indexOf(firstTwoNums)>-1&&MASTERCARD.length.indexOf(length)>-1) {
		return "MasterCard";
	} else if ((DISCOVER.prefix.indexOf(firstTwoNums)>-1||
		        DISCOVER.prefix.indexOf(firstThreeNums)>-1||
		        DISCOVER.prefix.indexOf(firstFourNums)>-1)&&DISCOVER.length.indexOf(length)>-1) {
		return "Discover";
	} else if (MAESTRO.prefix.indexOf(firstFourNums)>-1&&MAESTRO.length.indexOf(length)>-1) {
		return "Maestro";
	} else if ((CHINA_UNIONPAY.prefix.indexOf(firstThreeNums)>-1||
		        CHINA_UNIONPAY.prefix.indexOf(firstFourNums)>-1||
		        CHINA_UNIONPAY.prefix.indexOf(firstSixNums)>-1)&&CHINA_UNIONPAY.length.indexOf(length)>-1) {
		return "China UnionPay";
	} else if ((SWITCH.prefix.indexOf(firstFourNums)>-1||
		        SWITCH.prefix.indexOf(firstSixNums)>-1)&&SWITCH.length.indexOf(length)>-1) {
		return "Switch";
	} else if (VISA.prefix.indexOf(firstNum)>-1&&VISA.length.indexOf(length)>-1) {
		return "Visa";
	}
	return "Unknown Card";
};

