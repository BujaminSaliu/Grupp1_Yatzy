class usedPowerUp{
	constructor(name, target, icon, castBy){
		this.name = name; //Name of the powerup. Useful for activation prompts 
		this.target = target;
		this.icon = icon;
		this.castBy = castBy;
	}

	getName(){
		return this.name;
	}

	getIcon(){
		return this.icon;
	}

	getTarget(){
		return this.target;
	}

	getCastBy(){
		return this.castBy;
	}
}