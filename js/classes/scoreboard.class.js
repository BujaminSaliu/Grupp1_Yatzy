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

	twoPairs(){ //Run to compare against two pairs
		let numbers = this.summarize(); //Again, load in all the combinations

		let points = 0; //How many points you scored
		let pairs = 0; //How many pairs we got, since we will be wanting to check for 2

		for(let i in numbers){ //Go through the amount of dice frequency
			if(i === 2){ //If there is a pair
				points += (i * 2); //add to the points this time, as we wish to summarize the two pairs (And there can only be two pairs on 5 dies)
				pairs += 1; //Add to the pairs that we have a pair, cause we only want to return something if we get 2 pairs, not 1
			}
		}

		if(pairs > 1){ //If we have 2 pairs, and 2 is the cap given that 2*2 is what fits in on 5
			return points; //Return the amount of points scored
		}
		else{ //otherwise, we failed with the pairs, and we want to simply return nothing, because it means we have no pairs or 1 pair
			return 0; //return 0, given that we should not give points in terms of two Pairs if we do not have two pairs
		}
	}
}

