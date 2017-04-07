$(init);

function init(){
	var dbConnection = new DbConnector();
	addPlayer(dbConnection);
}

function addPlayer(dbConnection){
	dbConnection.checkIfActiveMatch(setSessionStorage);
}

function setSessionStorage(){
	var dbConnection = new DbConnector();
	dbConnection.getNumOfPlayers(function(numOfPlayers){
		console.log(numOfPlayers);
		sessionStorage.playerNumber = numOfPlayers[0].num_of_players - 1;
		sessionStorage.matchId = numOfPlayers[0].idMatch;
	});
	console.log('Det som står efter detta kommer sist');
	dbConnection.getHighScore(start);
}

function start(players) {
	writeScoresToHighScores(players);
	console.log(sessionStorage, sessionStorage.length);
	if(sessionStorage.length > 0){
		$('#myModal').modal('show');
		$('#joinGame').hide();

		if(sessionStorage.playerNumber > 0){
			$('#startGame').hide();
			$('#joinGame').show();
		}

		$('.help').click(function() {
	    	$("#getHelp").modal('show');
		});
		
		$('.close').click(function(){
			$('#getHelp').modal('hide');
		});

		$('#startGame').on('click', function(){
			if(checkInputFields()){
				var dbConnection = new DbConnector();
				dbConnection.readScoreBoardFromDb(createScoreboards);
			}
		});

		$('#joinGame').on('click', function(){
			if(checkInputFields()){
				var dbConnection = new DbConnector();
				new ScoreBoard($('#playerName').val(), sessionStorage.playerNumber);
				$('#joinGame').hide();
			}
		});

		$('#numOfPlayers').change(function(){
			let optionValue = $(this).val();
			provideInputFields(optionValue); 
		});


		$('#roll-dices').on('click', function(){
			currentGame.testRoll();
		});

		$('.dice-container').on('click', function(){
			let splittedId = this.id.split('-');

			let foundDice = $('#check-container-'+splittedId[2]);
			let foundDiceId = $(this).find("img").attr('data-id');

			if(!($('#check-container-' + splittedId[2]).attr('locked') === 'true')){
				var audio = new Audio('audio/locking-sound.mp3');
				audio.play();
				$('#check-container-' + splittedId[2]).attr('locked', 'true');
				foundDice.append('<IMG data-id=' + foundDiceId + ' SRC=img/padlock.png>');
				foundDice.addClass('AnimateLock');
				
				
			} else {
				$('#check-container-' + splittedId[2]).attr('locked', false);
				$('#check-container-'+splittedId[2]+ ' img').remove();
				
				let foundDice = $('#check-container-'+splittedId[2]);
				foundDice.removeClass('AnimateLock');

			}
		});
	}
}

function writeScoresToHighScores(players){
	$('.top-ten').append('<ol class="list-group"/>');
	let highScorePlacement = 1;
	for(player of players){
		$('.top-ten>ol').append(`
			<li class="list-group-item">${highScorePlacement}. ${player.name} ${player.score} poäng</li>
		`)
		highScorePlacement++;
	}
}
	$('.help').click(function() {
    	$("#getHelp").modal('show');
});
	$('.close').click(function(){
		$('#getHelp').modal('hide');
	});

function provideInputFields(numOfPlayers){
	$('.playerValues').empty();
	for(let i = 1; i <= numOfPlayers; i++){
		$('.playerValues').append(`
			 <input type="text" placeholder='Namn spelare ${i}'> 
		`);
	}
}

function createScoreboards(scoreBoardsFromDb){
	console.log('Info från bd', scoreBoardsFromDb);
	this.scoreBoards = [];

	scoreBoards.push(new ScoreBoard($('#playerName').val(), sessionStorage.playerNumber));
	
 	for(let i = 0; i < scoreBoardsFromDb.length; i++){
 		let scoreBoard = new ScoreBoard(scoreBoardsFromDb[i].player_name, scoreBoardsFromDb[i].player_number);
 		scoreBoards.push(scoreBoard);
 	}
	
	$('#myModal').modal('hide');
		this.currentGame = new Game(this.scoreBoards);

		let listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'bonus', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

		for (let i = 0; i < listOfBonusScores.length; i++) {
			for(let j = 0; j < currentGame.scoreBoards.length; j++){
				var elementFound = document.getElementById(j + '-' +  listOfBonusScores[i]);
				if(!(i===6 || i===listOfBonusScores.length-1 || i===7)){
					elementFound.style.cursor = "pointer";
					elementFound.setAttribute('disabled', false);
				}
				else{
					elementFound.setAttribute('disabled', true);
				}
			}

		}
		this.currentGame.testRoll();
}

function checkInputFields(){
	var correctInput = true;
	$('.playerValues').children().each(function(){
		console.log($('.playerValues').children());
		if($.trim($(this).val()).length == 0){
			$('.errorMessage').html('Ange ett namn för inputfält, eller minska antalet spelare.');
			correctInput = false;
		}
	
	});

	return correctInput;
}









