
function Calculate(input){
	var inputList = input.split(',');
	var scoreList = inputList.map(function (score) { 
		return parseInt(score, 10); 
	});

	var totalScore = 0,
		turn = 0;
		

	for (i=0; i < scoreList.length && turn < 10; i++){
		if (scoreList[i] == 10){
			turn++;
			switch (scoreList.length - 1 - i){
				case 0:
					totalScore += scoreList[i];
					break;
				case 1:
					totalScore += scoreList[i]+scoreList[i+1];
					break;
				default:
					totalScore += scoreList[i]+scoreList[i+1]+scoreList[i+2];
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
	
	return totalScore;
}