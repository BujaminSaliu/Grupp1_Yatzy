class Dice{
	constructor(diceNumber){
		this.currentValue = Math.floor(Math.random() * 6) + 1;
		this.locked = false;
		this.diceNumber = diceNumber;
		

	}

	Roll(){

		if(this.locked){

			return false;
		}
		
		
		this.currentValue = Math.floor(Math.random() * 6) + 1;

		switch(this.currentValue){
			case 1:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='1.png'>");
				this.locked = true;
				
				break;
			case 2:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='2.png'>");
				break;
			case 3:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='3.png'>");
				
				this.locked = true;
				break;
			case 4:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='4.png'>");
				break;
			case 5:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='5.png'>");
				this.locked = true;
				
				break;
			case 6:
				document.write("<IMG data-id=" + this.diceNumber + " SRC='6.png'>");
				break;
			}

	}


}