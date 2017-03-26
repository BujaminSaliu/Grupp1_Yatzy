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
}

