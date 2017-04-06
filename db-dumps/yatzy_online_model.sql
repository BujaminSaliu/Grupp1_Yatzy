DROP TABLE IF EXISTS Players;


DROP TABLE IF EXISTS Dice;
DROP TABLE IF EXISTS YatzeeMatch;
DROP TABLE IF EXISTS Scoreboards;

CREATE DATABASE IF NOT EXISTS YatzeeBase;
CREATE SCHEMA IF NOT EXISTS YatzeeSchema;

CREATE TABLE IF NOT EXISTS YatzeeMatch( #Create the table if it does not exist
        MatchId INTEGER(11) NOT NULL UNIQUE AUTO_INCREMENT,
        Score INTEGER(11) NOT NULL, Ruleset VARCHAR(50),PRIMARY KEY(MatchId)); #Assign Id to be the Primary key of this Table

CREATE TABLE IF NOT EXISTS Players(
		PlayerId Integer(11) NOT NULL UNIQUE AUTO_INCREMENT, MatchId Integer(11),
        RollsLeft INTEGER(11) NOT NULL,
        PlayerName VARCHAR(50),
        PowerUps VARCHAR(50), PRIMARY KEY(PlayerId), FOREIGN KEY (MatchId) REFERENCES YatzeeMatch(MatchId));

CREATE TABLE IF NOT EXISTS Scoreboards(
		ScoreboardId integer(11) NOT NULL UNIQUE AUTO_INCREMENT, MatchId Integer(11),
        Ones INTEGER(11) NOT NULL, Twos INTEGER(11) NOT NULL, Threes INTEGER(11) NOT NULL, Fours INTEGER(11) NOT NULL,
        Fives INTEGER(11) NOT NULL, Sixes INTEGER(11) NOT NULL, Pair INTEGER(11), TwoPairs INTEGER(11), 
        ThreeOfAKind INTEGER(11), FourOfAKind INTEGER(11),
        Yahtzee INTEGER(11), BigStair INTEGER(11), SmallStair INTEGER(11), FullHouse INTEGER(11), 
        Chanse INTEGER(11), Bonus INTEGER(11), UpperTotal INTEGER(11), LowerTotal INTEGER(11),
        FOREIGN KEY (MatchId) REFERENCES YatzeeMatch(MatchId), PRIMARY KEY(ScoreboardId));

CREATE TABLE IF NOT EXISTS Dice(
		DiceId integer(11) NOT NULL UNIQUE AUTO_INCREMENT, ScoreboardId Integer(11),
        SideOfDice INTEGER(11), Locked VARCHAR(50), FOREIGN KEY (ScoreboardId) REFERENCES Scoreboards(ScoreboardId));
SHOW TABLES;
SELECT * FROM YatzeeMatch;
SELECT * FROM Players;
SELECT * FROM Scoreboards;
SELECT * FROM Dice;