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
		console.log(dice);
		dice.writeDiceToDOM();
	}
}

function testRoll() {
	for(dice of dices) {
		dice.clearDicesInDOM();
		dice.roll();
		dice.writeDiceToDOM();
	}
}