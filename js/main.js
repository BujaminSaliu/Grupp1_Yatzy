var playerScoreBoard = [];
var dices = [];
var currentPlayer = 0;
var gameRunning = true;



$( document ).ready(function() {
	
	playerScoreBoard.push(new ScoreBoard('Kalle'));
	playerScoreBoard.push(new ScoreBoard('Anders'));
	playerScoreBoard.push(new ScoreBoard('Sara'));

	console.log(playerScoreBoard);
	//To match the heights of protocol and scores:
	$('.scores').height($('.protocol').height());
	
	$('#roll-dices').on('click', function(){
		testRoll(playerScoreBoard[currentPlayer]);
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

function gameLogic(){

	playerScoreBoard[currentPlayer].totalRolls--;
	if(playerScoreBoard[currentPlayer].totalRolls === 0){
		playerScoreBoard[currentPlayer].totalRolls = 3;
		currentPlayer++;
	}

	if(currentPlayer === playerScoreBoard.length){
		currentPlayer = 0;
	}
}

function testRoll() {
	lockCheckedDices();
	console.log('halp', playerScoreBoard[currentPlayer]);

	for(dice of playerScoreBoard[currentPlayer].dices) {
		dice.clearDicesInDOM();
		dice.roll();
		dice.writeDiceToDOM();
	}

	logFilters(playerScoreBoard[currentPlayer]);
	gameLogic();

}

function lockCheckedDices() {
	var checkBoxes = $('.check-container').children();
	for(checkBox of checkBoxes) {
		var idToLockOrUnLock = parseCheckBoxIdToIndexOfDice(checkBox.id);

		if($('#' + checkBox.id).is(":checked")) {
			playerScoreBoard[currentPlayer].dices[idToLockOrUnLock].lockDice();
		} else {
			playerScoreBoard[currentPlayer].dices[idToLockOrUnLock].unLockDice();
		}
	}
}

function parseCheckBoxIdToIndexOfDice(checkBoxId) {
	var idSplits = checkBoxId.split('-');
	var indexOfDice = parseInt(idSplits[1]);
	return indexOfDice;
}

function logFilters(playerScoreBoard) {
	console.log('---Möjliga utfall---')
	console.log('Ett par:', playerScoreBoard.filterOnePair());
	console.log('Två par:', playerScoreBoard.filterTwoPairs());
	console.log('Tretal:', playerScoreBoard.filterThreeOfAKind());
	console.log('Fyrtal:', playerScoreBoard.filterFourOfAKind());
	console.log('Liten stege:', playerScoreBoard.filterSmallStraight());
	console.log('Stor stege:', playerScoreBoard.filterLargeStraight());
	console.log('Kåk:', playerScoreBoard.filterFullHouse());
	console.log('Chans:' , playerScoreBoard.filterChance());
	console.log('Yatzy:' , playerScoreBoard.filterYatzy());
}