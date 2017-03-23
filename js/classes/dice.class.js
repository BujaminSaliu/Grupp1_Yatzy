class Dice{
	
	constructor(diceNumber){
		this.currentValue = this.roll();
		this.locked = false;
		this.diceNumber = diceNumber;
	}

	roll(){
		return Math.floor(Math.random() * 6) + 1;
	}
	
}