var BloomFilter = function() {

  this.bitArray = Array(18);
  this.bitArray.fill(false);

};

BloomFilter.prototype.insert = function(value) {
  this.bitArray[this.hashMix5(value, 18)] = true;
  this.bitArray[this.hashMix10(value, 18)] = true;
  this.bitArray[this.hashMix15(value, 18)] = true;
};

BloomFilter.prototype.retrieve = function(value) {
  var hashMix5Recognises = this.bitArray[this.hashMix5(value, 18)] === true;
  var hashMix10Recognises = this.bitArray[this.hashMix10(value, 18)] === true;
  var hashMix15Recognises = this.bitArray[this.hashMix15(value, 18)] === true;

  if (hashMix5Recognises && hashMix10Recognises && hashMix15Recognises) {
    return true;
  } else {
    return false;
  }

};

BloomFilter.prototype.hashMix5 = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

BloomFilter.prototype.hashMix10 = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 10) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

BloomFilter.prototype.hashMix15 = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 15) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};