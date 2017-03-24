class Dice{
	
	constructor(diceNumber){
		this.currentValue = 0;
		this.roll();
		this.locked = false;
		this.diceNumber = diceNumber;
		this.roll();
	}

	roll(){
		this.currentValue = Math.floor(Math.random() * 6) + 1;
	}
	
	//Denna är inte klar appendar till body så länge
	writeDiceToDOM(){
		console.log(this.currentValue);
		switch(this.currentValue){
			case 1:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/1.png'>");
				break;
			case 2:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/2.png'>");
				break;
			case 3:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/3.png'>");
				break;
			case 4:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/4.png'>");
				break;
			case 5:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/5.png'>");
				break;
			case 6:
				$('body').append("<IMG data-id=" + this.diceNumber + " SRC='/img/6.png'>");
				break;
		}

	}

	clearDicesInDOM(){
		$('body').empty();
	}

}