$(document).ready(function(){

	function main(){
		
		if (progressCounter < 16){

			progressCounter += 1;
			//input_reader();


			var rand = Math.floor(Math.random() * 100) + 1;
		
			if (rand%2==0) {
				console.log("even");
				var currentProfile = low.pop();
				$("#profile").html(html_generator(currentProfile, "low"));
			}
			else {
				console.log("odd: " + high.length);
				var currentProfile = high.pop();
				$("#profile").html(html_generator(currentProfile, "high"));
			}
		
			
		}
		else {
			$("#profile").html("<h1>Congratulations and well done.</h1>");
		}
	};

	function html_generator(profile, worktype){

		var score = profile["nss100"] * 100;
		if (profile["combinedTotalRevenue"]=null){
			var earnings = '';
		}	
		else {
			var earnings = profile["combinedTotalRevenue"].toString();
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

		var layer1 = '<div>' + profile["shortName"] + '</div>';
		var layer2 = '<div>' + profile["title"] + '</div>'
		var layer3 = '<div>$' + profile['hourlyRate']['amount'].toString()  + ' / hr </div><div>' + earnings + '</div><div>Success Score:' + score.toString() + '</div>';
		var layer4 = descriptionSegment;
		var layer5 = '';
		$.each(profile["skills"], function(index, value){
			layer5 = layer5 + '<div>' + value['skill']['prettyName'] + '</div>'; 
		});
		console.log(layer5);
		var layer6 = '<p>Tests taken: ' + profile["totalPassedTests"].toString()  + '</div><div>Hourly jobs: ' + profile["totalHourlyJobs"].toString()  + '</div><div>Fixed price jobs:' + profile["totalFpJobs"].toString()  + '</p>'; 

		html = '<div id="worktypeHidden">' + worktype + '</div>' + imageSegment + '<div id="info"><div class="layer">' + layer1 + '</div><div class="layer">' + layer2  + '</div><div class="layer">' + layer3 + '</div><div class="layer">' + layer4 + '</div><div class="layer">' + layer5 + '</div><div class="layer">' + layer6 + '</div></div>'	

		return html; 

	};
	
	
	function input_reader(){
		//get data and write to object
		
	};

	//Durstenfeld shuffle from the wonderful people of stackoverflow
	function shuffle(array) {
    		for (let i = array.length - 1; i > 0; i--) {
        		const j = Math.floor(Math.random() * (i + 1));
        		[array[i], array[j]] = [array[j], array[i]];
    		}
	};

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
