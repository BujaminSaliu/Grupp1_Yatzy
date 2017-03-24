var dices = [];

for(let i = 0; i < 5; i++) {
	let dice = new Dice(i);
	dices.push(dice);
}

$( document ).ready(function() {
	
	$('#roll-dices').on('click', function(){
		testRoll();
	});

	testRenderingOfDices();

});

function testRenderingOfDices() {
	for(dice of dices) {
		dice.writeDiceToDOM();
	}
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
		if($('#' + checkBox.id).is(":checked")) {
			var idToLock = parseCheckBoxIdToIndexOfDice(checkBox.id);
			dices[idToLock].lockDice();
		}
	}
}

function parseCheckBoxIdToIndexOfDice(checkBoxId) {
	var idSplits = checkBoxId.split('-');
	var indexOfDice = parseInt(idSplits[1]);
	return indexOfDice;
}