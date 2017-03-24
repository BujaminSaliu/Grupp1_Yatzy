class ScoreBoard{

constructor(name){
	//getCurrentValue(){
	//	return this.currentValue;
	//}
	this.dices = []; //A list of all the die
	this.name = name; //Name of the player
	this.bonusScore = 0; //Your bonus score
	this.bonus = 50; //How much the bonus gives
	this.totalScore = 0; //Your total score
	}

	summarize(){ //Run a summarization of how many different dies occured
		let numbers = []; //Start a list to put the numbers in
		let ones = 0; //How many ones
		let twos = 0; //How many twos
		let threes = 0; //How many threes
		let fours = 0; //How many fours
		let fives = 0; //How many fives
		let sixes = 0; //How many sixes
		for(let i in this.dices){ //Go through the dices
			let eyes = i.getCurrentValue(); //get the value of how many eyes were on each thing
			switch(eyes){ //Switch case to see how many eyes the given side has
				case 1: //Add to respective number based on which we get.
					ones += 1;
					break;
				case 2:
					twos += 1;
					break;
				case 3:
					threes += 1;
					break;
				case 4:
					fours += 1;
					break;
				case 5:
					fives += 1;
					break;
				case 6:
					sixes += 1;
					break;
				}
			}

		numbers.push(ones); //populate the list with all the frequencies of the numbers we got
		numbers.push(twos);
		numbers.push(threes);
		numbers.push(fours);
		numbers.push(fives);
		numbers.push(sixes);

		return numbers; //Return the list of frequencies
		}
	}

	function onePair(){ //Run to compare one pair
		let numbers = this.summarize(); //Load in All the combinations

		let points = 0; //How many points you scored by the pair 

		for(let i in numbers){ //Go through the amount of dice frequency
			if(i === 2){ //If the amount counter is 2, trigger summarization
				points = (i * 2); //Instead of adding to, we assign. Given that we want to have the highest pair available
			}
		}

		return points; //Return the amount of points scored 
	}

	function twoPairs(){ //Run to compare against two pairs
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

