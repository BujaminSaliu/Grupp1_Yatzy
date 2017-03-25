class ScoreBoard{

	constructor(name){
		this.name = name;
		this.bonusScore = 0;
		this.bonus = 50;
		this.totalScore = 0;
	}


	checkFullHouse(listOfDice){
		threeOfAKind = false;
		pair = false;
		returnvalue = 0;
		for(i = 1; i < 7; i++){
			counter = 0;
			for(j = 0; j < listOfDice.length; j++){
				if(listOfDice[j].currentValue === i){
					counter++;
				}
			}

			if(counter === 2){
				pair = true;
			}

			if(counter === 3){
				threeOfAKind = true;
			}
		}

		if(threeOfAKind === true && pair === true){
			returnvalue = sumDices(listOfDice);
		}

		return returnvalue;

	}


}
