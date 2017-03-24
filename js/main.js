$( document ).ready(function() {
	testRenderingOfDices();
	
});

function testRenderingOfDices() {
	var dices = [];

	for(let i = 0; i < 5; i++) {
		let dice = new Dice(i);
		dices.push(dice);
	}

	console.log(dices);

	for(dice of dices) {
		console.log(dice);
		dice.writeDiceToDOM();
	}

}