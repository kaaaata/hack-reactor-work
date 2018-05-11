class RetiredForagerBee extends ForagerBee {

  constructor() {
  	super();
  	this.age = 40;
  	this.job = 'gamble';
  	this.canFly = false;
  	this.color = 'grey';
  	this.gamble = this.forage;
  	this.forage = () => ('I am too old, let me play cards instead');
  };

};