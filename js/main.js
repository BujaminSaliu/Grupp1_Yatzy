var testScoreBoard = new ScoreBoard('Kalle');
var dices = [];


for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

testScoreBoard.dices = dices;

$( document ).ready(function() {
	
	$('#roll-dices').on('click', function(){
		testRoll();
	});

	testRoll();

});

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
}