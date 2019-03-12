$(document).ready(function(){

	function main(){
		
		if (progressCounter < 16){
	
			input_reader(progressCounter, currentProfile);
			progressCounter += 1;
			
			var rand = Math.floor(Math.random() * 100) + 1;
		
			if (rand%2==0) {
				console.log("even");
				currentProfile = low.pop();
				$("#profile").html(html_generator(currentProfile, "low"));
			}
			else {
				console.log("odd");
				currentProfile = high.pop();
				$("#profile").html(html_generator(currentProfile, "high"));
			}
		
			
		}
		else {
			
			$.ajax({
				type:"POST",
				url: "responseHandler.php",
				data: {json: JSON.stringify(writeArray) }
			}).done(function(){
				$("#profile").html("<h1>Congratulations and well done.</h1>");
			});
		}
	};

	function html_generator(profile, worktype){

		var score = profile["nss100"] * 100;
		if (profile["combinedTotalRevenue"]==null){
			var earnings = '';
		}	
		else {
			var earnings = '<p>Total earnings: $' + profile["combinedTotalRevenue"].toString() + '</p>';
		}

		//image condition hack
		if (imageSetting == true){
			var imageSegment = '<div id="image"><div>';
			var descriptionSegment = '<p>' + profile['description'] + '</p>';
		}
		else {
			var imageSegment = '';
			var descriptionSegment = '';
		} 

		//profile block
		var layer1 = '<p>' + profile["shortName"] + '</p>';
		var layer2 = '<p>' + profile["title"] + '</p>'
		var layer3 = '<p>$' + profile['hourlyRate']['amount'].toString()  + ' / hr </p>' + earnings + '<p>Success Score: ' + score.toString() + '%</p>';
		var layer4 = descriptionSegment;
		var layer5 = '';
		$.each(profile["skills"], function(index, value){
			layer5 = layer5 + '<p class="skillTag">' + value['skill']['prettyName'] + '</p>'; 
		});
		var layer6 = '<p>Tests taken: ' + profile["totalPassedTests"].toString()  + '</p><p>Hourly jobs: ' + profile["totalHourlyJobs"].toString()  + '</p><p>Fixed price jobs: ' + profile["totalFpJobs"].toString()  + '</p>';

		var questionString = '';
		$.each(questions, function(index, value){

			//construct the html for the input radio button likert scales
			var inputs = '<div class="inputContainer" id="' + value + '">';
			stringCount = 1
			while(stringCount < 8) {
				var inputString = '<input type="radio" name="' + index + '" id="' + stringCount + '" value="' + stringCount + '"></input><label for=' + stringCount + '>' + stringCount + '</label>';
				inputs = inputs + inputString;
				stringCount += 1;
			}
			inputs = inputs + '</div>';

			var inputTag = '<p>' + value + '</p>' + inputs;
			questionString = questionString + inputTag;
		});
		
		//output the final html segment
		html = '<div id="worktypeHidden">' + worktype + '</div>' + imageSegment + '<div id="info"><div class="layer">' + layer1 + '</div><div class="layer">' + layer2  + '</div><div class="layer">' + layer3 + '</div><div class="layer">' + layer4 + '</div><div class="layer">' + layer5 + '</div><div class="layer">' + layer6 + '</div></div><div id="likerts">' + questionString + '</div>';

		return html; 

	};
		
	function input_reader(sequence, profile){
		if(sequence>0){
			responseObject = {};
			responseObject['sequence'] = sequence;
			responseObject['profileID'] = profile["recno"];
			responseObject['participantID'] = participantID;
			responseObject['tests'] = profile['totalPassedTests'];
			responseObject['rate'] = profile['hourlyRate']['amount'];
			responseObject['jss'] = profile['nss100'] * 100;
			if (profile["combinedTotalRevenue"]==null){
				responseObject['earnings'] = profile['combinedTotalRevenue'];
			}
			else {
				responseObject['earnings'] = '0';
			}

			$("#likerts").children(".inputContainer").each(function(index){
				var questionName = $(this).attr("id");	
				responseObject[questionName] = $(this).children("input:checked").val();
			});
		console.log(responseObject);
		writeArray.push(responseObject);
		console.log(writeArray);
		};
	};

	//Durstenfeld shuffle from the wonderful people of stackoverflow
	function shuffle(array) {
    		for (let i = array.length - 1; i > 0; i--) {
        		const j = Math.floor(Math.random() * (i + 1));
        		[array[i], array[j]] = [array[j], array[i]];
    		}
	};
	
	var writeArray = [];	
	var questions = ["Question1", "Question2", "Question3"];
	var currentProfile = '';
	var participantID = Math.floor(Math.random() * 10000000);

	//these variables loaded through other script tags	
	shuffle(low);
	shuffle(high);
	
	//confusingly controls both the image and the description	
	var imageRand = Math.floor(Math.random() * 100) + 1;
	if (imageRand%2==0){
		imageSetting = true;
	}
	else {
		imageSetting = false;
	}
	var progressCounter = 0;

	$("#submitButton").click(function (){main()});

});
