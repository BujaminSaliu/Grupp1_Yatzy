class ScoreBoard{

	constructor(name){
		this.name = name;
		this.bonusScore = 0;
		this.bonus = 50;
		this.totalScore = 0;
	}

	checkSmallStraight(listOfDices){
		returnvalue = 0;
		found1 = false;
		found2 = false;
		found3 = false;
		found4 = false;
		found5 = false;

		for(i = 0; i < listOfDices.length; i++){
			if(listOfDices[i].currentValue === 1){
				found1 = true;
			}
			if(listOfDices[i].currentValue === 2){
				found2 = true;
			}
			if(listOfDices[i].currentValue === 3){
				found3 = true;
			}
			if(listOfDices[i].currentValue === 4){
				found4 = true;
			}
			if(listOfDices[i].currentValue === 5){
				found5 = true;
			}
		}

		if(found1 === true && found2 === true &&
			 found3 === true && found4 === true &&
			  found5 === true){
			returnvalue = 15;
		}

		return returnvalue;

	}

	checkLargeStraight(listOfDices){
		returnvalue = 0;
		found2 = false;
		found3 = false;
		found4 = false;
		found5 = false;
		found6 = false;

		for(i = 0; i < listOfDices.length; i++){
			if(listOfDices[i].currentValue === 2){
				found2 = true;
			}
			if(listOfDices[i].currentValue === 3){
				found3 = true;
			}
			if(listOfDices[i].currentValue === 4){
				found4 = true;
			}
			if(listOfDices[i].currentValue === 5){
				found5 = true;
			}
			if(listOfDices[i].currentValue === 6){
				found6 = true;
			}
		}

		if(found2 === true && found3 === true &&
			 found4 === true && found5 === true &&
			  found6 === true){
			returnvalue = 20;
		}

		return returnvalue;

	}

}
