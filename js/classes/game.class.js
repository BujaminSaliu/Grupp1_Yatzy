class Game{
	
	constructor(scoreBoards){
		this.scoreBoards = scoreBoards;
		this.currentPlayer = 0;
		this.listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];
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

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].length; i++){
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 1){
				found1 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 5){
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

		for(let i = 0; i < this.scoreBoards[this.currentPlayer].length; i++){
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 2){
				found2 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 3){
				found3 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 4){
				found4 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 5){
				found5 = true;
			}
			if(this.scoreBoards[this.currentPlayer][i].currentValue === 6){
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
		if(this.bonusScore >= 63 && this.bonusUsed === false){
			this.totalScore += 50;
			this.bonusUsed = true;

			$('#'+ this.currentPlayer + '-bonus').append(this.bonus);
		}
	}

	calcTotalScore(numToAdd){
		this.scoreBoards[this.currentPlayer].totalScore += numToAdd;
	}

	calcBonusScore(numToAdd){
		this.scoreBoards[this.currentPlayer].bonusScore += numToAdd;
		this.checkBonus();
	}

	createEventForElement(){
		for (let i = 0; i < this.listOfBonusScores.length; i++) {			
			
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);

			
			let activeGame = this; // to make savedTotalScore a reference to this Scoreboard object

			if(!(i===6 || i===this.listOfBonusScores.length-1)){
				elementFound.addEventListener("click", function(){

					let currentElement = document.getElementById($(this).attr('id'));
					if(currentElement.getAttribute('disabled') === 'false'){
						
						activeGame.calcTotalScore(parseInt($(this).text()));
						let splittedId = $(this).attr('id').split('-');
						if (splittedId[1]<7) {

							activeGame.calcBonusScore(parseInt($(this).text()));
						}
					}

					currentElement.style.color = "black";

					currentElement.setAttribute('disabled','true');

				});

			}
		}

	}

	possibleOutcomes(){
		this.emptyScoreBoard();
		this.createEventForElement();

		let filterMethods = [
		this.filterOnes(), this.filterTwos(), this.filterThrees(),
		this.filterFours(), this.filterFives(), 
		this.filterSixes(), this.scoreBoards[this.currentPlayer].bonusScore, 
		this.filterOnePair(), this.filterTwoPairs(), 
		this.filterThreeOfAKind(), this.filterFourOfAKind(),
		this.filterSmallStraight(), this.filterLargeStraight(),
		this.filterFullHouse(), this.filterChance(), this.filterYatzy(),
		this.scoreBoards[this.currentPlayer].totalScore
		];


		for (let i = 0; i < this.listOfBonusScores.length; i++) {
			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);
			let currentMethod = filterMethods[i];
			if(!(i===6 || i===this.listOfBonusScores.length-1)){
				if(elementFound.getAttribute('disabled') === 'false'){
					$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).append(currentMethod);
					elementFound.style.color="lightgrey";
				}

			}else{
				$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).append(currentMethod);
				elementFound.style.color="black";

			}
		}
	}

	emptyScoreBoard(){

		for (let i = 0; i < this.listOfBonusScores.length; i++) {

			let elementFound = document.getElementById(this.currentPlayer + '-' +  this.listOfBonusScores[i]);

			if(elementFound.getAttribute('disabled') === 'false'){
				$('#'+ this.currentPlayer + '-' +  this.listOfBonusScores[i]).empty();
			}
		}

	}

	testRoll() {
		this.lockCheckedDices();
		for(let dice of this.scoreBoards[this.currentPlayer].dices) {
			dice.clearDicesInDOM();
			dice.roll();
			dice.writeDiceToDOM();
		}

		this.possibleOutcomes();
	}

	lockCheckedDices() {
		var checkBoxes = $('.check-container').children();
		for(let checkBox of checkBoxes) {
			var idToLockOrUnLock = this.parseCheckBoxIdToIndexOfDice(checkBox.id);

			if($('#' + checkBox.id).is(":checked")) {
				this.scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].lockDice();
			} else {
				scoreBoards[this.currentPlayer].dices[idToLockOrUnLock].unLockDice();
			}
		}
	}

	parseCheckBoxIdToIndexOfDice(checkBoxId) {
		var idSplits = checkBoxId.split('-');
		var indexOfDice = parseInt(idSplits[1]);
		return indexOfDice;
	}

}