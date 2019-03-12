<?php 
	//if(isset($_POST['json'])){
	
		//$outFile = fopen('responses.csv', 'w+');
		//fwrite($outFile, "text");
		//fclose($outFile);
	
		$data = json_decode($_POST['json'], TRUE);
		//$data = json_decode('[{"waka_waka": "val1", "oboga": "val2"}, {"waka_waka": "val11", "oboga": "val22"}]', TRUE);
		foreach($data as $response){
			$outFile = fopen('data/responses.csv', 'a+');
			fputcsv($outFile, array_values($response));
			fclose($outFile);
		}

	//}

?>
