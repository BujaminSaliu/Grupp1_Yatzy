let dice1 = new Dice(1);

dice1.Roll(true);
let dice2 = new Dice(2);
dice2.Roll(true);

let dice3 = new Dice(3);
dice3.Roll(true);

let dice4 = new Dice(4);
dice4.Roll(true);

let dice5 = new Dice(5);
dice5.Roll(true);

function Rolling(){
	dice1.Roll(false);
	
	dice2.Roll(false);
	dice3.Roll(false);
	dice4.Roll(false);
	dice5.Roll(false);
}