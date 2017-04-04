class ScoreBoard {

	constructor(playerName){
		this.playerName = playerName;
		this.dices = [];  
		this.bonusScore = 0; 
		this.bonusUsed = 'false';
		this.bonus = 50; 
		this.totalScore = 0;
		this.totalRolls = 3;
		this.turnCounter = 0; 

		for(let i = 0; i < 5; i++) {
			let dice = new Dice(i);
			this.dices.push(dice);
		}	

	}
}
