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

		let foundDice = $('#check-container-'+splittedId[2]);
		let foundDiceId = $(this).find("img").attr('data-id');

		if(!($('#check-container-' + splittedId[2]).attr('locked') === 'true')){
			var audio = new Audio('audio/locking-sound.mp3');
			audio.play();
			$('#check-container-' + splittedId[2]).attr('locked', 'true');
			foundDice.append('<IMG data-id=' + foundDiceId + ' SRC=img/padlock.png>');
			foundDice.addClass('AnimateLock');
			console.log(foundDice);
			
			
		} else {
			$('#check-container-' + splittedId[2]).attr('locked', false);
			$('#check-container-'+splittedId[2]+ ' img').remove();
			
			let foundDice = $('#check-container-'+splittedId[2]);
			foundDice.removeClass('AnimateLock');

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





