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
		console.log('SCOREBOARDS', scoreBoards);
		this.db.getLatestMatchId((data)=>{
			this.writeFinishedMatchPlayersToDb(data[0].idMatch, scoreBoards);
		});	
	}

	writeFinishedMatchPlayersToDb(matchId, scoreBoards){
		console.log(matchId);
		
		for(var scoreBoard of scoreBoards){
			console.log('SECOND SCOREBOARDS', scoreBoard.player_name, scoreBoard.totalSum, scoreBoard.Current_match_idMatch, scoreBoard);
			this.db.writePlayerToDb({
	        	name: scoreBoard.player_name,
	        	score: scoreBoard.totalSum,
	        	Matches_idMatch: matchId
  			});
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
			console.log('wellwell', match);
			if(match.length > 0){
				console.log('does this happen?');
				this.getNumOfPlayers((numOfPlayers)=>{
					console.log('well?', numOfPlayers);
					if(numOfPlayers[0].num_of_players < 4 && numOfPlayers[0].started === "false"){
						this.getCurrentMatch(callback);
					}else{
						this.createMatch(callback);
					}
				});
			} else {
				this.createMatch(callback);
			}
			
		});	
	}

	createMatch(callback){
		this.db.createNewGame(()=>{
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

	readScoreBoardFromDb(callback, activeGame){
		console.log('nnnnn', activeGame);
		this.db.readScoreBoardFromDb({
			Current_match_idMatch: parseInt(sessionStorage.matchId)	
		},(scoreboards)=>{
			console.log('hugahugahuga', scoreboards);
			callback(scoreboards, activeGame);	
		});	
	}

	getGameState(callback){

		this.db.getGameState((gameState)=>{
			console.log('whatadefacka', gameState);
			callback(gameState);	
		});	

	}

	setGameState(match){
		this.db.setGameState({
			idMatch: match	
		});
	}

	cancelGame(match){
		this.db.cancelGame({
			idMatch: match	
		});
	}

	endGame(match){
		this.db.endGame({
			idMatch: match	
		});
	}

	writeScoreBoardToDbUpdate(arrayOfScores){
		console.log('skrivs till db', arrayOfScores);
		this.db.writeScoreBoardToDbUpdate(
			[arrayOfScores[0], arrayOfScores[1], arrayOfScores[2], arrayOfScores[3], arrayOfScores[4], arrayOfScores[5]]
		);
	}

	updateCurrentPlayer(currentPlayer){
		console.log(currentPlayer);
		this.db.updateCurrentPlayer({
			current_player: currentPlayer	
		});	
	}

	writeDiceToDbInsert(dices){
		console.log('pls dices');
		for(let dice of dices){
			let stringboolean = 'true';
			if(dice.locked === true){
				stringboolean = 'true';
			}else{
				stringboolean = 'false';
			}
			console.log('!!!!!', dice);
			this.db.writeDiceToDbInsert({
			locked: stringboolean,
			value: dice.currentValue,
			dice_number: dice.diceNumber,
			player_number: parseInt(sessionStorage.playerNumber),
			total_rolls: 3,
			Scoreboards_idScoreboards: parseInt(sessionStorage.idScoreboards),
			Scoreboards_Current_match_idMatch: parseInt(sessionStorage.matchId)
			});
		}
	}

	writeDiceToDbUpdate(dices, activeGame){
		for(let dice of dices){
			console.log('updated dice!', dice, activeGame);
			let stringboolean = 'true';
			if(dice.locked === true){
				stringboolean = 'true';
			}else{
				stringboolean = 'false';
			}
			this.db.writeDiceToDbUpdate(
				[stringboolean, dice.currentValue, parseInt(sessionStorage.playerNumber), activeGame.scoreBoards[activeGame.currentPlayer].totalRolls, parseInt(sessionStorage.idScoreboards), dice.diceNumber]
			);
		}
	
	}

	readDiceFromDb(callback, activeGame){
		this.db.readDiceFromDb((dices)=>{
			callback(dices, activeGame);
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
      	SELECT * FROM current_match WHERE idMatch=(SELECT MAX(idMatch) FROM current_match)	
      `,
      createNewGame: `
      	INSERT INTO current_match(current_player, num_of_players, started, game_over, cancel_game) VALUES (0, 1, 'false', 'false', 'false')
      `,
      getCurrentMatch: `
      	SELECT MAX(idMatch) AS matchId FROM current_match
      `, 
      addPlayer: `
      	UPDATE current_match SET num_of_players = num_of_players + 1 WHERE ?
      `,
      getNumOfPlayers: `
      	SELECT * FROM current_match WHERE idMatch = (SELECT MAX(idMatch) FROM current_match)
      `,
      writeScoreBoardToDbInsert: `
      	INSERT Scoreboards SET ?
      `,
      writeScoreBoardToDbUpdate: `
      	UPDATE Scoreboards SET ??=?, sum = ?, bonus = ?, totalSum = ? WHERE idScoreboards = ?
      `,
      writeDiceToDbInsert: `
      	INSERT INTO Dices SET ?
      `,
      writeDiceToDbUpdate: `
      	UPDATE Dices SET locked = ?, value = ?, player_number = ?, total_rolls = ? WHERE Scoreboards_idScoreboards = ? AND dice_number = ?
      `,
      readScoreBoardFromDb: `
      	SELECT * FROM Scoreboards WHERE ?
      `,
      readDiceFromDb: `
      	SELECT * FROM Dices
      `,
      getGameState: `
      	SELECT * FROM current_match WHERE idMatch = (SELECT MAX(idMatch) FROM current_match)
      `,
      endGame: `
      	UPDATE current_match SET game_over = 'true' WHERE ?
      `,
      setGameState: `
      	UPDATE current_match SET started = 'true' WHERE ?
      `,
      cancelGame: `
      	UPDATE current_match SET cancel_game = 'true', started = 'true' WHERE ?
      `,
      updateCurrentPlayer: `
      	UPDATE current_match SET ?
      `

    }
  }
}