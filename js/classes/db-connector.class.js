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

	getHighScore(callback){
		this.db.getHighScore((players)=>{
			console.log('High score', players);
			callback(players);
		});	

	}

	checkIfActiveMatch(callback){
		this.db.checkIfActiveMatch((match)=>{
			if(match.length > 0){
				this.getNumOfPlayers((numOfPlayers)=>{
					if(numOfPlayers[0].num_of_players < 4){
						this.getCurrentMatch(callback);
					}else{
						$('#gameFullModal').modal('show');
					}
				});
			} else {
				this.createMatch(callback);
			}
			
		});	
	}

	createMatch(callback){
		this.db.startNewGame(()=>{
			console.log('Creating match!');
			callback();
		});
	}

	getCurrentMatch(callback){
		this.db.getCurrentMatch((current_match)=>{
			this.addPlayer(current_match[0].matchId, callback);	
			sessionStorage.matchId = current_match[0].matchId;
		});
	}

	addPlayer(match, callback){
		this.db.addPlayer({
			idMatch: match	
		},()=>{
			callback();	
		});		
	}

	removePlayer(match){
		this.db.removePlayer({
			idMatch: match
		});		
	}

	getNumOfPlayers(callback){
		this.db.getNumOfPlayers((numOfPlayers)=>{
			callback(numOfPlayers);
		});	
	}

	writeScoreBoardToDb(scoreBoard){
		console.log(scoreBoard, sessionStorage.matchId);
		this.db.writeScoreBoardToDbInsert({
			player_name: scoreBoard.playerName,
			Current_match_idMatch: parseInt(sessionStorage.matchId),
			player_number: parseInt(sessionStorage.playerNumber)
		});
	}

	readScoreBoardFromDb(callback){
		this.db.readScoreBoardFromDb((scoreboards)=>{
			console.log(scoreboards);
			callback(scoreboards);
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
      getHighScore: `
        SELECT * FROM players ORDER BY score DESC LIMIT 10	
      `,
      checkIfActiveMatch: `
      	SELECT * FROM current_match  	
      `,
      startNewGame: `
      	INSERT INTO current_match(current_player, num_of_players) VALUES (0, 1)
      `,
      getCurrentMatch: `
      	SELECT MAX(idMatch) AS matchId FROM current_match
      `, 
      addPlayer: `
      	UPDATE current_match SET num_of_players = num_of_players + 1 WHERE ?
      `,
      removePlayer: `
      	UPDATE current_match SET num_of_players = num_of_players - 1 WHERE ?
      `,
      getNumOfPlayers: `
      	SELECT * FROM current_match WHERE idMatch = (SELECT MAX(idMatch) FROM current_match)
      `,
      writeScoreBoardToDbInsert: `
      	INSERT Scoreboards SET ?
      `,
      writeScoreBoardToDbUpdate: `

      `,
      readScoreBoardFromDb: `
      	SELECT * FROM Scoreboards
      `

    }
  }
}