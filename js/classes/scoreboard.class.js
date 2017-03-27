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

	checkSmallStraight(listOfDices){
		this.returnvalue = 0;
		this.found1 = false;
		this.found2 = false;
		this.found3 = false;
		this.found4 = false;
		this.found5 = false;

		for(var i = 0; i < listOfDices.length; i++){
			if(listOfDices[i].currentValue === 1){
				this.found1 = true;
			}
			if(listOfDices[i].currentValue === 2){
				this.found2 = true;
			}
			if(listOfDices[i].currentValue === 3){
				this.found3 = true;
			}
			if(listOfDices[i].currentValue === 4){
				this.found4 = true;
			}
			if(listOfDices[i].currentValue === 5){
				this.found5 = true;
			}
		}

		if(this.found1 === true && this.found2 === true &&
			 this.found3 === true && this.found4 === true &&
			  this.found5 === true){
			this.returnvalue = 15;
		}

		return this.returnvalue;

	}

	checkLargeStraight(listOfDices){
		this.returnvalue = 0;
		this.found2 = false;
		this.found3 = false;
		this.found4 = false;
		this.found5 = false;
		this.found6 = false;

		for(var i = 0; i < listOfDices.length; i++){
			if(listOfDices[i].currentValue === 2){
				this.found2 = true;
			}
			if(listOfDices[i].currentValue === 3){
				this.found3 = true;
			}
			if(listOfDices[i].currentValue === 4){
				this.found4 = true;
			}
			if(listOfDices[i].currentValue === 5){
				this.found5 = true;
			}
			if(listOfDices[i].currentValue === 6){
				this.found6 = true;
			}
		}

		if(this.found2 === true && this.found3 === true &&
			 this.found4 === true && this.found5 === true &&
			  this.found6 === true){
			this.returnvalue = 20;
		}

		return this.returnvalue;

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

