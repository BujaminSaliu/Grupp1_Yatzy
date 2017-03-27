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

	checkFullHouse(listOfDice){
		this.threeOfAKind = false;
		this.pair = false;
		this.returnvalue = 0;
		for(var i = 1; i < 7; i++){
			this.counter = 0;
			for(var j = 0; j < listOfDice.length; j++){
				if(listOfDice[j].currentValue === i){
					this.counter++;
				}
			}

			if(this.counter === 2){
				this.pair = true;
			}

			if(this.counter === 3){
				this.threeOfAKind = true;
			}
		}

		if(this.threeOfAKind === true && this.pair === true){
			//using 28 as a placeholder number, replace with 
			//proper calculation of points (summarize function?)
			this.returnvalue = 28;
		}

		return this.returnvalue;

	}

}

