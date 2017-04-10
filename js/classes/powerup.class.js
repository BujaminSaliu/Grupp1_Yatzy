class PowerUp{
	constructor(name, power, charges, playerNumber, icon){
		this.name = name; //Name of the powerup. Useful for activation prompts 
		this.power = power; //Power acts as position in array as well for accessing
		this.charges = charges; //How many you have
		this.playerNumber = playerNumber;
		this.icon = icon;



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
		//Tier list of T3, T2, T1
		return [["Remove Target Powerup", "Turn Score to 0", "Switch Score"], ["Duplicate Powerup", "Randomize",
		"Reduce Toss"], ["Remove Dice", "Give Extra Toss"]];
	}
}