<?php
#William Tan
#CSE 154 AD
#writes the different data types by reading local files and
#generates the books informations based on different modes.

	//checks the parameters and executes different codes
	$type = $_GET["mode"];
	if ($type == "book"){
		book();
	} else {
		$book = $_GET["title"];
		mode($type, $book);
	}

	//writes the code for the 3 modes: info, description and reviews
	function mode($type, $book){
		if($type == "info"){
			info($book);
		} else if($type == "description"){
			description($book);
		} else if ($type == "reviews"){
			reviews($book);
		}
	}

	//makes the json for the books
	function info($books){
		header("Content-type: application/json");
		$path = "./books/" . $books . "/info.txt";

		$file = file_get_contents($path);
		$content = explode("\n", $file);
		$file_info = array(
			"title" => $content[0], 
			"description" => $content[1], 
			"star" => $content[2]
		);
		print json_encode($file_info, JSON_UNESCAPED_UNICODE);
	}

	//writes the description of the book in plain text
	function description($book){
		header("content-type: text/plain");
		$path = "./books/" . $book . "/description.txt";
		$file = file_get_contents($path);
		echo($file);
	}

	//writes the reviews on the book in html
	function reviews($book){
		header("content-type: text/html");
		$path = "./books/" . $book;
		foreach (scandir($path) as $filename){
			if((substr_compare($filename, "review", 0)) == 5) {
				$review = fopen($path . "/" . $filename , "r");
				while(! feof($review)){
					echo "<h3>" . fgets($review) . "<span>";
					echo fgets($review) . "</span></h3>";
					echo "<p>" . fgets($review) . "</p>";
				}
				fclose($review);
			}
		}
	}

	//writes the book contents in xml
	function book(){
		header("content-type: text/xml");
		$path = "./books/";
		echo "<books>";
		foreach (scandir($path) as $filename) {
			$dot_check = substr($filename, 0);
			if($dot_check != "." && $dot_check != ".."){
				echo "<book>";

				$info = fopen($path . "/" . $filename . "/info.txt", "r");
				echo "<title>" . fgets($info) . "</title>";

				echo "<folder>";
				echo $filename;
				echo "</folder></book>";
			}
		}
		echo "</books>";	
	}
?>