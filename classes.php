<?php

//********** HEADERS *********

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

//********** CONNECT TO MYSQL *********

class MySQLiConnection extends mysqli {
	//acces from other clsses
    public function __construct($host, $usuario, $contraseña, $bd) {
        parent::__construct($host, $usuario, $contraseña, $bd);

        if (mysqli_connect_error()) {
            die('Error de Conexión (' . mysqli_connect_errno() . ') '
                    . mysqli_connect_error());
        }
    }
}

abstract class ConnectionToDB {

	protected $mysqli;

	public function  connect() {
		$this -> mysqli = new MySQLiConnection('localhost', 'puertosu', '87OfatMx', 'puertosu_kolektor');
		
		return $this -> mysqli;

		//FOLLOW THIS STEPS TO CONNECT TO DB
		//$result = $mysqli->query("SELECT id FROM categories");
		//while($reg = mysqli_fetch_array($result)) {
			//echo $reg[id];
		//}
		//$result->close();
	}

}

//********** PODCAST *********

//All lenght in seconds

class GetPodcast extends ConnectionToDB {

	private $result;

	public function __construct() {
		$this->connect();
	}

	//HOME
	public function getFourMostView() {
		$this -> result = $this -> mysqli -> query("SELECT podcasts.*, categories.hex_color AS 'category_hex', feelings.hex_color  AS 'feeling_hex', moods.hex_color AS 'mood_hex' FROM podcasts, categories, feelings, moods WHERE podcasts.category = categories.id AND podcasts.mood = moods.id AND podcasts.feeling = feelings.id ORDER BY `current_views` DESC LIMIT 0,4");
	}	
	
	//SEARCH (BY TITLE)
	//Provide title imput in search box
	public function getSearchByTitle($imput) {
		$this -> result = $this -> mysqli -> query("SELECT podcasts.*, categories.hex_color AS 'category_hex', feelings.hex_color  AS 'feeling_hex', moods.hex_color AS 'mood_hex' FROM podcasts, categories, feelings, moods WHERE podcasts.category = categories.id AND podcasts.mood = moods.id AND podcasts.feeling = feelings.id AND  podcasts.title LIKE '%$imput%' ORDER BY title ASC LIMIT 0,15");
	}

	//WIZARD
	//Provide mood id, feeling id and lenght
	public function getWizard($moodID, $feelingID, $lenght) {

		//One minute less than user imput.
		$shortLenght = $lenght - 60;
		//One minute more than user imput.
		$longLenght = $lenght + 60;

		$this -> result = $this -> mysqli -> query("SELECT podcasts.*, categories.hex_color AS 'category_hex', feelings.hex_color  AS 'feeling_hex', moods.hex_color AS 'mood_hex' FROM podcasts, categories, feelings, moods WHERE podcasts.category = categories.id AND podcasts.mood = moods.id AND podcasts.feeling = feelings.id AND podcasts.mood = '$moodID' AND podcasts.feeling = '$feelingID' AND lenght BETWEEN '$shortLenght' AND '$longLenght' ORDER BY title ASC LIMIT 0,15");
	}

	//CATEGORIES
	//Provide category id
	public function getCategoriesSearch($categoryID) {
		$this -> result = $this -> mysqli -> query("SELECT podcasts.*, categories.hex_color AS 'category_hex', feelings.hex_color  AS 'feeling_hex', moods.hex_color AS 'mood_hex' FROM podcasts, categories, feelings, moods WHERE podcasts.category = categories.id AND podcasts.mood = moods.id AND podcasts.feeling = feelings.id AND podcasts.category ='$categoryID' ORDER BY title ASC LIMIT 0,15");
	}

	//FEED
	public function getFeed() {
		$this -> result = $this -> mysqli -> query("SELECT podcasts.*, categories.hex_color AS 'category_hex', feelings.hex_color  AS 'feeling_hex', moods.hex_color AS 'mood_hex' FROM podcasts, categories, feelings, moods WHERE podcasts.category = categories.id AND podcasts.mood = moods.id AND podcasts.feeling = feelings.id ORDER BY `current_views` DESC");
	}

	public function getResults() {
		$json = array();
	    $iterator = 0;
		while($reg = mysqli_fetch_array($this -> result)) {
		    $json[$iterator]['id'] = $reg[id];
	        $json[$iterator]['title'] = $reg[title];
	        $json[$iterator]['author'] = $reg[author];
	        $json[$iterator]['category'] = $reg[category];
	        $json[$iterator]['mood'] = $reg[mood];
	        $json[$iterator]['feeling'] = $reg[feeling];
	        $json[$iterator]['lenght'] = $reg[lenght];
	        $json[$iterator]['cover'] = $reg[cover];
	        $json[$iterator]['audio'] = $reg[audio];
	        $json[$iterator]['date'] = $reg[date];
	        $json[$iterator]['current_views'] = $reg[current_views];
	        $json[$iterator]['category_hex'] = $reg[category_hex];
	        $json[$iterator]['feeling_hex'] = $reg[feeling_hex];
	        $json[$iterator]['mood_hex'] = $reg[mood_hex];
	        $iterator ++;
		}

		$this -> result -> close();

		echo json_encode($json);
	}

}

//********** TABLES *********

class GetTable extends ConnectionToDB {

	private $result;

	public function __construct() {
		$this->connect();
	}

	//CATEGORIES
	public function getCategories() {
		$this -> result = $this -> mysqli -> query("SELECT * FROM categories");
	}	
	
	//MOODS
	public function getMoods() {
		$this -> result = $this -> mysqli -> query("SELECT * FROM moods");
	}	

	//FEELINGS
	public function getFeelings() {
		$this -> result = $this -> mysqli -> query("SELECT * FROM feelings");
	}	

	public function getResults() {
		$json = array();
	    $iterator = 0;
		while($reg = mysqli_fetch_array($this -> result)) {
		    $json[$iterator]['id'] = $reg[id];
	        $json[$iterator]['name'] = $reg[name];
	        $json[$iterator]['hex_color'] = $reg[hex_color];
	        $iterator ++;
		}

		$this -> result -> close();

		echo json_encode($json);
	}

}

?>