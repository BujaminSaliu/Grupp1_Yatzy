class ScoreBoard {

	constructor(playerName, playerNumber){
		this.playerName = playerName;
		this.dices = [];  
		this.bonusScore = 0; 
		this.bonusUsed = 'false';
		this.bonus = 50; 
		this.totalScore = 0;
		this.totalRolls = 3;
		this.timer = 300;
		this.minutes = 0;
		this.seconds = 0;
		this.powerUps = [];
		this.playerNumber = playerNumber;

		//Push to powerUps the Powerups you wish to add, just make their power attribute
		//corespond to their tier level to allow for easy access in terms of get/set

		for(let i = 0; i < 5; i++) {
		let dice = new Dice(i);
		this.dices.push(dice);
		}	

	}

	getPlayerNumber(){
		return this.playerNumber;
	}
}
