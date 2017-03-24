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
		switch(this.currentValue){
			case 1:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/1.png'>");
				break;
			case 2:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/2.png'>");
				break;
			case 3:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/3.png'>");
				break;
			case 4:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/4.png'>");
				break;
			case 5:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/5.png'>");
				break;
			case 6:
				$('#dice-container-' + `${this.diceNumber}`).append("<IMG data-id=" + this.diceNumber + " SRC='/img/6.png'>");
				break;
		}

	}

	clearDicesInDOM(){
		$('#dices-in-play').empty();
	}

}
}

$( document ).ready(function() {

	document.getElementById("clickMe").onclick = function fun()
    {
    	this.roll();
    }
    console.log( "ready!" );
});
