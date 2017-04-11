class ScoreBoard {

	constructor(playerName, playerNumber, scoreBoardId){
		this.scoreBoardId = scoreBoardId;
		this.playerName = playerName;
		this.playerNumber = playerNumber;
		this.turnStarted = false;
		this.dices = [];  
		this.bonusScore = 0; 
		this.bonusUsed = 'false';
		this.bonus = 50; 
		this.totalScore = 0;
		this.totalRolls = 3;
		this.turnCounter = 0;

		this.dbConnection = new DbConnector();

		for(let i = 0; i < 5; i++) {
			let dice = new Dice(i);
			this.dices.push(dice);
		}	

	}

	writeScoreBoardToDb(){
		this.dbConnection.writeScoreBoardToDb(this);
	}
}
