var testScoreBoard = new ScoreBoard('Kalle');
var dices = [];


for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

testScoreBoard.dices = dices;

$( document ).ready(function() {

	let listOfBonusScores = ['1', '2', '3', '4', '5',
		'6', 'sum', 'onePair', 'twoPair', 'threeOfAKind', 
		'fourOfAKind', 'smallStraight', 'largeStraight', 
		'fullHouse', 'chance', 'yahtzee', 'totalSum'];

	for (var i = 0; i < listOfBonusScores.length; i++) {

			var elementFound = document.getElementById('0' + '-' +  listOfBonusScores[i]);
			elementFound.style.cursor = "pointer";
			elementFound.setAttribute('disabled',false);
		}

	//To match the heights of protocol and scores:
	$('.scores').height($('.protocol').height());
	
	$('#myModal').modal('show');

	$('#startGame').on('click', function(){
		checkInputFields();
	});

	$('#numOfPlayers').change(function(){
		console.log('hej');
		let optionValue = $(this).val();
		console.log('option value', optionValue);
		provideInputFields(optionValue); 
	});



	$('#roll-dices').on('click', function(){
		testRoll();
	});

	$('.dice-container').on('click', function(){
		let splittedId = this.id.split('-');
		if(!$('#checkbox-' + splittedId[2]).prop('checked')){
			$('#checkbox-' + splittedId[2]).prop('checked', true);
		} else {
			$('#checkbox-' + splittedId[2]).prop('checked', false);
		}
	});

	testRoll();

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
	let scoreBoards = [];
	let inputFields = $('.playerValues').children();
	console.log(inputFields);
	for(let i = 0; i < inputFields.length; i++){
		let scoreBoard = new ScoreBoard(inputFields[i].value);
		scoreBoards.push(scoreBoard);
	}

	//Right now we only console-log, later the scoreboards will be used 
	console.log(scoreBoards);
	$('#myModal').modal('hide');
}

function checkInputFields(numOfPlayers){
	var correctInput = true;
	$('.playerValues').children().each(function(){
		if($.trim($(this).val()).length == 0){
			console.log('Tomt input fält');
			$('#errorMessage').html('Ange ett namn för inputfält, eller minska antalet spelare.');
			correctInput = false;
		}
	
	});

	if(correctInput){
		createScoreboards();
	}
}	

function testRoll() {
	lockCheckedDices();

	for(dice of dices) {
		dice.clearDicesInDOM();
		dice.roll();
		dice.writeDiceToDOM();
	}

	logFilters();
}

function lockCheckedDices() {
	var checkBoxes = $('.check-container').children();

	for(checkBox of checkBoxes) {
		var idToLockOrUnLock = parseCheckBoxIdToIndexOfDice(checkBox.id);

		if($('#' + checkBox.id).is(":checked")) {
			dices[idToLockOrUnLock].lockDice();
		} else {
			dices[idToLockOrUnLock].unLockDice();
		}
	}
}

function parseCheckBoxIdToIndexOfDice(checkBoxId) {
	var idSplits = checkBoxId.split('-');
	var indexOfDice = parseInt(idSplits[1]);
	return indexOfDice;
}

function logFilters() {
	console.log('---Möjliga utfall---');
	console.log('Ettor:', testScoreBoard.filterOnes());
	console.log('Tvåor:', testScoreBoard.filterTwos());
	console.log('Treor:', testScoreBoard.filterThrees());
	console.log('Fyror:', testScoreBoard.filterFours());
	console.log('Femmor:', testScoreBoard.filterFives());
	console.log('Sexor:', testScoreBoard.filterSixes());
	console.log('Ett par:', testScoreBoard.filterOnePair());
	console.log('Ett par:', testScoreBoard.countNumberOfDiceSideOccurences());
	console.log('Två par:', testScoreBoard.filterTwoPairs());
	console.log('Tretal:', testScoreBoard.filterThreeOfAKind());
	console.log('Fyrtal:', testScoreBoard.filterFourOfAKind());
	console.log('Liten stege:', testScoreBoard.filterSmallStraight());
	console.log('Stor stege:', testScoreBoard.filterLargeStraight());
	console.log('Kåk:', testScoreBoard.filterFullHouse());
	console.log('Chans:' , testScoreBoard.filterChance());
	console.log('Yatzy:' , testScoreBoard.filterYatzy());
	console.log('possible outcomes: ', testScoreBoard.possibleOutcomes(0));
}