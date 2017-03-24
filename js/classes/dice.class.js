class Dice{
	
	constructor(diceNumber){
		this.currentValue = 0;
		this.locked = false;
		this.diceNumber = diceNumber;
		this.roll();
	}

	roll(){
		this.currentValue = Math.floor(Math.random() * 6) + 1;
	}
	
}