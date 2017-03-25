var dices = [];
var testboard = new ScoreBoard('Alexander');

for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

$( document ).ready(function() {
	
	$('#roll-dices').on('click', function(){
		testRoll();
	});

	$('#test-dices').on('click', function(){
		testDices();
	});

	testRenderingOfDices();

});

function testRenderingOfDices() {
	for(dice of dices) {
		dice.writeDiceToDOM();
	}
}

function testDices(){
	var blargh = testboard.checkFullHouse(dices);
	console.log('full house?', blargh);
}

function testRoll() {
	lockCheckedDices();

	for(dice of dices) {
		dice.clearDicesInDOM();
		dice.roll();
		dice.writeDiceToDOM();
	}
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