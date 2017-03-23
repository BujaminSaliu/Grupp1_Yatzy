class Dice{
	
	constructor(diceNumber){
		this.currentValue = this.roll();
		this.locked = false;
		this.diceNumber = diceNumber;
	}

	roll(){
		return Math.floor(Math.random() * 6) + 1;
	}
	
	//Denna är inte klar
	writeDiceToDOM(){

	switch(this.currentValue){
		case 1:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='1.png'>");
			break;
		case 2:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='2.png'>");
			break;
		case 3:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='3.png'>");
			break;
		case 4:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='4.png'>");
			break;
		case 5:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='5.png'>");
			break;
		case 6:
			document.write("<IMG data-id=" + this.diceNumber + " SRC='6.png'>");
			break;

	}

}
}