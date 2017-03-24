$( document ).ready(function() {
	
	$('#roll-dices').on('click', function(){
		console.log('hej');
	});

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

function testRoll() {
	
}