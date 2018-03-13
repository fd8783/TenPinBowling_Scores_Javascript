
//********************************Read Me*********************************************//
// HI Alex,
// I wrote two version of codes for calculating this ten pin bowling scores problem
// The first one(V1) is use the whole list for calculating, while use the value I should not know at that time i.e. In Turn 4, I get turn 5's score to count the bonus
// Therefore, I come up with Version 2(V2), which is using the input value one by one and more reasonable solution for this problem
// I think I should keep V1 here because I finished V1 first but not V2. I think this is my mistake.
//********************************Read Me*********************************************//

//Here is the codes

//calculate total score using a ScoreList copy from whole inputList at first
function CalculateV1(input){
	
	//separate the input by ',' and check is it number
	var inputList = input.split(',');
	var scoreList = [];
	
	for (var j=0; j < inputList.length; j++){
		if (!isNaN(inputList[j]) && inputList[j].replace(/\s/g, '') != ''){	//!isNaN(parseInt(score, 10)) not work for 3b,5s,6s...
			var score = parseInt(inputList[j], 10);
			//check is input score between 0 and 10
			if (score >= 0 && score <= 10){
				scoreList.push(parseInt(inputList[j], 10)); 
			}
			else{
				alert ('Please input int between 0 and 10!');
				return 'Error';	
			}
		}
		else{
			alert ('Please input as "int,int,int...."!');
			return 'Error';
		}
	}	

	//Calculate the total Score user got in 10 turns
	var totalScore = 0,
		turn = 0;

	for (var i=0; i < scoreList.length && turn < 10; i++){
		if (scoreList[i] == 10){
			turn++;
			switch (scoreList.length - 1 - i){
				case 0:
					totalScore += scoreList[i];
					break;
				case 1:
					totalScore += scoreList[i]+scoreList[i+1];
					if(turn >= 10)
						i++;	//use to check is user input scores for more than 10 turns
					break;
				default:
					totalScore += scoreList[i]+scoreList[i+1]+scoreList[i+2];
					if(turn >= 10)
						i+=2;	//use to check is user input scores for more than 10 turns
					break;
			}
		}
		else{
			turn+=0.5;
			if (turn%1 == 0){
				if (scoreList[i-1]+scoreList[i] == 10){
					if ((scoreList.length - 1 - i) == 0)
						totalScore += scoreList[i];
					else
						totalScore += scoreList[i]+scoreList[i+1];
						if(turn >= 10)
							i++;	//use to check is user input scores for more than 10 turns
				}
				else{
					totalScore += scoreList[i];
				}
			}
			else{
				totalScore += scoreList[i];	
			}	
		}
	}
	
	//check is user input scores for more than 10 turns
	if (scoreList.length > i){
		alert ('Please input score for less than 10 turns!');
		return 'Error';
	}
	return totalScore;
}

//calculate total score using score get from inputList one by one
function CalculateV2(input){
	
	//separate the input by ',' and check is it number
	var inputList = input.split(','),
		bonusWaitingList = [];
	
	var totalScore = 0,
		turn = 0,
		ballRolled = 0,
		lastRolledScore = 0,
		isLastTurn = false,
		gameEndCount = 0;
	
	for (var j=0; j < inputList.length; j++){
		if (!isNaN(inputList[j]) && inputList[j].replace(/\s/g, '') != ''){	//!isNaN(parseInt(score, 10)) not work for 3b,5s,6s...
			var score = parseInt(inputList[j], 10); 
			//check is input score between 0 and 10
			if (!(score >= 0 && score <= 10)){
				alert ('Please input int between 0 and 10!');
				return 'Error';	
			}
			
			ballRolled++;
			if (score == 10){
				totalScore+=score;
				turn++;
				//add to waiting list so it gets the bonus marks for next two ball rolled;
				if (turn < 10){
					bonusWaitingList.push(ballRolled+1,ballRolled+2);
				}
				else{
					//check is user input scores for more than 10 turns
					if (!isLastTurn){
						isLastTurn = true;
						gameEndCount = ballRolled+2;	//player can roll two more balls in turn 10
						if (gameEndCount < inputList.length){
							alert ('Please input score for less than 10 turns!');
							return 'Error';
						}
					}
				}
			}
			else{
				totalScore+=score;
				turn+=0.5;
				if (turn%1 == 0){
					if (lastRolledScore + score == 10){
						if (turn < 10){
							bonusWaitingList.push(ballRolled+1);
						}
					}
					if (turn >= 10){
						//check is user input scores for more than 10 turns
						if (!isLastTurn){
							isLastTurn = true;
							gameEndCount = ballRolled+((lastRolledScore + score == 10)? 1: 0);	//player can roll one more ball in turn 10
							if (gameEndCount < inputList.length){
								alert ('Please input score for less than 10 turns!');
								return 'Error';
							}
						}
					}
				}
			}
			if (isLastTurn){
				
			}
			
			while (bonusWaitingList[0] == ballRolled){
				totalScore+=score;
				bonusWaitingList.splice(0,1);
			}
			lastRolledScore = score;
		}
		else{
			alert ('Please input as "int,int,int...."!');
			return 'Error';
		}
	}	

	return totalScore;
}