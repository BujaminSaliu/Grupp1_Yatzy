class Game{
	
	constructor(scoreBoards){
		this.scoreBoards = scoreBoards;
		this.currentPlayer = 0;
		this.turnActive = true;
		this.gameOver = 'false';
		this.resultDisplayed = false;
		this.currentRolls = 3;
		this.maxRolls = 3;
		//array used to loop through Ids
		this.listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'bonus', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

		//loop that sets scores the first round since the elements start off being disabled
		//and therefor will not get a value before the first assigning of a value
		for(let i = 0; i < this.scoreBoards.length; i++){
			$('#'+ i + '-sum').append(this.scoreBoards[i].bonusScore);
			$('#'+ i + '-totalSum').append(this.scoreBoards[i].bonusScore);
			$('#'+ i + '-bonus').append("-");
			//Saves, cuts the playernames to 4 letters and adds it to the right place in the scoreboard
			var shortName = this.scoreBoards[i].playerName;
            if(shortName.length > 2){
            shortName = shortName.substring(0,2);
            }
			$('#'+ 'player' + (i+1) ).html(shortName+'...');
		}

		this.dbConnection = new DbConnector();
	}

	countNumberOfDiceSideOccurences(){ 
		let numbersOfEachOccurences = []; 
		let amountOfOnes = 0; 
		let amountOfTwos = 0; 
		let amountOfThrees = 0; 
		let amountOfFours = 0; 
		let amountOfFives = 0; 
		let amountOfSixes = 0; 

		for(let dice of this.scoreBoards[this.currentPlayer].dices){ 
			
			switch(dice.currentValue){ 
				case 1: 
				amountOfOnes += 1;
				break;
				case 2:
				amountOfTwos += 1;
				break;
				case 3:
				amountOfThrees += 1;
				break;
				case 4:
				amountOfFours += 1;
				break;
				case 5:
				amountOfFives += 1;
				break;
				case 6:
				amountOfSixes += 1;
				break;
			}
		}

		numbersOfEachOccurences.push(amountOfOnes); 
		numbersOfEachOccurences.push(amountOfTwos);
		numbersOfEachOccurences.push(amountOfThrees);
		numbersOfEachOccurences.push(amountOfFours);
		numbersOfEachOccurences.push(amountOfFives);
		numbersOfEachOccurences.push(amountOfSixes);

		return numbersOfEachOccurences; 
	}		

	filterOnes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[0] * 1);
	}

	filterTwos(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[1] * 2);
	}

	filterThrees(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[2] * 3);
	}

	filterFours(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[3] * 4);
	}

	filterFives(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[4] * 5);
	}

	filterSixes(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		return (numbersOfEachOccurences[5] * 6);
	}
	
	filterOnePair(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 2) {
				points = (i+1) * 2;
			}
		}

		return points;  
	}

	filterTwoPairs(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] >= 2) {
				points += (i+1) * 2;
				pairs += 1;
			}
		}

		if(pairs > 1){ 
			return points; 
		}else{ 
			return 0;
		}
	}

	filterThreeOfAKind(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0;	

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 3) {
				points = (i+1) * 3;
			}
		}

		return points;
	}

	filterFourOfAKind(){
		let  numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;

		for (let i = 0; i < numbersOfEachOccurences.length; i++) {
			if (numbersOfEachOccurences[i] >=4){
				points += (i + 1) * 4;
			}
		}

		return points;
	}

	filterSmallStraight(){
		let points = 0;
		let found1 = false;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 1){
				found1 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
		}

		if(found1 && found2 && found3 && found4 && found5){
			points = 15;
		}

		return points;
	}

	filterLargeStraight(){
		let points = 0;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;
		let found6 = false;

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].dices.length; i++){
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 5){
				found5 = true;
			}
			if(this.scoreBoards[this.currentPlayer].dices[i].currentValue === 6){
				found6 = true;
			}
		}

		if(found2 && found3 && found4 && found5 && found6){
			points = 20;
		}

		return points;
	}

	filterFullHouse(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let hasPair = false;
		let hasThreeOfAKind = false;
		let pointsFromPair = 0;
		let pointsFromThreeOfAKind = 0;
		let points = 0;

		//Cant reuse one-pair-filter, need the only side-occurence === 2 not >=2
		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] === 2) {
				pointsFromPair = (i+1) * 2;
			}
		}

		//However three-of-a-kind-filter can be reused because you can only have one three-of-a-kind
		pointsFromThreeOfAKind = this.filterThreeOfAKind();
		
		if (pointsFromPair != 0 && pointsFromThreeOfAKind != 0) {
			points = pointsFromPair + pointsFromThreeOfAKind;
		}

		return points;
	}

	filterChance(){
		let numbers = this.countNumberOfDiceSideOccurences();
		let points = 0;
		for(let i = 0; i < numbers.length; i++){
			points = points + (numbers[i] * (i+1)); 
		}

		return points;
	}


	filterYatzy(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0;

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] === 5){
				return 50;
			}

		}

		return 0;
	}

	checkBonus(){
		if(this.scoreBoards[this.currentPlayer].bonusScore >= 63 && 
			this.scoreBoards[this.currentPlayer].bonusUsed === 'false'){
		
			this.scoreBoards[this.currentPlayer].totalScore += 50;	
			this.scoreBoards[this.currentPlayer].bonusUsed = true;
			$('#'+ this.currentPlayer + '-bonus').empty();
			$('#'+ this.currentPlayer + '-bonus').append(this.scoreBoards[this.currentPlayer].bonus);
		}
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcTotalScore(numToAdd){
		this.scoreBoards[this.currentPlayer].totalScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-totalSum').empty();
		$('#'+ this.currentPlayer + '-totalSum').append(this.scoreBoards[this.currentPlayer].totalScore)
	}

	//function empties and reappends the value in order to update the score before
	//the currentPlayer is updated, otherwise the previous score is added to the next player
	calcBonusScore(numToAdd){
		this.scoreBoards[this.currentPlayer].bonusScore += numToAdd;
		this.checkBonus();
		$('#'+ this.currentPlayer + '-sum').empty();
		$('#'+ this.currentPlayer + '-sum').append(this.scoreBoards[this.currentPlayer].bonusScore)
		
	}

	//adds an event for each function that assigns the correct value to the element when clicked
	createEventForElement(){
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
			
			console.log('wat');

			//to make activeGame a reference to the current Game object since we need to use the 
			//"this" argument when retrieving info from the element
			let activeGame = this;

			if(!(i===6 || i===this.listOfBonusScores.length-1 || i===7)){
				$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).bind("click", function(){

					

					let splittedId = $(this).attr('id').split('-');


					if(splittedId[0] == parseInt(sessionStorage.playerNumber) && sessionStorage.playerNumber == activeGame.currentPlayer){
						let currentElement = document.getElementById($(this).attr('id'));

						if(currentElement.getAttribute('disabled') === 'false'){
							currentElement.setAttribute('disabled','true');
							currentElement.style.color = "black";

							let listOfScores = [];
							listOfScores.push(splittedId[1]);
							listOfScores.push(parseInt($(this).text()));

							if (splittedId[1]<7) {
								listOfScores.push(activeGame.scoreBoards[activeGame.currentPlayer].bonusScore+parseInt($(this).text()));
								if(activeGame.scoreBoards[activeGame.currentPlayer].bonusScore+parseInt($(this).text()) >= 63){
									listOfScores.push(activeGame.scoreBoards[activeGame.currentPlayer].bonus);
								}
								else{
									listOfScores.push(null);
								}
							}
							else{
								listOfScores.push(activeGame.scoreBoards[activeGame.currentPlayer].bonusScore);
								listOfScores.push(null);
							}

							listOfScores.push(activeGame.scoreBoards[activeGame.currentPlayer].totalScore+parseInt($(this).text()));




							listOfScores.push(activeGame.scoreBoards[activeGame.currentPlayer].scoreBoardId);


							activeGame.dbConnection.writeScoreBoardToDbUpdate(listOfScores);

							//sets totalRolls to 0 since the turn is over after choosing
							//a points option
							activeGame.scoreBoards[activeGame.currentPlayer].totalRolls = 0;

							if (splittedId[1]<7) {

								activeGame.calcBonusScore(parseInt($(this).text()));
							}

							activeGame.calcTotalScore(parseInt($(this).text()));

							//unchecks dices and prepares for the next player
							activeGame.uncheckDices();
							activeGame.endTurn();
						}
					}
				});

			}
		}

	}


	removeEventForElement(){
		console.log('remove shit');
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
		

			if(!(i===6 || i===this.listOfBonusScores.length-1 || i===7)){
				$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).unbind();
			}
		}
	}


	//prints possible outcomes, ignoring the elements that have previously
	//been disabled
	possibleOutcomes(){
		console.log(this.currentPlayer);

		this.emptyScoreBoard();
		
		this.createEventForElement();

		//array of all methods to be applied when calculating a score
		//to be displayed
		let filterMethods = [
		this.filterOnes(), this.filterTwos(), this.filterThrees(),
		this.filterFours(), this.filterFives(), 
		this.filterSixes(), this.scoreBoards[this.currentPlayer].bonusScore, 
		this.scoreBoards[this.currentPlayer].bonus,
		this.filterOnePair(), this.filterTwoPairs(), 
		this.filterThreeOfAKind(), this.filterFourOfAKind(),
		this.filterSmallStraight(), this.filterLargeStraight(),
		this.filterFullHouse(), this.filterChance(), this.filterYatzy(),
		this.scoreBoards[this.currentPlayer].totalScore
		];


		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);
			let currentMethod = filterMethods[i];

			//if check that excludes the score boxes
			if(!(i===6 || i===this.listOfBonusScores.length-1 || i ===7)){

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).append(currentMethod);
					elementFound.style.color="lightgrey";
				}
			}
		}
	}

	emptyScoreBoard(){

		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			for(let j = 0; j < this.scoreBoards.length; j++){
				let elementFound = document.getElementById(j + '-' +  this.listOfBonusScores[i]);

				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ j + '-' +  this.listOfBonusScores[i]).empty();
				}
			}
		}

	}
	resetDiceAnimation(){
		for(let dice of this.scoreBoards[this.currentPlayer].dices) {
				
				let element = $("#dice-container-0");
				console.log(element);
				element.removeClass("animateDice");
	}
}

	testRoll() {

		var dbConnection = new DbConnector();

		console.log('new turn! current player is: ', this.currentPlayer);
		if(parseInt(sessionStorage.playerNumber) === this.currentPlayer){
			if(this.scoreBoards[this.currentPlayer].totalRolls > 0){
				this.scoreBoards[this.currentPlayer].totalRolls--;
				this.lockCheckedDices();
				for(let dice of this.scoreBoards[this.currentPlayer].dices) {
					dice.clearDicesInDOM();
					dice.roll();
					dice.writeDiceToDOM();

					if(!($('#check-container-' + dice.diceNumber).attr('locked') === 'true')){
						$("#dice-container-" + dice.diceNumber).addClass("animateDice" + dice.diceNumber);
					}	

					let element = document.getElementById("dice-container-" + dice.diceNumber);
					console.log("for sparta", element);
					element.addEventListener('animationend', function(){
						let splittedId = this.id.split('-');
						$(this).removeClass("animateDice" + splittedId[2]);
						let rollDicesElement = document.getElementById('roll-dices');
						rollDicesElement.setAttribute('rolling', 'false');
					});
				}

				this.possibleOutcomes();
			}else{
				console.log('Player ' + (this.currentPlayer+1) +', you are out of rolls, choose an option!');
			}

		}

		this.scoreBoards[this.currentPlayer].turnStarted = true;
		if(this.currentPlayer === parseInt(sessionStorage.playerNumber)){
			let activeGame = this;
			this.dbConnection.writeDiceToDbUpdate(this.scoreBoards[this.currentPlayer].dices, activeGame);
		}
		

	}

	lockCheckedDices() {
		var checkBoxes = $('.check-container');
		for(let checkBox of checkBoxes) {

			var splittedId = checkBox.id.split('-');

			var idToLockOrUnLock = splittedId[2];

			if(checkBox.getAttribute('locked') === 'true') {
	
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].lockDice();
			} else {
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].unLockDice();
			}
		}
	}

	uncheckDices(){
		console.log('uncheck');
		var checkBoxes = $('.check-container');
		for(let checkBox of checkBoxes) {

			let splittedId = checkBox.id.split('-');
			let checkContainer = $('#check-container-'+splittedId[2]);
			
			if(checkBox.getAttribute('locked') === 'true') {
				checkBox.setAttribute('locked', 'false');
				checkContainer.removeClass('AnimateLock');
				$('#check-container-'+ splittedId[2]+ ' img').remove();
				scoreBoards[this.currentPlayer].dices[splittedId[2]].unLockDice();

			}

		}
	}

	parseCheckBoxIdToIndexOfDice(checkBoxId) {
		var idSplits = checkBoxId.split('-');
		var indexOfDice = parseInt(idSplits[1]);
		return indexOfDice;
	}

	endTurn(){

		$('#'+ 'player' + (this.currentPlayer+1)).removeClass('red');
		let rollDicesElement = document.getElementById('roll-dices');
		rollDicesElement.setAttribute('rolling', 'true');	
		for (var i = 0; i < this.listOfBonusScores.length; i++) {
				console.log("iii")
				$('#'+this.currentPlayer + '-' +  this.listOfBonusScores[i]).removeClass('red');
			}

		if(this.scoreBoards[this.currentPlayer].totalRolls === 0){
			this.scoreBoards[this.currentPlayer].turnStarted = false;
			this.scoreBoards[this.currentPlayer].totalRolls = 3;
			this.maxRolls = 3;
			this.scoreBoards[this.currentPlayer].turnCounter++;
			console.log(this.scoreBoards[this.currentPlayer].turnCounter);
			this.checkIfGameIsOver();

			let activeGame = this;

			this.dbConnection.writeDiceToDbUpdate(this.scoreBoards[this.currentPlayer].dices, activeGame);

			this.currentPlayer++;
			this.dbConnection.updateCurrentPlayer(this.currentPlayer);
			this.uncheckDices();
			this.removeEventForElement();
			this.emptyScoreBoard();

			if(this.currentPlayer === this.scoreBoards.length){
				this.currentPlayer = 0;
				this.dbConnection.updateCurrentPlayer(this.currentPlayer);
			}
		}
	}

	checkIfGameIsOver(){
		let noMoreTurns = false;
		console.log('game over?');
		for(let scoreBoard of this.scoreBoards){
			if(scoreBoard.turnCounter >= 15){
				noMoreTurns = true;
			} else {
				noMoreTurns = false;
			}
		}

		if(noMoreTurns && this.resultDisplayed === false || this.gameOver === 'true' && this.resultDisplayed === false){
			this.gameOver = 'true';
			this.resultDisplayed = true;
			var dbConnection = new DbConnector();
			dbConnection.endGame(sessionStorage.matchId);
			this.updateScoreBoards();

			this.insertPlacementOfMatch();

			$('#gameOverModal').modal('show');
		
			if(noMoreTurns && this.gameOver === 'true'){
				dbConnection.readScoreBoardFromDb(this.writeResultsToDb);
			}
		}

	}

	updateScoreBoards(){

		for(let i = 0; i < this.scoreBoards.length; i++){
			this.scoreBoards[i].totalScore = parseInt($('#' + i + '-totalSum').text());
		}
		
	}

	writeResultsToDb(results){
		var dbConnection = new DbConnector();
		dbConnection.writeFinishedMatchToDb(results);
	}

	insertPlacementOfMatch(){
		$('#placements').append('<ol></ol>');
		this.changeOrderOfScoreBoardsFromMatchPlacement();

		let previousTotalScore = 0;
		for(let scoreBoard of this.scoreBoards){
			if(previousTotalScore != scoreBoard.totalScore) {
				$('#placements>ol').append(`<li><span>${scoreBoard.playerName}</span>: ${scoreBoard.totalScore} poäng</li>`);	
			} else {
				$('#placements>ol>li:last-child>span').append(`, ${scoreBoard.playerName}`);
			}

			previousTotalScore = scoreBoard.totalScore;
		}

	}

	updateScoreBoardDices(dices, activeGame){
		console.log('thingys', dices, activeGame);
		let newDices = [];
		for(let i = 0; i < dices.length; i++){
			if(dices[i].player_number === activeGame.currentPlayer){
				newDices.push(new Dice(dices[i].dice_number));
			}
			
		}


		for(let j = 0; j < dices.length; j++){
			if(dices[j].player_number === activeGame.currentPlayer){
				
				let swapboolean = dices[j].locked;
				if(swapboolean === 'false'){
					swapboolean = false;
				}else{
					swapboolean = true;
				}

				newDices[dices[j].dice_number].locked = swapboolean;
				newDices[dices[j].dice_number].currentValue = dices[j].value;
				activeGame.currentRolls = dices[j].total_rolls;
			}
			
		}

		activeGame.scoreBoards[activeGame.currentPlayer].dices = newDices;

		if(activeGame.currentRolls < activeGame.maxRolls && activeGame.currentRolls > -1){
			console.log('roll detected!');


			for(let dice of newDices) {
					console.log('dice', dice);
					console.log('first function', dice.clearDicesInDOM);
					console.log('second function', dice.writeDiceToDOM);
					dice.clearDicesInDOM();
					dice.writeDiceToDOM();
					activeGame.possibleOutcomes();
				}


			activeGame.maxRolls--;
		}

	}

	changeOrderOfScoreBoardsFromMatchPlacement(){
		this.scoreBoards.sort(function(a, b){
    		var keyA = a.totalScore;
        	var keyB = b.totalScore;
		    if(keyA > keyB) return -1;
		    if(keyA < keyB) return 1;
		    return 0;
		});
	}

    addname(playerName, numOfPlayers){

		//for (var i = 0; i < numOfPlayers.length; i++) {
			$('#player1').html(playerName);
		//}
		     console.log(playerName);


	}	

	updateGameInfo(gameState){
		this.currentPlayer = gameState[0].current_player;
		this.dbConnection.readScoreBoardFromDb(this.printScoreBoardsToDOMFromDb);
		this.gameOver = gameState[0].game_over;

		let activeGame = this;

		if(parseInt(sessionStorage.playerNumber) !== this.currentPlayer){
			this.dbConnection.readDiceFromDb(this.updateScoreBoardDices, activeGame);
		}
		
		if(parseInt(sessionStorage.playerNumber) === this.currentPlayer){
			this.possibleOutcomes();
		}

		console.log('current dices haHE!', this.scoreBoards[this.currentPlayer].dices);

		 if(this.gameOver === 'true'){
		 	this.checkIfGameIsOver();
		 }
		console.log('DID THIS HAPPEN?', this.currentPlayer, sessionStorage.playerNumber, this.scoreBoards[parseInt(sessionStorage.playerNumber)].turnStarted);
		if(parseInt(sessionStorage.playerNumber) === this.currentPlayer && this.scoreBoards[this.currentPlayer].turnStarted === false){
			this.dbConnection.readScoreBoardFromDb(this.printScoreBoardsToDOMFromDb);

			this.testRoll();
			
		}

	}

	printScoreBoardsToDOMFromDb(scoreBoards){
		console.log('Detta ska finnas', scoreBoards);
		
		let bonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'bonus', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

		for(let i=0; i<scoreBoards.length; i++){
			if(parseInt(sessionStorage.playerNumber) !== scoreBoards[i].player_number){
				for(let val in scoreBoards[i]){
						if(bonusScores.indexOf(val) > -1){
							let elementFound = document.getElementById(scoreBoards[i].player_number + '-' +  val);
							if(elementFound.getAttribute('disabled') === 'false' && scoreBoards[i][val] !== null){
								elementFound.setAttribute('disabled','true');
								$('#'+ scoreBoards[i].player_number + '-' +  val).empty();
								$('#'+ scoreBoards[i].player_number + '-' +  val).append(scoreBoards[i][val]);
								elementFound.style.color="black";
							}
							if(val === 'sum' || val === 'totalSum' || val === 'bonus'){
								$('#'+ scoreBoards[i].player_number + '-' +  val).empty();
								$('#'+ scoreBoards[i].player_number + '-' +  val).append(scoreBoards[i][val]);
							}
						}
					
						
					


				}
			} 
		}	
	}	
}