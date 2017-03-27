class ScoreBoard{

	constructor(playerName){
		this.playerName = playerName;
		this.dices = [];  
		this.bonusScore = 0; 
		this.bonus = 50; 
		this.totalScore = 0; 
	}

	countNumberOfDiceSideOccurences(){ 
		let numbersOfEachOccurences = []; 
		let amountOfOnes = 0; 
		let amountOfTwos = 0; 
		let amountOfThrees = 0; 
		let amountOfFours = 0; 
		let amountOfFives = 0; 
		let amountOfSixes = 0; 

		for(dice of this.dices){ 
			
			switch(dice.currentValue){ 
				case 1: 
					amountOfOnes += 1;
					break;
				case 2:
					amountOfTwos += 1;
					break;
				case 3:
					amountOfThrees += 1;
					break;
				case 4:
					amountOfFours += 1;
					break;
				case 5:
					amountOfFives += 1;
					break;
				case 6:
					amountOfSixes += 1;
					break;
			}
		}

		numbersOfEachOccurences.push(amountOfOnes); 
		numbersOfEachOccurences.push(amountOfTwos);
		numbersOfEachOccurences.push(amountOfThrees);
		numbersOfEachOccurences.push(amountOfFours);
		numbersOfEachOccurences.push(amountOfFives);
		numbersOfEachOccurences.push(amountOfSixes);

		return numbersOfEachOccurences; 
	}		
	

	filterOnePair(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 2) {
				points = (i+1) * 2;
			}
		}

		return points;  
	}

	filterTwoPairs(){ 
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0; 

		for(let i = 0; i < numbersOfEachOccurences.length; i++){
			if(numbersOfEachOccurences[i] >= 2) {
				points += (i+1) * 2;
				pairs += 1;
			}
		}

		if(pairs > 1){ 
			return points; 
		}else{ 
			return 0;
		}
	}

	filterThreeOfAKind(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences(); 
		let points = 0;	

		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] >= 3) {
				points = (i+1) * 3;
			}
		}

		return points;
	}

	filterSmallStraight(){
		let points = 0;
		let found1 = false;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;

		for(let i = 0; i < this.dices.length; i++){
			if(this.dices[i].currentValue === 1){
				found1 = true;
			}
			if(this.dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.dices[i].currentValue === 5){
				found5 = true;
			}
		}

		if(found1 && found2 && found3 && found4 && found5){
			points = 15;
		}

		return points;

	}

	filterLargeStraight(){
		let points = 0;
		let found2 = false;
		let found3 = false;
		let found4 = false;
		let found5 = false;
		let found6 = false;

		for(let i = 0; i < this.dices.length; i++){
			if(this.dices[i].currentValue === 2){
				found2 = true;
			}
			if(this.dices[i].currentValue === 3){
				found3 = true;
			}
			if(this.dices[i].currentValue === 4){
				found4 = true;
			}
			if(this.dices[i].currentValue === 5){
				found5 = true;
			}
			if(this.dices[i].currentValue === 6){
				found6 = true;
			}
		}

		if(found2 && found3 && found4 && found5 && found6){
			points = 20;
		}

		return points;

	}

	filterFullHouse(){
		let numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let hasPair = false;
		let hasThreeOfAKind = false;
		let pointsFromPair = 0;
		let pointsFromThreeOfAKind = 0;
		let points = 0;

		//Cant reuse one-pair-filter, need the only side-occurence === 2 not >=2
		for(let i = 0; i < numbersOfEachOccurences.length; i++) {
			if(numbersOfEachOccurences[i] === 2) {
				pointsFromPair = (i+1) * 2;
			}
		}

		//However three-of-a-kind-filter can be reused because you can only han one three-of-a-kind
		pointsFromThreeOfAKind = this.filterThreeOfAKind();
		
		if (pointsFromPair != 0 && pointsFromThreeOfAKind != 0) {
			points = pointsFromPair + pointsFromThreeOfAKind;
		}

		return points;

	}


	filterFourOfAKind(){
		let  numbersOfEachOccurences = this.countNumberOfDiceSideOccurences();
		let points = 0;
		let pairs = 0;

		for (var i = 0; i < numbersOfEachOccurences.length; i++) {
			if (numbersOfEachOccurences[i] >=4){
				points += (i + 1) * 4;
			}
		}

		return points;
	}
}

