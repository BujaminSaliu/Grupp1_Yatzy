class ScoreBoard {

	constructor(playerName){
		this.playerName = playerName;
		this.dices = [];  
		this.bonusScore = 0; 
		this.bonus = 50; 
		this.totalScore = 0;

		for(let i = 0; i < 5; i++) {
		let dice = new Dice(i);
		this.dices.push(dice);
		}	

	}
}
