class DbConnector extends Base{

	constructor(scoreBoards){
		super();
		this.scoreBoards = scoreBoards;
	}

	writeFinishedMatchToDb(){
		this.db.writeMatchToDb(()=>{
			console.log('written to db');
			this.getLatestMatchIdFromDb();
		});
	}

	getLatestMatchIdFromDb(){
		this.db.getLatestMatchId((data)=>{
			this.writeFinishedMatchPlayersToDb(data[0].idMatch);
		});	
	}

	writeFinishedMatchPlayersToDb(matchId){
		console.log(matchId);
		for(var scoreBoard of this.scoreBoards){
			this.db.writePlayerToDb({
	        	name: scoreBoard.playerName,
	        	score: scoreBoard.totalScore,
	        	Matches_idMatch: matchId
  			});

  			console.log('written to db', scoreBoard.playerName);
		}
	}

	static get sqlQueries(){
    //
    // Please note: This part of the class is read by
    // the Node server on start so you can not build
    // queries dynamically here.
    //
    // But you can use ? as placeholders for parameters.
    //
    return {
      writeMatchToDb: `
        INSERT INTO matches VALUES (null) 
      `,
      getLatestMatchId: `
        SELECT idMatch FROM matches WHERE idMatch=(SELECT MAX(idMatch) FROM matches) 
      `,
      writePlayerToDb: `
        INSERT INTO players SET ?	
      `
    }
  }
}