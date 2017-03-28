var testScoreBoard = new ScoreBoard('Kalle');
var dices = [];


for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

testScoreBoard.dices = dices;

$( document ).ready(function() {

	//To match the heights of protocol and scores:
	$('.scores').height($('.protocol').height());
	
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
	console.log('Två par:', testScoreBoard.filterTwoPairs());
	console.log('Tretal:', testScoreBoard.filterThreeOfAKind());
	console.log('Fyrtal:', testScoreBoard.filterFourOfAKind());
	console.log('Liten stege:', testScoreBoard.filterSmallStraight());
	console.log('Stor stege:', testScoreBoard.filterLargeStraight());
	console.log('Kåk:', testScoreBoard.filterFullHouse());
	console.log('Chans:' , testScoreBoard.filterChance());
	console.log('Yatzy:' , testScoreBoard.filterYatzy());
}