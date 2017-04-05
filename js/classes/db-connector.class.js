class DbConnector extends Base{

	constructor(){
		super();
	}

	writeFinishedMatchToDb(scoreBoards){
		this.db.writeMatchToDb(()=>{
			console.log('written to db');
			this.getLatestMatchIdFromDb(scoreBoards);
		});
	}

	getLatestMatchIdFromDb(scoreBoards){
		this.db.getLatestMatchId((data)=>{
			this.writeFinishedMatchPlayersToDb(data[0].idMatch, scoreBoards);
		});	
	}

	writeFinishedMatchPlayersToDb(matchId, scoreBoards){
		console.log(matchId);
		for(var scoreBoard of scoreBoards){
			this.db.writePlayerToDb({
	        	name: scoreBoard.playerName,
	        	score: scoreBoard.totalScore,
	        	Matches_idMatch: matchId
  			});

  			console.log('written to db', scoreBoard.playerName);
		}
	}

	getPreviousMatches(){
		this.db.getPreviousPlayers((players)=>{
			console.log(players);
			return players;
		});		
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
      `,
      getPreviousPlayers: `
        SELECT * FROM players	
      `
    }
  }
}