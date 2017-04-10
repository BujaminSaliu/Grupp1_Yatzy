class PowerUp{
	constructor(name, power, charges, playerNumber, icon){
		this.name = name; //Name of the powerup. Useful for activation prompts 
		this.power = power; //Power acts as position in array as well for accessing
		this.charges = charges; //How many you have
		this.playerNumber = playerNumber;

		switch(icon){
			case "Remove Target Powerup":
				this.icon = "img/deletepower.png";
				break;
			case "Turn Score to 0":
				this.icon = "img/erase.png";
				break;
			case "Switch Score":
				this.icon = "img/exchange.png";
				break;
			case "Duplicate Powerup":
				this.icon = "img/duplicate.png";
				break;
			case "Randomize":
				this.icon = "img/randomize.png";
				break;
			case "Reduce Toss":
				this.icon = "img/minusthrow.png";
				break;
			case "Remove Dice":
				this.icon = "img/minusdice.png";
				break;
			case "Give Extra Toss":
				this.icon = "img/extrathrow.png";
				break;
			}



	}

	getIcon(){
		return this.icon;
	}

	setCharges(input){
		this.charges = input;
	}

	getCharges(){
		return this.charges;
	}

	getName(){
		return this.name;
	}
	getPower(){
		return this.power;
	}

	setActive(){ //Set the charges to a "active" state
		this.charges = 1;
	}
	getActive(){
		return (this.charges > 0); //Find out if a power is available or not
	}

	getPowerUp(){
		return this;
	}

	getPossiblePowerups(){
		//Tier list of T3, T2, T1 T3 = Yathzee, T2 = Bonus, T1 = Base
		return [["Remove Target Powerup", "Turn Score to 0", "Switch Score"], ["Duplicate Powerup", "Randomize",
		"Reduce Toss"], ["Remove Dice", "Give Extra Toss", "Steal Time"]];
	}
}