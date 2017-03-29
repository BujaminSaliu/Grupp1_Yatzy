var testScoreBoard = new ScoreBoard('Kalle');
var dices = [];


for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

testScoreBoard.dices = dices;

$( document ).ready(function() {
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
	console.log(scoreBoards);
	$('#myModal').modal('hide');
}

function checkInputFields(numOfPlayers){
	$('.playerValues').children().each(function(){
		if($.trim($(this).val()).length == 0){
			console.log('Tomt input fält');
			$('#errorMessage').html('Ange ett namn för inputfält, eller minska antalet spelare.');
			return;
		}
	createScoreboards();
	});
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
	console.log('---Möjliga utfall---')
	console.log('Ett par:', testScoreBoard.filterOnePair());
	console.log('Två par:', testScoreBoard.filterTwoPairs());
	console.log('Tretal:', testScoreBoard.filterThreeOfAKind());
	console.log('Fyrtal:', testScoreBoard.filterFourOfAKind());
	console.log('Liten stege:', testScoreBoard.filterSmallStraight());
	console.log('Stor stege:', testScoreBoard.filterLargeStraight());
	console.log('Kåk:', testScoreBoard.filterFullHouse());
	console.log('Chans:' , testScoreBoard.filterChance());
	console.log('Yatzy:' , testScoreBoard.filterYatzy());
}