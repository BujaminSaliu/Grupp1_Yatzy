class ScoreBoard{

constructor(name){
	//getCurrentValue(){
	//	return this.currentValue;
	//}
	this.dices = [];
	this.name = name;
	this.bonusScore = 0;
	this.bonus = 50;
	this.totalScore = 0;
	}

	function summarize(){
		let numbers = [];
		let ones = 0;
		let twos = 0;
		let threes = 0;
		let fours = 0;
		let fives = 0;
		let sixes = 0;
		for(let i in this.dices){
			let eyes = i.getCurrentValue();
			switch(eyes){
				case 1:
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

		numbers.push(ones);
		numbers.push(twos);
		numbers.push(threes);
		numbers.push(fours);
		numbers.push(fives);
		numbers.push(sixes);

		return numbers;
		}
	}

}
