$( document ).ready(function() {

	
	//To match the heights of protocol and scores:
	$('.scores').height($('.protocol').height());
	
	$('#myModal').modal('show');

	$('#startGame').on('click', function(){
		checkInputFields();
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
		if(!$('#checkbox-' + splittedId[2]).prop('checked')){
			$('#checkbox-' + splittedId[2]).prop('checked', true);
		} else {
			$('#checkbox-' + splittedId[2]).prop('checked', false);
		}
	});





});

function provideInputFields(numOfPlayers){
	$('.playerValues').empty();
	for(let i = 1; i <= numOfPlayers; i++){
		$('.playerValues').append(`
			 <input type="text" placeholder='Namn spelare ${i}'> 
		`);
	}
}

function createScoreboards(){
	this.scoreBoards = [];
	let inputFields = $('.playerValues').children();
	for(let i = 0; i < inputFields.length; i++){
		let scoreBoard = new ScoreBoard(inputFields[i].value);
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

function checkInputFields(numOfPlayers){
	var correctInput = true;
	$('.playerValues').children().each(function(){
		if($.trim($(this).val()).length == 0){
			$('#errorMessage').html('Ange ett namn för inputfält, eller minska antalet spelare.');
			correctInput = false;
		}
	
	});

	if(correctInput){
		createScoreboards();
	}
}

setInterval(function(){
	if(this.scoreBoards){ //If scoreboards have been initialized, just to make sure that they exist

		let index = currentGame.currentPlayer; //Assign the index of the player
		if(this.scoreBoards[index].timer > 0){ //If the timer of the respective scoreboard is greater than 0

			this.scoreBoards[index].minutes = Math.floor(this.scoreBoards[index].timer/60); //Find the minutes
			//by virtue of flooring the splitting of minutes
			if(this.scoreBoards[index].timer % 60 == 0){ //if the timer is evenly dividable by 60, a minute has passed
				this.scoreBoards[index].minutes -= 1; //Reduce a minute
				this.scoreBoards[index].seconds = 60; //Assign seconds
			}
			this.scoreBoards[index].timer -= 1; //Reduce the TOTAL timer by 1 second
			this.scoreBoards[index].seconds -= 1; //reduce the seconds displayed by 1
			console.log("THERE ARE: ", this.scoreBoards[index].minutes + " " + this.scoreBoards[index].seconds + " Left");
			//Console log just to iterate results
		}
		else{
			//The timer hit 0
			console.log("TIME IS OVER; POWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
		}
		

	}
}, 1000); //The function is based on a interval with calling the anonymous function every 1 second,
//meaning that the timer is a manually controlled timer ticking down each second and being allocated to
//each respective scoreboard



